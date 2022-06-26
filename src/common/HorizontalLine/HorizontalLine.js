import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {} from '../../constants/constant';
import HorizontalStyles from './HorizontalStyles';

export const HorizontalLine = props => {
  return (
    <View style={{...HorizontalStyles.horizontalLine, ...props.style}}></View>
  );
};

export const SmallHorizontalLine = props => {
  return (
    <View
      style={{...HorizontalStyles.smallHorizontalLine, ...props.style}}></View>
  );
};
