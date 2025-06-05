import { createContext, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Define the interface for our local storage context
interface LocalStoreContextType {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

// Create the context with undefined as default value
const LocalStoreContext = createContext<LocalStoreContextType | undefined>(
  undefined,
);

// Implementation of storage functions
const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error getting item from storage:", error);
    return null;
  }
};

const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item in storage:", error);
  }
};

const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from storage:", error);
  }
};

const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

// Provider component
export const LocalStoreProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    getItem,
    setItem,
    removeItem,
    clear,
  };
  return (
    <LocalStoreContext.Provider value={value}>
      {children}
    </LocalStoreContext.Provider>
  );
};

// Hook to use the context
export const useLocalStore = (): LocalStoreContextType => {
  const context = useContext(LocalStoreContext);
  if (context === undefined) {
    throw new Error("useLocalStore must be used within a LocalStoreProvider");
  }
  return context;
};
