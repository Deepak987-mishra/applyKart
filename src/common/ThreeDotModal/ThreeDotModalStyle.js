import { StyleSheet } from 'react-native';
import { wpx, hpx, nf, fonts, colors } from '../../constants/constant';

export default ThreeDotModalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height:"100%",
        width:"100%",
        // backgroundColor: 'rgba(0,0,0,0.4)',
        // backgroundColor:'red',
        // justifyContent: 'flex-end',
    //    marginLeft:wpx(219),
        marginTop: wpx(50),
        backgroundColor:"#00000050",
        alignItems:"flex-end",
        paddingRight:wpx(50),
        paddingTop:wpx(20)
    },
    modalView: {
        backgroundColor: colors.white, height: hpx(92), width:wpx(120),
       borderRadius:wpx(8),
    },
    modalTitleView: { justifyContent: 'space-between' },
    text1:{marginTop:wpx(10), marginLeft:wpx(14)},
    line:{ height: 1,
        width: wpx(95),
        alignSelf: "center",
        backgroundColor: "#CECDD3",
        marginVertical: wpx(1),
        marginTop: hpx(10)}
});