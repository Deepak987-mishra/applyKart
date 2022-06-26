import {StyleSheet} from 'react-native';
import {fonts, nf, hp, hpx, colors, wp, wpx} from '../../../constants/constant';

export const OnBoardingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  threeDots: {position: 'absolute', bottom: hp(7), right: wpx(300)},
  inactiveDot: {
    width: wpx(6),
    height: hpx(6),
    resizeMode: 'stretch',
    marginHorizontal: wpx(5),
  },
  container1: {flex: 1, backgroundColor: '#FFFFFF'},
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    fontSize: nf(20),
    fontFamily: fonts.bold,
    textAlign: 'left',
    color: colors.white,
  },

  buttonContainer: {
    marginTop: hpx(47),
    marginBottom: hpx(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {marginLeft: wp(1)},
  buttonView: {
    width: wpx(134),
    borderRadius: wpx(10),
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    fontSize: nf(16),
  },
  buttonInsideView: {
    flexDirection: 'row',
    paddingVertical: wp('5%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: colors.white,
    height: hpx(8),
    width: wpx(8),
    borderRadius: wpx(20),
    marginHorizontal: wpx(1),
    opacity: 0.7,
  },
  inactiveDot: {
    backgroundColor: colors.white,
    height: hpx(8),
    width: wpx(8),
    borderRadius: wpx(20),
    marginHorizontal: wpx(1),
  },
  skipText: {
    marginTop: hpx(50),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: wpx(20),
  },
  textContainer: {
    marginTop: hpx(498),
    marginHorizontal: wpx(20),
    width: wpx(260),
  },
  contentText: {
    fontSize: nf(20),
    fontFamily: fonts.medium,
    color: colors.white,
  },
  headingText: {
    fontSize: nf(20),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  detailText: {
    fontFamily: fonts.regular,
    fontSize: nf(14),
    color: colors.white,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginHorizontal: wpx(20),
    marginTop: hpx(40),
  },
  buttonView: {
    width: wpx(134),
    height: hpx(56),
  },
  detailView: {
    width: wpx(300),
    marginHorizontal: wpx(20),
  },
});
