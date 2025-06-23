import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import HeaderPages from '../../components/HeaderPages';
import styles from './styles';


type LineDetailsRouteProp = RouteProp<RootStackParamList, 'LineDetails'>;

interface Props {
  route: LineDetailsRouteProp;
}

interface Horario {
  hora: string;
  sentido: string;
  rota: string;
  dias: string[];
}

const LineDetails: React.FC<Props> = ({ route }) => {
  const { linhaId, nome } = route.params;
  const [loading, setLoading] = useState(true);
  const [semana, setSemana] = useState<Horario[]>([]);
  const [sabado, setSabado] = useState<Horario[]>([]);
  const [domingo, setDomingo] = useState<Horario[]>([]);

  useEffect(() => {
    const buscarHorarios = async () => {
      try {
        const ref = collection(
          db,
          'Cidades',
          'aracoiaba_da_serra',
          'linhas',
          linhaId,
          'horarios'
        );
        const snapshot = await getDocs(ref);
        const todos: Horario[] = snapshot.docs.map((doc) => doc.data() as Horario);

        const isDiaSemana = (dia: string) =>
          ['segunda', 'terça', 'quarta', 'quinta', 'sexta'].includes(dia);

        const ordenar = (arr: Horario[]) =>
          arr.sort((a, b) => a.hora.localeCompare(b.hora));

        setSemana(ordenar(todos.filter(h => h.dias?.some(isDiaSemana))));
        setSabado(ordenar(todos.filter(h => h.dias?.includes('sábado'))));
        setDomingo(ordenar(todos.filter(h => h.dias?.includes('domingo'))));
      } catch (err) {
        console.error('❌ Erro ao buscar horários:', err);
      } finally {
        setLoading(false);
      }
    };

    buscarHorarios();
  }, [linhaId]);

  const renderCards = (horarios: Horario[]) => (
    <View style={styles.cardsContainer}>
      {horarios.map((item, index) => (
        <View key={index.toString()} style={styles.card}>
          <Text style={styles.cardHora}>{item.hora}</Text>
          <Text style={styles.cardRota}>{item.rota}</Text>
        </View>
      ))}
    </View>
  );

  const renderDia = (titulo: string, data: Horario[]) => {
    const bairro = data.filter(h => h.sentido === 'Bairro');
    const rodoviaria = data.filter(h => h.sentido === 'Rodoviária');

    if (!data.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{titulo}</Text>

        {bairro.length > 0 && (
          <>
            <Text style={styles.subsectionTitle}>Bairro</Text>
            {renderCards(bairro)}
          </>
        )}

        {rodoviaria.length > 0 && (
          <>
            <Text style={styles.subsectionTitle}>Rodoviária</Text>
            {renderCards(rodoviaria)}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderPages title={nome} />
      {loading ? (
        <ActivityIndicator size="large" color="#409FBD" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderDia('Segunda a Sexta-feira', semana)}
          {renderDia('Sábado', sabado)}
          {renderDia('Domingo', domingo)}
        </ScrollView>
      )}
    </View>
  );
};

export default LineDetails;
