import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

interface FavoritesProps {
  title: string;
}

const Favorites: React.FC<FavoritesProps> = ({ title }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={toggleExpand}
      >
        <Text style={styles.title}>{title}</Text>
        <Icon name="star" size={24} color="#409FBD" />

        
      </TouchableOpacity>
      {expanded && (
          <View style={styles.infoContent}>
            <Text style={styles.origemText}>Rodoviária</Text>
            <Text style={styles.infoText}>Próxima Saída</Text>
            <Text style={styles.horarioText}>12:00</Text>
            <View style={styles.areaText}>
             <Icon name="time-outline" size={20} color={'#1F516A'} />
            <Text style={[styles.rotaText]}>Rota Centro e Prefeitura</Text>
            </View>
            <Text style={[styles.origemText, styles.origemText2]}>Bairro</Text>
            <Text style={styles.infoText}>Próxima Saída</Text>
            <Text style={styles.horarioText}>12:30</Text>
            <View style={[styles.areaText, styles.areaTextSemBorda]}>
             <Icon name="time-outline" size={20} color={'#1F516A'} />
            <Text style={[styles.rotaText]}>Rota Centro e Prefeitura</Text>
            </View>
          </View>
        )}
    </View>
  );
};

export default Favorites;
