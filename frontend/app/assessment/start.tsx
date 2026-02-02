import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';

export default function AssessmentStartScreen() {
  const router = useRouter();
  const { resetAssessment } = useAssessmentStore();

  const handleStart = () => {
    resetAssessment();
    router.push('/assessment/step1');
  };

  const steps = [
    { icon: 'person', text: 'Your Details' },
    { icon: 'school', text: 'Academic Info' },
    { icon: 'heart', text: 'Interests & Skills' },
    { icon: 'people', text: 'Parent Details' },
    { icon: 'trophy', text: 'Get Results' },
  ];

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="clipboard" size={60} color="#4F9DFF" />
          </View>

          <Text style={styles.title}>Career Assessment</Text>
          <Text style={styles.subtitle}>
            Answer a few simple questions to find your ideal career path
          </Text>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>What to expect:</Text>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Ionicons name={step.icon as any} size={20} color="#4F9DFF" />
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.timeEstimate}>
            <Ionicons name="time" size={20} color="#8BBAFF" />
            <Text style={styles.timeText}>Takes only 5 minutes</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Start Assessment</Text>
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
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8BBAFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  stepsContainer: {
    width: '100%',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(79, 157, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F9DFF',
  },
  stepText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  timeText: {
    fontSize: 14,
    color: '#8BBAFF',
  },
  startButton: {
    width: '100%',
    backgroundColor: '#4F9DFF',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
