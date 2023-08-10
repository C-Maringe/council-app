import { View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router, useFocusEffect } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

const Main = () => {

    const [loader, setLoader] = useState(false);
    const [checkBusinessMethod, setCheckBusinessMethod] = useState(false)
    const [showInputMethod, setShowInputMethod] = useState(false)

    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState(false);
    const [message, setMessage] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setLoader(false)
                setCheckBusinessMethod(false)
                setShowInputMethod(false)
                setCodeError(false)
                setCode("")
                setMessage("")
            }
        }, [])
    )

    const handleSearchBusinessType = () => {
        if (code !== "") {
            setLoader(true)
            axios.post('http://207.180.226.46:3456/api/v1/business/search', { code: code })
                .then((response) => {
                    setLoader(false)
                    if (response.data.code === 200) {
                        setMessage("Business details successfully retrieved.")
                        setTimeout(() => {
                            router.push(`/MakePayment/${response.data.data.id}`)
                        }, 2000)
                    } else {
                        setMessage("No matching records found.")
                    }
                })
                .catch((error) => {
                    setLoader(false)
                    if (JSON.stringify(error).includes("401")) {
                        setMessage("No matching records found.")
                    } else {
                        setMessage("Error, please check your internet connection!")
                    }
                })
        } else {
            setCodeError(true)
        }
    }

    return (
        <View className='flex justify-center items-center h-full'>
            <View className='mb-10'>
                <Text className='text-xl'>
                    Municipal Licence App
                </Text>
            </View>

            <View className='p-8 w-full max-w-sm'>
                <Pressable
                    onPress={() => {
                        setCheckBusinessMethod(true)
                    }}
                    className='h-12 border border-slate-200 rounded-md flex flex-row justify-center items-center px-6'
                >
                    <View className='flex-1 flex items-center'>
                        <Text className='dark:text-white text-base font-medium'>Check business status</Text>
                    </View>
                </Pressable>
                {checkBusinessMethod &&
                    <View className='mt-4 w-full max-w-sm flex flex-row justify-between'>
                        <Pressable onPress={() => {
                            router.push("/Scanner")
                        }}
                            className='h-12 w-[49%] border border-slate-200 rounded-md flex flex-row justify-center items-center'>
                            <View className='flex-1 flex items-center'>
                                <Text className='dark:text-white text-base font-medium'>Scan</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setShowInputMethod(true)
                            }}
                            className='h-12 w-[49%] border border-slate-200 rounded-md flex flex-row justify-center items-center '>
                            <View className='flex-1 flex items-center'>
                                <Text className='dark:text-white text-base font-medium'>Enter Type</Text>
                            </View>
                        </Pressable>
                    </View>}
                {message !== "" && !loader && checkBusinessMethod &&
                    <Text className={`mb-4 mt-4 border shadow-md border-slate-200 rounded-md text-center p-2 ${!message.includes("successfully") ? "text-red-500 bg-red-100" : "bg-green-400"}`}>
                        {message}
                    </Text>}
                {checkBusinessMethod && showInputMethod &&
                    <View className={`flex flex-row items-center w-full mt-4 bg-white border ${codeError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                        <AntDesign name="qrcode" size={24} color="black" />
                        <TextInput
                            className='ml-2 border-l pl-2 w-full'
                            placeholderTextColor="#000"
                            placeholder="Enter code"
                            value={code}
                            onChangeText={(text) => setCode(text)}
                            onFocus={() => { setCodeError(false) }}
                        />
                    </View>}
                {codeError && checkBusinessMethod && showInputMethod && <Text className='text-red-500 text-xs ml-12'>Please Enter a valid input!</Text>}
                {checkBusinessMethod && showInputMethod &&
                    <Pressable
                        onPress={() => {
                            if (!loader) {
                                handleSearchBusinessType()
                            }
                        }}
                        className={`h-12 mt-6 w-full ${loader && "bg-blue-100"} ${codeError ? "border-red-400 bg-red-300" : "border-slate-200"} border border-slate-200 rounded-md flex flex-row justify-center items-center px-6`}
                    >
                        <View className={`flex-1 flex flex-row justify-center items-center ${loader && "bg-blue-100"} ${codeError ? "border-red-400 bg-red-300" : "border-slate-200"}`}>
                            {loader && <ActivityIndicator size="small" color="blue" className='mr-8' />}
                            <Text className='dark:text-white text-base font-medium'>{loader ? "Processing..." : "Submit"}</Text>
                        </View>
                    </Pressable>}
                <Pressable
                    onPress={() => {
                        router.push("/RegisterBusiness")
                    }}
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