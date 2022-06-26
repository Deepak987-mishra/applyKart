import {
  View,
  Modal,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { fonts, wpx, hpx, icons, wp, hp, colors } from "../../../../constants/constant";
import Header from "../../../../common/Header/Header";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { ChangePasswordStyle } from "./ChangepasswordStyle";
import { passwordRegex } from "../../../../constants/constant";
import { useDispatch } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { DrawerActions } from "@react-navigation/native";

const ChangePwd = ({ navigation, route }) => {
  // const {user_id} = route.params;
  const dispatch = useDispatch();
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [validPassword, setValidPassword] = useState("");

  // useEffect(() => {
  // if (newPwd, pwd, confirmPwd) {
  //     if (passwordRegex.test(newPwd && pwd && confirmPwd)) {
  //       setValidPassword(true);
  //     }
  //     else {
  //       setValidPassword(false);
  //     }
  //   } else {
  //     setValidPassword(false);
  //   }
  // }, [newPwd, pwd, confirmPwd]);

  const onUpdate = () => {
    let body = {
      newpassword: newPwd,
      currentpassword: pwd,
    };
    dispatch({
      type: types.CHANGE_PASSWORD,
      payload: body,
    });
  };

  return (
    <SafeAreaView style={ChangePasswordStyle.mainContainer}>
      <View style={ChangePasswordStyle.container}>
        <Header
          leftIcon={icons.sideMenuIcon}
          onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        />
        <View style={ChangePasswordStyle.heading}>
          <CustomText text="Change Password" eh1 semiBold />
          <CustomText
            text="Your new password must be different from the previously used passwords"
            regular
            textColor={colors.grey}
            oh5
            style={ChangePasswordStyle.content}
          />
        </View>
        <View>
          <CustomTextInput
            placeholder="Old password"
            style={ChangePasswordStyle.mainTextInput}
            onChangeText={text => setPwd(text)}
            value={pwd}
          // errorMessage={
          //   pwd && !validPassword
          //     ? "The password must include uppercase and lowercase letters numeric and special characters."
          //     : null
          // }
          />
          <CustomTextInput
            placeholder="New password"
            onChangeText={text => setNewPwd(text)}
            value={newPwd}
          // errorMessage={
          //   newPwd && !validPassword
          //     ? "The password must include uppercase and lowercase letters numeric and special characters."
          //     : null
          // }
          />

          <CustomTextInput
            placeholder="Confirm new password"
            onChangeText={text => setConfirmPwd(text)}
            value={confirmPwd}
          // errorMessage={
          //   confirmPwd && !validPassword
          //     ? "The password must include uppercase and lowercase letters numeric and special characters."
          //     : null
          // }
          />
        </View>
        <CustomButton onPress={() => onUpdate()} style={ChangePasswordStyle.btn} title={"Update"} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePwd;
