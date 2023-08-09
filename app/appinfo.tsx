import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function AppInfo() {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-xl font-bold'>
        App still in dev mode!
      </Text>
      <Text className='text-sm font-semibold mt-8'>
        Stay in-tune for an amazing experience!
      </Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}