import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { router, useFocusEffect, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result?.includes("keep")) {
        return JSON.parse(result?.split("keep")[0])
    } else {
        return result
    }
}

const MakePayment = () => {

    const selector = useSelector(state => state.LicenceData.data)

    const [loader, setLoader] = useState(false);

    const [amount, setAmount] = useState("")
    const [amountError, setAmountError] = useState(false);
    const [message, setMessage] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setLoader(false)
                setAmountError(false)
                setAmount("")
                setMessage("")
            }
        }, [])
    )

    const path = usePathname()
    const [userDetails, setUserDetails] = useState({ data: { id: 0 } });

    useEffect(() => {
        getValueFor("userDetails").then((response) => { setUserDetails(response) }).catch((error) => { console.log(error) })
    }, [])

    const handleMakePayment = () => {
        try {
            if (amount !== "" && +amount > 0) {
                const payload = {
                    amount: +amount,
                    employee_id: userDetails?.data.id,
                    business_id: +path?.split("MakePayment/")[1],
                    created_by: 1,
                    updated_by: 1
                }
                setLoader(true)
                axios.post('http://207.180.226.46:3456/api/v1/transactions/store', payload)
                    .then((response) => {
                        setLoader(false)
                        if (response.data.code === 201) {
                            setMessage("Transaction Completed successfully...")
                            setTimeout(() => {
                                router.push("/(tabs)/pages/Main")
                            }, 2000)
                        } else {
                            setMessage("Failed, please contact admin")
                        }
                    })
                    .catch((error) => {
                        setLoader(false)
                        if (JSON.stringify(error).includes("401")) {
                            setMessage("Failed, please contact admin")
                        } else {
                            setMessage("Error, please check your internet connection!")
                        }
                    })
            } else {
                setAmountError(true)
            }
        } catch (error) {
            setAmountError(true)
        }
    }

    return (
        <View className='flex justify-center items-center h-full'>
            <View className='mb-10'>
                <Text className='text-2xl'>
                    Municipal Licence App
                </Text>
            </View>

            <View className='p-8 w-full max-w-sm flex items-center'>
                <Text className='w-[80%] text-sm text-center font-bold mb-4 text-slate-900 flex justify-center'>
                    Business details
                </Text>
                <View className='flex flex-col justify-center items-center ml-4 w-full mb-2'>
                    <View className='flex flex-row'>
                        <Text className='w-[25%]'>Name:</Text>
                        <Text className='w-[75%]'>{selector?.data?.name}</Text>
                    </View>
                    <View className='flex flex-row mt-1 w-full'>
                        <Text className='w-[25%]'>Address:</Text>
                        <Text className='flex flex-wrap w-[75%]'>{selector?.data?.address}</Text>
                    </View>
                    <View className='flex flex-row mt-1'>
                        <Text className='w-[25%]'>Code:</Text>
                        <Text className='w-[75%]'>{selector?.data?.code}</Text>
                    </View>
                    <View className='flex flex-row mt-1'>
                        <Text className='w-[25%]'>Status:</Text>
                        <Text className={`w-[75%]`}>{selector?.data?.status !== null ? selector?.data?.status : "Status not available!"}</Text>
                    </View>
                </View>

                {message !== "" && !loader &&
                    <Text className={`mt-2 mb-4 border shadow-md border-slate-200 rounded-md text-center p-2 ${!message.includes("successfully") ? "text-red-500 bg-red-100" : "bg-green-400"}`}>
                        {message}
                    </Text>}

                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${amountError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <MaterialIcons name="attach-money" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter amount"
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                        onFocus={() => { setAmountError(false) }}
                    />
                </View>
                {amountError && <Text className='text-red-500 text-xs '>Please Enter a valid number input!</Text>}
                <TouchableOpacity
                    onPress={() => {
                        if (!loader) {
                            handleMakePayment()
                        }
                    }}
                    className={`h-12 mt-6 w-full ${loader && "bg-blue-100"} ${amountError ? "border-red-400 bg-red-300" : "border-slate-200"} border border-slate-200 rounded-md flex flex-row justify-center items-center px-6`}
                >
                    <View className={`flex-1 flex flex-row justify-center items-center ${loader && "bg-blue-100"} ${amountError ? "border-red-400" : "border-slate-200"}`}>
                        {loader && <ActivityIndicator size="small" color="blue" className='mr-8' />}
                        <Text className='dark:text-white text-base font-medium'>{loader ? "Processing..." : "Submit"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default MakePayment