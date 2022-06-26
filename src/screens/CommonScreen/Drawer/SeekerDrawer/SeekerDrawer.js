import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { colors, hpx, wp, wpx, Icons, nf, montserratFonts, icons } from "../../../../constants/constant";

import { DrawerActions } from "@react-navigation/routers";

import { useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import LinearGradient from "react-native-linear-gradient";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SeekerDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const logout = () => {
    dispatch({
      type: types.LOG_OUT,
    });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#0000FF", "#1CB5E0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: hpx(100),
          marginHorizontal: wpx(15),
        }}>
        <Image source={icons.profilepic} style={{ height: hpx(60), width: wpx(60), resizeMode: "contain" }} />
        <View style={{ marginLeft: wpx(10) }}>
          <CustomText text="Anotonio" textColor="white" />
          <CustomText text="Anotonio@fakemail.com" textColor="white" />
          <CustomText text="+65-9876543210" textColor="white" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PosterHome")}
        style={{ flexDirection: "row", alignItems: "center", marginHorizontal: wpx(16), marginTop: hpx(25) }}>
        <Image source={icons.home} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="Home" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: wpx(16), marginTop: hpx(25) }}>
        <Image source={icons.camera} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="Calendar" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: wpx(16), marginTop: hpx(25) }}>
        <Image source={icons.mesaages} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="Messages" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyProfile")}
        style={{ flexDirection: "row", alignItems: "center", marginHorizontal: wpx(16), marginTop: hpx(25) }}>
        <Image source={icons.myProfile} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="My Profile" textColor="white" bold oh5 style={{ paddingLeft: wpx(8) }} />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => setShow(!show)} style={styles.dropdownView}>
        <Image source={icons.legal} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="Legal" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
        <Image
          source={show ? icons.arrowUp : icons.arrowDown}
          style={{ height: hpx(7), width: wpx(12), resizeMode: "contain", marginLeft: wpx(3) }}
        />
      </TouchableWithoutFeedback>

      {show ? (
        <View style={{ marginHorizontal: wpx(45), marginTop: hpx(15) }}>
          <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
            <CustomText text="Change Password" textColor="white" regular oh5 />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("Faq")}>
            <CustomText text="FAQ’s" textColor="white" regular oh5 />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("About")}>
            <CustomText text="About Us" textColor="white" regular oh5 />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("ContactUs")}>
            <CustomText text="Contact Us" textColor="white" regular oh5 />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("PrivacyPolicy")}>
            <CustomText text="Privacy Policy" textColor="white" regular oh5 />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("TermsCondition")}>
            <CustomText text="Terms & Conditions" textColor="white" regular oh5 />
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity
        // onPress={() => alert("hello")}
        onPress={logout}
        style={{ flexDirection: "row", alignItems: "center", marginHorizontal: wpx(16), marginTop: hpx(25) }}>
        <Image source={icons.logout} style={{ height: hpx(20), width: wpx(20), resizeMode: "contain" }} />
        <CustomText text="Logout" textColor="white" oh5 style={{ paddingLeft: wpx(8) }} />
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default SeekerDrawer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  completeText: {
    marginLeft: wpx(45),
    textAlign: "right",
  },
  dropdownView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wpx(16),
    marginTop: hpx(25),
  },
});
