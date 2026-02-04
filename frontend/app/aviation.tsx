import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const aviationCareers = [
  {
    id: 'pilot',
    title: 'Commercial Pilot',
    icon: 'airplane',
    eligibility: '10+2 with Physics & Maths, Min 50%',
    duration: '18-24 months',
    fees: '₹35-50 Lakhs',
    institutes: ['Indira Gandhi Rashtriya Uran Akademi', 'Bombay Flying Club', 'CAE Oxford', 'Flight Simulation Technique Centre'],
    salaryIndia: '₹12-25 LPA (Starting)',
    salaryAbroad: '$60,000-150,000/year',
    growth: ['First Officer → Captain → Senior Captain → Training Captain → Chief Pilot'],
  },
  {
    id: 'cabin',
    title: 'Cabin Crew',
    icon: 'people',
    eligibility: '10+2 Pass, Height: M-170cm F-157cm, Age: 18-27',
    duration: '3-6 months',
    fees: '₹50,000 - ₹1.5 Lakhs',
    institutes: ['Frankfinn Institute', 'Air Hostess Academy', 'Aptech Aviation', 'IATA Training Centers'],
    salaryIndia: '₹3-8 LPA',
    salaryAbroad: '$25,000-60,000/year',
    growth: ['Cabin Crew → Senior Cabin Crew → Purser → Cabin Manager → In-flight Supervisor'],
  },
  {
    id: 'ame',
    title: 'Aircraft Maintenance Engineering',
    icon: 'construct',
    eligibility: '10+2 with Physics, Chemistry & Maths, Min 50%',
    duration: '3-4 years',
    fees: '₹8-15 Lakhs',
    institutes: ['Hindustan Institute of Engineering Technology', 'IIAE', 'Rajiv Gandhi Academy', 'School of Aviation'],
    salaryIndia: '₹4-12 LPA',
    salaryAbroad: '$50,000-90,000/year',
    growth: ['Junior AME → Licensed AME → Senior AME → Chief Engineer → Director of Maintenance'],
  },
  {
    id: 'ground',
    title: 'Airport Ground Staff & Management',
    icon: 'business',
    eligibility: '10+2 Pass or Graduate, Good Communication',
    duration: '6-12 months',
    fees: '₹30,000 - ₹2 Lakhs',
    institutes: ['IATA Training', 'Airport Authority Courses', 'Frankfinn', 'NIAMAR'],
    salaryIndia: '₹2.5-6 LPA',
    salaryAbroad: '$30,000-50,000/year',
    growth: ['Ground Staff → Senior Staff → Supervisor → Manager → Station Manager'],
  },
  {
    id: 'hospitality',
    title: 'Aviation Hospitality',
    icon: 'restaurant',
    eligibility: '10+2 Pass, Presentable Personality',
    duration: '6-12 months',
    fees: '₹50,000 - ₹2 Lakhs',
    institutes: ['Institute of Hotel Management', 'NCHM', 'Welcome Group', 'Oberoi STEP'],
    salaryIndia: '₹2.5-5 LPA',
    salaryAbroad: '$25,000-45,000/year',
    growth: ['Lounge Staff → Senior Executive → Supervisor → Manager → Director'],
  },
];

export default function AviationScreen() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>('pilot');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#D4AF37" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Aviation Careers</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <LinearGradient
                colors={['#16213E', '#0F3460', '#1A1A2E']}
                style={styles.heroBanner}
              >
                <View style={styles.heroIcon}>
                  <Ionicons name="airplane" size={50} color="#D4AF37" />
                </View>
                <Text style={styles.heroTitle}>Fly Your Dreams</Text>
                <Text style={styles.heroSubtitle}>
                  Complete guidance for aviation careers - from eligibility to placement
                </Text>
              </LinearGradient>
            </View>

            {/* Career Cards */}
            <View style={styles.careersList}>
              {aviationCareers.map((career) => (
                <TouchableOpacity
                  key={career.id}
                  style={styles.careerCard}
                  onPress={() => setExpandedCard(expandedCard === career.id ? null : career.id)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#1A1A2E', '#16213E']}
                    style={styles.careerGradient}
                  >
                    {/* Card Header */}
                    <View style={styles.cardHeader}>
                      <View style={styles.cardIconContainer}>
                        <Ionicons name={career.icon as any} size={28} color="#D4AF37" />
                      </View>
                      <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>{career.title}</Text>
                        <Text style={styles.cardDuration}>{career.duration} Course</Text>
                      </View>
                      <Ionicons 
                        name={expandedCard === career.id ? 'chevron-up' : 'chevron-down'} 
                        size={24} 
                        color="#D4AF37" 
                      />
                    </View>

                    {/* Quick Info */}
                    <View style={styles.quickInfo}>
                      <View style={styles.quickInfoItem}>
                        <Text style={styles.quickLabel}>Course Fees</Text>
                        <Text style={styles.quickValue}>{career.fees}</Text>
                      </View>
                      <View style={styles.quickInfoItem}>
                        <Text style={styles.quickLabel}>Salary (India)</Text>
                        <Text style={styles.quickValue}>{career.salaryIndia}</Text>
                      </View>
                    </View>

                    {/* Expanded Content */}
                    {expandedCard === career.id && (
                      <View style={styles.expandedContent}>
                        {/* Eligibility */}
                        <View style={styles.detailSection}>
                          <View style={styles.detailHeader}>
                            <Ionicons name="checkmark-shield" size={18} color="#D4AF37" />
                            <Text style={styles.detailTitle}>Eligibility</Text>
                          </View>
                          <Text style={styles.detailText}>{career.eligibility}</Text>
                        </View>

                        {/* Training Institutes */}
                        <View style={styles.detailSection}>
                          <View style={styles.detailHeader}>
                            <Ionicons name="school" size={18} color="#D4AF37" />
                            <Text style={styles.detailTitle}>Training Institutes</Text>
                          </View>
                          {career.institutes.map((inst, i) => (
                            <View key={i} style={styles.instituteItem}>
                              <Ionicons name="checkmark" size={14} color="#4ADE80" />
                              <Text style={styles.instituteText}>{inst}</Text>
                            </View>
                          ))}
                        </View>

                        {/* Salary Comparison */}
                        <View style={styles.detailSection}>
                          <View style={styles.detailHeader}>
                            <Ionicons name="cash" size={18} color="#D4AF37" />
                            <Text style={styles.detailTitle}>Salary Packages</Text>
                          </View>
                          <View style={styles.salaryRow}>
                            <View style={styles.salaryItem}>
                              <Text style={styles.salaryLabel}>India</Text>
                              <Text style={styles.salaryValue}>{career.salaryIndia}</Text>
                            </View>
                            <View style={styles.salaryItem}>
                              <Text style={styles.salaryLabel}>Abroad</Text>
                              <Text style={styles.salaryValue}>{career.salaryAbroad}</Text>
                            </View>
                          </View>
                        </View>

                        {/* Career Growth */}
                        <View style={styles.detailSection}>
                          <View style={styles.detailHeader}>
                            <Ionicons name="trending-up" size={18} color="#D4AF37" />
                            <Text style={styles.detailTitle}>Career Growth Path</Text>
                          </View>
                          <Text style={styles.growthText}>{career.growth[0]}</Text>
                        </View>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* CTA */}
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push('/booking')}
            >
              <LinearGradient
                colors={['#D4AF37', '#B8860B']}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Get Aviation Career Guidance</Text>
                <Ionicons name="arrow-forward" size={20} color="#0A0A0F" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  heroBanner: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  heroIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#A0A0B0',
    textAlign: 'center',
    lineHeight: 22,
  },
  careersList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  careerCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  careerGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardDuration: {
    fontSize: 12,
    color: '#D4AF37',
    marginTop: 2,
  },
  quickInfo: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  quickInfoItem: {
    flex: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderRadius: 12,
    padding: 12,
  },
  quickLabel: {
    fontSize: 11,
    color: '#8B8B9E',
    marginBottom: 4,
  },
  quickValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  expandedContent: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.1)',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  detailText: {
    fontSize: 13,
    color: '#A0A0B0',
    lineHeight: 20,
  },
  instituteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  instituteText: {
    fontSize: 13,
    color: '#A0A0B0',
  },
  salaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  salaryItem: {
    flex: 1,
    backgroundColor: 'rgba(74, 222, 128, 0.08)',
    borderRadius: 12,
    padding: 12,
  },
  salaryLabel: {
    fontSize: 11,
    color: '#8B8B9E',
    marginBottom: 4,
  },
  salaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ADE80',
  },
  growthText: {
    fontSize: 13,
    color: '#A0A0B0',
    lineHeight: 22,
  },
  ctaButton: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 14,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A0A0F',
  },
});
