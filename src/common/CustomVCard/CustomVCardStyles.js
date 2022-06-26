import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, hp, wp, hpx, wpx } from '../../constants/constant'

export default CustomVCardStyles = StyleSheet.create({
    mainCardView: {
        marginTop: hp(8)
    },
    backgroundCard: {
        // height: wpx(230),
        width: '100%',
    },
    foregroundCard: { width: '100%' },
    profileImage: { height: '60%', width: '100%', resizeMode: 'contain' },
    userprofileImage: { height: '100%', width: '100%', borderRadius: wpx(100) },
    profileView: {
        borderWidth: 3,
        height: wpx(100),
        width: wpx(100),
        alignSelf: 'center',
        marginTop: -40,
        borderRadius: wpx(100) / 2,
        borderColor: colors.white,
    },
    nameSplit: { flexDirection: 'row', alignSelf: 'center' },
    profileName: {
        alignSelf: 'center',
        marginTop: 10,
        color: colors.white,
    },
    cardComponentView: {
        height: wpx(100),
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    cardRowContainer: { flexDirection: 'row', height: wpx(30), marginTop: 5 },
    cardImageContainer: {
        height: '100%',
        width: '15%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    cardComponentText: {
        height: wpx(35),
        width: '85%',
        justifyContent: 'center',
    },
    cardImageTextView: {
        marginLeft: wpx(25), flexDirection: "row"
    },
})
