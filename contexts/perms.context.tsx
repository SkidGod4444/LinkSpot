// contexts/perms.context.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import * as Network from "expo-network";

type PermsContextType = {
  isOnline: boolean;
};

const PermsContext = createContext<PermsContextType>({
  isOnline: true,
});

export const PermsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const checkConnection = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsOnline(
        Boolean(networkState.isConnected && networkState.isInternetReachable),
      );
      //   console.log('Network state:', networkState);
      if (!networkState.isConnected || !networkState.isInternetReachable) {
        console.warn("Network is offline or not reachable");
      }
    } catch (error) {
      setIsOnline(false);
      console.error("Error checking network state:", error);
    }
  };

  useEffect(() => {
    checkConnection();

    const interval = setInterval(() => {
      checkConnection();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PermsContext.Provider value={{ isOnline }}>
      {children}
    </PermsContext.Provider>
  );
};

export const usePerms = () => useContext(PermsContext);
