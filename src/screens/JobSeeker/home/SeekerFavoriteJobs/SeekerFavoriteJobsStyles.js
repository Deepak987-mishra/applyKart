import { StyleSheet } from 'react-native'
import { fonts, wpx, hpx, nf, wp, hp, colors } from '../../../../constants/constant';

export const SeekerFavoriteJobsStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(20), marginTop: wpx(20) },
    jobCardMainView: {
        backgroundColor: '#FFFFFF',
        // height: wpx(175),
        width: wp(88),
        borderRadius: wpx(15),
        shadowColor: '#0000004D',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 3,
        padding: wpx(10),
        // marginRight: wpx(15),
        marginVertical: hpx(10),
        alignSelf: "center"
    },
    jobImageTextView: {
        flexDirection: "row", justifyContent: "space-between", marginVertical: hpx(10)
    },
    flexRowBetween: { flexDirection: "row", justifyContent: "space-between" },

})