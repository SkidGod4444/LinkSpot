import { View, Text } from 'react-native'
import React from 'react'
import { usePerms } from '@/contexts/perms.context';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NearBy() {
  const { locationPermission, requestLocationPermission } = usePerms();
  console.log("Location Permission:", locationPermission);
  // Request location permission if not granted
  if (locationPermission !== 'granted') {
    requestLocationPermission();
  }

  return (
    <SafeAreaView>
      <Text>NearBy</Text>
    </SafeAreaView>
  )
}