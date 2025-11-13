import "./global.css";
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "http://spidah.my.id/dimana.php";

export default function HomeScreen() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.status === "OK") {
          setData(json);
        } else {
          throw new Error("API status tidak OK");
        }
      } catch (e: any) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#1F2937", "#111827"]}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text className="text-white text-lg mt-4">Memuat data...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={["#991B1B", "#7F1D1D"]}
        className="flex-1 items-center justify-center p-5"
      >
        <Feather name="alert-triangle" size={48} color="white" />
        <Text className="text-white text-2xl font-bold mt-4">
          Terjadi Kesalahan{" "}
        </Text>
        <Text className="text-white text-center mt-2">{error?.message}</Text>
        <Text className="text-white text-center mt-2">{error.message}</Text>
      </LinearGradient>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#3b82f6", "#1d4ed8"]} className="flex-1">
        <SafeAreaView className="flex-1 items-center justify-center p-8">
          <View className="bg-white/95 w-full items-center rounded-3xl p-8 shadow-2xl">
            <View className="bg-blue-100 p-5 rounded-full mb-6 border-4 border-blue-200">
              <Feather name="map-pin" size={48} color="#1d4ed8" />
            </View>

            <Text className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
              Lokasi Terdeteksi
            </Text>

            <Text className="text-gray-900 text-4xl font-extrabold my-2 text-center">
              {data?.location}
            </Text>

            <View className="bg-gray-100 px-4 py-2 rounded-full mt-6">
              <Text className="text-gray-600 text-sm">
                Update: {formatUpdate(data?.updatedAt)}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
