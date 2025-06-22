import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 180,
      padding: 16,
      backgroundColor: colors.white,
      borderRadius: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignSelf: 'center',
      marginVertical: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.blueActive
      },
    description: {
      fontSize: 14,
      color: colors.gray900,
      marginBottom: 16,

    },
    button: {
      backgroundColor: colors.blueActive,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  export default styles;