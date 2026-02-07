import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const router = useRouter();
  const { careers: careersParam, studentName } = useLocalSearchParams<{ careers: string; studentName: string }>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  let careers: any[] = [];
  try {
    careers = careersParam ? JSON.parse(careersParam) : [];
  } catch (e) {
    console.error('Parse error:', e);
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getRankColor = (index: number) => {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return colors[index] || '#4F9DFF';
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/home')}>
              <Ionicons name="home" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Results</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Congratulations Section */}
          <View style={styles.congratsSection}>
            <View style={styles.trophyCircle}>
              <Ionicons name="trophy" size={50} color="#FFD700" />
            </View>
            <Text style={styles.congratsTitle}>Congratulations, {studentName}!</Text>
            <Text style={styles.congratsSubtitle}>
              Based on your profile, here are your Top 3 Career Paths
            </Text>
          </View>

          {/* Career Cards */}
          <View style={styles.careersContainer}>
            {careers.map((career, index) => (
              <TouchableOpacity
                key={index}
                style={styles.careerCard}
                onPress={() => toggleExpand(index)}
                activeOpacity={0.9}
              >
                {/* Rank Badge */}
                <View style={[styles.rankBadge, { backgroundColor: getRankColor(index) }]}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>

                {/* Career Header */}
                <View style={styles.careerHeader}>
                  <View style={styles.careerTitleSection}>
                    <Text style={styles.careerName}>{career.name}</Text>
                    <Text style={styles.careerCourse}>{career.course}</Text>
                  </View>
                  <Ionicons 
                    name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color="#8BBAFF" 
                  />
                </View>

                {/* Suitability */}
                <View style={styles.suitabilityBox}>
                  <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
                  <Text style={styles.suitabilityText}>{career.suitability}</Text>
                </View>

                {/* Expanded Details */}
                {expandedIndex === index && (
                  <View style={styles.expandedContent}>
                    {/* Quick Stats */}
                    <View style={styles.statsRow}>
                      <View style={styles.statBox}>
                        <Ionicons name="time" size={18} color="#4F9DFF" />
                        <Text style={styles.statValue}>{career.duration}</Text>
                        <Text style={styles.statLabel}>Duration</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Ionicons name="cash" size={18} color="#4ADE80" />
                        <Text style={styles.statValue}>{career.estimated_cost}</Text>
                        <Text style={styles.statLabel}>Est. Cost</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Ionicons name="wallet" size={18} color="#FFD700" />
                        <Text style={styles.statValue}>{career.starting_salary}</Text>
                        <Text style={styles.statLabel}>Salary</Text>
                      </View>
                    </View>

                    {/* Job Prospects */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Job Prospects</Text>
                      <Text style={styles.detailText}>{career.job_prospects}</Text>
                    </View>

                    {/* Top Colleges */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Top Colleges</Text>
                      <View style={styles.collegesList}>
                        {career.top_colleges?.map((college: string, i: number) => (
                          <View key={i} style={styles.collegeChip}>
                            <Ionicons name="school" size={14} color="#4F9DFF" />
                            <Text style={styles.collegeText}>{college}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* Roadmap */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Step-by-Step Roadmap</Text>
                      {career.roadmap?.map((step: string, i: number) => (
                        <View key={i} style={styles.roadmapStep}>
                          <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>{i + 1}</Text>
                          </View>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity 
              style={styles.primaryAction}
              onPress={() => router.push('/booking')}
            >
              <Ionicons name="calendar" size={24} color="#FFF" />
              <Text style={styles.primaryActionText}>Book Consultation</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryAction}
              onPress={() => router.push('/videos')}
            >
              <Ionicons name="play-circle" size={24} color="#4F9DFF" />
              <Text style={styles.secondaryActionText}>Watch Career Videos</Text>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  congratsSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  trophyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  congratsSubtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 8,
  },
  careersContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  careerCard: {
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 157, 255, 0.2)',
  },
  rankBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  careerTitleSection: {
    flex: 1,
    marginRight: 16,
  },
  careerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  careerCourse: {
    fontSize: 14,
    color: '#4F9DFF',
  },
  suitabilityBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  suitabilityText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 6,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#8BBAFF',
    marginTop: 2,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#8BBAFF',
    lineHeight: 20,
  },
  collegesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  collegeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  collegeText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  roadmapStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F9DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ADE80',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4F9DFF',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F9DFF',
  },
});
