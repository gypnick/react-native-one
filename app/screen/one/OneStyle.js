import {StyleSheet,Dimensions} from "react-native"
export default oneStyles=StyleSheet.create({
        headTitleStyle:{
            flexDirection:"row",
            marginVertical:10,
            justifyContent:"center",
        },

    forwardStyle:{
        flexDirection:"row",
        justifyContent:"center",
        fontWeight:"bold",
        textAlign:"center",
        marginVertical:20,
    },

    headImgStyle: {
        height: 3 * Dimensions.get("window").height / 5,
        flex: 1,
        width: Dimensions.get("window").width,
    },
    contentImgStyle:{
        height: 200,
        flex: 1,
        width: Dimensions.get("window").width,
    },
    textStyle: {
        backgroundColor: "#5888"
    },
    circle:{
        alignItems:'center',
        justifyContent:'center',
        width: Dimensions.get("window").width/2,
        height:Dimensions.get("window").width/2,
        borderColor:'green',
        borderRadius:Dimensions.get("window").width/4,
    }


})