import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import InitialScreen from "../screens/auth/InitialScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import RachaoScreen from "../screens/rachao/RachaoScreen";
import AddRachaoScreen from "../screens/rachao/AddRachaoScreen";
import PlayerRegisterScreen from "../screens/rachao/PlayerRegisterScreen";
import HistoricoScreen from "../screens/historico/HistoricoScreen";
import FinanceiroScreen from "../screens/financeiro/FinanceiroScreen";
import RankingScreen from "../screens/ranking/RankingScreen";
import AjustesScreen from "../screens/ajustes/AjustesScreen";
import SortTeamsScreen from "../screens/rachao/SortTeamsScreen";
import AliveMatchupScreen from "../screens/rachao/AliveMatchupScreen";
import AddOrFindGroupScreen from "../screens/grupos/AddOrFindGroupScreen";
import CreateGroupScreen from "../screens/grupos/CreateGroupScreen";
import FindGroupScreen from "../screens/grupos/FindGroupScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Rachao"
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

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup function to unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, []);

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
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddRachaoScreen"
          component={AddRachaoScreen}
          options={{ title: "Adicionar Rachão" }}
        />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="G O A T" component={InitialScreen} />
        <Stack.Screen
          name="PlayerRegisterScreen"
          component={PlayerRegisterScreen}
          options={{ title: "Cadastro de Jogador", headerShown: false }}
        />
        <Stack.Screen
          name="SortTeamsScreen"
          component={SortTeamsScreen}
          options={{ title: "Sorteio de Times", headerShown: false }}
        />
        <Stack.Screen
          name="AliveMatchup"
          component={AliveMatchupScreen}
          options={{ title: "Ao Vivo", headerShown: false }}
        />
        <Stack.Screen
          name="AddOrFindGroupScreen"
          component={AddOrFindGroupScreen}
          options={{ title: "Grupos", headerShown: false }}
        />
        <Stack.Screen
          name="CreateGroupScreen"
          component={CreateGroupScreen}
          options={{ title: "Criar Grupo", headerShown: false }}
        />
        <Stack.Screen
          name="FindGroupScreen"
          component={FindGroupScreen}
          options={{ title: "Encontrar Grupo", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },
  icon: {
    fontSize: 24,
    padding: 10,
  },
});

export default AppNavigator;
