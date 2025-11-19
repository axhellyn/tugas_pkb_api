import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import "../global.css";

import HeaderApp from "@/components/HeaderApp";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <>
      <HeaderApp title="Tentang Aplikasi" />

      <LinearGradient
        colors={["#3b82f6", "#1d4ed8"]}
        className="absolute inset-0 w-full h-full"
      >
        <SafeAreaView className="flex-1 items-center justify-center p-8 w-full">
          <View className="flex-1 items-center justify-center px-6">
            <View className="bg-white/95 min-w-[340px] items-center rounded-3xl p-8 shadow-2xl">
              <Text className="text-gray-900 text-3xl font-bold mb-3 text-center">
                KAJURTREX
              </Text>

              <Text className="text-gray-600 text-center leading-relaxed">
                KAJURTREX adalah aplikasi yang dirancang untuk menemukan lokasi
                kepala jurusan Teknik Informatika, Universitas Sriwijaya.
              </Text>

              <View className="mt-5 border-t border-gray-300 pt-4">
                <Text className="text-gray-500 text-center text-sm">
                  Dibuat dengan cinta menggunakan React Native & Expo
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
