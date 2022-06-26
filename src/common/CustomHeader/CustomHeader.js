// import React from "react";
// import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
// import { colors, fonts, hpx, wpx, nf, wp } from "../../constants/constant";
// import NavigationServices, { navigationRef } from "../../navigation/NavigationService";

// const CustomHeader = props => {
//   return (
//     <View style={{ ...styles.header, ...props.headerStyle }}>
//       <TouchableOpacity onPress={props.leftOnPress}>
//         <Image style={{ ...styles.leftImage, ...props.styleLeftImage }} resizeMode="contain" source={props.leftImage} />
//       </TouchableOpacity>
//       <View style={styles.headerNameView}>
//         <Text style={styles.headingText}>{props.title}</Text>
//       </View>
//       {props.rightImage ? (
//         <TouchableOpacity onPress={() => NavigationServices.navigate("Notification")}>
//           <Image
//             style={[styles.rightImage, { ...props.rightIconstyle }]}
//             resizeMode="contain"
//             source={props.rightImage}
//           />
//         </TouchableOpacity>
//       ) : props.rightText ? (
//         <TouchableOpacity onPress={props.rightOnPress}>
//           <Text>{props.rightText}</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.rightImage} />
//       )}
//     </View>
//   );
// };

// export default CustomHeader;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: hpx(15),
//     marginBottom: hpx(20),

//     width: wp(100),

//     backgroundColor: colors.blue,
//   },
//   headerNameView: {
//     flexDirection: "row",
//   },

//   leftImage: {
//     height: hpx(26),
//     width: wpx(120),
//   },
//   rightImage: {
//     height: hpx(18),
//     width: wpx(23),
//   },
//   headingText: {
//     fontSize: nf(18),
//     color: colors.white,
//     fontFamily: fonts.extraBold,
//   },
// });
