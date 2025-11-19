import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function SimplePullToRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState(["Item 1", "Item 2", "Item 3"]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setListData((prevData) => [
        `Data Baru ${new Date().toLocaleTimeString()}`,
        ...prevData,
      ]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
});
