import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { userName, userId, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, []);

  const menuItems = [
    {
      id: 'assessment',
      title: 'Career Assessment',
      subtitle: 'Find your perfect career',
      icon: 'analytics',
      color: '#4F9DFF',
      route: '/assessment/start',
    },
    {
      id: 'videos',
      title: 'Video Guidance',
      subtitle: 'Learn from experts',
      icon: 'play-circle',
      color: '#FF6B6B',
      route: '/videos',
    },
    {
      id: 'booking',
      title: 'Book Consultation',
      subtitle: 'Talk to a counselor',
      icon: 'calendar',
      color: '#4ADE80',
      route: '/booking',
    },
    {
      id: 'membership',
      title: 'Edu9 Membership',
      subtitle: 'Till admission support',
      icon: 'card',
      color: '#FFD700',
      route: '/membership',
    },
  ];

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
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
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.userName}>{userName || 'Student'}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={() => router.push('/support')}
            >
              <Ionicons name="help-circle" size={28} color="#4F9DFF" />
            </TouchableOpacity>
          </View>

          {/* Hero Card */}
          <TouchableOpacity 
            style={styles.heroCard}
            onPress={() => Linking.openURL('https://studentguide.edu9.in/')}
          >
            <LinearGradient
              colors={['#4F9DFF', '#2563EB']}
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroContent}>
                <Ionicons name="rocket" size={40} color="#FFF" />
                <Text style={styles.heroTitle}>Start Your Career Journey</Text>
                <Text style={styles.heroSubtitle}>
                  Take a quick assessment to discover your ideal career path
                </Text>
                <View style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>Begin Assessment</Text>
                  <Ionicons name="arrow-forward" size={18} color="#4F9DFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Menu Grid */}
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.menuIconCircle, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon as any} size={28} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Students Guided</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Career Paths</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
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
    borderRadius: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#8BBAFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  supportButton: {
    padding: 8,
  },
  heroCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  heroButtonText: {
    color: '#4F9DFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  menuItem: {
    width: (width - 48) / 2,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.2)',
  },
  menuIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#8BBAFF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F9DFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#8BBAFF',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(79, 157, 255, 0.3)',
  },
});
