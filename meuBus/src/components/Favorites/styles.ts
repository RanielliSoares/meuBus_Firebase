import {StyleSheet} from 'react-native'
import colors from '../../colors';
const styles = StyleSheet.create({
    container: {
      height:60,
      width: '90%',
      justifyContent:'center',
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
    button:{
      
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: colors.blueActive,
    },
    expandedContainer: {
      height: 430,
      
    },
  infoContent: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 24,
    color: colors.black,
  },
  origemText:{
    fontSize:16,
    padding:10,
    marginBottom:10,
    marginTop:10,
    backgroundColor:colors.blueActive,
    color:colors.white,
    fontWeight:'bold',
    borderRadius:8,
    alignSelf: 'flex-start',
  },
  origemText2:{
    backgroundColor:colors.blueText
  },
  horarioText:{
    fontSize:48,
    fontWeight:'bold'
  },
  areaText:{
    flexDirection:'row',
    alignItems:'center',
    paddingBottom:10,
    borderBottomColor:colors.black,
    borderBottomWidth: 2,
  },
  rotaText:{
    fontSize:16,
    color:colors.blueText,
    marginLeft:5
  },
  areaTextSemBorda: {
    borderBottomWidth: 0, // Apenas sobrescreve a borda
  }
  });

  export default styles;