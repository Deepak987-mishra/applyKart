import {StyleSheet} from 'react-native';
import {colors, fonts, hpx, nf, wpx} from '../../../../constants/constant';

export const InterviewScheduleStyle = StyleSheet.create({
    mainContainer:{backgroundColor:"white", flex:1},
    Heading:{marginHorizontal:wpx(20), alignItems:'center', marginTop:hpx(30)},
    Heading1:{marginHorizontal:wpx(20), marginTop:hpx(20), backgroundColor:"#F1F0F6", borderRadius:wpx(8), height:hpx(50), width:wpx(335), justifyContent:'center'},
    subHead:{marginHorizontal:wpx(20), marginTop:hpx(20), },
    btn:{alignItems:'center', marginTop:hpx(50), backgroundColor:'orange',  width: wpx(220), borderRadius: wpx(10), height: hpx(40), justifyContent:'center'},
    btnContainer:{alignItems:'center'},
    textInput:{borderRadius:hpx(20)},
    buttonInsideView: {
        flexDirection: 'row',
        paddingVertical: hpx(15),
        alignSelf: 'center',
        alignItems: 'center',
      },
      buttonText1: { color: 'black', fontFamily: fonts.medium, fontSize: nf(16) },
    //   fromDate:{backgroundColor:"gray", borderRadius:hpx(20)},
    btnContainer:{flexDirection:'row', marginHorizontal:wpx(20), justifyContent:'space-around',marginTop:hpx(20)},
      txt:{marginLeft:wpx(15)},
      btn1:{marginHorizontal:wpx(20), marginTop:hpx(20), backgroundColor:"#F1F0F6", borderRadius:wpx(8), height:hpx(50), width:wpx(120), justifyContent:'center'},
      datePickerStyle:{ width: 200,
        marginTop: 20,},
        dayIcon: {
            height: hpx(20),
            width: wpx(20),
            resizeMode: 'contain',
            marginRight: wpx(10),
          },
});
