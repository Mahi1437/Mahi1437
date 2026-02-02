import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const careerOptions = [
  {
    id: 'engineering',
    title: 'Engineering & Technology',
    icon: 'laptop',
    color: '#4F9DFF',
    description: 'B.Tech, B.E., Computer Science, IT, Electronics',
  },
  {
    id: 'medical',
    title: 'Medical & Paramedical',
    icon: 'medkit',
    color: '#FF6B6B',
    description: 'MBBS, BDS, Nursing, Pharmacy, Physiotherapy',
  },
  {
    id: 'aviation',
    title: 'Aviation',
    icon: 'airplane',
    color: '#4ADE80',
    description: 'Pilot Training, Cabin Crew, Airport Management',
  },
  {
    id: 'management',
    title: 'Management (BBA / MBA / Business)',
    icon: 'briefcase',
    color: '#FFD700',
    description: 'BBA, MBA, Business Administration, Marketing',
  },
  {
    id: 'masters',
    title: "Master's / Higher Studies",
    icon: 'school',
    color: '#A855F7',
    description: 'M.Tech, M.Sc, MA, Research, PhD Programs',
  },
  {
    id: 'abroad',
    title: 'Abroad Studies',
    icon: 'globe',
    color: '#F97316',
    description: 'Study in USA, UK, Canada, Australia, Germany',
  },
];

export default function CareerOptionsScreen() {
  const router = useRouter();

  const handleCareerSelect = (career: typeof careerOptions[0]) => {
    // Open student guide link for now
    Linking.openURL('https://studentguide.edu9.in/');
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Options</Text>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Intro Section */}
          <View style={styles.introSection}>
            <View style={styles.introIcon}>
              <Ionicons name="compass" size={50} color="#4F9DFF" />
            </View>
            <Text style={styles.introTitle}>Main Career Options</Text>
            <Text style={styles.introSubtitle}>
              Choose a career path to explore opportunities
            </Text>
          </View>

          {/* Career Options List */}
          <View style={styles.optionsList}>
            {careerOptions.map((career) => (
              <TouchableOpacity
                key={career.id}
                style={styles.optionCard}
                onPress={() => handleCareerSelect(career)}
              >
                <View style={[styles.optionIconCircle, { backgroundColor: `${career.color}20` }]}>
                  <Ionicons name={career.icon as any} size={32} color={career.color} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{career.title}</Text>
                  <Text style={styles.optionDescription}>{career.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#4F9DFF" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Ionicons name="help-circle" size={24} color="#8BBAFF" />
            <Text style={styles.helpText}>
              Not sure which career to choose? Book a free consultation with our experts.
            </Text>
            <TouchableOpacity 
              style={styles.consultButton}
              onPress={() => router.push('/booking')}
            >
              <Text style={styles.consultButtonText}>Book Consultation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  introSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  introIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  introSubtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 8,
  },
  optionsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.2)',
  },
  optionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#8BBAFF',
    lineHeight: 18,
  },
  helpSection: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  consultButton: {
    backgroundColor: '#4F9DFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  consultButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
