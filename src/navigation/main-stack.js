import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationService";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./auth-stack";

const Stack = createStackNavigator();

function MainStack({ navigation }) {
  const StackSelected = useSelector(state => state.globalReducer.stackSelected);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={AuthStack} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
