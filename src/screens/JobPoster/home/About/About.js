import { StyleSheet, Text, View, ScrollView, Image, Touchableopacity } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../constants/constant";
import { CustomText } from "../../../../common/CustomText/CustomText";
import Header from "../../../../common/Header/Header";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerActions } from "@react-navigation/routers";
import { SafeAreaView } from "react-native-safe-area-context";

const About = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        leftIcon={icons.sideMenuIcon}
        rightIcon={icons.bellNotificationIcon1}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="About"
      
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ marginTop: hpx(19), flex: 1 }}>
        <View style={{ marginHorizontal: wpx(20) }}>
          <CustomText
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            regular
            oh5
          />
        </View>
        <View style={{ marginHorizontal: wpx(20), marginTop: hpx(16) }}>
          <CustomText
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
            regular
            oh5
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default About;
