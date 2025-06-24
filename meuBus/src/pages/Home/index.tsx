import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import News from '../../components/News';
import Favorites from '../../components/Favorites';
import styles from './style';
import colors from '../../colors';

type HomeProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
};

interface Noticia {
  titulo: string;
  descricao: string;
  url: string;
  ativo: boolean;
}

interface Favorito {
  id: string;
  nome: string;
}

interface Propaganda {
  imagemUrl: string;
  ativo: boolean;
  link?: string;
  descricao?: string;
}

const Home: React.FC<HomeProps> = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { cidade } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [bannerAtual, setBannerAtual] = useState<Propaganda | null>(null);

  useEffect(() => {
    const buscarNoticia = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Cidades', cidade, 'noticias'));
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Noticia;
          setNoticia(data.ativo ? data : null);
        } else {
          setNoticia(null);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar notícia:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarNoticia();
  }, [cidade]);

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const favoritosArmazenados = await AsyncStorage.getItem('linhas_favoritas');
        if (favoritosArmazenados) {
          const favoritosParseados: Favorito[] = JSON.parse(favoritosArmazenados);
          setFavoritos(favoritosParseados);
        } else {
          setFavoritos([]);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar favoritos:', error);
      }
    };

    if (isFocused) {
      buscarFavoritos();
    }
  }, [isFocused]);

  useEffect(() => {
    const buscarBannerRotativo = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Cidades', cidade, 'propagandas_mensal'));
        const ativos: Propaganda[] = snapshot.docs
          .map((doc) => doc.data() as Propaganda)
          .filter((p) => p.ativo === true);

        if (ativos.length === 0) return;

        let index = 0;
        const salvo = await AsyncStorage.getItem('currentBannerIndex');

        if (salvo) {
          const posAnterior = parseInt(salvo);
          index = (posAnterior + 1) % ativos.length;
        }

        setBannerAtual(ativos[index]);
        await AsyncStorage.setItem('currentBannerIndex', index.toString());
      } catch (error) {
        console.error('❌ Erro ao buscar banners rotativos:', error);
      }
    };

    if (isFocused) {
      buscarBannerRotativo();
    }
  }, [isFocused]);

  const handleButtonPress = (title: string) => {
    setSelectedTitle(title);
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Header />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : noticia ? (
              <News
                title={noticia.titulo}
                description={noticia.descricao}
                onButtonPress={() => handleButtonPress(noticia.titulo)}
              />
            ) : (
              <Text style={styles.textNews}>Nenhuma notícia nova disponível.</Text>
            )}

            {favoritos.length > 0 &&
              favoritos.map((linha) => (
                <Favorites key={linha.id} id={linha.id} nome={linha.nome} />
              ))}

            <TouchableOpacity
              style={styles.containerBtn}
              onPress={() => navigation.navigate('Linhas', { cidadeId: cidade })}
            >
              <Text style={styles.txtBtn}>Horários de Ônibus</Text>
            </TouchableOpacity>

            {bannerAtual && (
              <View style={{ width: '100%', paddingVertical: 16 }}>
                <TouchableOpacity
                  onPress={() => bannerAtual.link && Linking.openURL(bannerAtual.link)}
                  activeOpacity={0.9}
                  style={{ alignItems: 'center' }}
                >
                  <Image
                    source={{ uri: bannerAtual.imagemUrl }}
                    style={{
                      width: '90%',
                      aspectRatio: 16 / 9,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.areaTexto}>
                  <Text style={styles.modalTitle}>{selectedTitle || 'Notícia'}</Text>
                </View>
                <WebView
                  source={{ uri: noticia?.url || 'https://www.google.com' }}
                  style={{ flex: 1 }}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
