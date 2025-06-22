import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../services/firebase';
import styles from './styles';

interface FavoritesProps {
  id: string;
  nome: string;
}

interface Horario {
  hora: string;
  sentido: string;
  rota: string;
  dias: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ id, nome }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [proximoBairro, setProximoBairro] = useState<Horario | null>(null);
  const [proximaRodoviaria, setProximaRodoviaria] = useState<Horario | null>(null);

  const isFocused = useIsFocused();

  const nomeDiaSemana = [
    'domingo', 'segunda', 'terça',
    'quarta', 'quinta', 'sexta', 'sábado'
  ][new Date().getDay()];

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const converterHoraParaMinutos = (hora: string): number => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };

  const buscarHorarios = async () => {
    try {
      setLoading(true);

      const hojeNome = nomeDiaSemana;
      const agora = new Date();
      const nowMinutes = agora.getHours() * 60 + agora.getMinutes();

      const linhaRef = collection(db, 'Cidades', 'aracoiaba_da_serra', 'linhas', id, 'horarios');
      const snapshot = await getDocs(linhaRef);

      const todosHorarios: Horario[] = snapshot.docs.map(doc => doc.data() as Horario);

      const filtrados = todosHorarios
        .filter(h => Array.isArray(h.dias) && h.dias.includes(hojeNome))
        .filter(h => converterHoraParaMinutos(h.hora) >= nowMinutes)
        .sort((a, b) => converterHoraParaMinutos(a.hora) - converterHoraParaMinutos(b.hora));

      setProximoBairro(filtrados.find(h => h.sentido === 'Bairro') || null);
      setProximaRodoviaria(filtrados.find(h => h.sentido === 'Rodoviária') || null);
    } catch (error) {
      console.error('❌ Erro ao buscar horários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expanded && isFocused) {
      buscarHorarios();
    }
  }, [expanded, isFocused]);

  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <TouchableOpacity style={styles.button} onPress={toggleExpand}>
        <Text style={styles.title}>{nome}</Text>
        <Icon name="star" size={24} color="#409FBD" />
      </TouchableOpacity>

      {expanded && (
        <Text
          style={{
            fontSize: 14,
            color: '#888',
            marginBottom: 6,
            marginTop: 2,
          }}
        >{nomeDiaSemana.charAt(0).toUpperCase() + nomeDiaSemana.slice(1)}
        </Text>
      )}

      {expanded && (
        <View style={styles.infoContent}>
          {loading ? (
            <ActivityIndicator size="small" color="#409FBD" />
          ) : (
            <>
              {/* Rodoviária */}
              <Text style={styles.origemText}>Rodoviária</Text>
              <Text style={styles.infoText}>Próxima Saída</Text>
              <Text
                style={
                  proximaRodoviaria
                    ? styles.horarioText
                    : [styles.horarioText, { fontSize: 16, textAlign: 'center', padding: 10 }]
                }
              >
                {proximaRodoviaria?.hora || 'Sem mais saídas hoje'}
              </Text>
              <View style={styles.areaText}>
                <Icon name="time-outline" size={20} color="#1F516A" />
                <Text style={styles.rotaText}>
                  {proximaRodoviaria?.rota || '—'}
                </Text>
              </View>

              {/* Bairro */}
              <Text style={[styles.origemText, styles.origemText2]}>Bairro</Text>
              <Text style={styles.infoText}>Próxima Saída</Text>
              <Text
                style={
                  proximoBairro
                    ? styles.horarioText
                    : [styles.horarioText, { fontSize: 16, textAlign: 'center', padding: 10 }]
                }
              >
                {proximoBairro?.hora || 'Sem mais saídas hoje'}
              </Text>
              <View style={[styles.areaText, styles.areaTextSemBorda]}>
                <Icon name="time-outline" size={20} color="#1F516A" />
                <Text style={styles.rotaText}>
                  {proximoBairro?.rota || '—'}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Favorites;
