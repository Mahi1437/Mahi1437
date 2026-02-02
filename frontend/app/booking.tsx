import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { createBooking } from '../utils/api';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', 
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function BookingScreen() {
  const router = useRouter();
  const { userId, userName } = useAuthStore();
  const [consultationType, setConsultationType] = useState<'Online' | 'Offline'>('Online');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState(userName || '');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return days;
  };

  const handleBook = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (phone.length !== 10) {
      setError('Please enter valid 10-digit mobile number');
      return;
    }
    if (!selectedDate) {
      setError('Please select a date');
      return;
    }
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createBooking({
        user_id: userId,
        name,
        phone,
        consultation_type: consultationType,
        date: selectedDate,
        time: selectedTime,
      });
      setSuccess(true);
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color="#4ADE80" />
            </View>
            <Text style={styles.successTitle}>Booking Confirmed!</Text>
            <Text style={styles.successSubtitle}>
              Your {consultationType.toLowerCase()} consultation has been scheduled
            </Text>
            
            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={20} color="#4F9DFF" />
                <Text style={styles.detailText}>{selectedDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={20} color="#4F9DFF" />
                <Text style={styles.detailText}>{selectedTime}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="videocam" size={20} color="#4F9DFF" />
                <Text style={styles.detailText}>{consultationType} Consultation</Text>
              </View>
            </View>

            <Text style={styles.callbackNote}>
              Our counselor will call you at the scheduled time
            </Text>

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
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Consultation</Text>
            <TouchableOpacity onPress={() => router.push('/home')}>
              <Ionicons name="home" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Consultation Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Consultation Type</Text>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeCard,
                    consultationType === 'Online' && styles.typeCardSelected,
                  ]}
                  onPress={() => setConsultationType('Online')}
                >
                  <Ionicons 
                    name="videocam" 
                    size={32} 
                    color={consultationType === 'Online' ? '#FFF' : '#4F9DFF'} 
                  />
                  <Text style={[
                    styles.typeText,
                    consultationType === 'Online' && styles.typeTextSelected,
                  ]}>Online</Text>
                  <Text style={[
                    styles.typeDesc,
                    consultationType === 'Online' && styles.typeDescSelected,
                  ]}>Video Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeCard,
                    consultationType === 'Offline' && styles.typeCardSelected,
                  ]}
                  onPress={() => setConsultationType('Offline')}
                >
                  <Ionicons 
                    name="location" 
                    size={32} 
                    color={consultationType === 'Offline' ? '#FFF' : '#4F9DFF'} 
                  />
                  <Text style={[
                    styles.typeText,
                    consultationType === 'Offline' && styles.typeTextSelected,
                  ]}>Offline</Text>
                  <Text style={[
                    styles.typeDesc,
                    consultationType === 'Offline' && styles.typeDescSelected,
                  ]}>Visit Office</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.datesContainer}>
                  {getNextDays().map((item) => (
                    <TouchableOpacity
                      key={item.date}
                      style={[
                        styles.dateCard,
                        selectedDate === item.date && styles.dateCardSelected,
                      ]}
                      onPress={() => setSelectedDate(item.date)}
                    >
                      <Text style={[
                        styles.dateDay,
                        selectedDate === item.date && styles.dateDaySelected,
                      ]}>{item.day}</Text>
                      <Text style={[
                        styles.dateNum,
                        selectedDate === item.date && styles.dateNumSelected,
                      ]}>{item.dayNum}</Text>
                      <Text style={[
                        styles.dateMonth,
                        selectedDate === item.date && styles.dateMonthSelected,
                      ]}>{item.month}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Time Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Time</Text>
              <View style={styles.timesContainer}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeChip,
                      selectedTime === time && styles.timeChipSelected,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === time && styles.timeTextSelected,
                    ]}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Contact Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Details</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={22} color="#4F9DFF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#6B8CAE"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="call" size={22} color="#4F9DFF" style={styles.inputIcon} />
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={[styles.input, { paddingLeft: 80 }]}
                  placeholder="Mobile Number"
                  placeholderTextColor="#6B8CAE"
                  value={phone}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, '').slice(0, 10))}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Book Button */}
            <View style={styles.footer}>
              <TouchableOpacity 
                style={[styles.bookButton, loading && styles.buttonDisabled]}
                onPress={handleBook}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Text style={styles.bookButtonText}>Confirm Booking</Text>
                    <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
  },
  typeTextSelected: {
    color: '#FFFFFF',
  },
  typeDesc: {
    fontSize: 12,
    color: '#8BBAFF',
    marginTop: 2,
  },
  typeDescSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  datesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
  },
  dateCardSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  dateDay: {
    fontSize: 12,
    color: '#8BBAFF',
  },
  dateDaySelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dateNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  dateNumSelected: {
    color: '#FFFFFF',
  },
  dateMonth: {
    fontSize: 12,
    color: '#8BBAFF',
  },
  dateMonthSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
  },
  timeChipSelected: {
    backgroundColor: '#4F9DFF',
    borderColor: '#4F9DFF',
  },
  timeText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  timeTextSelected: {
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.3)',
    marginBottom: 12,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  countryCode: {
    position: 'absolute',
    left: 50,
    color: '#FFFFFF',
    fontSize: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 50,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  bookButton: {
    backgroundColor: '#4ADE80',
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
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#8BBAFF',
    textAlign: 'center',
  },
  bookingDetails: {
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
    width: '100%',
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  callbackNote: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 24,
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
