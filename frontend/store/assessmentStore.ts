import { create } from 'zustand';

interface AssessmentData {
  studentName: string;
  stream: string;
  subjects: string[];
  marksPercentage: number;
  careerInterests: string[];
  strongSubjects: string[];
  careerGoal: string;
  parentName: string;
  parentPhone: string;
}

interface AssessmentState {
  data: AssessmentData;
  currentStep: number;
  updateField: (field: keyof AssessmentData, value: any) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetAssessment: () => void;
}

const initialData: AssessmentData = {
  studentName: '',
  stream: '',
  subjects: [],
  marksPercentage: 0,
  careerInterests: [],
  strongSubjects: [],
  careerGoal: '',
  parentName: '',
  parentPhone: '',
};

export const useAssessmentStore = create<AssessmentState>((set) => ({
  data: initialData,
  currentStep: 1,
  
  updateField: (field, value) => set((state) => ({
    data: { ...state.data, [field]: value }
  })),
  
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  
  resetAssessment: () => set({ data: initialData, currentStep: 1 }),
}));
