import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { fonts, nf, icons, wpx, hpx, colors } from "../../constants/constant";
import navigation from "../../navigation/NavigationService";
import { CustomText } from "../CustomText/CustomText";

const SeekerCards = ({ props }) => {
  console.log("props", props?.item);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: wpx(15) }}>
        {props?.item?.profile_pic ? (
          <Image
            style={{
              height: wpx(70),
              width: wpx(70),
              borderRadius: wpx(50),
            }}
            source={{ uri: props.item.profile_pic }}
          />
        ) : (
          <Image
            style={{
              height: wpx(70),
              width: wpx(70),
              borderRadius: wpx(50),
            }}
            source={icons.profilepic}
          />
        )}
      </View>
      <View style={{ marginTop: wpx(10) }}>
        <Text
          style={{
            color: "#000000",
            fontSize: nf(15),
            fontFamily: fonts.semiBold,
          }}>
          {props.item.username}
        </Text>
      </View>
      {
        props.item.company && props.item.title ?
        <View>
      <View style={{ marginTop: hpx(5) }}>
        <Text
          style={{
            color: "#0B45F3",
            fontSize: nf(12),
            fontFamily: fonts.regular,
          }}>
          {props.item.title}
        </Text>
      </View>
      <View style={{ marginTop: wpx(5) }}>
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: nf(12),
            fontFamily: fonts.regular,
          }}>
          {props.item.company}
        </Text>
      </View>
      </View>
      : 
      <CustomText text={'Newbie'} eh6 regular />
}
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            resizeMode: "contain",
            marginTop: wpx(5),
          }}
          source={icons.location}
        />
    {
      props?.item?.location && (
        <Text
        style={{
          color: "#000000",
          fontSize: nf(12),
          fontFamily: fonts.regular,
          marginTop: wpx(5),
          marginLeft: wpx(8),
        }}>
        {props?.item?.location.split(", ")[0]}
      </Text>
      )
    } 
       
      </View>

      <TouchableOpacity
        style={{ marginTop: wpx(10), backgroundColor: "#F6F5FB", padding: 5 }}
        onPress={() =>
          navigation.navigate("CandidateDetail", { id: props.item?.job_Seeker_Id, jobId: props.item?.job_Id })
        }>
        <Text
          style={{
            color: "#0B45F3",
            fontSize: nf(12),
            fontFamily: fonts.regular,
          }}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeekerCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hpx(10),
    width: wpx(160),
    borderRadius: wpx(10),
    alignItems: "center",
    shadowColor: '4C4C4C',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    marginHorizontal: wpx(15),
  },
 
});
