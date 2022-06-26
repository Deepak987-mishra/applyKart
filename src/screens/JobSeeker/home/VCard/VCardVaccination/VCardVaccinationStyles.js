import { StyleSheet } from 'react-native'
import { fonts, wpx, hpx, nf, wp, hp, colors } from '../../../../../constants/constant';
export const VCardVaccinationStyles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
    container: { marginHorizontal: wpx(15), marginVertical: wpx(15) },
    mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black },
    description: { fontSize: nf(15), fontFamily: fonts.regular, color: "#6F6F6F", width: wp(90), marginTop: hpx(5), marginBottom: hp(2) },
    vaccinationStatus: { fontSize: nf(15), fontFamily: fonts.medium, color: colors.black, marginTop: wpx(20) },
    vaccineTextActive: { fontSize: nf(15), fontFamily: fonts.medium, color: "#0B45F3" },
    vaccineTextInactive: { fontSize: nf(15), fontFamily: fonts.regular, color: colors.black },
    mainCardView: {
        marginTop: hp(8)
    },
    backgroundCard: {
        height: hpx(230),
        width: '100%',
    },
    foregroundCard: { height: '100%', width: '100%' },
    profileImage: { height: '60%', width: '100%', resizeMode: 'contain' },
    userprofileImage: { height: '100%', width: '100%', resizeMode: 'contain' },
    profileView: {
        borderWidth: 3,
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: -40,
        borderRadius: 200 / 2,
        borderColor: colors.white,
    },
    nameSplit: { flexDirection: 'row', alignSelf: 'center' },
    profileName: {
        alignSelf: 'center',
        marginTop: 10,
        color: colors.white,
    },
    cardComponentView: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    cardRowContainer: { flexDirection: 'row', height: 30, marginTop: 5 },
    cardImageContainer: {
        height: '100%',
        width: '15%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    cardComponentText: {
        height: 35,
        width: '85%',
        justifyContent: 'center',
    },
    cardImageTextView: {
        marginLeft: wpx(25), flexDirection: "row"
    },
    vaccStatusMainView: {
        flexDirection: "row", width: wp(90), justifyContent: "space-around", marginTop: hpx(20)
    },
    doseView: {
        flexDirection: "row", width: wp(40), justifyContent: "space-around"
    },
    genderImageText: {
        flexDirection: "row", width: wp(20), justifyContent: "space-around"
    }



})