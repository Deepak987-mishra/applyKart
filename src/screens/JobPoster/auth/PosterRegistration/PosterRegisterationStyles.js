import {StyleSheet} from 'react-native';
import {colors, fonts, hpx, nf, wpx} from '../../../../constants/constant';

export const PosterRegisterationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  registerAccountView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(73),
  },
  detailView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(5),
    width:wpx(278)
  },
  textInputView: {
    marginTop: wpx(30),
    alignSelf: 'center',
  
  },
  textInput: {
    marginTop: wpx(15),
  },
  descriptionView: {
    marginTop: hpx(20),
    marginHorizontal: wpx(37),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  continueButton: {
    marginTop: hpx(21),
    marginHorizontal: wpx(18),
  },
  loginView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: '#000000',
    marginTop: 5,
  },
  termsAndCondText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#000000',
    marginTop: 5,
  },
  termsAndCondMainView: {alignSelf: 'center', marginTop: 25},
  termsAndCondButtonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignSelf: 'center',
  },
  textDanger: {color: 'red', fontSize: nf(14), fontFamily: fonts.regular},
});
