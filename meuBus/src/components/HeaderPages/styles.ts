import {Platform, StatusBar, StyleSheet,} from 'react-native'
import colors from '../../colors';

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors.bluePrimary,
      paddingTop: 0,

     // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      height:80,
    },
    iconMenu: {
      marginLeft: 5,
    },
    
    title: {
      fontSize: 20,
      marginLeft:16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.blueActive,
    },
    iconSearch: {
      marginRight: 5,
    },
    titulo:{
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'center'
    }
  });

  export default styles;