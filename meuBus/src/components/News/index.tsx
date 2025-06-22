import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface NewsProps {
  title: string;
  description: string;
  onButtonPress: () => void;
}

const News: React.FC<NewsProps> = ({ title, description, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>Ler Matéria Completa</Text>
      </TouchableOpacity>
    </View>
  );
};



export default News;