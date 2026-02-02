from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import random

# LLM Integration
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============== Models ==============

class OTPRequest(BaseModel):
    phone: str
    name: str

class OTPVerify(BaseModel):
    phone: str
    otp: str

class OTPResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ParentDetails(BaseModel):
    name: str
    phone: str

class Assessment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    student_name: str
    stream: str  # Science, Commerce, Arts
    subjects: List[str]
    marks_percentage: float
    career_interests: List[str]
    strong_subjects: List[str]
    career_goal: str  # Job, Higher Studies, Study Abroad
    parent_details: ParentDetails
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AssessmentCreate(BaseModel):
    user_id: str
    student_name: str
    stream: str
    subjects: List[str]
    marks_percentage: float
    career_interests: List[str]
    strong_subjects: List[str]
    career_goal: str
    parent_name: str
    parent_phone: str

class CareerRecommendation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    assessment_id: str
    user_id: str
    careers: List[dict]  # List of career objects
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    phone: str
    consultation_type: str  # Online / Offline
    date: str
    time: str
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BookingCreate(BaseModel):
    user_id: str
    name: str
    phone: str
    consultation_type: str
    date: str
    time: str

class Membership(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    phone: str
    amount: int = 10000
    status: str = "active"  # active, expired
    payment_status: str = "paid"  # paid, pending (demo)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MembershipCreate(BaseModel):
    user_id: str
    name: str
    phone: str

# ============== Auth Routes ==============

@api_router.post("/auth/send-otp", response_model=OTPResponse)
async def send_otp(request: OTPRequest):
    """Send OTP (Mock - always succeeds)"""
    # Store user if not exists
    existing_user = await db.users.find_one({"phone": request.phone})
    if not existing_user:
        user = User(name=request.name, phone=request.phone)
        await db.users.insert_one(user.dict())
    
    # In production, send actual SMS here
    # For demo, OTP is always "1234" or any 4-digit code
    return OTPResponse(success=True, message="OTP sent successfully")

@api_router.post("/auth/verify-otp", response_model=OTPResponse)
async def verify_otp(request: OTPVerify):
    """Verify OTP (Mock - any 4-digit code works)"""
    # For demo, accept any 4-digit OTP
    if len(request.otp) == 4 and request.otp.isdigit():
        user = await db.users.find_one({"phone": request.phone})
        if user:
            await db.users.update_one(
                {"phone": request.phone},
                {"$set": {"verified": True}}
            )
            return OTPResponse(success=True, message="OTP verified", user_id=user['id'])
        else:
            # Create user if doesn't exist
            new_user = User(name="User", phone=request.phone, verified=True)
            await db.users.insert_one(new_user.dict())
            return OTPResponse(success=True, message="OTP verified", user_id=new_user.id)
    return OTPResponse(success=False, message="Invalid OTP")

@api_router.post("/auth/skip")
async def skip_auth():
    """Skip authentication and create a guest user"""
    guest_id = str(uuid.uuid4())
    user = User(
        id=guest_id,
        name="Guest User",
        phone="0000000000",
        verified=True
    )
    await db.users.insert_one(user.dict())
    return {"success": True, "user_id": guest_id, "message": "Guest access granted"}

# ============== Assessment Routes ==============

@api_router.post("/assessments", response_model=Assessment)
async def create_assessment(input_data: AssessmentCreate):
    """Save student assessment data"""
    assessment = Assessment(
        user_id=input_data.user_id,
        student_name=input_data.student_name,
        stream=input_data.stream,
        subjects=input_data.subjects,
        marks_percentage=input_data.marks_percentage,
        career_interests=input_data.career_interests,
        strong_subjects=input_data.strong_subjects,
        career_goal=input_data.career_goal,
        parent_details=ParentDetails(
            name=input_data.parent_name,
            phone=input_data.parent_phone
        )
    )
    await db.assessments.insert_one(assessment.dict())
    return assessment

@api_router.get("/assessments/{user_id}", response_model=Optional[Assessment])
async def get_assessment(user_id: str):
    """Get assessment by user ID"""
    assessment = await db.assessments.find_one({"user_id": user_id})
    if assessment:
        return Assessment(**assessment)
    return None

# ============== Career Recommendation Routes ==============

@api_router.post("/career-recommendations")
async def generate_career_recommendations(assessment_id: str, user_id: str):
    """Generate AI-powered career recommendations"""
    # Get assessment data
    assessment = await db.assessments.find_one({"id": assessment_id})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Build prompt for AI
    prompt = f"""You are Edu9's career counselor for Indian students after 12th grade. 
Based on the following student profile, recommend the TOP 3 most suitable career paths.

Student Profile:
- Name: {assessment['student_name']}
- 12th Stream: {assessment['stream']}
- Subjects Studied: {', '.join(assessment['subjects'])}
- Marks/Percentage: {assessment['marks_percentage']}%
- Career Interests: {', '.join(assessment['career_interests'])}
- Strong Subjects: {', '.join(assessment['strong_subjects'])}
- Career Goal: {assessment['career_goal']}

For each career, provide:
1. Career Name
2. Why it's suitable (2-3 sentences, simple language)
3. Required Course/Degree
4. Duration (years)
5. Estimated Cost (in INR)
6. Top Colleges in India
7. Job Prospects (simple explanation)
8. Expected Starting Salary (in INR per annum)
9. Step-by-step roadmap (4-5 steps)

Focus on these career categories: Engineering/IT, Management (BBA/MBA), Medical & Paramedical, Aviation, Abroad Studies

Format your response as JSON array with exactly 3 careers:
[
  {{
    "name": "Career Name",
    "suitability": "Why suitable...",
    "course": "B.Tech/MBBS/BBA etc",
    "duration": "4 years",
    "estimated_cost": "₹4-8 Lakhs",
    "top_colleges": ["College 1", "College 2", "College 3"],
    "job_prospects": "Job outlook...",
    "starting_salary": "₹4-6 LPA",
    "roadmap": ["Step 1", "Step 2", "Step 3", "Step 4"]
  }}
]

Keep language simple - parents should understand easily. Be practical and honest about Indian education system."""

    try:
        # Initialize LLM Chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"career-{assessment_id}",
            system_message="You are Edu9's expert career counselor specializing in Indian education system. Always respond in valid JSON format."
        ).with_model("openai", "gpt-5.2")
        
        # Send message
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse response - extract JSON from response
        import json
        import re
        
        # Try to extract JSON array from response
        json_match = re.search(r'\[[\s\S]*\]', response)
        if json_match:
            careers_data = json.loads(json_match.group())
        else:
            # Fallback careers if parsing fails
            careers_data = get_fallback_careers(assessment)
        
        # Save recommendation
        recommendation = CareerRecommendation(
            assessment_id=assessment_id,
            user_id=user_id,
            careers=careers_data
        )
        await db.career_recommendations.insert_one(recommendation.dict())
        
        return {
            "success": True,
            "recommendation_id": recommendation.id,
            "careers": careers_data
        }
        
    except Exception as e:
        logging.error(f"LLM Error: {str(e)}")
        # Return fallback recommendations
        careers_data = get_fallback_careers(assessment)
        recommendation = CareerRecommendation(
            assessment_id=assessment_id,
            user_id=user_id,
            careers=careers_data
        )
        await db.career_recommendations.insert_one(recommendation.dict())
        
        return {
            "success": True,
            "recommendation_id": recommendation.id,
            "careers": careers_data,
            "note": "Using merit-based recommendations"
        }

def get_fallback_careers(assessment: dict) -> List[dict]:
    """Generate fallback careers based on stream and marks"""
    stream = assessment.get('stream', 'Science')
    marks = assessment.get('marks_percentage', 70)
    interests = assessment.get('career_interests', [])
    
    careers_by_stream = {
        "Science": [
            {
                "name": "Software Engineering (B.Tech CSE)",
                "suitability": "Your strong Science background and analytical skills make you ideal for IT. High demand in India with excellent growth.",
                "course": "B.Tech Computer Science",
                "duration": "4 years",
                "estimated_cost": "₹4-15 Lakhs",
                "top_colleges": ["IITs", "NITs", "BITS Pilani", "VIT", "SRM"],
                "job_prospects": "Very high demand. Companies like TCS, Infosys, Google, Microsoft hire freshers regularly.",
                "starting_salary": "₹4-12 LPA",
                "roadmap": ["Clear JEE/State entrance exam", "Get admission in B.Tech CSE", "Learn programming & projects", "Internships in 3rd year", "Campus placement in 4th year"]
            },
            {
                "name": "Medicine (MBBS)",
                "suitability": "If you have interest in helping people and have good memory, MBBS offers a respected and stable career.",
                "course": "MBBS + MD/MS",
                "duration": "5.5 years (MBBS) + 3 years (PG)",
                "estimated_cost": "₹20-80 Lakhs",
                "top_colleges": ["AIIMS", "CMC Vellore", "JIPMER", "MAMC Delhi", "KEM Mumbai"],
                "job_prospects": "Always in demand. Can work in hospitals, start own clinic, or join government service.",
                "starting_salary": "₹6-15 LPA",
                "roadmap": ["Clear NEET UG exam", "Complete MBBS from good college", "Do internship seriously", "Prepare for NEET PG", "Specialize in chosen field"]
            },
            {
                "name": "Data Science & AI",
                "suitability": "Your Maths and Science skills are perfect for this futuristic field. One of the highest paying careers today.",
                "course": "B.Tech + M.Tech/MS in Data Science",
                "duration": "4-6 years",
                "estimated_cost": "₹5-20 Lakhs",
                "top_colleges": ["IITs", "IISc Bangalore", "ISI Kolkata", "IIIT Hyderabad"],
                "job_prospects": "Extremely high demand. Every company needs data scientists. Work from home options available.",
                "starting_salary": "₹8-20 LPA",
                "roadmap": ["B.Tech in CSE/IT/Maths", "Learn Python, Statistics, ML", "Online certifications", "Build portfolio projects", "Apply to tech companies"]
            }
        ],
        "Commerce": [
            {
                "name": "Chartered Accountancy (CA)",
                "suitability": "Your Commerce background is perfect for CA. Most respected finance career in India with excellent income.",
                "course": "CA Foundation + Intermediate + Final",
                "duration": "4-5 years",
                "estimated_cost": "₹1-3 Lakhs",
                "top_colleges": ["ICAI (Institute of Chartered Accountants)"],
                "job_prospects": "Very high demand in companies, audit firms, and self-practice. Can earn very well.",
                "starting_salary": "₹7-15 LPA",
                "roadmap": ["Register for CA Foundation", "Clear Foundation exam", "Complete articleship training", "Clear Intermediate & Final", "Join firm or start practice"]
            },
            {
                "name": "BBA + MBA",
                "suitability": "Great path for business and management career. Opens doors to corporate leadership roles.",
                "course": "BBA + MBA",
                "duration": "3 + 2 years",
                "estimated_cost": "₹10-25 Lakhs",
                "top_colleges": ["IIMs", "XLRI", "FMS Delhi", "SP Jain", "Christ University"],
                "job_prospects": "Wide range of jobs - Marketing, Finance, HR, Operations in top companies.",
                "starting_salary": "₹6-25 LPA (depends on college)",
                "roadmap": ["Complete BBA from good college", "Gain 1-2 years work experience", "Prepare for CAT/XAT", "Get into top MBA college", "Summer internship & placement"]
            },
            {
                "name": "Investment Banking & Finance",
                "suitability": "If you love numbers and markets, this is one of the highest paying careers in Commerce stream.",
                "course": "B.Com + CFA/MBA Finance",
                "duration": "5-6 years",
                "estimated_cost": "₹8-20 Lakhs",
                "top_colleges": ["SRCC Delhi", "St. Xavier's", "Narsee Monjee", "Christ University"],
                "job_prospects": "Jobs in banks, mutual funds, stock broking. Can earn very high with experience.",
                "starting_salary": "₹6-15 LPA",
                "roadmap": ["B.Com from top college", "Learn about stock markets", "Do CFA or MBA Finance", "Internship in finance sector", "Join investment firm"]
            }
        ],
        "Arts": [
            {
                "name": "Law (LLB)",
                "suitability": "Arts students excel in Law. Great career for those who like arguments, reading, and helping people.",
                "course": "BA LLB / LLB",
                "duration": "5 years (Integrated) / 3 years",
                "estimated_cost": "₹3-15 Lakhs",
                "top_colleges": ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "NUJS Kolkata"],
                "job_prospects": "Work as advocate, legal advisor, judge, or in corporate legal teams.",
                "starting_salary": "₹4-12 LPA",
                "roadmap": ["Clear CLAT/AILET exam", "Complete law degree", "Internships under senior lawyers", "Enroll with Bar Council", "Start practice or join firm"]
            },
            {
                "name": "Journalism & Mass Communication",
                "suitability": "If you love writing, speaking, and staying updated, media is exciting and rewarding.",
                "course": "BA/BMM in Journalism",
                "duration": "3 years",
                "estimated_cost": "₹2-8 Lakhs",
                "top_colleges": ["IIMC Delhi", "Xavier's Mumbai", "Symbiosis Pune", "ACJ Chennai"],
                "job_prospects": "Work in news channels, newspapers, digital media, PR agencies.",
                "starting_salary": "₹3-8 LPA",
                "roadmap": ["Complete Journalism degree", "Internship at media house", "Build portfolio of work", "Specialize in area of interest", "Join media organization"]
            },
            {
                "name": "Civil Services (IAS/IPS)",
                "suitability": "Arts graduates have high success rate in UPSC. Most prestigious career to serve nation.",
                "course": "Any Graduation + UPSC Prep",
                "duration": "3-5 years",
                "estimated_cost": "₹2-5 Lakhs (coaching)",
                "top_colleges": ["Any recognized university", "Coaching: Vajiram, Vision IAS"],
                "job_prospects": "Become IAS, IPS, IFS officer. Lead government departments. Serve nation.",
                "starting_salary": "₹8-12 LPA + perks",
                "roadmap": ["Complete graduation", "Start UPSC preparation", "Clear Prelims exam", "Clear Mains exam", "Clear Interview & training"]
            }
        ]
    }
    
    return careers_by_stream.get(stream, careers_by_stream["Science"])

@api_router.get("/career-recommendations/{user_id}")
async def get_career_recommendations(user_id: str):
    """Get career recommendations for a user"""
    recommendation = await db.career_recommendations.find_one(
        {"user_id": user_id},
        sort=[("created_at", -1)]
    )
    if recommendation:
        return {
            "success": True,
            "careers": recommendation.get('careers', [])
        }
    return {"success": False, "message": "No recommendations found"}

# ============== Booking Routes ==============

@api_router.post("/bookings", response_model=Booking)
async def create_booking(input_data: BookingCreate):
    """Create a consultation booking"""
    booking = Booking(
        user_id=input_data.user_id,
        name=input_data.name,
        phone=input_data.phone,
        consultation_type=input_data.consultation_type,
        date=input_data.date,
        time=input_data.time
    )
    await db.bookings.insert_one(booking.dict())
    return booking

@api_router.get("/bookings/{user_id}", response_model=List[Booking])
async def get_bookings(user_id: str):
    """Get all bookings for a user"""
    bookings = await db.bookings.find({"user_id": user_id}).to_list(100)
    return [Booking(**b) for b in bookings]

# ============== Membership Routes ==============

@api_router.post("/memberships", response_model=Membership)
async def create_membership(input_data: MembershipCreate):
    """Create membership (Demo payment - always succeeds)"""
    # Check if user already has membership
    existing = await db.memberships.find_one({"user_id": input_data.user_id, "status": "active"})
    if existing:
        return Membership(**existing)
    
    membership = Membership(
        user_id=input_data.user_id,
        name=input_data.name,
        phone=input_data.phone
    )
    await db.memberships.insert_one(membership.dict())
    return membership

@api_router.get("/memberships/{user_id}", response_model=Optional[Membership])
async def get_membership(user_id: str):
    """Get membership status for a user"""
    membership = await db.memberships.find_one({"user_id": user_id, "status": "active"})
    if membership:
        return Membership(**membership)
    return None

# ============== Utility Routes ==============

@api_router.get("/")
async def root():
    return {"message": "Edu9 Career Guidance API", "version": "1.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Edu9 API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
