import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

const menuItems = [
  { id: 'universities', title: 'Top Universities', subtitle: 'Global Education Partners', icon: 'school', route: '/universities' },
  { id: 'aviation', title: 'Aviation Careers', subtitle: 'Fly Your Dreams', icon: 'airplane', route: '/aviation' },
  { id: 'services', title: 'Edu9 Services', subtitle: 'Complete Support', icon: 'briefcase', route: '/services' },
  { id: 'fee', title: 'Consultancy Fee', subtitle: '₹10,000 Package', icon: 'card', route: '/consultancy-fee' },
  { id: 'booking', title: 'Book Consultation', subtitle: 'Schedule a Meeting', icon: 'calendar', route: '/booking' },
  { id: 'offices', title: 'Our Global Offices', subtitle: 'India & International', icon: 'globe', route: '/offices' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { userName, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0A0F', '#1A1A2E', '#0A0A0F']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
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
                <Ionicons name="menu" size={24} color="#D4AF37" />
              </TouchableOpacity>
            </View>

            {/* Premium Banner */}
            <View style={styles.bannerContainer}>
              <LinearGradient
                colors={['#1A1A2E', '#16213E', '#0F3460']}
                style={styles.banner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.bannerAccent} />
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>Career & Aviation{'\n'}Consultancy</Text>
                  <Text style={styles.bannerSubtitle}>
                    Premium guidance for your future in education, aviation, and global careers
                  </Text>
                  <View style={styles.bannerBadge}>
                    <Ionicons name="shield-checkmark" size={16} color="#D4AF37" />
                    <Text style={styles.badgeText}>Trusted by 10,000+ Students</Text>
                  </View>
                </View>
                <View style={styles.bannerDecor}>
                  <Ionicons name="airplane" size={80} color="rgba(212, 175, 55, 0.15)" />
                </View>
              </LinearGradient>
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
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#1A1A2E', '#16213E']}
                      style={styles.menuCardGradient}
                    >
                      <View style={styles.menuIconContainer}>
                        <Ionicons name={item.icon as any} size={28} color="#D4AF37" />
                      </View>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                      <View style={styles.menuArrow}>
                        <Ionicons name="chevron-forward" size={16} color="#D4AF37" />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* CTA Section */}
            <View style={styles.ctaSection}>
              <LinearGradient
                colors={['#D4AF37', '#B8860B']}
                style={styles.ctaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.ctaContent}>
                  <Text style={styles.ctaTitle}>Start Your Journey Today</Text>
                  <Text style={styles.ctaSubtitle}>Book a consultation with our expert counselors</Text>
                </View>
                <TouchableOpacity 
                  style={styles.ctaButton}
                  onPress={() => router.push('/booking')}
                >
                  <Text style={styles.ctaButtonText}>Book Now</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Edu9 Career & Aviation Consultancy</Text>
              <Text style={styles.footerSubtext}>India • Dubai • Malaysia</Text>
            </View>
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
    color: '#8B8B9E',
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  banner: {
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  bannerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#D4AF37',
  },
  bannerContent: {
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 36,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#A0A0B0',
    marginTop: 12,
    lineHeight: 22,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
  },
  bannerDecor: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  statLabel: {
    fontSize: 12,
    color: '#8B8B9E',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 16,
    minHeight: 140,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#8B8B9E',
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
  ctaGradient: {
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
    color: '#0A0A0F',
  },
  ctaSubtitle: {
    fontSize: 12,
    color: 'rgba(10, 10, 15, 0.7)',
    marginTop: 4,
  },
  ctaButton: {
    backgroundColor: '#0A0A0F',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#8B8B9E',
    marginTop: 4,
  },
});
