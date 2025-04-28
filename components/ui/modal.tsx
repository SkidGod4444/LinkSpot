import {
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
} from "react-native";
import React from "react";

interface ModalProps extends RNModalProps {
  isOpen: boolean;
  withInput?: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  withInput,
  ...props
}: ModalProps) {
  const content = (
    <View className="flex-1 justify-center items-center px-3 bg-zinc-900/60">
      {withInput ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      onRequestClose={onClose}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      {...props}
    >
      {content}
    </RNModal>
  );
}
