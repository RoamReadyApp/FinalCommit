import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs } from "expo-router";
export default function TabLayout() {

  return (
    
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Stack />
      <Tabs.Screen
        name="app"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: "profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}