import { useEffect, useRef, type PropsWithChildren } from 'react';
import { Animated, Platform } from 'react-native';

interface FadeInViewProps extends PropsWithChildren {
  delay?: number;
}

export function FadeInView({ children, delay = 0 }: FadeInViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        delay,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        delay,
        useNativeDriver,
      }),
    ]).start();
  }, [delay, opacity, translateY, useNativeDriver]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}>
      {children}
    </Animated.View>
  );
}