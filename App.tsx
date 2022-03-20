import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import List from "./components/List";
import { Canvas } from "@react-three/fiber/native";
import Cube from "./components/Cube";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

export default function App() {
  const [selectedSide, setSelectedSide] = useState<number>(0);
  const [translationX, setTranslationX] = useState<number>(0);

  const onPanGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    setTranslationX(event.nativeEvent.translationX);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List activeItem={selectedSide} />
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Canvas style={styles.container}>
          <ambientLight />
          <Cube
            activePlaneEmitter={(id: number) => setSelectedSide(id)}
            gestureTranslationX={translationX}
          />
        </Canvas>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
