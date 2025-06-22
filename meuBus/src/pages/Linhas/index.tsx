import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import HeaderPages from '../../components/HeaderPages';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

interface Linha {
  id: string;
  nome_linha: string;
  numero_linha: string;
  tipo_linha: string;
}

type LinhasProps = {
  route: RouteProp<RootStackParamList, 'Linhas'>;
};

const LinhasScreen: React.FC<LinhasProps> = ({ route }) => {
  const [linhaFavorita, setLinhaFavorita] = useState<string | null>(null);
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [loading, setLoading] = useState(true);
  const { cidadeId } = route.params;

  useEffect(() => {
    const fetchLinhasFirestore = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, 'Cidades', cidadeId, 'linhas')
        );

        const linhasExtraidas: Linha[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nome_linha: data.nome_linha || data.nome || '', 
            numero_linha: data.numero_linha || '',
            tipo_linha: data.tipo_linha || ''
          };
        });

        const ordenadas = linhasExtraidas.sort((a, b) =>
          a.nome_linha.localeCompare(b.nome_linha)
        );

        setLinhas(ordenadas);
      } catch (error) {
        console.error('❌ Erro ao buscar linhas no Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinhasFirestore();
  }, [cidadeId]);

  useEffect(() => {
    const buscarFavorita = async () => {
      try {
        const favorita = await AsyncStorage.getItem('linhaFavorita');
        setLinhaFavorita(favorita);
      } catch (error) {
        console.error('❌ Erro ao buscar linha favorita:', error);
      }
    };

    buscarFavorita();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderPages title="Horários de Ônibus" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={linhas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.areaBtn}>
                <Text style={styles.nomeLinha}>{item.nome_linha}</Text>
              </TouchableOpacity>
              <Icon
                name="star"
                size={15}
                color={
                  item.nome_linha === linhaFavorita ? '#0000ff' : '#ccc'
                }
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LinhasScreen;
