import { Link } from 'expo-router'
import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'

const ForgotPassword = () => {
    return (
        <View className='flex justify-center items-center h-full'>
            <View className='mb-10'>
                <Text className='text-2xl'>
                    Municipal Licence App
                </Text>
            </View>

            <View className='p-8 w-full max-w-sm flex items-center'>
                <Text className='w-[80%] text-sm text-center font-bold mb-6 text-slate-900 flex justify-center'>
                    Enter your phone number to reset password
                </Text>

                <TextInput
                    className='w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4'
                    placeholderTextColor="#000"
                    placeholder="Enter phone number"
                />

                <Link href="/" asChild>
                    <Pressable
                        className='h-12 mt-10 w-[80%] border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                    >
                        <View className='flex-1 flex items-center'>
                            <Text className='dark:text-white text-base font-medium'>Reset Password</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}

export default ForgotPassword