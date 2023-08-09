import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Main = () => {
    return (
        <View className='flex justify-center items-center h-full'>
            <View className='mb-10'>
                <Text className='text-xl'>
                    Municipal Licence App
                </Text>
            </View>

            <View className='p-8 w-full max-w-sm'>
                <Link href="/Scanner" asChild>
                    <Pressable
                        className='h-12 border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                    >
                        <View className='flex-1 flex items-center'>
                            <Text className='dark:text-white text-base font-medium'>Check business status</Text>
                        </View>
                    </Pressable>
                </Link>
                <Pressable
                    className='h-12 mt-4 border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                >d
                    <View className='flex-1 flex items-center'>
                        <Text className='dark:text-white text-base font-medium'>Make payment</Text>
                    </View>
                </Pressable>
                <Pressable
                    className='h-12 mt-4 border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                >
                    <View className='flex-1 flex items-center'>
                        <Text className='dark:text-white text-base font-medium'>Register business</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default Main