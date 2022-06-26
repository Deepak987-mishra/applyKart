import { StyleSheet } from 'react-native';
import { colors, fonts, hpx, nf, wpx } from '../../../../constants/constant';

export const AcknowledgementStyle = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  mainTextView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(20)
  },
  textView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(15),

  },
  bottomView: {
    marginTop: hpx(10),
    marginHorizontal: wpx(20),
  },
  cbView: {
    flexDirection: 'row',
    marginHorizontal: wpx(20),
    marginTop: hpx(20)
  },
  btnText: {
    marginLeft: wpx(10)
  },
  buttonStyle: {
    marginVertical: wpx(20)
  }
});
