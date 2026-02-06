import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';

const careerInterests = [
  { id: 'engineering', label: 'Engineering / IT', icon: 'laptop' },
  { id: 'medical', label: 'Medical / Healthcare', icon: 'medkit' },
  { id: 'business', label: 'Business / Management', icon: 'briefcase' },
  { id: 'aviation', label: 'Aviation / Pilot', icon: 'airplane' },
  { id: 'abroad', label: 'Study Abroad', icon: 'globe' },
  { id: 'law', label: 'Law / Legal', icon: 'document-text' },
  { id: 'arts', label: 'Arts / Design', icon: 'color-palette' },
  { id: 'finance', label: 'Finance / Banking', icon: 'cash' },
  { id: 'teaching', label: 'Teaching / Education', icon: 'school' },
  { id: 'government', label: 'Government Jobs', icon: 'shield' },
];

const careerGoals = [
  { id: 'Job', icon: 'briefcase', desc: 'Start working after graduation' },
  { id: 'Higher Studies', icon: 'school', desc: 'Pursue masters/PhD' },
  { id: 'Study Abroad', icon: 'globe', desc: 'Study in foreign universities' },
];

export default function Step4Screen() {
  const router = useRouter();
  const { data, updateField } = useAssessmentStore();
  const [error, setError] = useState('');

  const toggleInterest = (id: string) => {
    const current = data.careerInterests;
    if (current.includes(id)) {
      updateField('careerInterests', current.filter(i => i !== id));
    } else if (current.length < 3) {
      updateField('careerInterests', [...current, id]);
    }
    setError('');
  };

  const toggleStrongSubject = (subject: string) => {
    const current = data.strongSubjects;
    if (current.includes(subject)) {
      updateField('strongSubjects', current.filter(s => s !== subject));
    } else if (current.length < 2) {
      updateField('strongSubjects', [...current, subject]);
    }
    setError('');
  };

  const handleNext = () => {
    if (data.careerInterests.length === 0) {
      setError('Please select at least 1 career interest');
      return;
    }
    if (data.strongSubjects.length === 0) {
      setError('Please select your strong subject');
      return;
    }
    if (!data.careerGoal) {
      setError('Please select your career goal');
      return;
    }
    router.push('/assessment/step5');
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: '80%' }]} />
          </View>
          <Text style={styles.stepText}>4/5</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Career Interests */}
            <Text style={styles.sectionTitle}>Your Career Interests</Text>
            <Text style={styles.hint}>Select up to 3 areas you’re interested in</Text>
            
            <View style={styles.interestsGrid}>
              {careerInterests.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestCard,
                    data.careerInterests.includes(interest.id) && styles.interestCardSelected,
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                >
                  <Ionicons 
                    name={interest.icon as any} 
                    size={28} 
                    color={data.careerInterests.includes(interest.id) ? '#FFF' : '#4F9DFF'} 
                  />
                  <Text style={[
                    styles.interestLabel,
                    data.careerInterests.includes(interest.id) && styles.interestLabelSelected,
                  ]}>
                    {interest.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Strong Subjects */}
            <Text style={styles.sectionTitle}>Your Strong Subjects</Text>
            <Text style={styles.hint}>Select 1-2 subjects you’re best at</Text>
            
            <View style={styles.subjectsGrid}>
              {data.subjects.map((subject) => (
                <TouchableOpacity
                  key={subject}
                  style={[
                    styles.subjectChip,
                    data.strongSubjects.includes(subject) && styles.subjectChipSelected,
                  ]}
                  onPress={() => toggleStrongSubject(subject)}
                >
                  <Text style={[
                    styles.subjectText,
                    data.strongSubjects.includes(subject) && styles.subjectTextSelected,
                  ]}>
                    {subject}
                  </Text>
                  {data.strongSubjects.includes(subject) && (
                    <Ionicons name="star" size={14} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Career Goal */}
            <Text style={styles.sectionTitle}>Your Career Goal</Text>
            <Text style={styles.hint}>What do you want after completing your course?</Text>
            
            <View style={styles.goalsContainer}>
              {careerGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    data.careerGoal === goal.id && styles.goalCardSelected,
                  ]}
                  onPress={() => {
                    updateField('careerGoal', goal.id);
                    setError('');
                  }}
                >
                  <Ionicons 
                    name={goal.icon as any} 
                    size={32} 
                    color={data.careerGoal === goal.id ? '#FFF' : '#4F9DFF'} 
                  />
                  <View style={styles.goalTextContainer}>
                    <Text style={[
                      styles.goalTitle,
                      data.careerGoal === goal.id && styles.goalTitleSelected,
                    ]}>
                      {goal.id}
                    </Text>
                    <Text style={[
                      styles.goalDesc,
                      data.careerGoal === goal.id && styles.goalDescSelected,
                    ]}>
                      {goal.desc}
                    </Text>
                  </View>
                  {data.careerGoal === goal.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(79, 157, 255, 0.2)',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F9DFF',
    borderRadius: 2,
  },
  stepText: {
    color: '#8BBAFF',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    marginTop: 16,
  },
  hint: {
    fontSize: 14,
    color: '#8BBAFF',
    marginBottom: 16,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
    gap: 10,
  },
  interestCardSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  interestLabel: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
  },
  interestLabelSelected: {
    fontWeight: '600',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
    gap: 6,
  },
  subjectChipSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  subjectText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  subjectTextSelected: {
    fontWeight: '600',
  },
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
    gap: 16,
  },
  goalCardSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  goalTitleSelected: {
    color: '#FFFFFF',
  },
  goalDesc: {
    fontSize: 12,
    color: '#8BBAFF',
    marginTop: 2,
  },
  goalDescSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  nextButton: {
    backgroundColor: '#4F9DFF',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
