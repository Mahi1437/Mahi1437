import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function BangaloreAdmissionsScreen() {
  const router = useRouter();

  const handleBookCounseling = () => {
    Linking.openURL('https://bookings.edu9.in/#/2026');
  };

  return (
    <ImageBackground
      source={require('../assets/images/bangalore-hero-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Main Content - 50-50 Split */}
        <View style={styles.contentContainer}>
          {/* Left 50% - Text and Button */}
          <View style={styles.leftSection}>
            <View style={styles.textContent}>
              {/* Badge */}
              <View style={styles.badge}>
                <Ionicons name="school" size={14} color="#FFFFFF" />
                <Text style={styles.badgeText}>Edu9 Career Guidance</Text>
              </View>

              {/* Heading */}
              <Text style={styles.heading}>
                Get Admitted to Top Bangalore Engineering Colleges
              </Text>

              {/* Sub-text */}
              <Text style={styles.subText}>
                500+ successful placements in premier colleges | Expert guidance for COMEDK, KCET & Management admissions
              </Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>500+</Text>
                  <Text style={styles.statLabel}>Placements</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>50+</Text>
                  <Text style={styles.statLabel}>Colleges</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>10K+</Text>
                  <Text style={styles.statLabel}>Students</Text>
                </View>
              </View>

              {/* CTA Button */}
              <TouchableOpacity style={styles.ctaButton} onPress={handleBookCounseling}>
                <Text style={styles.ctaButtonText}>Book Career Counseling</Text>
                <Ionicons name="arrow-forward" size={20} color="#1E3A8A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Right 50% - Empty for future form */}
          <View style={styles.rightSection}>
            {/* Reserved for form */}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  rightSection: {
    width: '50%',
    // Empty - reserved for form
  },
  textContent: {
    gap: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 32,
  },
  subText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#1E3A8A',
    fontSize: 15,
    fontWeight: '700',
  },
});
