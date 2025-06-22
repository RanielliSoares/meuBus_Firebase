import React, { useState } from 'react';
import { SafeAreaView, View, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Header from '../../components/Header';
import News from '../../components/News';
import Favorites from '../../components/Favorites';
import styles from './style';

type HomeProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<HomeProps> = ({ route }) => {
  const navigation = useNavigation();
  const { cidade } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const url = "https://www.aracoiaba.sp.gov.br/";

  const handleButtonPress = (title: string) => {
    setSelectedTitle(title);
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>

          <Header />

          <News
            title="Redução de tarifa"
            description="A tarifa a partir de 30 de março passará de R$ 4,20 para R$ 3,00.."
            onButtonPress={() => handleButtonPress("Redução da Tarifa")}
          />

          <Favorites
            title="Araçoiabinha"
          />

          <TouchableOpacity style={styles.containerBtn} onPress={() => navigation.navigate('Linhas', { cidadeId: cidade })}>
            <Text style={styles.txtBtn}>Horarios de Ônibus</Text>
          </TouchableOpacity>


          {/* Modal  News*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.areaTexto}>
                  <Text style={styles.modalTitle}>{selectedTitle || "Modal Aberto"}</Text>
                </View>
                <WebView
                  source={{ uri: url }} // Link do site
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

        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};



export default Home;
