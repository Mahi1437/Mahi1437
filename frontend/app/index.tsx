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
    { icon: 'school', text: 'Expert Career Counseling', color: '#0FB9B1', bgColor: '#E0F7F6' },
    { icon: 'airplane', text: 'Aviation Career Guidance', color: '#6366F1', bgColor: '#EEF2FF' },
    { icon: 'globe', text: 'Study Abroad Support', color: '#F59E0B', bgColor: '#FEF3C7' },
    { icon: 'document-text', text: 'Visa & Documentation', color: '#EC4899', bgColor: '#FCE7F3' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/images/edu9-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Edu9 Career Guidance</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={[styles.featureItem, { backgroundColor: feature.bgColor }]}>
              <View style={[styles.featureIcon, { backgroundColor: '#FFFFFF' }]}>
                <Ionicons name={feature.icon as any} size={24} color={feature.color} />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
              <Ionicons name="chevron-forward" size={20} color={feature.color} />
            </View>
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
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Offices</Text>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/auth/login')}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Trusted by students across India & abroad</Text>
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
    fontSize: 16,
    color: '#64748B',
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
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 14,
    fontWeight: '600',
    color: '#0B1C2D',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFC',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0FB9B1',
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#CCFBF1',
  },
  buttonSection: {
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#0FB9B1',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#0FB9B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 20,
  },
});
