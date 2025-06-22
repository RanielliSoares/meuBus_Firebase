import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { RootStackParamList } from '../../types';
import styles from './style';

type ValidatCidadeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ValidatCidade'
>;

interface Cidade {
  id: string;
  name: string;
}

const ValidatCidade: React.FC = () => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<ValidatCidadeScreenNavigationProp>();

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Cidades'));

        const listaCidades = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().nome
        }));

        setCidades(listaCidades);
      } catch (error) {
        console.error('Erro ao buscar cidades do Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCidades();
  }, []);

  const handleSelectCity = async () => {
    if (selectedCityId) {
      try {
        await AsyncStorage.setItem('id_cidade', selectedCityId);
        navigation.navigate('Home', { cidade: selectedCityId });
      } catch (error) {
        console.error('Erro ao salvar o ID da cidade:', error);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Image
                  source={require('../../assets/meuBus_logo.png')}
                  style={styles.image}
                  resizeMode="contain"
                />

                <View style={styles.selecionaContainer}>
                  <Text style={styles.text}>Informe a sua cidade</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedCityId}
                      onValueChange={(itemValue) => setSelectedCityId(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Escolha uma cidade" value={null} />
                      {cidades.map((cidade) => (
                        <Picker.Item
                          key={cidade.id}
                          label={cidade.name}
                          value={cidade.id}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={handleSelectCity}
                      disabled={!selectedCityId}
                      style={[
                        styles.touchableButton,
                        !selectedCityId && styles.buttonDisabled
                      ]}
                    >
                      <Text style={styles.buttonText}>
                        Ver horários de Ônibus
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.adText}>área de anúncios</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ValidatCidade;
