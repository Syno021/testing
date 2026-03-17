import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabaseClient';

interface Profile {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  region?: string | null;
  role: 'farmer' | 'agronomist';
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          router.replace('/login');
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, phone, region, role')
          .eq('email', user.email)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data as Profile);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Unable to load profile.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('users')
        .update({
          name: profile.name,
          phone: profile.phone || null,
          region: profile.region || null,
        })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      Alert.alert('Saved', 'Your profile has been updated.');
    } catch (error: any) {
      Alert.alert('Update error', error.message || 'Unable to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!profile) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Profile not found.</ThemedText>
        <Pressable style={styles.primaryButton} onPress={() => router.replace('/login')}>
          <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
            Go to login
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        My profile
      </ThemedText>
      <View style={styles.form}>
        <ThemedText>Name</ThemedText>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput style={styles.input} value={profile.email} editable={false} />

        <ThemedText style={styles.label}>Phone</ThemedText>
        <TextInput
          style={styles.input}
          value={profile.phone || ''}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
          keyboardType="phone-pad"
        />

        <ThemedText style={styles.label}>Region</ThemedText>
        <TextInput
          style={styles.input}
          value={profile.region || ''}
          onChangeText={(text) => setProfile({ ...profile, region: text })}
        />

        <ThemedText style={styles.label}>Role</ThemedText>
        <TextInput style={styles.input} value={profile.role} editable={false} />

        <Pressable style={styles.primaryButton} onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
              Save changes
            </ThemedText>
          )}
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={handleLogout}>
          <ThemedText type="link">Log out</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    gap: 8,
  },
  label: {
    marginTop: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  primaryButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#0a7f3f',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: 'center',
  },
});

