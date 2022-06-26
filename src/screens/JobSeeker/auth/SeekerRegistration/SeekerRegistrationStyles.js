import { StyleSheet } from 'react-native';
import { icons, fonts, nf, hpx, wpx } from '../../../../constants/constant';

export const SeekerRegistrationStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { marginHorizontal: wpx(20), marginTop: hpx(50) },
  mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: '#000' },
  description: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: '#6F6F6F',
    width: '80%',
    marginTop: 5,
    marginBottom: 25,
  },
  formView: { marginVertical: 10 },
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
  registerWithview: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  socialIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 320,
    alignSelf: 'center',
    marginTop: 15,
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
  alreadyRegister: { flexDirection: 'row', alignSelf: 'center', marginTop: 25 },
  termsAndCondMainView: { alignSelf: 'center', marginTop: 25 },
  termsAndCondButtonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignSelf: 'center',
  },
});
