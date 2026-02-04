import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const countries = [
  { id: 'india', name: 'India', flag: '🇮🇳', universities: 45 },
  { id: 'usa', name: 'USA', flag: '🇺🇸', universities: 120 },
  { id: 'uk', name: 'UK', flag: '🇬🇧', universities: 85 },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', universities: 65 },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', universities: 42 },
  { id: 'europe', name: 'Europe', flag: '🇪🇺', universities: 95 },
  { id: 'dubai', name: 'Dubai', flag: '🇦🇪', universities: 28 },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', universities: 35 },
];

const universitiesByCountry: Record<string, any[]> = {
  india: [
    { name: 'IIT Delhi', courses: ['B.Tech', 'M.Tech', 'PhD'], ranking: '#1 in India' },
    { name: 'IIM Ahmedabad', courses: ['MBA', 'PGDM', 'Executive MBA'], ranking: '#1 MBA' },
    { name: 'AIIMS Delhi', courses: ['MBBS', 'MD', 'MS'], ranking: '#1 Medical' },
    { name: 'NIT Trichy', courses: ['B.Tech', 'M.Tech'], ranking: 'Top NIT' },
  ],
  usa: [
    { name: 'MIT', courses: ['Engineering', 'Computer Science', 'MBA'], ranking: '#1 World' },
    { name: 'Stanford University', courses: ['Business', 'Engineering', 'Medicine'], ranking: '#2 World' },
    { name: 'Harvard University', courses: ['Law', 'Business', 'Medicine'], ranking: '#3 World' },
    { name: 'UCLA', courses: ['Arts', 'Engineering', 'Medicine'], ranking: 'Top 20' },
  ],
  uk: [
    { name: 'Oxford University', courses: ['Arts', 'Science', 'Law'], ranking: '#1 UK' },
    { name: 'Cambridge University', courses: ['Engineering', 'Medicine', 'Business'], ranking: '#2 UK' },
    { name: 'Imperial College London', courses: ['Engineering', 'Science', 'Medicine'], ranking: '#3 UK' },
    { name: 'LSE', courses: ['Economics', 'Business', 'Law'], ranking: 'Top 10' },
  ],
  canada: [
    { name: 'University of Toronto', courses: ['Arts', 'Science', 'Business'], ranking: '#1 Canada' },
    { name: 'McGill University', courses: ['Medicine', 'Law', 'Engineering'], ranking: '#2 Canada' },
    { name: 'UBC', courses: ['Science', 'Business', 'Arts'], ranking: '#3 Canada' },
    { name: 'University of Waterloo', courses: ['Engineering', 'Computer Science'], ranking: 'Top CS' },
  ],
  australia: [
    { name: 'University of Melbourne', courses: ['Arts', 'Business', 'Law'], ranking: '#1 Australia' },
    { name: 'University of Sydney', courses: ['Medicine', 'Engineering', 'Arts'], ranking: '#2 Australia' },
    { name: 'UNSW', courses: ['Engineering', 'Business', 'Science'], ranking: '#3 Australia' },
    { name: 'ANU', courses: ['Science', 'Law', 'Arts'], ranking: 'Top Research' },
  ],
  europe: [
    { name: 'ETH Zurich', courses: ['Engineering', 'Science'], ranking: '#1 Europe' },
    { name: 'TU Munich', courses: ['Engineering', 'Computer Science'], ranking: '#1 Germany' },
    { name: 'Sorbonne University', courses: ['Arts', 'Science', 'Medicine'], ranking: '#1 France' },
    { name: 'KU Leuven', courses: ['Engineering', 'Business', 'Science'], ranking: '#1 Belgium' },
  ],
  dubai: [
    { name: 'NYU Abu Dhabi', courses: ['Liberal Arts', 'Engineering', 'Science'], ranking: 'Top UAE' },
    { name: 'American University Dubai', courses: ['Business', 'Engineering'], ranking: 'Top Private' },
    { name: 'Heriot-Watt Dubai', courses: ['Engineering', 'Business'], ranking: 'UK Branch' },
    { name: 'Middlesex University Dubai', courses: ['Business', 'IT', 'Media'], ranking: 'UK Branch' },
  ],
  malaysia: [
    { name: 'University of Malaya', courses: ['Engineering', 'Medicine', 'Arts'], ranking: '#1 Malaysia' },
    { name: 'Monash Malaysia', courses: ['Business', 'Engineering', 'IT'], ranking: 'Australia Branch' },
    { name: 'Taylor\'s University', courses: ['Hospitality', 'Business', 'Design'], ranking: 'Top Private' },
    { name: 'HELP University', courses: ['Psychology', 'Business', 'Law'], ranking: 'Top Private' },
  ],
};

export default function UniversitiesScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('usa');

  const currentUniversities = universitiesByCountry[selectedCountry] || [];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#D4AF37" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Top Universities</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Intro */}
            <View style={styles.intro}>
              <Text style={styles.introTitle}>Global Education Partners</Text>
              <Text style={styles.introSubtitle}>
                Explore top universities across 8 countries with complete guidance on courses, eligibility, and admissions
              </Text>
            </View>

            {/* Country Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countryTabs}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.id}
                  style={[
                    styles.countryTab,
                    selectedCountry === country.id && styles.countryTabActive,
                  ]}
                  onPress={() => setSelectedCountry(country.id)}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={[
                    styles.countryName,
                    selectedCountry === country.id && styles.countryNameActive,
                  ]}>{country.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* University Count */}
            <View style={styles.countBadge}>
              <Ionicons name="school" size={18} color="#D4AF37" />
              <Text style={styles.countText}>
                {countries.find(c => c.id === selectedCountry)?.universities} Partner Universities
              </Text>
            </View>

            {/* Universities List */}
            <View style={styles.universitiesList}>
              {currentUniversities.map((uni, index) => (
                <TouchableOpacity key={index} style={styles.universityCard} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#1A1A2E', '#16213E']}
                    style={styles.universityGradient}
                  >
                    <View style={styles.universityHeader}>
                      <View style={styles.universityIcon}>
                        <Ionicons name="business" size={24} color="#D4AF37" />
                      </View>
                      <View style={styles.universityInfo}>
                        <Text style={styles.universityName}>{uni.name}</Text>
                        <Text style={styles.universityRanking}>{uni.ranking}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.coursesContainer}>
                      <Text style={styles.coursesLabel}>Popular Courses</Text>
                      <View style={styles.courseTags}>
                        {uni.courses.map((course: string, i: number) => (
                          <View key={i} style={styles.courseTag}>
                            <Text style={styles.courseTagText}>{course}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.universityFooter}>
                      <View style={styles.footerItem}>
                        <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
                        <Text style={styles.footerText}>Admission Support</Text>
                      </View>
                      <View style={styles.footerItem}>
                        <Ionicons name="document-text" size={16} color="#4ADE80" />
                        <Text style={styles.footerText}>Visa Guidance</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <LinearGradient
                colors={['#1A1A2E', '#16213E']}
                style={styles.infoGradient}
              >
                <Text style={styles.infoTitle}>What We Provide</Text>
                <View style={styles.infoItem}>
                  <Ionicons name="school" size={20} color="#D4AF37" />
                  <Text style={styles.infoText}>Complete course information</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="document-text" size={20} color="#D4AF37" />
                  <Text style={styles.infoText}>Eligibility requirements</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="clipboard" size={20} color="#D4AF37" />
                  <Text style={styles.infoText}>Admission process guidance</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="briefcase" size={20} color="#D4AF37" />
                  <Text style={styles.infoText}>Career opportunities after graduation</Text>
                </View>
              </LinearGradient>
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
                <Text style={styles.ctaText}>Book University Counseling</Text>
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
  intro: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#8B8B9E',
    lineHeight: 22,
  },
  countryTabs: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  countryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    gap: 8,
  },
  countryTabActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: '#D4AF37',
  },
  countryFlag: {
    fontSize: 20,
  },
  countryName: {
    fontSize: 14,
    color: '#8B8B9E',
    fontWeight: '500',
  },
  countryNameActive: {
    color: '#D4AF37',
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  countText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  universitiesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  universityCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  universityGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 16,
  },
  universityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  universityIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  universityInfo: {
    marginLeft: 14,
    flex: 1,
  },
  universityName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  universityRanking: {
    fontSize: 12,
    color: '#D4AF37',
    marginTop: 2,
  },
  coursesContainer: {
    marginBottom: 16,
  },
  coursesLabel: {
    fontSize: 12,
    color: '#8B8B9E',
    marginBottom: 8,
  },
  courseTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseTag: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  courseTagText: {
    fontSize: 12,
    color: '#D4AF37',
  },
  universityFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#8B8B9E',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  infoGradient: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#A0A0B0',
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
