import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && userId) {
      router.replace('/home');
    }
  }, [isAuthenticated, userId]);

  const features = [
    { 
      icon: 'school', 
      text: 'Expert Career Counseling', 
      iconColor: '#0D9488',
      bgColor: '#CCFBF1',
      borderColor: '#5EEAD4'
    },
    { 
      icon: 'globe', 
      text: 'Study Abroad Guidance', 
      iconColor: '#2563EB',
      bgColor: '#DBEAFE',
      borderColor: '#93C5FD'
    },
    { 
      icon: 'logo-youtube', 
      text: 'Video Learning Library', 
      iconColor: '#DC2626',
      bgColor: '#FEE2E2',
      borderColor: '#FCA5A5'
    },
    { 
      icon: 'calendar', 
      text: 'Book Consultations', 
      iconColor: '#7C3AED',
      bgColor: '#EDE9FE',
      borderColor: '#C4B5FD'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/images/edu9-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Your Career Partner</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.featureItem, 
                { 
                  backgroundColor: feature.bgColor,
                  borderColor: feature.borderColor,
                }
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#FFFFFF' }]}>
                <Ionicons name={feature.icon as any} size={24} color={feature.iconColor} />
              </View>
              <Text style={[styles.featureText, { color: '#1F2937' }]}>{feature.text}</Text>
              <Ionicons name="chevron-forward" size={20} color={feature.iconColor} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Universities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Trusted by students across India</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoImage: {
    width: width - 120,
    height: 120,
  },
  tagline: {
    fontSize: 18,
    color: '#4B5563',
    marginTop: 8,
    fontWeight: '500',
  },
  features: {
    marginVertical: 16,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-around',
    borderWidth: 1.5,
    borderColor: '#99F6E4',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0D9488',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1.5,
    backgroundColor: '#99F6E4',
  },
  buttonSection: {
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#0D9488',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 20,
  },
});
