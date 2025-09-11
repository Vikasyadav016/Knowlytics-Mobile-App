// import { Tabs } from 'expo-router';
import { AuthContext } from "@/auth/authProvider";
import AuthUnVerifiedMainLayout from "@/AuthUnVerifiedLayout/AuthUnVerifiedMainLayout";
import VerifiedAuthMainLayout from "@/AuthVerifiedLayout/VerifiedAuthMainLayout";
import React, { useContext } from "react";

export default function TabLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <VerifiedAuthMainLayout />
      ) : (
        <AuthUnVerifiedMainLayout />
      )}
    </>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: 'absolute',
    //       },
    //       default: {},
    //     }),
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}
