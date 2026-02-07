import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

// Videos from Edu9 channel
const videosData = [
  {
    id: 'video1',
    title: 'How to Choose Right Career After 12th | Complete Guide',
    videoId: 'dQw4w9WgXcQ',
    duration: '15:24',
    views: '125K',
  },
  {
    id: 'video2',
    title: 'COMEDK 2025 Complete Counseling Process Explained',
    videoId: 'dQw4w9WgXcQ',
    duration: '22:10',
    views: '89K',
  },
  {
    id: 'video3',
    title: 'Top Engineering Colleges in Bangalore - Rankings & Fees',
    videoId: 'dQw4w9WgXcQ',
    duration: '18:35',
    views: '156K',
  },
  {
    id: 'video4',
    title: 'JEE Main vs KCET - Which Exam to Focus On?',
    videoId: 'dQw4w9WgXcQ',
    duration: '12:48',
    views: '203K',
  },
  {
    id: 'video5',
    title: 'Study in Dubai - Complete Guide for Indian Students',
    videoId: 'dQw4w9WgXcQ',
    duration: '20:15',
    views: '67K',
  },
  {
    id: 'video6',
    title: 'Aviation Career Roadmap - Pilot Training Guide',
    videoId: 'dQw4w9WgXcQ',
    duration: '25:30',
    views: '112K',
  },
  {
    id: 'video7',
    title: 'KCET 2025 Preparation Strategy - Score 150+ Marks',
    videoId: 'dQw4w9WgXcQ',
    duration: '28:45',
    views: '178K',
  },
  {
    id: 'video8',
    title: 'Medical vs Engineering - Which Career is Better?',
    videoId: 'dQw4w9WgXcQ',
    duration: '19:20',
    views: '234K',
  },
  {
    id: 'video9',
    title: 'Top 10 Private Engineering Colleges in Karnataka',
    videoId: 'dQw4w9WgXcQ',
    duration: '16:55',
    views: '145K',
  },
  {
    id: 'video10',
    title: 'How to Get Direct Admission in Top Colleges',
    videoId: 'dQw4w9WgXcQ',
    duration: '14:30',
    views: '98K',
  },
  {
    id: 'video11',
    title: 'Cabin Crew Career Guide - Salary, Training & Jobs',
    videoId: 'dQw4w9WgXcQ',
    duration: '21:15',
    views: '167K',
  },
  {
    id: 'video12',
    title: 'Study in Malaysia - Affordable Quality Education',
    videoId: 'dQw4w9WgXcQ',
    duration: '17:40',
    views: '76K',
  },
];

const shortsData = [
  {
    id: 'short1',
    title: 'Best Engineering Branch in 2025',
    videoId: 'dQw4w9WgXcQ',
    views: '450K',
  },
  {
    id: 'short2',
    title: 'KCET Rank vs College Prediction',
    videoId: 'dQw4w9WgXcQ',
    views: '320K',
  },
  {
    id: 'short3',
    title: 'Top 5 Mistakes in Career Selection',
    videoId: 'dQw4w9WgXcQ',
    views: '280K',
  },
  {
    id: 'short4',
    title: 'Free Career Counseling Tips',
    videoId: 'dQw4w9WgXcQ',
    views: '195K',
  },
  {
    id: 'short5',
    title: 'Management Quota Explained',
    videoId: 'dQw4w9WgXcQ',
    views: '156K',
  },
  {
    id: 'short6',
    title: 'Study Abroad on Budget',
    videoId: 'dQw4w9WgXcQ',
    views: '234K',
  },
  {
    id: 'short7',
    title: 'COMEDK vs KCET - Quick Comparison',
    videoId: 'dQw4w9WgXcQ',
    views: '312K',
  },
  {
    id: 'short8',
    title: 'Pilot Training Cost in India',
    videoId: 'dQw4w9WgXcQ',
    views: '178K',
  },
  {
    id: 'short9',
    title: 'Top 3 Career Options After 12th Science',
    videoId: 'dQw4w9WgXcQ',
    views: '267K',
  },
  {
    id: 'short10',
    title: 'How to Choose Right College',
    videoId: 'dQw4w9WgXcQ',
    views: '189K',
  },
];

// Shuffle array function
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function VideoHubScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'videos' | 'shorts'>('videos');
  const [videos, setVideos] = useState(videosData);
  const [shorts, setShorts] = useState(shortsData);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeMessage, setShowSubscribeMessage] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    // Simulate loading and shuffle content
    setLoading(true);
    setTimeout(() => {
      setVideos(shuffleArray(videosData));
      setShorts(shuffleArray(shortsData));
      setLoading(false);
    }, 800);
  }, []);

const YOUTUBE_CHANNEL_ID = 'UCLx0Y5AJpHhoh-PjH7EAp1Q';

const handleSubscribe = async () => {
  const url = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}?sub_confirmation=1`;

  try {
    await Linking.openURL(url);
  } catch (e) {
    console.log('Error opening YouTube', e);
  }
};

  const openChannel = () => {
    // Try to open YouTube app first, fallback to browser
    Linking.openURL('https://www.youtube.com/@edu9lvgr');
  };

  const playVideo = (videoId: string) => {
    setVideoLoading(true);
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setVideoLoading(false);
  };

  const renderVideoCard = (video: typeof videosData[0], index: number) => (
    <TouchableOpacity
      key={video.id + index}
      style={styles.videoCard}
      onPress={() => playVideo(video.videoId)}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnailPlaceholder}>
          <Ionicons name="logo-youtube" size={40} color="#FF0000" />
        </View>
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#FFF" />
          </View>
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <View style={styles.channelIcon}>
          <Ionicons name="school" size={18} color="#0FB9B1" />
        </View>
        <View style={styles.videoTextContainer}>
          <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
          <Text style={styles.videoMeta}>Edu9 Career Guidance  |  {video.views} views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderShortCard = (short: typeof shortsData[0], index: number) => (
    <TouchableOpacity
      key={short.id + index}
      style={styles.shortCard}
      onPress={() => playVideo(short.videoId)}
      activeOpacity={0.8}
    >
      <View style={styles.shortThumbnail}>
        <View style={styles.shortPlaceholder}>
          <Ionicons name="logo-youtube" size={32} color="#FF0000" />
        </View>
        <View style={styles.shortPlayOverlay}>
          <View style={styles.shortPlayButton}>
            <Ionicons name="play" size={20} color="#FFF" />
          </View>
        </View>
        <View style={styles.shortsBadge}>
          <Ionicons name="flash" size={12} color="#FFF" />
          <Text style={styles.shortsBadgeText}>Shorts</Text>
        </View>
      </View>
      <Text style={styles.shortTitle} numberOfLines={2}>{short.title}</Text>
      <Text style={styles.shortViews}>{short.views} views</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0B1C2D" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Ionicons name="logo-youtube" size={24} color="#FF0000" />
          <Text style={styles.headerTitle}>Edu9 Video Hub</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Subscribe Success Message */}
      {showSubscribeMessage && (
        <View style={styles.subscribeMessage}>
          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          <Text style={styles.subscribeMessageText}>Subscribed successfully</Text>
        </View>
      )}

      {/* Channel Banner */}
      <View style={styles.channelBanner}>
        <View style={styles.channelAvatar}>
          <Ionicons name="school" size={28} color="#0FB9B1" />
        </View>
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>Edu9 Career Guidance</Text>
          <Text style={styles.channelHandle}>@edu9lvgr</Text>
        </View>
        <TouchableOpacity 
          style={[styles.subscribeButton, isSubscribed && styles.subscribedButton]} 
          onPress={handleSubscribe}
        >
          {isSubscribed ? (
            <>
              <Ionicons name="checkmark" size={16} color="#64748B" />
              <Text style={styles.subscribedText}>Subscribed</Text>
            </>
          ) : (
            <>
              <Ionicons name="logo-youtube" size={16} color="#FFF" />
              <Text style={styles.subscribeText}>Subscribe</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.tabActive]}
          onPress={() => setActiveTab('videos')}
        >
          <Ionicons 
            name="videocam" 
            size={20} 
            color={activeTab === 'videos' ? '#FF0000' : '#64748B'} 
          />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.tabTextActive]}>
            Videos ({videos.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'shorts' && styles.tabActive]}
          onPress={() => setActiveTab('shorts')}
        >
          <Ionicons 
            name="flash" 
            size={20} 
            color={activeTab === 'shorts' ? '#FF0000' : '#64748B'} 
          />
          <Text style={[styles.tabText, activeTab === 'shorts' && styles.tabTextActive]}>
            Shorts ({shorts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Video Player Modal */}
      {selectedVideo && (
        <View style={styles.videoPlayerContainer}>
          <View style={styles.videoPlayerHeader}>
            <Text style={styles.videoPlayerTitle}>Now Playing</Text>
            <TouchableOpacity onPress={closeVideo} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#0B1C2D" />
            </TouchableOpacity>
          </View>
          <View style={styles.webviewContainer}>
            {videoLoading && (
              <View style={styles.videoLoadingOverlay}>
                <ActivityIndicator size="large" color="#FF0000" />
              </View>
            )}
            <WebView
  originWhitelist={['*']}
  javaScriptEnabled
  domStorageEnabled
  allowsFullscreenVideo
  mediaPlaybackRequiresUserAction={false}
  source={{
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;background:black;">
          <div id="player"></div>

          <script>
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;
            function onYouTubeIframeAPIReady() {
              player = new YT.Player('player', {
                width: '100%',
                height: '100%',
                videoId: '${selectedVideo}',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  rel: 0,
                  modestbranding: 1
                }
              });
            }
          </script>
        </body>
      </html>
    `,
  }}
  style={styles.webview}
  onLoadEnd={() => setVideoLoading(false)}
/>
          </View>
        </View>
      )}

      {/* Content */}
      {!selectedVideo && (
        <>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF0000" />
              <Text style={styles.loadingText}>Loading videos...</Text>
            </View>
          ) : (
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              {activeTab === 'videos' ? (
                <View style={styles.videosList}>
                  {videos.map((video, index) => renderVideoCard(video, index))}
                </View>
              ) : (
                <View style={styles.shortsGrid}>
                  {shorts.map((short, index) => renderShortCard(short, index))}
                </View>
              )}
              <View style={{ height: 100 }} />
            </ScrollView>
          )}
        </>
      )}

      {/* Fixed Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.channelButton} onPress={openChannel}>
          <Ionicons name="logo-youtube" size={22} color="#FFF" />
          <Text style={styles.channelButtonText}>Visit Edu9 YouTube Channel</Text>
        </TouchableOpacity>
      </View>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B1C2D',
  },
  subscribeMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  subscribeMessageText: {
    color: '#065F46',
    fontSize: 14,
    fontWeight: '600',
  },
  channelBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  channelAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelInfo: {
    flex: 1,
    marginLeft: 12,
  },
  channelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0B1C2D',
  },
  channelHandle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  subscribedButton: {
    backgroundColor: '#E2E8F0',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  subscribedText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabActive: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FF0000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FF0000',
  },
  videoPlayerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  videoPlayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  videoPlayerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1C2D',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  videoLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  videosList: {
    gap: 16,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  thumbnailContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#1F2937',
    position: 'relative',
  },
  thumbnailPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 14,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0B1C2D',
    lineHeight: 20,
  },
  videoMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  shortsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  shortThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#1F2937',
    position: 'relative',
  },
  shortPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  shortPlayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortPlayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
  },
  shortsBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  shortsBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  shortTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0B1C2D',
    padding: 10,
    paddingBottom: 4,
    lineHeight: 18,
  },
  shortViews: {
    fontSize: 11,
    color: '#64748B',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  channelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  channelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
