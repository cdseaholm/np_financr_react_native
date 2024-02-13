import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Home } from "./MainScreens/Home";
import { Stats } from "./MainScreens/Stats"
import { Goals } from "./MainScreens/Goals"
import { Calendar } from "./MainScreens/Calendar"
import { FontAwesome } from '@expo/vector-icons';
import { UserContext } from "../../components/authHandles/userContext";


export function Homepage() {
  const { user, setUser } = React.useContext(UserContext);
  const Tab = createBottomTabNavigator();
  console.log('Logged In user:', user);
  return (
    <Tab.Navigator
    screenOptions={{tabBarShowLabel: true, 
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        backgroundColor:  "#ffffff",
        borderRadius: 5,
        height: 90,
        alignItems: "center"
    }}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
          tabBarLabel: "Calendar",
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
          tabBarLabel: "Stats",
        }}
      />
      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bullseye" size={size} color={color} />
          ),
          tabBarLabel: "Goals",}} />
    </Tab.Navigator>
  )
}

export default Homepage;
