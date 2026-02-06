import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { createMembership, getMembership } from '../utils/api';

const benefits = [
  { icon: 'chatbubbles', text: 'Unlimited Counseling Sessions' },
  { icon: 'school', text: 'College & Course Selection Help' },
  { icon: 'document-text', text: 'Admission Process Support' },
  { icon: 'medkit', text: 'Medical Career Guidance' },
  { icon: 'airplane', text: 'Aviation Career Support' },
  { icon: 'globe', text: 'Abroad Studies Consultation' },
  { icon: 'call', text: 'Priority Phone Support' },
  { icon: 'checkmark-shield', text: 'Valid Till Admission' },
];

export default function MembershipScreen() {
  const router = useRouter();
  const { userId, userName, userPhone } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePurchase = () => {
    // Open external booking link
    Linking.openURL('https://bookings.edu9.in/#/2026');
  };

  if (checking) {
    return (
      <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F9DFF" />
        </View>
      </LinearGradient>
    );
  }

  if (success || hasMembership) {
    return (
      <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.successContainer}>
            <View style={styles.memberBadge}>
              <Ionicons name="ribbon" size={60} color="#FFD700" />
            </View>
            <Text style={styles.memberTitle}>Edu9 Member</Text>
            <Text style={styles.memberSubtitle}>
              You have full access to all premium features
            </Text>

            <View style={styles.memberCard}>
              <View style={styles.memberCardHeader}>
                <Text style={styles.memberCardTitle}>Premium Membership</Text>
                <Text style={styles.memberCardStatus}>Active</Text>
              </View>
              <View style={styles.memberCardBody}>
                <View style={styles.memberDetail}>
                  <Ionicons name="person" size={18} color="#4F9DFF" />
                  <Text style={styles.memberDetailText}>{userName || 'Member'}</Text>
                </View>
                <View style={styles.memberDetail}>
                  <Ionicons name="checkmark-shield" size={18} color="#4ADE80" />
                  <Text style={styles.memberDetailText}>Valid Till Admission</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => router.push('/home')}
            >
              <Text style={styles.homeButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edu9 Membership</Text>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={40} color="#FFD700" />
            </View>
            <Text style={styles.heroTitle}>Premium Membership</Text>
            <Text style={styles.heroSubtitle}>
              Complete career guidance till you get admission
            </Text>
          </View>

          {/* Price Card */}
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>One-Time Fee</Text>
            <View style={styles.priceRow}>
              <Text style={styles.rupeeSymbol}></Text>
              <Text style={styles.priceAmount}>10,000</Text>
            </View>
            <Text style={styles.priceValidity}>Valid till admission</Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>What’s Included</Text>
            <View style={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.benefitIconCircle}>
                    <Ionicons name={benefit.icon as any} size={22} color="#4F9DFF" />
                  </View>
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Purchase Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.purchaseButton}
              onPress={handlePurchase}
            >
              <Text style={styles.purchaseButtonText}>Get Membership</Text>
              <Ionicons name="arrow-forward" size={20} color="#0A1628" />
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By proceeding, you agree to our Terms & Conditions
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  premiumBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    marginTop: 8,
  },
  priceCard: {
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rupeeSymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  priceValidity: {
    fontSize: 14,
    color: '#8BBAFF',
    marginTop: 8,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  benefitsGrid: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    padding: 14,
    borderRadius: 12,
    gap: 14,
  },
  benefitIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
  },
  demoNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  demoText: {
    color: '#FFD700',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  purchaseButton: {
    backgroundColor: '#FFD700',
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
  purchaseButtonText: {
    color: '#0A1628',
    fontSize: 18,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 12,
    color: '#6B8CAE',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  memberBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  memberTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  memberSubtitle: {
    fontSize: 16,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 8,
  },
  memberCard: {
    width: '100%',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 20,
    marginTop: 32,
    overflow: 'hidden',
  },
  memberCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.2)',
    padding: 16,
  },
  memberCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  memberCardStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ADE80',
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  memberCardBody: {
    padding: 16,
    gap: 12,
  },
  memberDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  memberDetailText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: '#4F9DFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 32,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
