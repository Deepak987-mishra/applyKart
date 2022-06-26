import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, fonts, wpx, colors, hpx } from "../../constants/constant";

import HeaderStyles from "./HeaderStyles";

const Header = props => {
  return (
    <View style={{ ...HeaderStyles.container, ...props.headerStyle }}>
      <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
        <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          style={{ justifyContent: "center" }}
          onPress={() => (props.onLeftPress ? props.onLeftPress() : {})}>
          <Image source={props.leftIcon} resizeMode="contain" leftIconStyle={props.leftIcon}/>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={HeaderStyles.title}>{props.title}</Text>
      </View>

      {props.multipleRight ? (
        <View style={HeaderStyles.multipleButtonMainView}>
          <TouchableOpacity onPress={() => (props.onMultipleRightPress ? props.onMultipleRightPress() : {})}>
            <Image source={props.multipleRightImage1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (props.onMultipleLeftPress ? props.onMultipleLeftPress() : {})}>
            <Image source={props.multipleRightImage2} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          onPress={() => (props.onRightPress ? props.onRightPress() : {})}>
          <Image source={props.rightIcon} rightIconStyle={props.rightIcon}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
