import React, { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ListItemProps } from "../models/list.interface";

const ListItem: FC<ListItemProps> = ({ label, height, active }) => {
  const textAnimationRef = useRef(new Animated.Value(0)).current;
  const animation = Animated.timing(textAnimationRef, {
    toValue: 1,
    delay: 100,
    duration: 400,
    useNativeDriver: false,
  });

  const colorBlackToRed = textAnimationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["black", "red"],
  });

  useEffect(() => {
    if (active) {
      animation.start();
    } else {
      animation.reset();
    }
  }, [active]);

  return (
    <View style={{ ...styles.container, height }}>
      <Animated.Text
        style={{
          ...styles.text,
          color: active ? colorBlackToRed : "black",
        }}
      >
        {label}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ListItem;
