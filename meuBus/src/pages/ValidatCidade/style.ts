import { StyleSheet } from 'react-native'
import colors from '../../colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.background,
        margin: 0,
        padding: 0,

    },
    topSection: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
     marginBottom:40,
        width: 160, 
        height: 33,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerContainer: {
        backgroundColor: colors.white,
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: colors.gray, 
        overflow: 'hidden', 
        marginVertical: 10, 
        width: '100%'
    },
    picker: {
        height: 60, 
        width: '100%',
    },

    selecionaContainer: {
        padding:30,
        backgroundColor: colors.bluePrimary, 
        borderRadius: 20, 
        marginVertical: 10, 
        alignItems: 'center',
        justifyContent:'center',
        height:200,
        width: '85%',
    },
    buttonContainer: {
        marginTop:8,
        alignItems: 'center',
        width: '100%'
      },
      
      touchableButton: {
        backgroundColor: colors.blueActive, 
        paddingVertical: 8,
        paddingHorizontal: 10, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
      },
      
      buttonDisabled: {
        backgroundColor: colors.gray, 
      },
      
      buttonText: {
        color: colors.white,
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center',
      },
      
    bottomSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
        margin: 0,
        padding: 0,

    },
    adText: {
        fontSize: 16,
        color: colors.textSecondary,
    },

});

export default styles;