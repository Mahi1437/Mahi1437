import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

const menuItems = [
  { id: 'universities', title: 'Top Universities', subtitle: 'Global Education Partners', icon: 'school', color: '#0FB9B1', bgColor: '#E0F7F6', route: '/universities' },
  { id: 'aviation', title: 'Aviation Careers', subtitle: 'Fly Your Dreams', icon: 'airplane', color: '#6366F1', bgColor: '#EEF2FF', route: '/aviation' },
  { id: 'services', title: 'Edu9 Services', subtitle: 'Complete Support', icon: 'briefcase', color: '#F59E0B', bgColor: '#FEF3C7', route: '/services' },
  { id: 'fee', title: 'Consultancy Fee', subtitle: '₹10,000 Package', icon: 'card', color: '#EC4899', bgColor: '#FCE7F3', route: '/consultancy-fee' },
  { id: 'youtube', title: 'YouTube Consultation', subtitle: 'Free Consultation', icon: 'logo-youtube', color: '#FF0000', bgColor: '#FEE2E2', route: '/video-hub' },
  { id: 'offices', title: 'Our Global Offices', subtitle: 'India & International', icon: 'globe', color: '#3B82F6', bgColor: '#DBEAFE', route: '/offices' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { userName, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../assets/images/edu9-icon.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.brandName}>Edu9</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/support')}>
            <Ionicons name="menu" size={24} color="#0FB9B1" />
          </TouchableOpacity>
        </View>

        {/* Premium Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerIconContainer}>
              <Ionicons name="airplane" size={40} color="#0FB9B1" />
            </View>
            <Text style={styles.bannerTitle}>Edu9 Career{'\n'}Guidance</Text>
            <Text style={styles.bannerSubtitle}>
              Premium guidance for your future in education and global careers
            </Text>
            <View style={styles.bannerBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#0FB9B1" />
              <Text style={styles.badgeText}>Trusted by 10,000+ Students</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Universities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8+</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Offices</Text>
          </View>
        </View>

        {/* Navigation Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Explore Our Services</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuCard}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.bgColor }]}>
                  <Ionicons name={item.icon as any} size={26} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                <View style={styles.menuArrow}>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaContent}>
              <Text style={styles.ctaTitle}>Start Your Journey Today</Text>
              <Text style={styles.ctaSubtitle}>Book a consultation with our expert counselors</Text>
            </View>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => Linking.openURL('https://bookings.edu9.in/#/2026')}
            >
              <Text style={styles.ctaButtonText}>Book Now</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Edu9 Career & Aviation Consultancy</Text>
          <Text style={styles.footerSubtext}>India • Dubai • Malaysia</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#64748B',
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0FB9B1',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  banner: {
    backgroundColor: '#F0FDFC',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  bannerIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0FB9B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0B1C2D',
    lineHeight: 34,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 10,
    lineHeight: 22,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    color: '#0FB9B1',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0FB9B1',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C2D',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  menuArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  ctaCard: {
    backgroundColor: '#0FB9B1',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaContent: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ctaSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0FB9B1',
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
