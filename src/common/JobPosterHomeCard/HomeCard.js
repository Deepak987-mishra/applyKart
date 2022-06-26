import React, { useState } from "react";
import { View, TouchableOpacity, Image, Platform } from "react-native";
import { fonts, nf, hpx, wpx, hp, icons, colors } from "../../constants/constant";
import { CustomText } from "../CustomText/CustomText";
import moment from "moment";

const HomeCard = props => {
  return (
    
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={() => (props.onPress() ? props.onPress() : {})}
        style={{
          borderRadius: Platform.OS == "ios" ? wpx(8) : wpx(10) ,
          shadowColor:  Platform.OS == "ios" ? "#0000004D":"4C4C4C",
          shadowOffset:  Platform.OS == "ios" ? {width: 4, height: 2} : {width: 10, height: 10},
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 8,
          backgroundColor: "white",
          padding: 10,
        }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              borderColor: "#55555533",
              borderWidth: wpx(1),
              height: wpx(50),
              width: wpx(50),
              borderRadius: 15,
              alignItems: "center",
              marginTop: hpx(15),
              justifyContent: "center",
            }}>
            <Image
              style={{
                height: wpx(28),
                width: wpx(28),
              }}
              source={icons.googleIcon}
            />
          </View>
          <View style={{ marginLeft: wpx(10), paddingTop:wpx(25) }}>
            <CustomText text="Google" medium eh4 />
          </View>
          <View style={{ marginLeft: wpx(88), marginTop: hpx(15) }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#F6F5FB",
                borderRadius: wpx(8),
                height: hpx(28),
                width: wpx(70),
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CustomText text="Active" regular eh6 textColor={colors.blue} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: hpx(10), marginLeft: wpx(15) }}>
          <CustomText text={props.role} semiBold oh5 />
          {/* <CustomText text="Business Analyst" semiBold oh5 /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: hpx(5),
            marginHorizontal: wpx(15),
          }}>
          <CustomText text={"$ " + props.salary + "K - " + "$ " + props.maxSal + "K"} regular eh5 />
          {/* <CustomText text={props.jobype} regular eh5 /> */}
          <CustomText
            regular
            eh5
            text={
              props?.job_Type == 1
                ? "Freelance"
                : props?.job_Type == 2
                ? "Full Time"
                : props?.job_Type == 3
                ? "Internship"
                : props?.job_Type == 4
                ? "Part Time"
                : props?.job_Type == 5
                ? "Temporary"
                : "Night Shift"
            }
          />
        </View>
        <View style={{ marginTop: hpx(5), marginLeft: wpx(15) }}>
          <CustomText text={props.location} regular eh5 />
        </View>
        <View style={{ marginTop: hpx(5), marginLeft: wpx(15) }}>
          <CustomText text={"Posted on: " + moment(props.posted_Date).format("LL")} regular eh5 />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeCard;


