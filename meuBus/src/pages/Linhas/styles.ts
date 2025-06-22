import { StyleSheet } from "react-native";
import colors from "../../colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.background,
        
    },
    itemContainer: {
        margin:10,
        backgroundColor:colors.gray300,
        width:'90%',
        textAlign:'center',
        borderRadius:8,
        height:65,
        flex:1,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        padding:10

    },
    areaBtn:{
        
        justifyContent:'center',
        flex:1,
    },
    nomeLinha: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default styles;