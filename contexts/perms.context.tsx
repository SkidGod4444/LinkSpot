// contexts/perms.context.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import * as Network from "expo-network";
import * as Location from 'expo-location';
import { useLocalStore } from "./localstore.context";

type PermsContextType = {
  isOnline: boolean;
  locationPermission: Location.PermissionStatus | null;
  requestLocationPermission: () => Promise<void>;
};

const PermsContext = createContext<PermsContextType>({
  isOnline: true,
  locationPermission: null,
  requestLocationPermission: async () => {},
});

export const PermsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {getItem, setItem} = useLocalStore();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);

  const checkConnection = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      const online = Boolean(networkState.isConnected && networkState.isInternetReachable);
      setIsOnline(online);
      await setItem("isOnline", online.toString());
      if (!networkState.isConnected || !networkState.isInternetReachable) {
        console.warn("Network is offline or not reachable");
      }
    } catch (error) {
      setIsOnline(false);
      await setItem("isOnline", "false");
      console.error("Error checking network state:", error);
    }
  };

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(status);
    } catch (error) {
      console.error("Error checking location permission:", error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  useEffect(() => {
    const initializeState = async () => {
      const storedOnline = await getItem("isOnline");
      if (storedOnline !== null) {
        setIsOnline(storedOnline === "true");
      }
      await checkConnection();
      await checkLocationPermission();
    };

    initializeState();

    const interval = setInterval(() => {
      checkConnection();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PermsContext.Provider value={{ 
      isOnline, 
      locationPermission,
      requestLocationPermission 
    }}>
      {children}
    </PermsContext.Provider>
  );
};

export const usePerms = () => useContext(PermsContext);
