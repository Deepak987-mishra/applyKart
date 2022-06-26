import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";
export const SeekerProfileStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(15), marginVertical: wpx(15) },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black },
    description: {
        fontSize: nf(15),
        fontFamily: fonts.regular,
        color: "#6F6F6F",
        width: wp(90),
        marginTop: hpx(5),
        marginBottom: hp(2),
    },
    workExpHeading: {
        flexDirection: "row",
        marginTop: hpx(21),
        justifyContent: "space-between",

        alignItems: "center",
    },
    workExpHeading3: { flexDirection: "row" },
    workExpIcon: { height: hpx(20), width: wpx(23.04) },
    workExpContainer: {
        flexDirection: "row",
        marginTop: hpx(15),
        justifyContent: "space-between",
    },
})