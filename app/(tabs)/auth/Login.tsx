import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

const Login = () => {

  const [isChecked, setChecked] = useState(false);

  return (
    <View className='flex justify-center items-center h-full'>
      <View className='mb-10'>
        <Text className='text-2xl'>
          Municipal Licence App
        </Text>
      </View>

      <View className='p-8 w-full max-w-sm'>
        <Text className='w-full text-sm text-center font-bold mb-6 text-slate-900 flex justify-center'>
          Enter your credidentials to login
        </Text>

        <TextInput
          className='w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4'
          placeholderTextColor="#000"
          placeholder="Enter phone number"
        />

        <TextInput
          className='w-full bg-white border border-slate-200 rounded-md h-12 px-4'
          placeholderTextColor="#000"
          placeholder="Enter password"
        />

        <View className='flex flex-row justify-between items-center my-8'>
          <View className='flex-row items-center'>
            <Checkbox
              className='m-2'
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? 'blue' : undefined}
            />
            <Pressable
              onPress={() => {
                if (!isChecked) {
                  setChecked(true)
                } else {
                  setChecked(false)
                }
              }}>
              <Text className='dark:text-white text-slate-900'>Remember me</Text>
            </Pressable>
          </View>
          <Link href="/(tabs)/auth/ForgotPassword" asChild>
            <Pressable>
              <Text className='dark:text-white text-blue-400 font-bold'>Reset password</Text>
            </Pressable>
          </Link>
        </View>
        <Link href="/(tabs)/pages/Main" asChild>
          <Pressable
            className='h-12 border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
          >
            <View className='flex-1 flex items-center'>
              <Text className='dark:text-white text-base font-medium'>Login</Text>
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

export default Login;