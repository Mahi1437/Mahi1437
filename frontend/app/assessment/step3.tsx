import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';

export default function Step3Screen() {
  const router = useRouter();
  const { data, updateField } = useAssessmentStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.marksPercentage || data.marksPercentage < 1 || data.marksPercentage > 100) {
      setError('Please enter valid marks (1-100)');
      return;
    }
    router.push('/assessment/step4');
  };

  const getPerformanceLevel = () => {
    const marks = data.marksPercentage;
    if (marks >= 90) return { text: 'Excellent!', color: '#4ADE80' };
    if (marks >= 75) return { text: 'Very Good!', color: '#4F9DFF' };
    if (marks >= 60) return { text: 'Good', color: '#FFD700' };
    if (marks >= 40) return { text: 'Average', color: '#FF9500' };
    return { text: 'Need Guidance', color: '#FF6B6B' };
  };

  const performance = data.marksPercentage ? getPerformanceLevel() : null;

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: '60%' }]} />
            </View>
            <Text style={styles.stepText}>3/5</Text>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View style={styles.iconCircle}>
                <Ionicons name="stats-chart" size={50} color="#4F9DFF" />
              </View>

              <Text style={styles.question}>Your 12th Marks?</Text>
              <Text style={styles.hint}>Enter your overall percentage</Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="85"
                    placeholderTextColor="#6B8CAE"
                    value={data.marksPercentage ? data.marksPercentage.toString() : ''}
                    onChangeText={(text) => {
                      const num = parseFloat(text) || 0;
                      updateField('marksPercentage', num);
                      setError('');
                    }}
                    keyboardType="decimal-pad"
                    maxLength={5}
                  />
                  <Text style={styles.percentSymbol}>%</Text>
                </View>

                {performance && (
                  <View style={[styles.performanceBadge, { borderColor: performance.color }]}>
                    <Text style={[styles.performanceText, { color: performance.color }]}>
                      {performance.text}
                    </Text>
                  </View>
                )}
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Info Cards */}
              <View style={styles.infoCards}>
                <View style={styles.infoCard}>
                  <Ionicons name="information-circle" size={24} color="#4F9DFF" />
                  <Text style={styles.infoText}>
                    Your marks help us suggest careers that match your academic potential
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    marginBottom: 32,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 18,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    minWidth: 100,
  },
  percentSymbol: {
    fontSize: 28,
    color: '#8BBAFF',
    fontWeight: '600',
  },
  performanceBadge: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
  },
  performanceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 12,
  },
  infoCards: {
    width: '100%',
    marginTop: 32,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#8BBAFF',
    lineHeight: 20,
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
