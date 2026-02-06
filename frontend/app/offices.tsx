import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const offices = [
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    location: 'AP / Telangana, India',
    image: 'https://images.unsplash.com/photo-1572638914375-16e67bf12a7b?w=400&h=300&fit=crop',
    phone: '+91 9876543210',
    email: 'hyderabad@edu9.in',
  },
  {
    id: 'chennai',
    city: 'Chennai',
    location: 'Tamil Nadu, India',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop',
    phone: '+91 9876543211',
    email: 'chennai@edu9.in',
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    location: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop',
    phone: '+91 9876543212',
    email: 'bangalore@edu9.in',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    location: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
    phone: '+971 501234567',
    email: 'dubai@edu9.in',
  },
  {
    id: 'delhi',
    city: 'Delhi',
    location: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop',
    phone: '+91 9876543213',
    email: 'delhi@edu9.in',
  },
  {
    id: 'kualalumpur',
    city: 'Kuala Lumpur',
    location: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop',
    phone: '+60 123456789',
    email: 'malaysia@edu9.in',
  },
];

export default function OfficesScreen() {
  const router = useRouter();

  const handleGetDetails = (office: typeof offices[0]) => {
    // Open booking page for consultation
    Linking.openURL('https://bookings.edu9.in/#/2026');
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Offices</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Our Global Offices</Text>
          <Text style={styles.heroSubtitle}>
            Connecting students and careers across the globe
          </Text>
        </View>

        {/* Offices Grid */}
        <View style={styles.officesContainer}>
          {offices.map((office) => (
            <View key={office.id} style={styles.officeCard}>
              {/* Image Placeholder */}
              <View style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="business" size={40} color="#0FB9B1" />
                  <Text style={styles.cityOverlay}>{office.city}</Text>
                </View>
              </View>
              
              {/* Office Info */}
              <View style={styles.officeInfo}>
                <Text style={styles.cityName}>{office.city}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color="#0FB9B1" />
                  <Text style={styles.locationText}>{office.location}</Text>
                </View>
                
                {/* Contact Actions */}
                <View style={styles.contactActions}>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleCall(office.phone)}
                  >
                    <Ionicons name="call" size={16} color="#0FB9B1" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleEmail(office.email)}
                  >
                    <Ionicons name="mail" size={16} color="#0FB9B1" />
                  </TouchableOpacity>
                </View>

                {/* Get More Details Button */}
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => handleGetDetails(office)}
                >
                  <Text style={styles.detailsButtonText}>Get More Details</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Contact CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="globe" size={32} color="#0FB9B1" />
            </View>
            <Text style={styles.ctaTitle}>Can’t find your city?</Text>
            <Text style={styles.ctaSubtitle}>
              We offer online consultations for students worldwide
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => Linking.openURL('https://bookings.edu9.in/#/2026')}
            >
              <Ionicons name="videocam" size={18} color="#FFF" />
              <Text style={styles.ctaButtonText}>Book Online Consultation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Back to Home */}
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Edu9 Career Guidance</Text>
          <Text style={styles.footerSubtext}>Your Partner in Success</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const cardWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1C2D',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  officesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  officeCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 120,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#0FB9B1',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  officeInfo: {
    padding: 14,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1C2D',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0FB9B1',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  ctaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ctaIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0FB9B1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  homeButton: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  homeButtonText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
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
