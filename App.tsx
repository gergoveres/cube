import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import List from "./components/List";

export default function App() {
  const [selectedSide, setSelectedSide] = useState<number>(0);

  return (
    <SafeAreaView style={{flex: 1}}>
      <List activeItem={selectedSide}/>
      <View style={styles.container}>
        <Text>cube container</Text>
      </View>
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
