import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabaseClient';

//all the new changes are here

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Missing details', 'Name, email, and password are required.');
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.log('Supabase signUp error:', signUpError);
        throw signUpError;
      }

      if (!user) {
        console.log('Supabase signUp returned no user');
        throw new Error('Unable to create account. Please try again.');
      }

      const { error: profileError } = await supabase.from('users').insert({
        name,
        email,
        phone: phone || null,
        region: region || null,
        role: 'farmer',
      });

      if (profileError) {
        console.log('Supabase profile insert error:', profileError);
        throw profileError;
      }

      console.log('Registration successful for email:', email);

      Alert.alert('Account created', 'Your account has been created.', [
        {
          text: 'Go to profile',
          onPress: () => router.replace('/profile'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Registration error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create your account
      </ThemedText>
      <View style={styles.form}>
        <ThemedText>Name</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          autoCapitalize="words"
        />

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Phone (optional)</ThemedText>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <ThemedText style={styles.label}>Region (optional)</ThemedText>
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
          placeholder="e.g. KwaZulu-Natal"
        />

        <Pressable style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
              Create account
            </ThemedText>
          )}
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.push('/login')}>
          <ThemedText type="link">Already have an account? Log in</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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

