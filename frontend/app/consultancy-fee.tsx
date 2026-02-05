import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 'career',
    title: 'Career Guidance',
    description: 'Personalized roadmap for your dream career.',
    icon: 'compass',
    color: '#0FB9B1',
    bgColor: '#E0F7F6',
    highlight: true,
    fee: '₹10,000',
  },
  {
    id: 'college',
    title: 'College Guidance',
    description: 'Helping students choose the best college based on rank, budget, and career goals.',
    icon: 'school',
    color: '#6366F1',
    bgColor: '#EEF2FF',
  },
  {
    id: 'course',
    title: 'Course Selection',
    description: 'Guidance to find the right course aligned with future opportunities.',
    icon: 'book',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: 'stream',
    title: 'Stream & Area Selection',
    description: 'Tailored recommendations based on student strengths, interests, and aptitude.',
    icon: 'git-branch',
    color: '#EC4899',
    bgColor: '#FCE7F3',
  },
  {
    id: 'entrance',
    title: 'Entrance Exam Applications',
    description: 'Support to apply for up to 20 State & National level entrance exams.',
    icon: 'document-text',
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  {
    id: 'jee',
    title: 'JEE Application Assistance',
    description: 'End-to-end, hassle-free support for JEE applications.',
    icon: 'rocket',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  {
    id: 'counseling',
    title: 'Web Options & Counseling Support',
    description: 'Expert guidance for JEE, JoSAA, CSAB, COMEDK, and EAMCET counseling processes.',
    icon: 'chatbubbles',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  {
    id: 'management',
    title: 'Management Admission Guidance',
    description: 'Admission support for top colleges in India and abroad.',
    icon: 'globe',
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    id: 'bootcamp',
    title: 'Summer Bootcamps',
    description: 'Skill-based online and offline training programs for students in June & July.',
    icon: 'sunny',
    color: '#F97316',
    bgColor: '#FFEDD5',
  },
];

export default function ConsultancyFeeScreen() {
  const router = useRouter();

  const openYouTube = () => {
    Linking.openURL('https://www.youtube.com/@edu9lvgr');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Services</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>What You Get?</Text>
          <Text style={styles.heroSubtitle}>
            Complete career guidance & support for your bright future
          </Text>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <View 
              key={service.id} 
              style={[
                styles.serviceCard,
                service.highlight && styles.serviceCardHighlight
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: service.bgColor }]}>
                  <Ionicons name={service.icon as any} size={28} color={service.color} />
                </View>
                {service.highlight && (
                  <View style={styles.feeBadge}>
                    <Text style={styles.feeBadgeText}>{service.fee}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              {service.highlight && (
                <View style={styles.highlightTag}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.highlightTagText}>Career Guidance Fee</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <View style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Trusted by 10,000+ Students</Text>
              <Text style={styles.benefitText}>Expert guidance you can rely on</Text>
            </View>
          </View>
          <View style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Proven Success Rate</Text>
              <Text style={styles.benefitText}>Students placed in top colleges</Text>
            </View>
          </View>
        </View>

        {/* YouTube CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="logo-youtube" size={40} color="#FF0000" />
            </View>
            <Text style={styles.ctaTitle}>Learn More on YouTube</Text>
            <Text style={styles.ctaSubtitle}>
              Watch free career guidance videos, tips & success stories
            </Text>
            <TouchableOpacity style={styles.youtubeButton} onPress={openYouTube}>
              <Ionicons name="play-circle" size={22} color="#FFF" />
              <Text style={styles.youtubeButtonText}>Visit Our YouTube Channel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Edu9 Career Guidance</Text>
          <Text style={styles.footerSubtext}>Your Partner in Success</Text>
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0B1C2D',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0B1C2D',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceCardHighlight: {
    backgroundColor: '#F0FDFC',
    borderColor: '#0FB9B1',
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeBadge: {
    backgroundColor: '#0FB9B1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  feeBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B1C2D',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  highlightTagText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginTop: 28,
    gap: 12,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C2D',
    marginBottom: 2,
  },
  benefitText: {
    fontSize: 13,
    color: '#64748B',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  ctaCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  ctaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    gap: 10,
    width: '100%',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  youtubeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
