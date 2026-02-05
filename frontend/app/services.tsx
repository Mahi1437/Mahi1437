import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const admissionServices = [
  'Engineering, Medical & all streams',
  'Application to admission completion',
  'Counseling, web options, seat allotment',
  'Notifications & updates',
];

const locationTeams = [
  {
    city: 'Bangalore',
    description: 'Engineering, Medical & all stream admissions',
    icon: 'business',
    color: '#6366F1',
    bgColor: '#EEF2FF',
  },
  {
    city: 'Chennai',
    description: 'Engineering, Medical & all stream admissions support',
    icon: 'school',
    color: '#0FB9B1',
    bgColor: '#E0F7F6',
  },
  {
    city: 'Hyderabad',
    description: 'Dedicated support for AP & Telangana students',
    icon: 'people',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    city: 'Delhi',
    description: 'Engineering, Medical & Aviation admissions',
    icon: 'airplane',
    color: '#EC4899',
    bgColor: '#FCE7F3',
  },
];

const studyAbroadServices = [
  'Admissions for Dubai, Malaysia & other countries',
  'University selection & application support',
  'Visa documentation assistance',
];

const trainingPrograms = [
  { name: 'Python Full Stack Development', icon: 'code-slash', color: '#3B82F6' },
  { name: 'Data Analytics', icon: 'analytics', color: '#10B981' },
  { name: 'Digital Marketing', icon: 'megaphone', color: '#F59E0B' },
  { name: 'AI Bootcamp Programs', icon: 'hardware-chip', color: '#8B5CF6' },
];

export default function ServicesScreen() {
  const router = useRouter();

  const handleBookSlot = () => {
    Linking.openURL('https://bookings.edu9.in/#/2026');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Services</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#0FB9B1" />
            <Text style={styles.heroBadgeText}>Edu9 Career Guidance</Text>
          </View>
          <Text style={styles.heroTitle}>Complete Student Support Platform</Text>
          <Text style={styles.heroSubtitle}>
            From admissions to placements - your trusted partner for academic and career success
          </Text>
        </View>

        {/* Admissions Support Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="document-text" size={24} color="#6366F1" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Admissions Support</Text>
              <Text style={styles.sectionSubtitle}>End-to-End Guidance</Text>
            </View>
          </View>
          <View style={styles.serviceCard}>
            <Text style={styles.cardDescription}>
              Complete admission assistance from application to enrollment
            </Text>
            <View style={styles.bulletList}>
              {admissionServices.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={handleBookSlot}>
              <Text style={styles.bookButtonText}>Book a Slot</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location-Based Teams Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#E0F7F6' }]}>
              <Ionicons name="location" size={24} color="#0FB9B1" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Expert Admission Teams</Text>
              <Text style={styles.sectionSubtitle}>Location-Based Support</Text>
            </View>
          </View>
          <View style={styles.locationGrid}>
            {locationTeams.map((team, index) => (
              <View key={index} style={styles.locationCard}>
                <View style={[styles.locationIcon, { backgroundColor: team.bgColor }]}>
                  <Ionicons name={team.icon as any} size={22} color={team.color} />
                </View>
                <Text style={styles.locationCity}>{team.city}</Text>
                <Text style={styles.locationDesc}>{team.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookSlot}>
            <Text style={styles.bookButtonText}>Book a Slot</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Study Abroad Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="globe" size={24} color="#F59E0B" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Study Abroad Support</Text>
              <Text style={styles.sectionSubtitle}>International Admissions</Text>
            </View>
          </View>
          <View style={styles.serviceCard}>
            <View style={styles.abroadBanner}>
              <View style={styles.flagsRow}>
                <Text style={styles.flagText}>Dubai</Text>
                <View style={styles.flagDot} />
                <Text style={styles.flagText}>Malaysia</Text>
                <View style={styles.flagDot} />
                <Text style={styles.flagText}>Europe</Text>
                <View style={styles.flagDot} />
                <Text style={styles.flagText}>USA</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {studyAbroadServices.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={handleBookSlot}>
              <Text style={styles.bookButtonText}>Book a Slot</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Software Training Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#FCE7F3' }]}>
              <Ionicons name="laptop" size={24} color="#EC4899" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Software Training</Text>
              <Text style={styles.sectionSubtitle}>Skill Development Programs</Text>
            </View>
          </View>
          <View style={styles.serviceCard}>
            <Text style={styles.cardDescription}>
              Job-oriented, student-friendly training programs
            </Text>
            <View style={styles.trainingGrid}>
              {trainingPrograms.map((program, index) => (
                <View key={index} style={styles.trainingItem}>
                  <Ionicons name={program.icon as any} size={20} color={program.color} />
                  <Text style={styles.trainingName}>{program.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.trainingHighlight}>
              <Ionicons name="ribbon" size={18} color="#8B5CF6" />
              <Text style={styles.trainingHighlightText}>AI Bootcamp Programs Available</Text>
            </View>
            <TouchableOpacity style={[styles.bookButton, { backgroundColor: '#8B5CF6' }]} onPress={handleBookSlot}>
              <Text style={styles.bookButtonText}>Enroll Now</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
            <Text style={styles.ctaSubtitle}>
              Get personalized guidance from our expert counselors
            </Text>
            <View style={styles.ctaButtons}>
              <TouchableOpacity style={styles.ctaPrimaryButton} onPress={handleBookSlot}>
                <Text style={styles.ctaPrimaryText}>Book Counseling</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ctaSecondaryButton} onPress={handleBookSlot}>
                <Text style={styles.ctaSecondaryText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.trustSection}>
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>10K+</Text>
            <Text style={styles.trustLabel}>Students Guided</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>500+</Text>
            <Text style={styles.trustLabel}>College Partners</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <Text style={styles.trustNumber}>7</Text>
            <Text style={styles.trustLabel}>Offices</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Edu9 Career Guidance</Text>
          <Text style={styles.footerSubtext}>Your Partner in Success</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0B1C2D',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    alignItems: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7F6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#0FB9B1',
    fontSize: 13,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1C2D',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B1C2D',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  serviceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 22,
  },
  bulletList: {
    gap: 12,
    marginBottom: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#0B1C2D',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#0FB9B1',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  locationCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationCity: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1C2D',
    marginBottom: 4,
  },
  locationDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  abroadBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  flagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  flagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  flagDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D97706',
  },
  trainingGrid: {
    gap: 12,
    marginBottom: 16,
  },
  trainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  trainingName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0B1C2D',
  },
  trainingHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginBottom: 16,
  },
  trainingHighlightText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B21B6',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  ctaCard: {
    backgroundColor: '#F0FDFC',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B1C2D',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  ctaPrimaryButton: {
    flex: 1,
    backgroundColor: '#0FB9B1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  ctaSecondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0FB9B1',
  },
  ctaSecondaryText: {
    color: '#0FB9B1',
    fontSize: 14,
    fontWeight: '600',
  },
  trustSection: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  trustItem: {
    flex: 1,
    alignItems: 'center',
  },
  trustNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0FB9B1',
  },
  trustLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  trustDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#0FB9B1',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
});
