import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const aviationCareers = [
  { id: 'pilot', title: 'Commercial Pilot', icon: 'airplane', color: '#6366F1', bgColor: '#EEF2FF', eligibility: '10+2 with Physics & Maths, Min 50%', duration: '18-24 months', fees: '₹35-50 Lakhs', institutes: ['Indira Gandhi Rashtriya Uran Akademi', 'Bombay Flying Club', 'CAE Oxford'], salaryIndia: '₹12-25 LPA', salaryAbroad: '$60,000-150,000/year', growth: 'First Officer → Captain → Senior Captain → Chief Pilot' },
  { id: 'cabin', title: 'Cabin Crew', icon: 'people', color: '#EC4899', bgColor: '#FCE7F3', eligibility: '10+2 Pass, Height: M-170cm F-157cm', duration: '3-6 months', fees: '₹50,000 - ₹1.5 Lakhs', institutes: ['Frankfinn Institute', 'Air Hostess Academy', 'Aptech Aviation'], salaryIndia: '₹3-8 LPA', salaryAbroad: '$25,000-60,000/year', growth: 'Cabin Crew → Senior Cabin Crew → Purser → Cabin Manager' },
  { id: 'ame', title: 'Aircraft Maintenance Engineering', icon: 'construct', color: '#F59E0B', bgColor: '#FEF3C7', eligibility: '10+2 with PCM, Min 50%', duration: '3-4 years', fees: '₹8-15 Lakhs', institutes: ['Hindustan Institute', 'IIAE', 'Rajiv Gandhi Academy'], salaryIndia: '₹4-12 LPA', salaryAbroad: '$50,000-90,000/year', growth: 'Junior AME → Licensed AME → Senior AME → Chief Engineer' },
  { id: 'ground', title: 'Airport Ground Staff', icon: 'business', color: '#10B981', bgColor: '#D1FAE5', eligibility: '10+2 Pass, Good Communication', duration: '6-12 months', fees: '₹30,000 - ₹2 Lakhs', institutes: ['IATA Training', 'Frankfinn', 'NIAMAR'], salaryIndia: '₹2.5-6 LPA', salaryAbroad: '$30,000-50,000/year', growth: 'Ground Staff → Supervisor → Manager → Station Manager' },
  { id: 'hospitality', title: 'Aviation Hospitality', icon: 'restaurant', color: '#8B5CF6', bgColor: '#EDE9FE', eligibility: '10+2 Pass, Presentable Personality', duration: '6-12 months', fees: '₹50,000 - ₹2 Lakhs', institutes: ['IHM', 'NCHM', 'Oberoi STEP'], salaryIndia: '₹2.5-5 LPA', salaryAbroad: '$25,000-45,000/year', growth: 'Lounge Staff → Senior Executive → Supervisor → Manager' },
];

export default function AviationScreen() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>('pilot');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aviation Careers</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroBanner}>
            <View style={styles.heroIcon}>
              <Ionicons name="airplane" size={50} color="#6366F1" />
            </View>
            <Text style={styles.heroTitle}>Fly Your Dreams</Text>
            <Text style={styles.heroSubtitle}>Complete guidance for aviation careers</Text>
          </View>
        </View>

        <View style={styles.careersList}>
          {aviationCareers.map((career) => (
            <TouchableOpacity key={career.id} style={styles.careerCard} onPress={() => setExpandedCard(expandedCard === career.id ? null : career.id)} activeOpacity={0.9}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIconContainer, { backgroundColor: career.bgColor }]}>
                  <Ionicons name={career.icon as any} size={26} color={career.color} />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{career.title}</Text>
                  <Text style={styles.cardDuration}>{career.duration} Course</Text>
                </View>
                <Ionicons name={expandedCard === career.id ? 'chevron-up' : 'chevron-down'} size={24} color="#94A3B8" />
              </View>

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

              {expandedCard === career.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                      <Ionicons name="checkmark-shield" size={18} color="#0FB9B1" />
                      <Text style={styles.detailTitle}>Eligibility</Text>
                    </View>
                    <Text style={styles.detailText}>{career.eligibility}</Text>
                  </View>
                  <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                      <Ionicons name="school" size={18} color="#0FB9B1" />
                      <Text style={styles.detailTitle}>Training Institutes</Text>
                    </View>
                    {career.institutes.map((inst, i) => (
                      <View key={i} style={styles.instituteItem}>
                        <Ionicons name="checkmark" size={14} color="#10B981" />
                        <Text style={styles.instituteText}>{inst}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                      <Ionicons name="cash" size={18} color="#0FB9B1" />
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
                  <View style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                      <Ionicons name="trending-up" size={18} color="#0FB9B1" />
                      <Text style={styles.detailTitle}>Career Growth</Text>
                    </View>
                    <Text style={styles.growthText}>{career.growth}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/booking')}>
          <Text style={styles.ctaText}>Get Aviation Career Guidance</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  backButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#0B1C2D' },
  heroSection: { paddingHorizontal: 20, marginBottom: 24 },
  heroBanner: { backgroundColor: '#EEF2FF', borderRadius: 20, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: '#C7D2FE' },
  heroIcon: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#6366F1', marginBottom: 8 },
  heroSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  careersList: { paddingHorizontal: 20, gap: 16 },
  careerCard: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardIconContainer: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardTitleContainer: { flex: 1, marginLeft: 14 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#0B1C2D' },
  cardDuration: { fontSize: 12, color: '#0FB9B1', marginTop: 2 },
  quickInfo: { flexDirection: 'row', marginTop: 16, gap: 12 },
  quickInfoItem: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  quickLabel: { fontSize: 11, color: '#64748B', marginBottom: 4 },
  quickValue: { fontSize: 14, fontWeight: '600', color: '#0B1C2D' },
  expandedContent: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  detailSection: { marginBottom: 20 },
  detailHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  detailTitle: { fontSize: 14, fontWeight: '600', color: '#0FB9B1' },
  detailText: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  instituteItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  instituteText: { fontSize: 13, color: '#64748B' },
  salaryRow: { flexDirection: 'row', gap: 12 },
  salaryItem: { flex: 1, backgroundColor: '#D1FAE5', borderRadius: 12, padding: 12 },
  salaryLabel: { fontSize: 11, color: '#064E3B', marginBottom: 4 },
  salaryValue: { fontSize: 14, fontWeight: '600', color: '#10B981' },
  growthText: { fontSize: 13, color: '#64748B', lineHeight: 22 },
  ctaButton: { marginHorizontal: 20, marginTop: 24, backgroundColor: '#0FB9B1', borderRadius: 14, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  ctaText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});
