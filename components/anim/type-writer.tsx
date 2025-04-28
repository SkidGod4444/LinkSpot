import React, { useEffect, useState, useRef } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useInView } from "react-intersection-observer";

interface TypingAnimationProps {
  text: string; // Changed from children to text prop
  style?: object;
  textStyle?: TextStyle; // Added textStyle prop for Text component
  className?: string;
  duration?: number; // Typing speed (in ms per character)
  delay?: number; // Delay before typing starts
  startOnView?: boolean; // Whether to start typing when in view
}

export const TypingAnimation = ({
  text, // Changed from children to text
  style,
  textStyle,
  className,
  duration = 100,
  delay = 0,
  startOnView = true,
}: TypingAnimationProps) => {
  const [isVisible, setIsVisible] = useState(startOnView);
  const [displayedText, setDisplayedText] = useState("");
  const typingStartedRef = useRef(false); // Ref to track if typing has already started
  const textRef = useRef(text); // Store the original text in a ref to avoid issues

  // Using useInView hook to observe the component visibility
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    // Update the ref when text prop changes
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    if (startOnView && inView) {
      setIsVisible(true);
    }
  }, [startOnView, inView]);

  useEffect(() => {
    if (!isVisible || typingStartedRef.current) return;

    typingStartedRef.current = true; // Mark typing as started
    setDisplayedText(""); // Reset displayed text to ensure clean start

    let currentIndex = 0;
    const fullText = textRef.current;

    // Add delay before starting the typing animation
    const delayTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, duration);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isVisible, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 500 }),
    };
  });

  return (
    <Animated.View
      ref={(node) => {
        if (ref && typeof ref === "object") {
          // @ts-ignore - we need to set the current property
          ref.current = node;
        }
      }}
      style={[styles.container, animatedStyle, style]}
    >
      <Text style={textStyle} className={className}>
        {displayedText}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
