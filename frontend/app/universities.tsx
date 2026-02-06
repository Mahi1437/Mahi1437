import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const regions = [
  { id: 'andhra', name: 'Andhra / Telangana', hasVisa: false },
  { id: 'chennai', name: 'Chennai', hasVisa: false },
  { id: 'bangalore', name: 'Bangalore', hasVisa: false },
  { id: 'delhi', name: 'Delhi', hasVisa: false },
  { id: 'dubai', name: 'Dubai', hasVisa: true },
  { id: 'malaysia', name: 'Malaysia', hasVisa: true },
];

const universitiesByRegion: Record<string, string[]> = {
  andhra: [
    'CBIT',
    'Sreenidhi Institute',
    'Guru Nanak Institutions',
    'Gokaraju Rangaraju Institute',
    'G Narayanamma Institute',
    'Malla Reddy Engineering College',
    'VNR VJIET',
    'CMR Engineering College',
    'MNR Engineering College',
    'Mahindra University',
  ],
  chennai: [
    'Sai University',
    'Saveetha Engineering College',
    'SRM Institute of Science & Technology',
    'Dhanalakshmi College of Engineering',
    'Amrita Vishwa Vidyapeetham',
    'Sathyabama Institute',
    'Chennai Institute of Technology',
    'Vel Tech University',
    'Rajalakshmi Engineering College',
    'Jeppiaar Engineering College',
  ],
  bangalore: [
    'RVCE',
    'MSRIT',
    'BMSCE',
    'BMSIT',
    'PES University',
    'RV University',
    'Jain University',
    'MS Ramaiah University',
    'Alliance University',
    'Dayananda Sagar College',
    'Dayananda Sagar University',
    'NPS Sapthagiri',
    'CMR Institute of Technology',
    'New Horizon College of Engineering',
    'Amity University Bangalore',
  ],
  delhi: [
    'Bennett University',
    'GD Goenka University',
    'Shiv Nadar University',
    'Geeta University',
    'SRM University Delhi NCR',
    'Sharda University',
    'Manav Rachna University',
    'Noida International University',
    'SGT University',
    'Amity University Noida',
  ],
  dubai: [
    'BITS Pilani Dubai Campus',
    'MANIPAL UNIVERSITY DUBAI',
    'SYMBIOSIS UNIVERSITY DUBAI',
    'AMITY UNIVERSITY DUBAI',
  ],
  malaysia: [
    'University of Malaya',
    'Monash University Malaysia',
    'Taylor\'s University',
    'UCSI University',
    'Sunway University',
  ],
};

export default function UniversitiesScreen() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('bangalore');
  const currentRegion = regions.find(r => r.id === selectedRegion);
  const currentUniversities = universitiesByRegion[selectedRegion] || [];

  const handleBookConsultation = () => {
    Linking.openURL('https://bookings.edu9.in/#/2026');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Universities</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Education Partners</Text>
          <Text style={styles.introSubtitle}>Explore top universities across India & abroad</Text>
        </View>

        {/* Region Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {regions.map((region) => (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.regionTab,
                selectedRegion === region.id && styles.regionTabActive,
              ]}
              onPress={() => setSelectedRegion(region.id)}
            >
              <Text style={[
                styles.regionTabText,
                selectedRegion === region.id && styles.regionTabTextActive,
              ]}>
                {region.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Service Badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.badgeText}>Admission Support</Text>
          </View>
          {currentRegion?.hasVisa && (
            <View style={[styles.badge, styles.visaBadge]}>
              <Ionicons name="document-text" size={16} color="#6366F1" />
              <Text style={[styles.badgeText, styles.visaBadgeText]}>Visa Guidance</Text>
            </View>
          )}
        </View>

        {/* Universities List */}
        <View style={styles.universitiesList}>
          {currentUniversities.map((university, index) => (
            <View key={index} style={styles.universityCard}>
              <View style={styles.rankingBadge}>
                <Text style={styles.rankingText}>#{index + 1}</Text>
              </View>
              <View style={styles.universityIcon}>
                <Ionicons name="school" size={24} color="#0FB9B1" />
              </View>
              <View style={styles.universityInfo}>
                <Text style={styles.universityName}>{university}</Text>
                <View style={styles.coursesTags}>
                  <View style={styles.courseTag}>
                    <Text style={styles.courseTagText}>Engineering</Text>
                  </View>
                  <View style={styles.courseTag}>
                    <Text style={styles.courseTagText}>B.Tech</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.arrowButton}>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* University Count */}
        <View style={styles.countSection}>
          <Text style={styles.countText}>
            {currentUniversities.length} Universities in {currentRegion?.name}
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaIcon}>
              <Ionicons name="calendar" size={28} color="#0FB9B1" />
            </View>
            <Text style={styles.ctaTitle}>Need Help Choosing?</Text>
            <Text style={styles.ctaSubtitle}>
              Get personalized guidance from our expert counselors
            </Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleBookConsultation}>
              <Text style={styles.ctaButtonText}>Book Free Consultation</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
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
  intro: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 6,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  regionTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regionTabActive: {
    backgroundColor: '#0FB9B1',
    borderColor: '#0FB9B1',
  },
  regionTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  regionTabTextActive: {
    color: '#FFFFFF',
  },
  badgesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  visaBadge: {
    backgroundColor: '#EEF2FF',
  },
  visaBadgeText: {
    color: '#4338CA',
  },
  universitiesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  universityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rankingBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#0FB9B1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  universityIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C2D',
    marginBottom: 6,
  },
  coursesTags: {
    flexDirection: 'row',
    gap: 6,
  },
  courseTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseTagText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaCard: {
    backgroundColor: '#F0FDFC',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  ctaIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0FB9B1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
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
