import { StyleSheet, Text, View, ScrollView, Image, Touchableopacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../constants/constant";
import { CustomText } from "../../../../common/CustomText/CustomText";
import Header from "../../../../common/Header/Header";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import ContactUsStyle from "./ContactUsStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/routers";

const ContactUs = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        leftIcon={icons.sideMenuIcon}
        rightIcon={icons.bellNotificationIcon1}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Contact Us"
       
      />
      <View style={{ marginHorizontal: wpx(20), marginTop: hpx(19) }}>
        <CustomText
          textColor={colors.black1}
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
          regular
          oh5
        />
      </View>
      <TouchableOpacity>
        <View
          style={{
            marginTop: hpx(20),
            borderRadius: wpx(8),
            height: hpx(51),
            marginHorizontal: wpx(20),
            width: wpx(335),
            flexDirection: "row",
            backgroundColor: "#F6F5FB",
          }}>
          <View style={{ marginLeft: wpx(15), marginTop: hpx(17) }}>
            <Image
              style={{
                height: hpx(17),
                width: wpx(26.15),
              }}
              source={icons.mail}
            />
          </View>
          <View style={{ marginLeft: wpx(13.85), marginTop: hpx(15) }}>
            <CustomText text="support@applykart.co.in" medium oh5 />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ContactUs;
