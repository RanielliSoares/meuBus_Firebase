import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Header: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.header}>

      <View style={styles.titulo}>
        <TouchableOpacity style={styles.iconMenu}>
          <Icon name="menu" size={30} color={'#000'} />
        </TouchableOpacity>


        <Image source={require('../../../src/assets/meuBus_Ico.png')} style={styles.logo} />
        <Text style={styles.title}>Meu Bus</Text>
      </View>
      
    </View>
  );
};


export default Header;