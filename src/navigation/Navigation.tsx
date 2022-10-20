import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PictureScreen from '../screens/PictureScreen';
import ModelScreen from '../screens/ModelScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="PictureScreen" component={PictureScreen} />
          <Stack.Screen name="ModelScreen" component={ModelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;
