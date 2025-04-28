import React, { useEffect, useState } from "react";
import { ViewStyle, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface BlurFadeProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  style?: ViewStyle;
}

export function BlurFade({
  children,
  duration = 1000,
  delay = 0,
  offset = 10,
  direction = "up",
  style,
}: BlurFadeProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    if (!layoutReady) return;

    // set initial offset
    switch (direction) {
      case "up":
        translateY.value = offset;
        break;
      case "down":
        translateY.value = -offset;
        break;
      case "left":
        translateX.value = offset;
        break;
      case "right":
        translateX.value = -offset;
        break;
      default:
        translateY.value = -offset;
    }

    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration });
      translateX.value = withTiming(0, { duration });
      translateY.value = withTiming(0, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    layoutReady,
    delay,
    duration,
    direction,
    offset,
    opacity,
    translateX,
    translateY,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setLayoutReady(true);
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[animatedStyle, { overflow: "hidden" }, style]}
    >
      {children}
    </Animated.View>
  );
}
