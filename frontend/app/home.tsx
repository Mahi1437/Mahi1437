import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

const shortVideos = [
  {
    id: 1,
    question: 'How to get admission in UK universities?',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    person: 'Expert',
  },
  {
    id: 2,
    question: 'Best courses after 12th Science?',
    thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400',
    person: 'Counselor',
  },
  {
    id: 3,
    question: 'MBA vs Engineering - Which is better?',
    thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400',
    person: 'Advisor',
  },
  {
    id: 4,
    question: 'How to crack IELTS in first attempt?',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    person: 'Teacher',
  },
];

const universities = [
  { id: 1, name: 'Oxford University', courses: 120, logo: '🏛️' },
  { id: 2, name: 'Cambridge', courses: 98, logo: '🎓' },
  { id: 3, name: 'Harvard', courses: 145, logo: '📚' },
  { id: 4, name: 'MIT', courses: 89, logo: '🔬' },
  { id: 5, name: 'Stanford', courses: 112, logo: '💡' },
  { id: 6, name: 'IIT Delhi', courses: 76, logo: '⚙️' },
];

const countries = [
  { id: 1, name: 'United Kingdom', universities: 156, flag: '🇬🇧', color: '#1E3A5F' },
  { id: 2, name: 'United States', universities: 245, flag: '🇺🇸', color: '#2563EB' },
  { id: 3, name: 'Canada', universities: 98, flag: '🇨🇦', color: '#DC2626' },
  { id: 4, name: 'Australia', universities: 87, flag: '🇦🇺', color: '#059669' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { userName, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/images/edu9-icon.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{userName || 'Student'}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.walletButton}>
            <Ionicons name="wallet" size={18} color="#0D9488" />
            <Text style={styles.walletText}>500</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/support')}>
            <Ionicons name="notifications-outline" size={22} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search universities, courses, countries..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Featured Country Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerOverlay}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerFlag}>🇬🇧</Text>
                <View>
                  <Text style={styles.bannerTitle}>United Kingdom</Text>
                  <Text style={styles.bannerSubtitle}>156 Universities Available</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Countries Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countriesScroll}>
          {countries.map((country) => (
            <TouchableOpacity key={country.id} style={styles.countryChip}>
              <Text style={styles.countryFlag}>{country.flag}</Text>
              <Text style={styles.countryName}>{country.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Short Videos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Short Videos</Text>
              <Text style={styles.sectionSubtitle}>Quick career guidance tips</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/videos')}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#0D9488" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {shortVideos.map((video) => (
              <TouchableOpacity key={video.id} style={styles.videoCard} onPress={() => router.push('/videos')}>
                <View style={styles.videoThumbnail}>
                  <View style={styles.videoGradient}>
                    <View style={styles.playIconContainer}>
                      <Ionicons name="play" size={24} color="#FFF" />
                    </View>
                    <Text style={styles.videoQuestion}>{video.question}</Text>
                  </View>
                </View>
                <View style={styles.videoFooter}>
                  <View style={styles.expertBadge}>
                    <Ionicons name="person-circle" size={20} color="#0D9488" />
                    <Text style={styles.expertText}>{video.person}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/career-options')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="compass" size={24} color="#059669" />
            </View>
            <Text style={styles.quickActionText}>Career Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/booking')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="calendar" size={24} color="#2563EB" />
            </View>
            <Text style={styles.quickActionText}>Book Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/membership')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="star" size={24} color="#D97706" />
            </View>
            <Text style={styles.quickActionText}>Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/support')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FCE7F3' }]}>
              <Ionicons name="headset" size={24} color="#DB2777" />
            </View>
            <Text style={styles.quickActionText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* Universities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Top Universities</Text>
              <Text style={styles.sectionSubtitle}>Explore world-class institutions</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#0D9488" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.universitiesGrid}>
            {universities.map((uni) => (
              <TouchableOpacity key={uni.id} style={styles.universityCard}>
                <View style={styles.universityLogo}>
                  <Text style={styles.universityEmoji}>{uni.logo}</Text>
                </View>
                <Text style={styles.universityName}>{uni.name}</Text>
                <Text style={styles.universityCourses}>{uni.courses} Courses</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass" size={24} color="#0D9488" />
          <Text style={[styles.navText, styles.navTextActive]}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/support')}>
          <Ionicons name="people-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCenter} onPress={() => router.push('/videos')}>
          <View style={styles.navCenterButton}>
            <Ionicons name="play" size={28} color="#FFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/booking')}>
          <Ionicons name="document-text-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Applications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/support')}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  walletText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D9488',
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  banner: {
    height: 160,
    borderRadius: 20,
    backgroundColor: '#1E3A5F',
    overflow: 'hidden',
  },
  bannerOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 58, 95, 0.9)',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bannerFlag: {
    fontSize: 48,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#0D9488',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  countriesScroll: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  countryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  countryFlag: {
    fontSize: 20,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D9488',
  },
  videoCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoThumbnail: {
    height: 200,
    backgroundColor: '#1E3A5F',
  },
  videoGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 58, 95, 0.85)',
  },
  playIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  videoQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
  },
  videoFooter: {
    padding: 12,
  },
  expertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expertText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickAction: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  universitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  universityCard: {
    width: (width - 52) / 3,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  universityLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  universityEmoji: {
    fontSize: 24,
  },
  universityName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  universityCourses: {
    fontSize: 11,
    color: '#6B7280',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 8,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemCenter: {
    marginTop: -30,
  },
  navCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  navText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navTextActive: {
    color: '#0D9488',
    fontWeight: '600',
  },
});
