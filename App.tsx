import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import List from "./components/List";
import { Canvas } from "@react-three/fiber/native";
import Cube from "./components/Cube";

export default function App() {
  const [selectedSide, setSelectedSide] = useState<number>(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List activeItem={selectedSide} />
      <Canvas style={styles.container}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube
          position={[1, 0, 0]}
          activePlaneEmitter={(id: number) => setSelectedSide(id)}
        />
      </Canvas>
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
