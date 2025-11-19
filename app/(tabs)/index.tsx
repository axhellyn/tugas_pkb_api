import fetchLocation from "@/services/fetchLocation";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

import HeaderApp from "@/components/HeaderApp";

export default function HomeScreen() {
  const [data, setData] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatUpdate = (timestamp: any) => {
    if (!timestamp || timestamp.length !== 12) {
      return "Invalid date";
    }
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);

    const dateObj = new Date(year, month - 1, day, hour, minute);
    return dateObj.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getLocationData = async () => {
    try {
      const response = await fetchLocation();
      setData(response);
    } catch (e: any) {
      setError(e);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetchLocation();
      setData(response);
      setError(null);
    } catch (e: any) {
      setError(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getLocationData();
  }, []);

  if (error) {
    return (
      <LinearGradient colors={["#991B1B", "#7F1D1D"]} className="flex-1">
        <SafeAreaView className="flex-1" edges={["left", "right", "bottom"]}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#ffffff"
              />
            }
          >
            <Feather name="alert-triangle" size={48} color="white" />
            <Text className="text-white text-2xl font-bold mt-4">
              Terjadi Kesalahan
            </Text>
            <Text className="text-white text-center mt-2 px-4">
              {error?.message}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#3b82f6", "#1d4ed8"]} className="flex-1">
      <StatusBar hidden={true} />

      <SafeAreaView className="flex-1" edges={["left", "right", "bottom"]}>
        <ScrollView
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
              colors={["#1d4ed8"]}
              progressViewOffset={40}
            />
          }
        >
          <HeaderApp title="KAJURTREX" />

          <View className="flex-1 justify-center items-center p-8 mt-20">
            <View className="mb-5">
              <Text className="text-3xl font-extrabold text-white">
                Lacak Lokasi Kajur
              </Text>
            </View>
            <View className="bg-white/95 min-w-[340px] items-center rounded-3xl p-8 shadow-2xl">
              <View className="bg-blue-100 p-5 rounded-full mb-6 border-4 border-blue-200">
                <Feather name="map-pin" size={48} color="#1d4ed8" />
              </View>

              <View className="flex flex-row items-center justify-center">
                <Text className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
                  Lokasi Terdeteksi
                </Text>
              </View>

              <Text className="text-gray-900 text-4xl font-extrabold my-2 text-center">
                {data?.location || "Menunggu Data..."}
              </Text>

              <View className="bg-gray-100 px-4 py-2 rounded-full mt-6">
                <Text className="text-gray-600 text-sm">
                  Update: {formatUpdate(data?.updatedAt)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
