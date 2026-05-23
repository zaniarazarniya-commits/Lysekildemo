/**
 * LYSEKIL GUIDE APP — ROOT NAVIGATION
 * Expo + React Navigation (Bottom Tabs)
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Compass,
    Map,
    Utensils,
    Ship,
    Menu,
} from "lucide-react-native";
import { colors } from "./theme";

/* Screens */
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./components/MapScreen";

/* Features (also serve as tab screens) */
import CoastWeather from "./features/CoastWeather";
import FerryDirect from "./features/FerryDirect";
import HarborLive from "./features/HarborLive";

/* ── Tab Navigator ── */
const Tab = createBottomTabNavigator();

/* Simple placeholder for Lunch tab */
function LunchScreen() {
    return (
        <CoastWeather />
    );
}

/* Simple placeholder for More tab */
function MoreScreen() {
    return (
        <HarborLive />
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        height: 72,
                        paddingBottom: 8,
                        backgroundColor: colors.foamWhite,
                        borderTopColor: "rgba(0,0,0,0.06)",
                        borderTopWidth: 1,
                    },
                    tabBarActiveTintColor: colors.seaBlue,
                    tabBarInactiveTintColor: colors.graniteGrey,
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: "600",
                        marginTop: 2,
                    },
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                        switch (route.name) {
                            case "Upptäck":
                                return <Compass size={size} color={color} />;
                            case "Karta":
                                return <Map size={size} color={color} />;
                            case "Lunch":
                                return <Utensils size={size} color={color} />;
                            case "Maritimt":
                                return <Ship size={size} color={color} />;
                            case "Mer":
                                return <Menu size={size} color={color} />;
                            default:
                                return <Compass size={size} color={color} />;
                        }
                    },
                })}
            >
                <Tab.Screen name="Upptäck" component={HomeScreen} />
                <Tab.Screen name="Karta" component={MapScreen} />
                <Tab.Screen name="Lunch" component={LunchScreen} />
                <Tab.Screen name="Maritimt" component={FerryDirect} />
                <Tab.Screen name="Mer" component={MoreScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
