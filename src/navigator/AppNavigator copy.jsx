import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import InitialScreen from "../screens/auth/InitialScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RachaoScreen from "../screens/rachao/RachaoScreen";
import HistoricoScreen from "../screens/historico/HistoricoScreen";
import FinanceiroScreen from "../screens/financeiro/FinanceiroScreen";
import RankingScreen from "../screens/ranking/RankingScreen";
import AjustesScreen from "../screens/ajustes/AjustesScreen";
import AddRachaoScreen from "../screens/rachao/AddRachaoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Initial"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#da733c",
      tabBarInactiveTintColor: "gray",
      tabBarVisible:
        route.name === "Login" || route.name === "Register" ? false : true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Rachao") {
          iconName = focused ? "ios-basketball" : "ios-basketball-outline";
        } else if (route.name === "Historico") {
          iconName = focused ? "ios-list" : "ios-list-outline";
        } else if (route.name === "Financeiro") {
          iconName = focused ? "ios-cash" : "ios-cash-outline";
        } else if (route.name === "Ranking") {
          iconName = focused ? "ios-trophy" : "ios-trophy-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-settings" : "ios-settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="Rachao"
      title="Rachão"
      component={RachaoScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Historico"
      title="Histórico"
      component={HistoricoScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Financeiro"
      title="Financeiro"
      component={FinanceiroScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Ranking"
      title="Ranking"
      component={RankingScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Settings"
      title="Ajustes"
      component={AjustesScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

// const MainDrawer = () => (
//   <Drawer.Navigator>
//     <Drawer.Screen name="MainTabs" component={MainTabs} />
//   </Drawer.Navigator>
// );

const AppNavigator = (isAuthenticated) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainTabs" : "G O A T"}
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#da733c",
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false, title: "Lista de Tarefas" }}
        />
        {/* <Stack.Screen name="MainDrawer" component={MainDrawer} /> */}

        <Stack.Screen
          name="AddRachaoScreen"
          component={AddRachaoScreen}
          options={{ title: "Adicionar Rachão" }}
        />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="G O A T" component={InitialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
