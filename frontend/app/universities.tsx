import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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
  india: [{ name: 'IIT Delhi', courses: ['B.Tech', 'M.Tech', 'PhD'], ranking: '#1 in India' }, { name: 'IIM Ahmedabad', courses: ['MBA', 'PGDM'], ranking: '#1 MBA' }, { name: 'AIIMS Delhi', courses: ['MBBS', 'MD'], ranking: '#1 Medical' }],
  usa: [{ name: 'MIT', courses: ['Engineering', 'CS', 'MBA'], ranking: '#1 World' }, { name: 'Stanford University', courses: ['Business', 'Engineering'], ranking: '#2 World' }, { name: 'Harvard University', courses: ['Law', 'Business', 'Medicine'], ranking: '#3 World' }],
  uk: [{ name: 'Oxford University', courses: ['Arts', 'Science', 'Law'], ranking: '#1 UK' }, { name: 'Cambridge University', courses: ['Engineering', 'Medicine'], ranking: '#2 UK' }, { name: 'Imperial College', courses: ['Engineering', 'Science'], ranking: '#3 UK' }],
  canada: [{ name: 'University of Toronto', courses: ['Arts', 'Science', 'Business'], ranking: '#1 Canada' }, { name: 'McGill University', courses: ['Medicine', 'Law'], ranking: '#2 Canada' }],
  australia: [{ name: 'University of Melbourne', courses: ['Arts', 'Business', 'Law'], ranking: '#1 Australia' }, { name: 'University of Sydney', courses: ['Medicine', 'Engineering'], ranking: '#2 Australia' }],
  europe: [{ name: 'ETH Zurich', courses: ['Engineering', 'Science'], ranking: '#1 Europe' }, { name: 'TU Munich', courses: ['Engineering', 'CS'], ranking: '#1 Germany' }],
  dubai: [{ name: 'NYU Abu Dhabi', courses: ['Liberal Arts', 'Engineering'], ranking: 'Top UAE' }, { name: 'American University Dubai', courses: ['Business', 'Engineering'], ranking: 'Top Private' }],
  malaysia: [{ name: 'University of Malaya', courses: ['Engineering', 'Medicine'], ranking: '#1 Malaysia' }, { name: 'Monash Malaysia', courses: ['Business', 'Engineering'], ranking: 'Australia Branch' }],
};

export default function UniversitiesScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const currentUniversities = universitiesByCountry[selectedCountry] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Universities</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Global Education Partners</Text>
          <Text style={styles.introSubtitle}>Explore top universities across 8 countries</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countryTabs}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.id}
              style={[styles.countryTab, selectedCountry === country.id && styles.countryTabActive]}
              onPress={() => setSelectedCountry(country.id)}
            >
              <Text style={styles.countryFlag}>{country.flag}</Text>
              <Text style={[styles.countryName, selectedCountry === country.id && styles.countryNameActive]}>{country.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.countBadge}>
          <Ionicons name="school" size={18} color="#0FB9B1" />
          <Text style={styles.countText}>{countries.find(c => c.id === selectedCountry)?.universities} Partner Universities</Text>
        </View>

        <View style={styles.universitiesList}>
          {currentUniversities.map((uni, index) => (
            <View key={index} style={styles.universityCard}>
              <View style={styles.universityHeader}>
                <View style={styles.universityIcon}>
                  <Ionicons name="business" size={24} color="#0FB9B1" />
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
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.footerText}>Admission Support</Text>
                </View>
                <View style={styles.footerItem}>
                  <Ionicons name="document-text" size={16} color="#10B981" />
                  <Text style={styles.footerText}>Visa Guidance</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/booking')}>
          <Text style={styles.ctaText}>Book University Counseling</Text>
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
  intro: { paddingHorizontal: 20, marginBottom: 20 },
  introTitle: { fontSize: 26, fontWeight: 'bold', color: '#0B1C2D', marginBottom: 8 },
  introSubtitle: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  countryTabs: { paddingHorizontal: 20, marginBottom: 16 },
  countryTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25, backgroundColor: '#F8FAFC', marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  countryTabActive: { backgroundColor: '#E0F7F6', borderColor: '#0FB9B1' },
  countryFlag: { fontSize: 20 },
  countryName: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  countryNameActive: { color: '#0FB9B1' },
  countBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  countText: { fontSize: 14, color: '#0FB9B1', fontWeight: '600' },
  universitiesList: { paddingHorizontal: 20, gap: 12 },
  universityCard: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  universityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  universityIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: '#E0F7F6', justifyContent: 'center', alignItems: 'center' },
  universityInfo: { marginLeft: 14, flex: 1 },
  universityName: { fontSize: 17, fontWeight: '600', color: '#0B1C2D' },
  universityRanking: { fontSize: 12, color: '#0FB9B1', marginTop: 2 },
  coursesContainer: { marginBottom: 16 },
  coursesLabel: { fontSize: 12, color: '#64748B', marginBottom: 8 },
  courseTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  courseTag: { backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  courseTagText: { fontSize: 12, color: '#0B1C2D' },
  universityFooter: { flexDirection: 'row', gap: 16 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 12, color: '#64748B' },
  ctaButton: { marginHorizontal: 20, marginTop: 24, backgroundColor: '#0FB9B1', borderRadius: 14, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  ctaText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});
