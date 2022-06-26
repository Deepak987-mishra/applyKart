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
import { fonts, nf, icons, wpx, hpx, wp, hp } from '../../constants/constant';

const JobDetailCard2 = ({ props }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ marginLeft: wpx(15), marginTop: hpx(15) }}>
          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: nf(14),
                fontFamily: fonts.semiBold,
              }}>
              Vacancies
            </Text>
          </View>
          <View style={{ marginTop: hpx(15) }}>
            <Text
              style={{
                color: '#6F6F6F',
                fontSize: nf(14),
                fontFamily: fonts.regular,
              }}>
              20
            </Text>
          </View>
        </View>
        <View
          style={{
            height: hpx(50),
            width: wpx(1),
            borderRadius: wpx(8),
            backgroundColor: '#CECDD3',
            marginLeft: wpx(21),
            marginTop: hpx(15),
          }}></View>

        <View>
          <View style={{ marginLeft: wpx(20), marginTop: hpx(15) }}>
            <Text
              style={{
                color: '#000000',
                fontSize: nf(14),
                fontFamily: fonts.semiBold,
              }}>
              Education
            </Text>
          </View>
          <View style={{ marginTop: hpx(15), marginLeft: wpx(20) }}>
            <Text
              style={{
                color: '#6F6F6F',
                fontSize: nf(14),
                fontFamily: fonts.regular,
              }}>
              B.tech, MBA
            </Text>
          </View>
        </View>
        <View
          style={{
            height: hpx(50),
            width: wpx(1),
            borderRadius: wpx(8),
            backgroundColor: '#CECDD3',
            marginLeft: wpx(19),
            marginTop: hpx(15),
          }}></View>

        <View>
          <View style={{ marginLeft: wpx(17), marginTop: hpx(15) }}>
            <Text
              style={{
                color: '#000000',
                fontSize: nf(14),
                fontFamily: fonts.semiBold,
              }}>
              Experience
            </Text>
          </View>
          <View style={{ marginLeft: wpx(20), marginTop: hpx(15) }}>
            <Text
              style={{
                color: '#6F6F6F',
                fontSize: nf(14),
                fontFamily: fonts.regular,
              }}>
              Fresher
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JobDetailCard2;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    height: hpx(80),
    width: wpx(335),
    borderRadius: wpx(15),
    shadowColor: '#0000004D',
    flexDirection: 'row',
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
