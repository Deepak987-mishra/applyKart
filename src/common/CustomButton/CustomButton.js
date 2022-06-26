import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { icons, fonts, wpx, nf, hpx, wp, colors } from "../../constants/constant";
import { ButtonStyles } from "./ButtonStyles";

export const CustomButton = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => (props.onPress ? props.onPress() : {})}
      style={{ alignSelf: "center", ...props.style }}>
      <LinearGradient
        colors={["#0000FF", "#1CB5E0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ ...ButtonStyles.buttonView, ...props.buttonStyle }}>
        <View style={ButtonStyles.buttonInsideView}>
          {props.loader ? (
            <ActivityIndicator size={"small"} color={colors.white} style={{}} />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...ButtonStyles.buttonText, ...props.buttonTextStyle }}>{props.title}</Text>
              {props.nextIcon ? (
                <Image style={{ marginLeft: wp(4), alignSelf: "center" }} source={icons.nextArrow} />
              ) : null}
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const WhiteCustomButton = props => {
  return (
    <TouchableOpacity
      onPress={() => (props.onPress ? props.onPress() : {})}
      style={{ alignSelf: "center", ...props.style }}>
      <View
        style={{ ...ButtonStyles.buttonView1, ...props.buttonStyle, backgroundColor: "#FFFFFF" }}
        colors={["#FFFFFF"]}>
        <View style={ButtonStyles.buttonInsideView}>
          <Text style={ButtonStyles.buttonText1}>{props.title}</Text>
          {props.nextIcon ? <Image style={{ marginLeft: wp(4) }} source={icons.nextArrow} /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
