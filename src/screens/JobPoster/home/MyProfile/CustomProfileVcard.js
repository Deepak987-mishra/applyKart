import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { colors, hp, wp, hpx, wpx, icons } from "../../../../constants/constant";
import CustomProfileVCardStyles from "./CustomProfileVcardStyle";

const CustomProfileVCard = props => {
  return (
    <View style={CustomProfileVCardStyles.mainCardView}>
      <ImageBackground source={icons.blueCard} style={CustomProfileVCardStyles.backgroundCard} resizeMode="stretch">
        <View style={CustomProfileVCardStyles.profileView}>
          <Image
            style={CustomProfileVCardStyles.userprofileImage}
            source={props.posterImage ? props.posterImage : icons.placeholderUserImage}
          />
        </View>
        <View style={CustomProfileVCardStyles.nameSplit}>
          <CustomText
            text={props.firstName ? props.firstName + " " : "Your "}
            eh3
            semiBold
            style={CustomProfileVCardStyles.profileName}
          />
          {/* <CustomText text={props.lastName ? props.lastName : 'Name'} eh3 semiBold style={CustomVCardStyles.profileName} /> */}
        </View>
        <View style={CustomProfileVCardStyles.phoneNum}>
          <CustomText
            text={props.phoneNumber ? props.phoneNumber + " " : "Enter Phone Number"}
            eh3
            semiBold
            style={CustomProfileVCardStyles.phoneNumber}
          />
        </View>
        {props.children}
      </ImageBackground>
    </View>
  );
};

export default CustomProfileVCard;
