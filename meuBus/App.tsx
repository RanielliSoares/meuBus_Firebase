import React from 'react';
import { View } from 'react-native'; // Adicionei View
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/SplashScreen';
import HomeScreen from './src/pages/Home';
import ValidatCidadeScreen from './src/pages/ValidatCidade';
import LineDetails from './src/pages/lineDetails';
import LinhasScreen from './src/pages/Linhas';
import globalStyles from './globalStyles';


type RootStackParamList = {
  Splash: undefined;
  Home: { cidade: string }; 
  ValidatCidade: undefined;
  Linhas: { cidadeId: string };
  LineDetails: { linhaId: string; nome: string };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <View style={globalStyles.defaultContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ValidatCidade"
            component={ValidatCidadeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Linhas"
            component={LinhasScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
          name="LineDetails" 
          component={LineDetails} 
          options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
};

export default App;