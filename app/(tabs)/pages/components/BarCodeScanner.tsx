import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Redirect, router, useFocusEffect, useNavigation } from 'expo-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function BarCodeScannerCom() {

  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoader(false)
        setScanned(false)
        setMessage("")
      }
    }, [])
  )

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setLoader(true);
    const resultString = data.split("\n")[0] || ""
    setMessage("Qr code detected, processing...")
    axios.post('http://207.180.226.46:3456/api/v1/business/search', { code: resultString })
      .then((response) => {
        setLoader(false)
        if (response.data.code === 200) {
          dispatch({ type: "DISPATCH_LICENCE_DATA", payload: response.data })
          setMessage("Business details successfully retrieved.")
          setTimeout(() => {
            setScanned(false)
            router.push(`/MakePayment/${response.data.data.id}`)
          }, 2000)
        } else {
          setMessage("No matching records found.")
          setTimeout(() => {
            setScanned(false)
          }, 2000)
        }
      })
      .catch((error) => {
        setLoader(false)
        if (JSON.stringify(error).includes("401")) {
          setMessage("No matching records found.")
        } else {
          setMessage("Error, please check your internet connection!")
        }
        setTimeout(() => {
          setScanned(false)
        }, 2000)
      })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View className='flex-1 flex-col justify-center'>
      <BarCodeScanner className='min-w-full max-h-full'
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned &&
        <View className='z z-50 bg-white flex flex-row justify-center items-center rounded-md m-8 p-4 transition-all duration-1000 ease-in-out'>
          {loader && <ActivityIndicator size={40} color="blue" className='mr-8' />}
          <Text>
            {message}
          </Text>
        </View>}
    </View>
  );
}
