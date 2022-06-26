import { StyleSheet } from 'react-native'
import { fonts, wpx, hpx, nf, wp, hp, colors } from '../../../../constants/constant';

export const SeekerJobPrefrenceStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(20), marginVertical: wpx(15) },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(90), marginTop: hpx(5), marginBottom: hp(2) },

    salaryRangeView: { marginVertical: hpx(10), marginTop: hpx(30) },
    jobPrefrenceTextContainer: {
        flexDirection: 'row',
        backgroundColor: colors.offWhite2,
        borderRadius: wpx(8),
        margin: wpx(10),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wpx(10),
    },
    typingTextInput: {
        height: wpx(50),
        borderRadius: wpx(8),
        padding: wpx(10),
        backgroundColor: colors.offWhite,
        fontFamily: fonts.regular,
        paddingTop: wpx(10)
    }
})