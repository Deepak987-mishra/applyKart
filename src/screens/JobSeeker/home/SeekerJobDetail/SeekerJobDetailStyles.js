import { StyleSheet } from 'react-native'

import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const SeekerJobDetailStyles = StyleSheet.create({
    jobDetailShadowView: {
        backgroundColor: '#FFFFFF',
        // height: wpx(180),
        width: wp(88),
        borderRadius: wpx(15),
        shadowColor: '#4C4C4C',
        alignSelf: 'center',
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 8,
        marginTop: wpx(5),
        paddingVertical: wpx(10)
    },
    companyIcon: {
        borderColor: '#55555533',
        borderWidth: wpx(1),
        height: hpx(60),
        width: wpx(60),
        borderRadius: 15,
        alignItems: 'center',
        // marginTop: hpx(15),
        justifyContent: 'center',
        alignSelf: "center",
        flexDirection: "row"
    },
    vacancyView: {
        backgroundColor: '#FFFFFF',
        // height: wpx(95),
        width: wp(88),
        borderRadius: wpx(15),
        shadowColor: '#4C4C4C',
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 8,
        marginTop: wpx(20),
        flexDirection: "row",
        justifyContent: "space-around",
        padding: wpx(10),
        paddingBottom: wpx(10),
        alignSelf: "center",
    },
})