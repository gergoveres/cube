import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItemProps } from "../models/list.interface";

const ListItem: FC<ListItemProps> = ({ id, label, height, active }) => {
  return (
    <View style={{ ...styles.container, height }}>
      <Text>
        {label}, {id}, {active ? 'true' : 'false'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
