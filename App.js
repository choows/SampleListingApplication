/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import MainScreen from "./Navigation/MainScreen";
import DetailScreen from "./Navigation/DetailScreen";
import NewRecordScreen from "./Navigation/NewRecordScreen";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="New" component={NewRecordScreen} options={{
          headerShown : false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
