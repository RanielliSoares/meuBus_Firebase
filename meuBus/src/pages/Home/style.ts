import {StyleSheet} from 'react-native'
import colors from '../../colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.background
    },
    areaTexto:{
      padding:10,
      
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cityText: {
      fontSize: 20,
      color: 'gray',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      height: '90%',
      backgroundColor: colors.white,
      borderRadius: 8,
      justifyContent:'center',
      overflow: 'hidden'
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign:'center',
      color:colors.blueActive
    },
    closeButton: {
      backgroundColor: colors.blueActive,
      padding: 12,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    buttonText: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign:'center'
    },
    containerBtn: {
      height: 60,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:colors.background2,
      borderRadius: 8,
      paddingHorizontal: 16,
      alignSelf: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginVertical: 8,
    },
    txtBtn: {
      fontSize: 25,
      fontWeight: 'bold',
      color: colors.blueActive,
    },
  
  });

  export default styles;