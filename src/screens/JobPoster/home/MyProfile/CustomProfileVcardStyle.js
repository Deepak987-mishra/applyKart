import React from "react";
import { StyleSheet } from "react-native";
import { colors, hp, wp, hpx, wpx } from "../../../../constants/constant";

export default CustomProfileVCardStyles = StyleSheet.create({
  mainCardView: {
    marginTop: hp(8),
  },
  backgroundCard: {
    paddingVertical: hpx(15),
    width: wpx(335),
  },
  foregroundCard: { height: hpx(135), width: wpx(335) },
  profileImage: { height: "60%", width: "100%", resizeMode: "contain" },
  userprofileImage: { height: "100%", width: "100%", resizeMode: "contain" },
  profileView: {
    borderWidth: 3,
    height: 100,
    width: 100,
    alignSelf: "center",
    marginTop: -40,
    borderRadius: 200 / 2,
    borderColor: colors.white,
  },
  nameSplit: { flexDirection: "row", alignSelf: "center" },
  phoneNum: { flexDirection: "row", alignSelf: "center", marginBottom: hpx(10) },
  profileName: {
    alignSelf: "center",
    marginTop: 10,
    color: colors.white,
  },
  phoneNumber: {
    alignSelf: "center",
    marginTop: 10,
    color: colors.white,
  },
  cardComponentView: {
    height: 100,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  cardRowContainer: { flexDirection: "row", height: 30, marginTop: 5 },
  cardImageContainer: {
    height: "100%",
    width: "15%",

    justifyContent: "center",
    alignItems: "center",
  },
  cardComponentText: {
    height: 35,
    width: "85%",
    justifyContent: "center",
  },
  cardImageTextView: {
    marginLeft: wpx(25),
    flexDirection: "row",
  },
});
