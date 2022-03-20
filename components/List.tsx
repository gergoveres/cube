import React, { FC, useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ListItemProps } from "../models/list.interface";
import ListItem from "./ListItem";

const List: FC<{activeItem: number}> = ({activeItem}) => {
  const listItems: Omit<ListItemProps, "height" | "active">[] =
    [
      { id: 1, label: "1. oldal" },
      { id: 2, label: "2. oldal" },
      { id: 3, label: "3. oldal" },
      { id: 4, label: "4. oldal" },
      { id: 5, label: "5. oldal" },
      { id: 6, label: "6. oldal" },
    ];
  const [listItemHeight, setListItemHeight] = useState<number>(0);
  const [ref, setRef] = useState<ScrollView | null>(null);

  useEffect(() => {
    if(activeItem > 0) {
      scrollHandler(listItemHeight * (activeItem -1));
    } else {
      scrollHandler(0);
    }
  }, [activeItem]);

  const scrollHandler = (yPosition: number): void => {
    ref?.scrollTo({
      y: yPosition,
      animated: true,
    });
  };

  return (
    <ScrollView
      ref={(ref) => {
        setRef(ref);
      }}
      style={styles.scrollContainer}
      onLayout={(event) => {
        const scrollViewHeight = event.nativeEvent.layout.height;
        setListItemHeight(scrollViewHeight / 3);
      }}
    >
      {listItems.map((listItem) => (
        <ListItem
          {...listItem}
          active={activeItem === listItem.id}
          height={listItemHeight}
          key={listItem.id}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FAEBD7",
  },
});

export default List;
