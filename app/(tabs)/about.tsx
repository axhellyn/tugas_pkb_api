import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

import HeaderApp from "@/components/HeaderApp";

export default function HomeScreen() {
  return (
    <>
      <HeaderApp title="KAJURTREX" />
      <View className="flex justify-center items-center w-full">
        <LinearGradient
          colors={["#3b82f6", "#1d4ed8"]}
          // kalau anda ios, komen di baris bawah unkomenin
          // className="absolute left-0 right-0 bottom-0 top-0 w-full"
        >
          <SafeAreaView className="flex-1 items-center justify-center p-8 w-full"></SafeAreaView>
        </LinearGradient>
      </View>
    </>
  );
}
