/**
 * LYSEKIL APP — ROOT NAVIGATION
 * 6 flikar: Hem, Restauranger, Butiker, Evenemang, Karta, Färja
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Utensils, ShoppingBag, Calendar, Map, Ship } from "lucide-react-native";
import { colors } from "./theme";

import HomeScreen from "./screens/HomeScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import ShopsScreen from "./screens/ShopsScreen";
import EventsScreen from "./screens/EventsScreen";
import MapScreen from "./screens/MapScreen";
import FerryScreen from "./screens/FerryScreen";
import PlaceDetailScreen from "./screens/PlaceDetailScreen";
import { I18nProvider } from "./i18n";

// Cast needed because PlaceDetailScreen uses route.params which isn't in the generic FunctionComponent<{}>
const PlaceDetail = PlaceDetailScreen as React.ComponentType<any>;

const Tab = createBottomTabNavigator();
const RestaurantStack = createNativeStackNavigator();
const ShopStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();

function RestaurantsTab() {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
      <RestaurantStack.Screen name="PlaceDetail" component={PlaceDetail} />
    </RestaurantStack.Navigator>
  );
}

function ShopsTab() {
  return (
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="ShopsList" component={ShopsScreen} />
      <ShopStack.Screen name="PlaceDetail" component={PlaceDetail} />
    </ShopStack.Navigator>
  );
}

function MapTab() {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="MapMain" component={MapScreen} />
      <MapStack.Screen name="PlaceDetail" component={PlaceDetail} />
    </MapStack.Navigator>
  );
}

const TAB_ICON_SIZE = 22;

export default function App() {
  return (
    <I18nProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: 72,
              paddingBottom: 10,
              paddingTop: 6,
              backgroundColor: colors.white,
              borderTopColor: "rgba(0,0,0,0.07)",
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: colors.seaBlue,
            tabBarInactiveTintColor: colors.driftwood,
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "600",
              marginTop: 2,
            },
            tabBarIcon: ({ color }) => {
              switch (route.name) {
                case "Hem":           return <Home size={TAB_ICON_SIZE} color={color} />;
                case "Restauranger":  return <Utensils size={TAB_ICON_SIZE} color={color} />;
                case "Butiker":       return <ShoppingBag size={TAB_ICON_SIZE} color={color} />;
                case "Evenemang":     return <Calendar size={TAB_ICON_SIZE} color={color} />;
                case "Karta":         return <Map size={TAB_ICON_SIZE} color={color} />;
                case "Färja":         return <Ship size={TAB_ICON_SIZE} color={color} />;
                default:              return <Home size={TAB_ICON_SIZE} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Hem"          component={HomeScreen} />
          <Tab.Screen name="Restauranger" component={RestaurantsTab} />
          <Tab.Screen name="Butiker"      component={ShopsTab} />
          <Tab.Screen name="Evenemang"    component={EventsScreen} />
          <Tab.Screen name="Karta"        component={MapTab} />
          <Tab.Screen name="Färja"        component={FerryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </I18nProvider>
  );
}
