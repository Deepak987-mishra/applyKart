import { StyleSheet } from 'react-native'
import { fonts, wpx, hpx, nf, wp, hp, colors } from '../../../../constants/constant';

export const SelectJobTypeStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(20), marginVertical: wpx(15) },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(90), marginTop: hpx(5), marginBottom: hp(2) },
})