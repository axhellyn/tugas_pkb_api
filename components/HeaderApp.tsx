import React from "react";
import { Text, View } from "react-native";

export default function HeaderApp({ title }: { title: string }) {
  return (
    <View className="w-full py-4 bg-white items-center shadow-md absolute left-0 right-0 top-0 z-10">
      <Text className="text-[#1d4ed8] text-base font-bold mt-14 tracking-[6px] text-center">
        {title}
      </Text>
    </View>
  );
}
