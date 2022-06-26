import { StyleSheet } from 'react-native'
import { fonts, hp, nf, wp, wpx } from '../../../constants/constant';

export const ForgetPasswordStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF", },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: "#000", marginTop: wp(1) },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(90), marginTop: hp(1) },

})