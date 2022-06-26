import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { nf, fontSizes, fonts, colors } from '../../constants/constant';
import PropTypes from 'prop-types';
const CustomText = props => {
  const {
    style,
    textColor,
    children,
    black,
    bold,
    extraBold,
    light,
    extraLight,
    medium,
    thin,
    semiBold,
    semiBoldItalic,
    regular,
    lightItalic,

    eh1,
    eh2,
    eh3,
    eh4,
    eh5,
    eh6,
    eh7,
    eh8,
    oh1,
    oh2,
    oh3,
    oh4,
    oh5,
    oh6,
    oh7,
    oh8,
    lines,
    toggleLessMoreButton,
    ...rest
  } = props;

  return (
    <>
      <Text
        style={StyleSheet.flatten([
          { color: textColor ? textColor : colors.black },
          StyleSheet.flatten([style]),
          eh1 && { fontSize: nf(fontSizes.eh1) },
          eh2 && { fontSize: nf(fontSizes.eh2) },
          eh3 && { fontSize: nf(fontSizes.eh3) },
          eh4 && { fontSize: nf(fontSizes.eh4) },
          eh5 && { fontSize: nf(fontSizes.eh5) },
          eh6 && { fontSize: nf(fontSizes.eh6) },
          eh7 && { fontSize: nf(fontSizes.eh7) },
          eh8 && { fontSize: nf(fontSizes.eh8) },
          oh1 && { fontSize: nf(fontSizes.oh1) },
          oh2 && { fontSize: nf(fontSizes.oh2) },
          oh3 && { fontSize: nf(fontSizes.oh3) },
          oh4 && { fontSize: nf(fontSizes.oh4) },
          oh5 && { fontSize: nf(fontSizes.oh5) },
          oh6 && { fontSize: nf(fontSizes.oh6) },
          oh7 && { fontSize: nf(fontSizes.oh7) },
          oh8 && { fontSize: nf(fontSizes.oh8) },
          black && styles.black,

          bold && styles.bold,
          extraBold && styles.extraBold,
          light && styles.light,
          extraLight && styles.extraLight,
          medium && styles.medium,
          thin && styles.thin,
          semiBold && styles.semiBold,
          semiBoldItalic && styles.semiBoldItalic,
          regular && styles.regular,
          lightItalic && styles.lightItalic
        ])}>
        {props.text}
      </Text>
    </>
  );
};
CustomText.propTypes = {
  style: Text.propTypes.style,
  textColor: PropTypes.string,
  lines: PropTypes.number,
  black: PropTypes.bool,
  bold: PropTypes.bool,
  extraBold: PropTypes.bool,
  light: PropTypes.bool,
  extraLight: PropTypes.bool,
  medium: PropTypes.bool,
  thin: PropTypes.bool,
  semiBold: PropTypes.bool,
  semiBoldItalic: PropTypes.bool,
  regular: PropTypes.bool,

  oh1: PropTypes.bool,
  oh2: PropTypes.bool,
  oh3: PropTypes.bool,
  oh4: PropTypes.bool,
  oh5: PropTypes.bool,
  oh6: PropTypes.bool,
  oh7: PropTypes.bool,
  oh8: PropTypes.bool,
  eh1: PropTypes.bool,
  eh2: PropTypes.bool,
  eh3: PropTypes.bool,
  eh4: PropTypes.bool,
  eh5: PropTypes.bool,
  eh6: PropTypes.bool,
  eh7: PropTypes.bool,
  eh8: PropTypes.bool,
  h1Style: Text.propTypes.style,
  h2Style: Text.propTypes.style,
  h3Style: Text.propTypes.style,
  h4Style: Text.propTypes.style,
  h5Style: Text.propTypes.style,
  h6Style: Text.propTypes.style,
  children: PropTypes.node,
  onPress: PropTypes.func,
  toggleLessMoreButton: PropTypes.bool,
};
const styles = StyleSheet.create({
  text: {},
  bold: {
    fontFamily: fonts.bold,
  },
  black: {
    fontFamily: fonts.black,
  },
  extraBold: {
    fontFamily: fonts.extraBold,
  },
  light: {
    fontFamily: fonts.light,
  },
  lightItalic: {
    fontFamily: fonts.lightItalic,
  },
  extraLight: {
    fontFamily: fonts.extraLight,
  },
  medium: {
    fontFamily: fonts.medium,
  },
  thin: {
    fontFamily: fonts.thin,
  },

  regular: {
    fontFamily: fonts.regular,
  },
  semiBold: {
    fontFamily: fonts.semiBold,
  },
  semiBoldItalic: {
    fontFamily: fonts.semiBoldItalic,
  },
});

export { CustomText };
