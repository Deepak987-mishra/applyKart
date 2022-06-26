import { StyleSheet } from 'react-native';
import { colors, fonts, hpx, nf, wpx, wp, hp } from '../../../../../constants/constant';

export const SetAvailablityStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginHorizontal: wpx(20),
        marginVertical: wpx(15)
    },
    selectAllContainer: {
        marginTop: hpx(20),
        // marginHorizontal: wpx(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    selectAllIcon: {
        height: hpx(20),
        width: wpx(20),
        resizeMode: 'contain',
        marginRight: wpx(10),
    },
    dayContainer: {
        marginTop: hpx(16),
        // marginHorizontal: wpx(20),
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dayIcon: {
        height: hpx(20),
        width: wpx(20),
        resizeMode: 'contain',
        marginRight: wpx(10),
    },
    checkBoxView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black, marginBottom: hpx(5) },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(90), marginTop: hpx(5), marginBottom: hp(2) },
});
