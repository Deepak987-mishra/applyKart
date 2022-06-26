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
import React, { useEffect, useState } from "react";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { fonts, wpx, hpx, icons, wp, hp, colors } from "../../../../constants/constant";
import Header from "../../../../common/Header/Header";

import { MyProfileStyle } from "./MyprofileStyle";
import CustomProfileVCard from "./CustomProfileVcard";
import { DrawerActions } from "@react-navigation/routers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [workExp, setWorkExp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobSpec, setJobSpec] = useState("");
  const [isWorkedBefore, setIsWorkedBefore] = useState(true);

  const currentUser = useSelector(state => state?.authReducer?.currentUser);

  const { userId, companyDetails, reducerGetJobPosterDetail } = useSelector(
    state => ({
      userId: state?.authReducer?.currentUser?.user_Id,
      companyDetails: state.homeReducer?.companyDetails,
      reducerGetJobPosterDetail: state?.homeReducer?.reducerGetJobPosterDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    let body = {
      userId: userId,
    };
    dispatch({
      type: types.GET_COMPANY_DETAILS,
      payload: body,
    });
  }, []);

  return (
    <SafeAreaView style={MyProfileStyle.mainContainer}>
      <Header
        leftIcon={icons.sideMenuIcon}
        rightIcon={icons.edit}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="My Profile"
      />
      <View style={MyProfileStyle.container}>
        <View style={{ alignSelf: "center" }}>
          <CustomProfileVCard
            phoneNumber="+65- 9876 5432 10"
            firstName={reducerGetJobPosterDetail?.first_Name + " " + reducerGetJobPosterDetail?.last_Name}
          />
        </View>

        <View style={{ marginHorizontal: wpx(20) }}>
          <View style={MyProfileStyle.companyheading}>
            <CustomText text="Company Details" semiBold oh5 />
            <TouchableOpacity onPress={() => navigation.navigate("ComapnyDetails")}>
              <Image source={icons.arrowRight} style={MyProfileStyle.img} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <CustomText
              regular
              eh5
              textColor={colors.grey}
              text={"Company Name : "}
              style={MyProfileStyle.companyname}
            />
            <CustomText
              regular
              eh5
              textColor={colors.grey}
              text={companyDetails?.company ?? null}
              style={MyProfileStyle.companyname}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <CustomText regular eh5 text={"Location : "} textColor={colors.grey} style={MyProfileStyle.location} />
            <CustomText
              regular
              eh5
              text={companyDetails?.location ?? "  "}
              textColor={colors.grey}
              style={MyProfileStyle.location}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <CustomText regular eh5 text="Website URL: " textColor={colors.grey} style={MyProfileStyle.website} />
            <CustomText
              regular
              eh5
              text={companyDetails?.website ?? ""}
              textColor={colors.blue1}
              style={MyProfileStyle.website}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;
