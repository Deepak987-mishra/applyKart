// import {StyleSheet} from 'react-native';
// import {wpx, hpx, nf, fonts, colors} from '../../constants/constant';

// export const ButtonStyles = StyleSheet.create({
//   buttonView: { width: wpx(300), borderRadius: wpx(10) },
//   buttonText: { color: '#FFFFFF', fontFamily: fonts.bold, fontSize: nf(16) },
//   buttonText1: { color: 'black', fontFamily: fonts.medium, fontSize: nf(16) },
//   buttonInsideView: {
//     flexDirection: 'row',
//     paddingVertical: hpx(15),
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   buttonView1:{width: wpx(300), borderRadius: wpx(10), shadowOffset: {
//     width: 0,
//     height: 1,
//   },
//   shadowOpacity: 0.9,
//     shadowRadius: 6,
//     elevation: 3,
//   shadowColor: '#0000001A',
// }
// });

// export const ButtonStyle = StyleSheet.create({
//   buttonContainer: { width: wpx(300), borderRadius: wpx(10) },
//   buttonContent: { color: 'white', fontFamily: fonts.bold, fontSize: nf(16) },
//   buttonInnerView: {
//     flexDirection: 'row',
//     paddingVertical: hpx(15),
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
// });


import {StyleSheet} from 'react-native';
import {wpx, hpx, nf, fonts, colors} from '../../constants/constant';

export const ButtonStyles = StyleSheet.create({
  buttonView: { width: wpx(300), borderRadius: wpx(10) },
  buttonText: { color: '#FFFFFF', fontFamily: fonts.bold, fontSize: nf(16) },
  buttonText1: { color: 'black', fontFamily: fonts.medium, fontSize: nf(16) },
  buttonInsideView: {
    flexDirection: 'row',
    paddingVertical: hpx(15),
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonView1:{width: wpx(300), borderRadius: wpx(10), shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 3,
  shadowColor: '#0000001A',
}
});

export const ButtonStyle = StyleSheet.create({
  buttonContainer: { width: wpx(300), borderRadius: wpx(10) },
  buttonContent: { color: 'white', fontFamily: fonts.bold, fontSize: nf(16) },
  buttonInnerView: {
    flexDirection: 'row',
    paddingVertical: hpx(15),
    alignSelf: 'center',
    alignItems: 'center',
  },
});