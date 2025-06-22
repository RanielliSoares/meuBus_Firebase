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

interface Favorito {
  id: string;
  nome: string;
}

type LinhasProps = {
  route: RouteProp<RootStackParamList, 'Linhas'>;
};

const LinhasScreen: React.FC<LinhasProps> = ({ route }) => {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
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

        const mapaUnico = new Map<string, Linha>();
        linhasExtraidas.forEach((linha) => {
          if (!mapaUnico.has(linha.nome_linha)) {
            mapaUnico.set(linha.nome_linha, linha);
          }
        });

        const linhasUnicas = Array.from(mapaUnico.values());
        const ordenadas = linhasUnicas.sort((a, b) =>
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
    const buscarFavoritos = async () => {
      try {
        const favoritosArmazenados = await AsyncStorage.getItem('linhas_favoritas');
        if (favoritosArmazenados) {
          setFavoritos(JSON.parse(favoritosArmazenados));
        }
      } catch (error) {
        console.error('❌ Erro ao buscar favoritos:', error);
      }
    };

    buscarFavoritos();
  }, []);

  const alternarFavorito = async (linha: Linha) => {
    try {
      let novosFavoritos: Favorito[] = [];
      const jaFavoritado = favoritos.some((fav) => fav.id === linha.id);

      if (jaFavoritado) {
        novosFavoritos = favoritos.filter((fav) => fav.id !== linha.id);
      } else {
        novosFavoritos = [...favoritos, { id: linha.id, nome: linha.nome_linha }];
      }

      setFavoritos(novosFavoritos);
      await AsyncStorage.setItem('linhas_favoritas', JSON.stringify(novosFavoritos));
      console.log('📦 Favoritos atualizados:', novosFavoritos);
    } catch (error) {
      console.error('❌ Erro ao alternar favorito:', error);
    }
  };

  const isFavorito = (linhaId: string) =>
    favoritos.some((fav) => fav.id === linhaId);

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
              <TouchableOpacity
                style={styles.areaBtn}
                onPress={() => {
                  // Navegar para detalhes
                }}
              >
                <Text style={styles.nomeLinha}>{item.nome_linha}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => alternarFavorito(item)}>
                <Icon
                  name="star"
                  size={20}
                  color={isFavorito(item.id) ? '#409FBD' : '#ccc'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LinhasScreen;
