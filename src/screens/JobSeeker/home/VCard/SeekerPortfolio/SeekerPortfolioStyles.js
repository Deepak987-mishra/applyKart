import { StyleSheet } from "react-native";
import { icons, fonts, nf, wpx, colors, wp, hpx } from "../../../../../constants/constant";

export const SeekerPortfolioStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(20) },
    mainHeading: {
        fontSize: nf(22),
        fontFamily: fonts.semiBold,
        color: colors.black,
        textAlign: "center",
        width: wp(85),
        alignSelf: "center",
    },
    description: {
        fontSize: nf(15),
        fontFamily: fonts.regular,
        color: "#6F6F6F",
        width: wp(90),
        marginTop: "1%",
        marginBottom: "10%",
        alignSelf: "center",
        textAlign: "center",
    },
    portfolioImageView: {
        height: wpx(100), width: wpx(100),
        borderRadius: wpx(10), borderWidth: wpx(2),
        borderColor: colors.offWhite2,
        justifyContent: "center", alignItems: "center"
    },
    portfolioImage: {
        height: wpx(90), width: wpx(90), borderRadius: wpx(10)
    },
    multilineTextinput: {
        marginTop: wpx(10), backgroundColor: colors.offWhite2,
        height: wpx(250), justifyContent: "flex-start", paddingTop: wpx(15)
    },
    portfolioView: {
        flexDirection: "row", justifyContent: "space-between",
        marginTop: wpx(20)
    },
    titleInputStyle: {
        marginTop: wpx(10), backgroundColor: colors.offWhite2
    },
    attachImageButton: {
        flexDirection: "row", alignSelf: "center", justifyContent: "center", alignItems: "center"
    }
})