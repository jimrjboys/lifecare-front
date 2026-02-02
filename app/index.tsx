import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  
  const handlePress = () => {
    console.log('Button pressed, attempting to navigate to /(auth)/login');
    try {
      router.push('/(auth)/login');
    } catch (error) {
      console.error('Navigation error:', error);
      if (Platform.OS !== 'web') {
        Alert.alert('Navigation Error', String(error));
      } else {
        alert('Navigation Error: ' + String(error));
      }
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>LifeCare Welcome</Text>
      <TouchableOpacity 
        onPress={handlePress}
        style={{ padding: 15, backgroundColor: '#0077B6', borderRadius: 8 }}
      >
        <Text style={{ color: '#fff' }}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
