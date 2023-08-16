import { Text, View } from '@/components/Themed';
import { Link, useFocusEffect, useNavigation, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

const Login = () => {

  const navigation = useNavigation()
  const [isReady, setIsReady] = useState(false)

  navigation.addListener('state', () => {
    setIsReady(true)
  })

  const path = usePathname()
  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    console.log(result)
    if (result?.includes("keep")) {
      if (path === "/" || path === "") {
        router.push("/(tabs)/pages/Main")
      }
    }
  }

  useEffect(() => {
    if (isReady) {
      getValueFor("userDetails")
    }
  }, [isReady])

  const [isChecked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setChecked(false)
        setLoader(false)
        setPhoneNumberError(false)
        setPasswordError(false)
        setPhoneNumber("")
        setPassword("")
        setMessage("")
        getValueFor("userDetails")
      }
    }, [])
  )

  const handleLogin = () => {
    if (phoneNumber === "" && password === "") {
      setPasswordError(true)
      setPhoneNumberError(true)
    }
    else if (phoneNumber !== "") {
      if (password !== "") {
        setLoader(true)
        axios.post('http://207.180.226.46:3456/api/v1/employee/login', { mobile: phoneNumber, pin: password })
          .then((response) => {
            setLoader(false)
            if (response.data.message === "success") {
              setMessage("Login successful")
              setTimeout(() => {
                router.push("/(tabs)/pages/Main")
              }, 2000)
              if (isChecked) {
                save("userDetails", JSON.stringify(response.data) + "keep");
              } else {
                save("userDetails", JSON.stringify(response.data));
              }
            } else {
              setMessage("Login failed, incorrect pin or phone number!")
            }
          })
          .catch((error) => {
            setLoader(false)
            if (JSON.stringify(error).includes("401")) {
              setMessage("Login failed, incorrect pin or phone number!")
            } else {
              setMessage("Login failed, please check your internet connection!")
            }
          })
      } else {
        setPasswordError(true)
      }
    } else {
      setPhoneNumberError(true)
    }
  }

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
        {message !== "" && !loader &&
          <Text className={`mb-4 border shadow-md border-slate-200 rounded-md text-center p-2 ${message.includes("failed") ? "text-red-500 bg-red-100" : "bg-green-400"}`}>
            {message}
          </Text>}
        <View className={`flex flex-row items-center w-full bg-white border ${phoneNumberError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 focus:border-blue-400 focus:shadow-md`}>
          <Feather name="phone-forwarded" size={24} color="black" />
          <TextInput
            className='ml-2 border-l pl-2 w-full'
            placeholderTextColor="#000"
            placeholder="Enter phone number"
            value={phoneNumber}
            keyboardType='number-pad'
            onChangeText={(text) => setPhoneNumber(text)}
            onFocus={() => { setPhoneNumberError(false) }}
          />
        </View>
        {phoneNumberError && <Text className='text-red-500 text-xs ml-12'>Invalid Phone number</Text>}
        <View className={`flex flex-row items-center w-full bg-white border ${passwordError ? "border-red-500" : "border-slate-200"}  rounded-md h-12 px-2 mt-6 focus:border-blue-400 focus:shadow-md`}>
          <MaterialIcons name="lock-outline" size={24} color="black" />
          <TextInput
            onFocus={() => { setPasswordError(false) }}
            className='ml-2 border-l pl-2 w-full'
            placeholderTextColor="#000"
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {passwordError && <Text className='text-red-500 text-xs ml-12'>Password too short</Text>}

        <View className='flex flex-row justify-between items-center my-8'>
          <View className='flex-row items-center'>
            <Checkbox
              className='m-2'
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? 'blue' : undefined}
            />
            <TouchableOpacity
              onPress={() => {
                if (!isChecked) {
                  setChecked(true)
                } else {
                  setChecked(false)
                }
              }}>
              <Text className='dark:text-white text-slate-900'>Remember me</Text>
            </TouchableOpacity>
          </View>
          <Link href="/(tabs)/auth/ForgotPassword" asChild>
            <TouchableOpacity>
              <Text className='dark:text-white text-blue-400 font-bold'>Reset password</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!loader) {
              handleLogin();
            }
          }}
          className={`h-12 border ${loader && "bg-blue-100"} ${passwordError || phoneNumberError ? "border-red-400 bg-red-300" : "border-slate-200"} rounded-md flex flex-row justify-center items-center px-6`}
        >
          <View className={`flex-1 flex flex-row justify-center items-center ${passwordError || phoneNumberError ? "border-red-400 bg-red-300" : "border-slate-200"}`}>
            {loader && <ActivityIndicator size="small" color="blue" className='mr-8' />}
            <Text className={`dark:text-white text-base font-medium `}>{loader ? "Processing..." : "Login"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;