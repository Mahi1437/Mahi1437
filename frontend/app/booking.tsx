import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your {consultationType.toLowerCase()} consultation has been scheduled
          </Text>
          
          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Ionicons name="calendar" size={20} color="#0FB9B1" />
              </View>
              <Text style={styles.detailText}>{selectedDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Ionicons name="time" size={20} color="#0FB9B1" />
              </View>
              <Text style={styles.detailText}>{selectedTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Ionicons name="videocam" size={20} color="#0FB9B1" />
              </View>
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
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Consultation</Text>
          <TouchableOpacity onPress={() => router.push('/home')} style={styles.homeIconButton}>
            <Ionicons name="home" size={22} color="#0FB9B1" />
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
                <View style={[styles.typeIconContainer, consultationType === 'Online' && styles.typeIconContainerSelected]}>
                  <Ionicons 
                    name="videocam" 
                    size={28} 
                    color={consultationType === 'Online' ? '#FFFFFF' : '#6366F1'} 
                  />
                </View>
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
                <View style={[styles.typeIconContainer, { backgroundColor: '#FCE7F3' }, consultationType === 'Offline' && styles.typeIconContainerSelected]}>
                  <Ionicons 
                    name="location" 
                    size={28} 
                    color={consultationType === 'Offline' ? '#FFFFFF' : '#EC4899'} 
                  />
                </View>
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
              <Ionicons name="person" size={20} color="#0FB9B1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={20} color="#0FB9B1" style={styles.inputIcon} />
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 80 }]}
                placeholder="Mobile Number"
                placeholderTextColor="#94A3B8"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  homeIconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1C2D',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  typeCardSelected: {
    backgroundColor: '#F0FDFC',
    borderColor: '#0FB9B1',
    borderWidth: 2,
  },
  typeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIconContainerSelected: {
    backgroundColor: '#0FB9B1',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1C2D',
    marginTop: 4,
  },
  typeTextSelected: {
    color: '#0FB9B1',
  },
  typeDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  typeDescSelected: {
    color: '#64748B',
  },
  datesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateCardSelected: {
    backgroundColor: '#0FB9B1',
    borderColor: '#0FB9B1',
  },
  dateDay: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  dateDaySelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dateNum: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginVertical: 4,
  },
  dateNumSelected: {
    color: '#FFFFFF',
  },
  dateMonth: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
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
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeChipSelected: {
    backgroundColor: '#0FB9B1',
    borderColor: '#0FB9B1',
  },
  timeText: {
    fontSize: 14,
    color: '#0B1C2D',
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  countryCode: {
    position: 'absolute',
    left: 48,
    color: '#0B1C2D',
    fontSize: 16,
    zIndex: 1,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 48,
    fontSize: 16,
    color: '#0B1C2D',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  bookButton: {
    backgroundColor: '#0FB9B1',
    paddingVertical: 18,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#0FB9B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  successIcon: {
    marginBottom: 24,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1C2D',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  bookingDetails: {
    backgroundColor: '#F0FDFC',
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
    width: '100%',
    gap: 16,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#0B1C2D',
    fontWeight: '500',
  },
  callbackNote: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 22,
  },
  homeButton: {
    backgroundColor: '#0FB9B1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#0FB9B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
