// import React, { useState } from "react";
// import { StyleSheet, View, Image, Text, TouchableOpacity, Linking } from "react-native";
// import { colors, hpx, wp, wpx, icons } from "../../../../constants/constant";

// import { DrawerActions } from "@react-navigation/routers";
// // import { useNavigation } from "@react-navigation/core";
// import { types } from "../../../../store/action/ActionTypes";
// import { useDispatch, useSelector } from "react-redux";

// import LinearGradient from "react-native-linear-gradient";
// import { CustomText } from "../../../../common/CustomText/CustomText";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { PosterDrawerStyles } from "./PosterDrawerStyles";

// const PosterDrawer = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);

//   const logout = () => {
//     dispatch({
//       type: types.LOG_OUT,
//       payload: "Home",
//     });
//   };

//   return (
//     <LinearGradient
//       style={PosterDrawerStyles.container}
//       colors={["#0000FF", "#1CB5E0"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}>
//       <View style={PosterDrawerStyles.profileView}>
//         <Image source={icons.profilepic} style={PosterDrawerStyles.profilePic} />
//         <View style={{ marginLeft: wpx(10) }}>
//           <CustomText text="Anotonio" textColor="white" />
//           <CustomText text="Anotonio@fakemail.com" textColor="white" />
//           <CustomText text="+65-9876543210" textColor="white" />
//         </View>
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate("PosterHome")} style={PosterDrawerStyles.rowContainer}>
//         <Image source={icons.home} style={PosterDrawerStyles.iconView} />
//         <CustomText text="Home" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
//       </TouchableOpacity>
//       <TouchableOpacity style={PosterDrawerStyles.rowContainer}>
//         <Image source={icons.camera} style={PosterDrawerStyles.iconView} />
//         <CustomText text="Calendar" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
//       </TouchableOpacity>
//       <TouchableOpacity style={PosterDrawerStyles.rowContainer}>
//         <Image source={icons.mesaages} style={PosterDrawerStyles.iconView} />
//         <CustomText text="Messages" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("MyProfile")} style={PosterDrawerStyles.rowContainer}>
//         <Image source={icons.myProfile} style={PosterDrawerStyles.iconView} />
//         <CustomText text="My Profile" textColor="white" bold oh5 style={{ paddingLeft: wpx(8) }} />
//       </TouchableOpacity>
//       <TouchableWithoutFeedback onPress={() => setShow(!show)} style={PosterDrawerStyles.dropdownView}>
//         <Image source={icons.legal} style={PosterDrawerStyles.iconView} />
//         <CustomText text="Legal" textColor="white" medium oh5 style={{ paddingLeft: wpx(8) }} />
//         <Image source={show ? icons.arrowUp : icons.arrowDown} style={PosterDrawerStyles.arrowView} />
//       </TouchableWithoutFeedback>

//       {show ? (
//         <View style={PosterDrawerStyles.legalViewContainer}>
//           <TouchableOpacity>
//             <CustomText text="Change Password" textColor="white" regular oh5 />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("Faq")}>
//             <CustomText text="FAQ’s" textColor="white" regular oh5 />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("About")}>
//             <CustomText text="About Us" textColor="white" regular oh5 />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("ContactUs")}>
//             <CustomText text="Contact Us" textColor="white" regular oh5 />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("PrivacyPolicy")}>
//             <CustomText text="Privacy Policy" textColor="white" regular oh5 />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginTop: hpx(15) }} onPress={() => navigation.navigate("TermsCondition")}>
//             <CustomText text="Terms & Conditions" textColor="white" regular oh5 />
//           </TouchableOpacity>
//         </View>
//       ) : null}

//       <TouchableOpacity onPress={() => logout} style={PosterDrawerStyles.rowContainer}>
//         <Image source={icons.logout} style={PosterDrawerStyles.iconView} />
//         <CustomText text="Logout" textColor="white" oh5 style={{ paddingLeft: wpx(8) }} />
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };
// export default PosterDrawer;

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//   },
// });
