import { Link, router, useFocusEffect } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'

const ForgotPassword = () => {

    const [showToDoMessage, setShowToDoMessage] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setShowToDoMessage(false)
            }
        }, [])
    )

    const handleForgotPassword = () => {
        setShowToDoMessage(true)
        setTimeout(() => {
            router.push("/")
        }, 3000)
    }

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
                {showToDoMessage &&
                    < Text className={`mb-4 border shadow-md border-slate-200 rounded-md text-center p-2 text-red-500 bg-red-100`}>
                        Sorry service not yet implemented!
                    </Text>}

                <TextInput
                    className='w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4'
                    placeholderTextColor="#000"
                    placeholder="Enter phone number"
                />
                <Pressable
                    onPress={() => {
                        handleForgotPassword()
                    }}
                    className='h-12 mt-10 w-[80%] border bg-red-100 border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                >
                    <View className='flex-1 flex items-center bg-red-100'>
                        <Text className='dark:text-white text-base font-medium'>Reset Password</Text>
                    </View>
                </Pressable>
            </View>
        </View >
    )
}

export default ForgotPassword