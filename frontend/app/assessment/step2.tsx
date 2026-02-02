import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';

const streams = [
  { id: 'Science', icon: 'flask', color: '#4F9DFF' },
  { id: 'Commerce', icon: 'calculator', color: '#4ADE80' },
  { id: 'Arts', icon: 'color-palette', color: '#FF6B6B' },
];

const subjectsByStream: Record<string, string[]> = {
  Science: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'],
  Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English', 'Computer Science'],
  Arts: ['History', 'Geography', 'Political Science', 'Economics', 'Sociology', 'Psychology', 'English'],
};

export default function Step2Screen() {
  const router = useRouter();
  const { data, updateField } = useAssessmentStore();
  const [error, setError] = useState('');

  const handleStreamSelect = (stream: string) => {
    updateField('stream', stream);
    updateField('subjects', []);
    setError('');
  };

  const handleSubjectToggle = (subject: string) => {
    const current = data.subjects;
    if (current.includes(subject)) {
      updateField('subjects', current.filter(s => s !== subject));
    } else {
      updateField('subjects', [...current, subject]);
    }
    setError('');
  };

  const handleNext = () => {
    if (!data.stream) {
      setError('Please select your stream');
      return;
    }
    if (data.subjects.length < 2) {
      setError('Please select at least 2 subjects');
      return;
    }
    router.push('/assessment/step3');
  };

  const availableSubjects = data.stream ? subjectsByStream[data.stream] : [];

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: '40%' }]} />
          </View>
          <Text style={styles.stepText}>2/5</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.iconCircle}>
              <Ionicons name="school" size={50} color="#4F9DFF" />
            </View>

            <Text style={styles.question}>Select your 12th Stream</Text>
            <Text style={styles.hint}>Choose the stream you studied in Class 12</Text>

            {/* Stream Selection */}
            <View style={styles.streamContainer}>
              {streams.map((stream) => (
                <TouchableOpacity
                  key={stream.id}
                  style={[
                    styles.streamCard,
                    data.stream === stream.id && styles.streamCardSelected,
                    { borderColor: stream.color }
                  ]}
                  onPress={() => handleStreamSelect(stream.id)}
                >
                  <Ionicons name={stream.icon as any} size={32} color={stream.color} />
                  <Text style={styles.streamText}>{stream.id}</Text>
                  {data.stream === stream.id && (
                    <View style={[styles.checkBadge, { backgroundColor: stream.color }]}>
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Subjects Selection */}
            {data.stream && (
              <>
                <Text style={styles.subTitle}>Select your subjects</Text>
                <View style={styles.subjectsGrid}>
                  {availableSubjects.map((subject) => (
                    <TouchableOpacity
                      key={subject}
                      style={[
                        styles.subjectChip,
                        data.subjects.includes(subject) && styles.subjectChipSelected,
                      ]}
                      onPress={() => handleSubjectToggle(subject)}
                    >
                      <Text style={[
                        styles.subjectText,
                        data.subjects.includes(subject) && styles.subjectTextSelected,
                      ]}>
                        {subject}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

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
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  streamContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  streamCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  streamCardSelected: {
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
  },
  streamText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  subjectChip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
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
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 12,
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
