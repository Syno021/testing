import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e6f7ec', dark: '#061710' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <ThemedText type="subtitle" style={styles.pill}>
            AI-powered crop protection
          </ThemedText>
          <ThemedText type="title" style={styles.appName}>
            HarvestGuard
          </ThemedText>
          <ThemedText style={styles.appSubtitle}>
            One home for weather, disease alerts, and farmer knowledge – built to stop crop loss before
            it starts.
          </ThemedText>
          <View style={styles.headerCtas}>
            <Pressable style={styles.primaryCta}>
              <ThemedText type="defaultSemiBold" style={styles.primaryCtaText}>
                Start protecting my fields
              </ThemedText>
            </Pressable>
            <Pressable style={styles.secondaryCta}>
              <ThemedText type="defaultSemiBold" style={styles.secondaryCtaText}>
                View today&apos;s risks
              </ThemedText>
            </Pressable>
          </View>
          <View style={styles.headerMetaRow}>
            <HelloWave />
            <ThemedText style={styles.headerMetaText}>Designed for real farmers, not dashboards.</ThemedText>
          </View>
        </ThemedView>
      }>
      <View style={styles.featuresRow}>
        <View style={styles.featureCard}>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            🌦️ Weather intelligence
          </ThemedText>
          <ThemedText style={styles.featureBody}>
            Hyper-local forecasts tuned to your fields, with AI risk scores for heat, heavy rain, frost,
            and drought.
          </ThemedText>
        </View>
        <View style={styles.featureCard}>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            🌱 Early disease alerts
          </ThemedText>
          <ThemedText style={styles.featureBody}>
            Track plant health and spot unusual patterns early so you can act before pests or disease
            spread.
          </ThemedText>
        </View>
      </View>

      <View style={styles.featuresRow}>
        <View style={styles.featureCard}>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            🤝 Farmer network
          </ThemedText>
          <ThemedText style={styles.featureBody}>
            See what nearby farmers are facing, what worked for them, and which practices fit your crops.
          </ThemedText>
        </View>
        <View style={styles.featureCard}>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            💬 Chat & forums
          </ThemedText>
          <ThemedText style={styles.featureBody}>
            Ask questions, post field photos, and get rapid feedback from experienced growers and
            agronomists.
          </ThemedText>
        </View>
      </View>

      <View style={styles.sectionWide}>
        <ThemedText type="subtitle">Built around the way farmers actually work</ThemedText>
        <ThemedText>
          HarvestGuard turns scattered tools into one simple home screen: today&apos;s risks, field
          insights, and conversations with other farmers – all in one place you can check before you
          step into the field.
        </ThemedText>
      </View>

      <View style={styles.callout}>
        <ThemedText type="defaultSemiBold">
          Reduce surprise losses, plan confidently, and let AI watch the data while you watch your crops.
        </ThemedText>
      </View>

      <View style={styles.authRow}>
        <Pressable style={styles.primaryCta} onPress={() => router.push('/register')}>
          <ThemedText type="defaultSemiBold" style={styles.primaryCtaText}>
            Create account
          </ThemedText>
        </Pressable>
        <Pressable style={styles.secondaryCta} onPress={() => router.push('/login')}>
          <ThemedText type="defaultSemiBold" style={styles.secondaryCtaText}>
            Log in
          </ThemedText>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  appName: {
    fontSize: 40,
    marginBottom: 8,
  },
  appSubtitle: {
    marginTop: 4,
    opacity: 0.9,
  },
  headerCtas: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  primaryCta: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#0a7f3f',
  },
  primaryCtaText: {
    color: '#ffffff',
  },
  secondaryCta: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  secondaryCtaText: {
    opacity: 0.9,
  },
  headerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },
  headerMetaText: {
    opacity: 0.8,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  featureCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(10,127,63,0.03)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
    gap: 6,
  },
  featureTitle: {
    fontSize: 18,
  },
  featureBody: {
    opacity: 0.9,
  },
  sectionWide: {
    marginTop: 32,
    gap: 8,
  },
  callout: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  authRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});

