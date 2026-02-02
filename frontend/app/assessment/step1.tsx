import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAssessmentStore } from '../../store/assessmentStore';

export default function Step1Screen() {
  const router = useRouter();
  const { data, updateField } = useAssessmentStore();
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.studentName.trim()) {
      setError('Please enter your name');
      return;
    }
    router.push('/assessment/step2');
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
              <View style={[styles.progressBar, { width: '20%' }]} />
            </View>
            <Text style={styles.stepText}>1/5</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.iconCircle}>
              <Ionicons name="person" size={50} color="#4F9DFF" />
            </View>

            <Text style={styles.question}>What's your name?</Text>
            <Text style={styles.hint}>Enter your full name as per documents</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#6B8CAE"
                value={data.studentName}
                onChangeText={(text) => {
                  updateField('studentName', text);
                  setError('');
                }}
                autoCapitalize="words"
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  inputContainer: {
    width: '100%',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
  },
  input: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
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
