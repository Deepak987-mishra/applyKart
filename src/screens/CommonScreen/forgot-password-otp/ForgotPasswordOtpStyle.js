import { StyleSheet } from 'react-native'
import { fonts, hpx, nf, wp, wpx } from '../../../constants/constant';

export const ForgotPasswordOtpStyle = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#fff" },
    underlineStyleBase: { marginTop: hpx(10), width: wpx(50), height: wpx(50), backgroundColor: '#F3F5F9', fontSize: nf(18), color: "#000", fontFamily: fonts.regular, textAlignVertical: 'center', borderRadius: wpx(10), },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: "#000", marginTop: hpx(10) },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(80), marginTop: hpx(10) },
    timeText: { fontSize: nf(15), fontFamily: fonts.semiBold, color: "#000", textAlign: "right", marginTop: hpx(10) },
    termsAndCondText: { fontSize: nf(13), fontFamily: fonts.bold, color: "#000000", },
    receiveOtp: { fontSize: nf(14), fontFamily: fonts.regular, color: "#000000" },
    textInputView:{marginTop:hpx(20)}

})