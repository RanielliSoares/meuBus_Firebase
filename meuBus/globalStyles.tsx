import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Reset básico
  defaultContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  defaultText: {
    margin: 0,
    padding: 0,
    color: '#000', // Texto padrão em preto
    fontSize: 16, // Tamanho padrão
    fontFamily: 'Arial', // Fonte padrão
  },
  defaultImage: {
    resizeMode: 'contain', // Ajuste padrão para imagens
    margin: 0,
    padding: 0,
  },
  defaultButton: {
    margin: 0,
    padding: 0,
  },
});

export default globalStyles;