import { StyleSheet } from 'react-native';
import { colors, wpx, wp, hp, hpx, nf, fonts } from '../../constants/constant';

export default BottomModalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        bottom: hpx(30),
        marginTop: 'auto'
    },
    modalView: {
        backgroundColor: colors.white, height: hpx(289),
        borderTopLeftRadius: wpx(18), borderTopRightRadius: wpx(18),
        paddingTop: hpx(20), marginTop: 'auto', paddingBottom: hpx(3)
    },

    modalTitleView: { justifyContent: 'center', flexDirection: 'row' },



});
