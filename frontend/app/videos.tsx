import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const videos = [
  {
    id: 1,
    title: 'Career Options After 12th',
    description: 'Complete guide to career paths after completing 12th grade',
    url: 'https://www.youtube.com/embed/jHxbnCoqvfQ',
    thumbnail: 'https://img.youtube.com/vi/jHxbnCoqvfQ/hqdefault.jpg',
  },
  {
    id: 2,
    title: 'Engineering vs Medical',
    description: 'Which career path is better for you? Compare both options',
    url: 'https://www.youtube.com/embed/3xvPpT3hn2A',
    thumbnail: 'https://img.youtube.com/vi/3xvPpT3hn2A/hqdefault.jpg',
  },
  {
    id: 3,
    title: 'Study Abroad Guide',
    description: 'Everything you need to know about studying abroad',
    url: 'https://www.youtube.com/embed/Kkdf45WmbjI',
    thumbnail: 'https://img.youtube.com/vi/Kkdf45WmbjI/hqdefault.jpg',
  },
];

export default function VideosScreen() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const openYouTubeChannel = () => {
    Linking.openURL('https://www.youtube.com/@edu9lvgr');
  };

  return (
    <LinearGradient colors={['#0A1628', '#1E3A5F', '#0A1628']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Video Guidance</Text>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Video Player */}
        {selectedVideo && (
          <View style={styles.playerContainer}>
            <View style={styles.playerHeader}>
              <Text style={styles.nowPlaying}>Now Playing</Text>
              <TouchableOpacity onPress={() => setSelectedVideo(null)}>
                <Ionicons name="close-circle" size={28} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
            <View style={styles.webviewContainer}>
              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#4F9DFF" />
                </View>
              )}
              <WebView
                source={{ uri: `${selectedVideo.url}?autoplay=1` }}
                style={styles.webview}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
              />
            </View>
            <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
            <Text style={styles.videoDescription}>{selectedVideo.description}</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {!selectedVideo && (
            <View style={styles.introSection}>
              <Ionicons name="play-circle" size={60} color="#FF6B6B" />
              <Text style={styles.introTitle}>Learn from Experts</Text>
              <Text style={styles.introSubtitle}>
                Watch video guides to make informed career decisions
              </Text>
            </View>
          )}

          {/* Video List */}
          <View style={styles.videosList}>
            <Text style={styles.sectionTitle}>Career Guidance Videos</Text>
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={[
                  styles.videoCard,
                  selectedVideo?.id === video.id && styles.videoCardActive,
                ]}
                onPress={() => setSelectedVideo(video)}
              >
                <View style={styles.thumbnailContainer}>
                  <View style={styles.thumbnailPlaceholder}>
                    <Ionicons name="play" size={30} color="#FFF" />
                  </View>
                  {selectedVideo?.id === video.id && (
                    <View style={styles.playingBadge}>
                      <Ionicons name="volume-high" size={12} color="#FFF" />
                      <Text style={styles.playingText}>Playing</Text>
                    </View>
                  )}
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoCardTitle}>{video.title}</Text>
                  <Text style={styles.videoCardDesc}>{video.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* More Videos Button */}
          <TouchableOpacity style={styles.moreVideosButton} onPress={openYouTubeChannel}>
            <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            <Text style={styles.moreVideosText}>More Videos on YouTube</Text>
            <Ionicons name="open-outline" size={20} color="#8BBAFF" />
          </TouchableOpacity>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Need Personal Guidance?</Text>
            <Text style={styles.ctaSubtitle}>Book a 1-on-1 consultation with our experts</Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => router.push('/booking')}
            >
              <Ionicons name="calendar" size={20} color="#FFF" />
              <Text style={styles.ctaButtonText}>Book Consultation</Text>
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
  playerContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nowPlaying: {
    fontSize: 14,
    color: '#4ADE80',
    fontWeight: '600',
  },
  webviewContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  videoDescription: {
    fontSize: 14,
    color: '#8BBAFF',
    marginTop: 4,
  },
  introSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  videosList: {
    paddingHorizontal: 20,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(79, 157, 255, 0.08)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  videoCardActive: {
    borderColor: '#4F9DFF',
    backgroundColor: 'rgba(79, 157, 255, 0.15)',
  },
  thumbnailContainer: {
    width: 100,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  thumbnailPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ADE80',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  playingText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  videoCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoCardDesc: {
    fontSize: 12,
    color: '#8BBAFF',
    lineHeight: 18,
  },
  moreVideosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 0, 0, 0.08)',
    gap: 10,
  },
  moreVideosText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaSection: {
    margin: 20,
    padding: 24,
    backgroundColor: 'rgba(79, 157, 255, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#8BBAFF',
    marginTop: 4,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F9DFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
