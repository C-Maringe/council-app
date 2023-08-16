import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';

const RegisterBusiness = () => {

    const [loader, setLoader] = useState(false);

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false);
    const [address, setAddress] = useState("")
    const [addressError, setAddressError] = useState(false);

    const [type, setType] = useState("")
    const [typeError, setTypeError] = useState(false);
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false);

    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState(false);
    const [geo_location, setGeo_location] = useState("")
    const [geo_locationError, setGeo_locationError] = useState(false);

    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState(false);

    const payload = {
        name: name,
        address: address,
        type: type,
        email: email,
        code: code,
        geo_location: geo_location,
        phone: phone
    }


    const [message, setMessage] = useState("");

    const handleRegisterBusiness = () => {
        if (name === "" && address === "" && type === "" && email === "" && code === "" && geo_location === "" && phone === "") {
            setNameError(true)
            setAddressError(true)
            setTypeError(true)
            setEmailError(true)
            setCodeError(true)
            setGeo_locationError(true)
            setPhoneError(true)
        } else if (name !== "") {
            if (address !== "") {
                if (type !== "") {
                    if (email !== "") {
                        if (code !== "") {
                            if (geo_location !== "") {
                                if (phone !== "") {
                                    setLoader(true)
                                    axios.post('http://207.180.226.46:3456/api/v1/business/register', payload)
                                        .then((response) => {
                                            setLoader(false)
                                            if (response.data.code === 201) {
                                                setMessage("Business registered successfully")
                                                setTimeout(() => {
                                                    router.push("/(tabs)/pages/Main")
                                                }, 2000)
                                            } else {
                                                setMessage("Business registration failed")
                                            }
                                        })
                                        .catch((error) => {
                                            setLoader(false)
                                            if (JSON.stringify(error).includes("401")) {
                                                setMessage("Business registration failed")
                                            } else {
                                                setMessage("Error, please check your internet connection!")
                                            }
                                        })
                                } else {
                                    setPhoneError(true)
                                }
                            } else {
                                setGeo_locationError(true)
                            }
                        } else {
                            setCodeError(true)
                        }
                    } else {
                        setEmailError(true)
                    }
                } else {
                    setTypeError(true)
                }
            } else {
                setAddressError(true)
            }
        } else {
            setNameError(true)
        }

    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View className='p-8 w-full max-w-sm flex items-center'>
                <Text className='w-[80%] text-sm text-center font-bold mb-6 text-slate-900 flex justify-center'>
                    Businness details
                </Text>
                
                {message !== "" && !loader &&
                    <Text className={`mb-4 border shadow-md border-slate-200 rounded-md text-center p-2 ${!message.includes("registered") ? "text-red-500 bg-red-100" : "bg-green-400"}`}>
                        {message}
                    </Text>}

                <View className={`flex flex-row items-center w-full bg-white border ${nameError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <Ionicons name="business" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        onFocus={() => { setNameError(false) }}
                    />
                </View>
                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${addressError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <Entypo name="address" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        onFocus={() => { setAddressError(false) }}
                    />
                </View>
                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${typeError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <Feather name="type" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter type"
                        value={type}
                        onChangeText={(text) => setType(text)}
                        onFocus={() => { setTypeError(false) }}
                    />
                </View>
                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${emailError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <Fontisto name="email" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onFocus={() => { setEmailError(false) }}
                    />
                </View>
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
                </View>
                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${geo_locationError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <EvilIcons name="location" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter geo location"
                        value={geo_location}
                        onChangeText={(text) => setGeo_location(text)}
                        onFocus={() => { setGeo_locationError(false) }}
                    />
                </View>
                <View className={`flex flex-row items-center w-full mt-4 bg-white border ${phoneError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
                    <Feather name="phone-forwarded" size={24} color="black" />
                    <TextInput
                        className='ml-2 border-l pl-2 w-full'
                        placeholderTextColor="#000"
                        placeholder="Enter phone"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        onFocus={() => { setPhoneError(false) }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (!loader) {
                            handleRegisterBusiness()
                        }
                    }}
                    className={`h-12 mt-6 w-full ${loader && "bg-blue-100"} ${nameError || phoneError || typeError || codeError || geo_locationError || addressError || emailError ? "border-red-400 bg-red-300" : "border-slate-200"} border border-slate-200 rounded-md flex flex-row justify-center items-center px-6`}
                >
                    <View className={`flex-1 flex flex-row justify-center items-center ${loader && "bg-blue-100"} ${nameError || phoneError || typeError || codeError || geo_locationError || addressError || emailError ? "border-red-400 " : "border-slate-200"}`}>
                        {loader && <ActivityIndicator size="small" color="blue" className='mr-8' />}
                        <Text className='dark:text-white text-base font-medium'>{loader ? "Processing..." : "Submit"}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        </ScrollView>
    )
}

export default RegisterBusiness