import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { skipAuth } from '../../utils/api';
import { useAuthStore } from '../../store/authStore';

export default function SkipAuthScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const handleSkip = async () => {
    setLoading(true);
    try {
      const response = await skipAuth();
      if (response.data.success) {
        await setAuth(response.data.user_id, 'Guest User', '0000000000');
        router.replace('/home');
      }
    } catch (err) {
      console.error('Skip auth error:', err);
      // Still proceed with local guest user
      const guestId = `guest_${Date.now()}`;
      await setAuth(guestId, 'Guest User', '0000000000');
      router.replace('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add" size={60} color="#4F9DFF" />
          </View>

          <Text style={styles.title}>Continue as Guest</Text>
          <Text style={styles.subtitle}>
            You can explore the app without registration. Some features may be limited.
          </Text>

          <View style={styles.featureList}>
            <FeatureItem icon="checkmark-circle" text="Take Career Assessment" available />
            <FeatureItem icon="checkmark-circle" text="View Career Recommendations" available />
            <FeatureItem icon="checkmark-circle" text="Watch Video Guidance" available />
            <FeatureItem icon="close-circle" text="Book Consultation" available={false} />
            <FeatureItem icon="close-circle" text="Save Progress" available={false} />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSkip}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>Continue as Guest</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.registerText}>Register for Full Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const FeatureItem = ({ icon, text, available }: { icon: string; text: string; available: boolean }) => (
  <View style={styles.featureItem}>
    <Ionicons 
      name={icon as any} 
      size={22} 
      color={available ? '#4ADE80' : '#6B8CAE'} 
    />
    <Text style={[styles.featureText, !available && styles.featureDisabled]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#8BBAFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featureList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  featureDisabled: {
    color: '#6B8CAE',
  },
  button: {
    width: '100%',
    backgroundColor: '#4F9DFF',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#4F9DFF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
