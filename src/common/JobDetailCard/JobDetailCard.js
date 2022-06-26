import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { fonts, nf, icons, wpx, hpx, hp, wp } from '../../constants/constant';

const JobDetailCard = ({ props }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View
          style={{
            borderColor: '#55555533',
            borderWidth: wpx(1),
            height: hpx(60),
            width: wpx(60),
            borderRadius: wpx(15),
            alignItems: 'center',
            marginTop: hpx(15),
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: hpx(32.92),
              width: wpx(32.23),
            }}
            source={icons.googleIcon}
          />
        </View>
        <View style={{ marginTop: hpx(10) }}>
          <Text
            style={{
              color: '#000000',
              fontSize: nf(15),
              fontFamily: fonts.semiBold,
            }}>
            Business Analyst
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: hpx(9) }}>
          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: nf(14),
                fontFamily: fonts.regular,
              }}>
              $ 2K - $ 3K
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#4C4C4C',
                fontSize: nf(14),
                fontFamily: fonts.regular,
              }}>
              Full Time
            </Text>
          </View>
        </View>
        <View style={{ marginTop: hpx(10) }}>
          <Text
            style={{
              color: '#4C4C4C',
              fontSize: nf(14),
              fontFamily: fonts.regular,
            }}>
            New York, USA
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobDetailCard;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    height: hpx(180),
    width: wpx(335),
    borderRadius: wpx(15),
    shadowColor: '#0000004D',
    alignItems: 'center',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 3,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  seekerName: {},
  designation: {},
  companyName: {},
  locationIcon: {},
  locationTitle: {},
  btnTitle: {},
});
