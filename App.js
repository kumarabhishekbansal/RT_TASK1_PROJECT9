import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Posts from "./screens/Posts";
import PostDetail from "./screens/PostDetail";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import PostForm from "./screens/PostForm";
import AppContext from "./context/AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigationRef } from "./routing";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          const iconName =
            (route.name === "Posts" && "feed") ||
            (route.name === "PostForm" && "plus-square") ||
            (route.name === "Profile" && "user");
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostForm"
        component={PostForm}
        options={{ headerShown: false, tabBarLabel: "Add post" }}
      />
    </Tab.Navigator>
  );
}

function Navigator() {
  const { user, getToken } = useContext(UserContext);
  useEffect(() => {
    getToken();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={user.token.length ? "Home" : "Login"}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}
        />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ActionSheetProvider>
      <AppContext>
        <Navigator />
      </AppContext>
    </ActionSheetProvider>
  );
}
