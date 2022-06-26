import {StyleSheet} from 'react-native';
import {colors, fonts, hpx, nf, wpx} from '../../../../constants/constant';

export const AvailabilityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  selectAllContainer: {
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
   
  },
  selectAllIcon: {
    height: hpx(20),
    width: wpx(20),
    resizeMode: 'contain',
    marginRight: wpx(10),
  },
  dayContainer: {
    marginTop: hpx(16),
    marginHorizontal: wpx(20),
   
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayIcon: {
    height: hpx(20),
    width: wpx(20),
    resizeMode: 'contain',
    marginRight: wpx(10),
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
