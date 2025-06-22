import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const cidade: string | null = null; // Substitua pelo valor dinâmico da variável

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cidade === null) {
        navigation.replace('ValidatCidade'); // Vai para ValidatCidade
      } else {
        navigation.replace('Home', { cidade }); // Passa cidade para Home
      }
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, [navigation, cidade]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Splash.png')} // Substitua pelo caminho da sua imagem
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%'
  },
});

export default SplashScreen;
