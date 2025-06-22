import React from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderPagesProps{
  title:string;
}

const HeaderPages: React.FC<HeaderPagesProps> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>

      <View style={styles.titulo}>
        <TouchableOpacity style={styles.iconMenu} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={30} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      
    </View>
  );
};


export default HeaderPages;