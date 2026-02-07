import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const router = useRouter();

  const handleCall = () => {
    Linking.openURL('tel:9133311450');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:ceo@edu9.in');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/919133311450?text=Hello, I need help with career guidance');
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.supportIcon}>
              <Ionicons name="headset" size={60} color="#4F9DFF" />
            </View>
            <Text style={styles.heroTitle}>We’re Here to Help</Text>
            <Text style={styles.heroSubtitle}>
              Have questions? Our team is ready to assist you
            </Text>
          </View>

          {/* Contact Options */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Us</Text>

            <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
              <View style={[styles.contactIconCircle, { backgroundColor: 'rgba(74, 222, 128, 0.15)' }]}>
                <Ionicons name="call" size={28} color="#4ADE80" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Call Us</Text>
                <Text style={styles.contactValue}>+91 9133311450</Text>
                <Text style={styles.contactHint}>Mon-Sun, 9 AM - 8 PM</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4F9DFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp}>
              <View style={[styles.contactIconCircle, { backgroundColor: 'rgba(37, 211, 102, 0.15)' }]}>
                <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>WhatsApp</Text>
                <Text style={styles.contactValue}>+91 9133311450</Text>
                <Text style={styles.contactHint}>Quick response on WhatsApp</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4F9DFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
              <View style={[styles.contactIconCircle, { backgroundColor: 'rgba(79, 157, 255, 0.15)' }]}>
                <Ionicons name="mail" size={28} color="#4F9DFF" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email</Text>
                <Text style={styles.contactValue}>ceo@edu9.in</Text>
                <Text style={styles.contactHint}>We reply within 24 hours</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4F9DFF" />
            </TouchableOpacity>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

            <FAQItem 
              question="How accurate are the career recommendations?"
              answer="Our AI-powered system analyzes your academic performance, interests, and goals to provide highly personalized career suggestions suitable for Indian students."
            />
            <FAQItem 
              question="What is included in the ₹10,000 membership?"
              answer="The membership includes unlimited counseling sessions, college selection guidance, admission support, and career guidance until you secure admission."
            />
            <FAQItem 
              question="Can I change my selected career path later?"
              answer="Yes! You can retake the assessment anytime and explore different career options. Our counselors will help you transition smoothly."
            />
            <FAQItem 
              question="Do you provide guidance for abroad studies?"
              answer="Absolutely! We provide comprehensive guidance for studying abroad including university selection, application process, visa guidance, and scholarship information."
            />
          </View>

          {/* Office Address */}
<View style={styles.addressSection}>
  <Text style={styles.sectionTitle}>Visit Our Office</Text>

  <View style={styles.addressCard}>
    <Ionicons name="location" size={24} color="#4F9DFF" />

    <View style={styles.addressInfo}>
      <Text style={styles.addressTitle}>
        Edu9 Career Guidance Center
      </Text>

      <Text style={styles.addressText}>
        12th Floor, Vasavi MPM Grand, 1312{"\n"}
        Beside Ameerpet Metro Station, Ameerpet{"\n"}
        Hyderabad, Telangana 500073
      </Text>

      <Text style={styles.addressSubText} color="#FFF">
        Available for in-person consultations. Contact us to schedule a visit.
      </Text>

      <Text
        style={styles.mapLink}
        onPress={() =>
          Linking.openURL("https://maps.app.goo.gl/JDkx4JyWM2gMP2Zj7")
        }
      >
        View on Google Maps
      </Text>
    </View>
  </View>
</View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Edu9 - Your Career Partner</Text>
            <Text style={styles.copyrightText}>© 2026 Edu9. All rights reserved.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity 
      style={styles.faqItem} 
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#4F9DFF" 
        />
      </View>
      {expanded && (
        <Text style={styles.faqAnswer}>{answer}</Text>
      )}
    </TouchableOpacity>
  );
};

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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  supportIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
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
    textAlign: 'center',
    marginTop: 8,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  contactIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactValue: {
    fontSize: 14,
    color: '#4F9DFF',
    marginTop: 2,
  },
  contactHint: {
    fontSize: 12,
    color: '#8BBAFF',
    marginTop: 2,
  },
  faqSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#8BBAFF',
    lineHeight: 22,
    marginTop: 12,
  },
  addressSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#8BBAFF',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F9DFF',
  },
  copyrightText: {
    fontSize: 12,
    color: '#6B8CAE',
    marginTop: 4,
  },
});
