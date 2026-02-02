import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Image 
              source={require('../assets/images/edu9-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Features */}
          <View style={styles.features}>
            <FeatureItem icon="analytics" text="AI-Powered Career Assessment" />
            <FeatureItem icon="school" text="Expert Counseling Support" />
            <FeatureItem icon="videocam" text="Video Guidance Library" />
            <FeatureItem icon="calendar" text="Book Consultation Slots" />
          </View>

          {/* CTA Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/skip')}
            >
              <Text style={styles.secondaryButtonText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>Trusted by 10,000+ Students</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon as any} size={24} color="#4F9DFF" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: width - 80,
    height: 180,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#8BBAFF',
    marginTop: 8,
  },
  features: {
    marginVertical: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  buttonSection: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#4F9DFF',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.5)',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#8BBAFF',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    color: '#6B8CAE',
    fontSize: 14,
  },
});
