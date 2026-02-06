import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';
import { useAuthStore } from '../../store/authStore';
import { createAssessment, generateCareerRecommendations } from '../../utils/api';

export default function Step5Screen() {
  const router = useRouter();
  const { data, updateField, resetAssessment } = useAssessmentStore();
  const { userId } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!data.parentName.trim()) {
      setError('Please enter parent name');
      return;
    }
    if (data.parentPhone.length !== 10) {
      setError('Please enter valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create assessment
      const assessmentResponse = await createAssessment({
        user_id: userId,
        student_name: data.studentName,
        stream: data.stream,
        subjects: data.subjects,
        marks_percentage: data.marksPercentage,
        career_interests: data.careerInterests,
        strong_subjects: data.strongSubjects,
        career_goal: data.careerGoal,
        parent_name: data.parentName,
        parent_phone: data.parentPhone,
      });

      // Generate career recommendations
      const recommendationsResponse = await generateCareerRecommendations(
        assessmentResponse.data.id,
        userId || ''
      );

      // Navigate to results
      router.replace({
        pathname: '/results',
        params: { 
          careers: JSON.stringify(recommendationsResponse.data.careers),
          studentName: data.studentName,
        }
      });
    } catch (err) {
      console.error('Submit error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              <View style={[styles.progressBar, { width: '100%' }]} />
            </View>
            <Text style={styles.stepText}>5/5</Text>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View style={styles.iconCircle}>
                <Ionicons name="people" size={50} color="#4F9DFF" />
              </View>

              <Text style={styles.title}>Parent Details</Text>
              <Text style={styles.subtitle}>
                We’ll send a summary of career recommendations to your parent
              </Text>

              {/* Parent Name Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Parent's Name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person" size={22} color="#4F9DFF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Father/Mother’s Name"
                    placeholderTextColor="#6B8CAE"
                    value={data.parentName}
                    onChangeText={(text) => {
                      updateField('parentName', text);
                      setError('');
                    }}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Parent Phone Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Parent’s Mobile</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="call" size={22} color="#4F9DFF" style={styles.inputIcon} />
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    style={[styles.input, { paddingLeft: 80 }]}
                    placeholder="Mobile Number"
                    placeholderTextColor="#6B8CAE"
                    value={data.parentPhone}
                    onChangeText={(text) => {
                      updateField('parentPhone', text.replace(/[^0-9]/g, '').slice(0, 10));
                      setError('');
                    }}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Summary Card */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Assessment Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Student:</Text>
                  <Text style={styles.summaryValue}>{data.studentName}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Stream:</Text>
                  <Text style={styles.summaryValue}>{data.stream}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Marks:</Text>
                  <Text style={styles.summaryValue}>{data.marksPercentage}%</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Goal:</Text>
                  <Text style={styles.summaryValue}>{data.careerGoal}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.buttonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#FFF" />
                  <Text style={styles.submitButtonText}>Generating Results...</Text>
                </>
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Get Career Recommendations</Text>
                  <Ionicons name="sparkles" size={20} color="#FFF" />
                </>
              )}
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
    backgroundColor: '#4ADE80',
    borderRadius: 2,
  },
  stepText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '600',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inputSection: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#8BBAFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  countryCode: {
    position: 'absolute',
    left: 50,
    color: '#FFFFFF',
    fontSize: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 50,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 8,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 157, 255, 0.1)',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#8BBAFF',
  },
  summaryValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  submitButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
