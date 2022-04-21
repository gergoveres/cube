import { useRef, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import List from "./components/List";
import { Canvas } from "@react-three/fiber/native";
import Cube from "./components/Cube";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { Group } from "three";

export default function App() {
  const [selectedSide, setSelectedSide] = useState<number>(0);
  const cubeRef = useRef<Group>(null);
  const prevTransXRef = useRef<number>(0);
  const rotationDegree = Math.PI / 45;

  const onPanGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    if (cubeRef.current) {
      event.nativeEvent.translationX > prevTransXRef.current
        ? (cubeRef.current.rotation.y += rotationDegree)
        : (cubeRef.current.rotation.y -= rotationDegree);

      prevTransXRef.current = event.nativeEvent.translationX;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List activeItem={selectedSide} />
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Canvas style={styles.container}>
          <ambientLight />
          <Cube
            activePlaneEmitter={(id: number) => setSelectedSide(id)}
            ref={cubeRef}
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
