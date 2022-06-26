import {StyleSheet} from 'react-native';
import {
  icons,
  fonts,
  nf,
  wpx,
  hpx,
  colors,
} from '../../../../constants/constant';
export const SeekerLoginStyles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#FFFFFF'},
  container: {marginHorizontal: wpx(20), marginTop: hpx(45)},
  mainHeading: {
    fontSize: nf(22),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  description: {
    fontSize: nf(15),
    fontFamily: fonts.regular,
    color: '#6F6F6F',
    width: wpx(330),
    marginTop: hpx(5),
    marginBottom: hpx(5),
  },
  formView: {marginVertical: wpx(10)},
  termsAndCondText: {
    fontSize: nf(14),
    fontFamily: fonts.semiBold,
    color: colors.black,
    marginTop: hpx(5),
  },
  registerWithview: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hpx(20),
  },
  socialIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wpx(250),
    alignSelf: 'center',
    marginTop: hpx(18),
  },
  socialMediaIconView: {
    height: wpx(56),
    width: wpx(56),
    borderWidth: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#55555533',
    borderRadius: wpx(10),
  },
  alreadyRegister: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hpx(20),
  },
  continueText: {
    fontSize: nf(13),
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: hpx(5.5),
  },
  forgetPassText: {
    fontSize: nf(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
    textAlign: 'right',
    marginTop: hpx(8),
  },
});
