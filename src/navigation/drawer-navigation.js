import React, { useState, useRef, useEffect } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";
import Screens from "../navigation/drawer-screens";
import { CustomText } from "../common/CustomText/CustomText";
import { fonts, wpx, hpx, icons, wp, hp, colors, fontSizes, nf } from "../constants/constant";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../store/action/ActionTypes";
import jwt_decode from "jwt-decode";

const height = Dimensions.get("window").height;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerContent = props => {
  const StackSelected = useSelector(state => state.globalReducer.stackSelected);
  const [showLegalContent, setShowLegalContent] = useState(false);
  const [showMyJobContent, setShowMyJobContent] = useState(false);
  const [showSeekerProfileContent, setShowSeekerProfileContent] = useState(false)

  const dispatch = useDispatch();

  const { jobSeekerDetail, reducerGetJobPosterDetail, jobseekerDetail } = useSelector(
    state => ({
      jobSeekerDetail: state?.jobseekerReducer?.jobSeekerDetail,
      reducerGetJobPosterDetail: state?.homeReducer?.reducerGetJobPosterDetail,
      jobseekerDetail: state?.jobseekerReducer?.jobSeekerDetail,
    }),
    shallowEqual,
  );
  const currentUser = useSelector(state => state.authReducer.currentUser);

  const { userTypeId } = currentUser?.accessToken ? jwt_decode(currentUser?.accessToken) : 0;

  const signingOut = () => {
    dispatch({
      type: types.SET_LOGIN_DATA,
      payload: null,
    });
    dispatch({
      type: types.SET_CURRENT_USER_DATA,
      payload: null,
    });
    dispatch({
      type: types.REDUCER_JOB_SEEKER_DETAIL,
      payload: null,
    });
    dispatch({
      type: types.CLEAR_REDUCER,
    });
    props.navigation.replace("OnBoarding");
  };
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={{ height: height }}>
        {/* <View style={{ marginTop: hpx(25), alignSelf: "flex-end" }}>
          <Image source={icons.cross_white} style={{ height: hpx(20), width: wpx(20) }} />
        </View> */}
        <View
          style={{
            height: wpx(70),
            width: wpx(335),
            flexDirection: "row",
            marginTop: hpx(40),
            marginHorizontal: wpx(20),
          }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={jobseekerDetail?.profile_pic ? { uri: jobseekerDetail?.profile_pic } : icons.profilepic}
              style={{ height: wpx(60), width: wpx(60), borderRadius: wpx(60) }}
            />
          </View>
          <View
            style={{
              marginLeft: wpx(10),
              marginTop: hpx(5),
            }}>
            <CustomText
              medium
              oh5
              text={
                userTypeId == 3
                  ? reducerGetJobPosterDetail?.first_Name + " " + reducerGetJobPosterDetail?.last_Name
                  : jobseekerDetail?.first_name + " " + jobseekerDetail?.last_name
              }
              textColor={colors.white}
            />
            <CustomText regular oh6 text={currentUser?.email} textColor={colors.purple} />
            <CustomText
              regular
              oh6
              text={userTypeId == 2 ? `+${jobSeekerDetail?.contact_no}` : `+${reducerGetJobPosterDetail?.contact}`}
              textColor={colors.purple}
            />
          </View>
        </View>
        {userTypeId == 3 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <DrawerItem
              style={styles.drawerItemContainer}
              icon={({ focused, color, size }) => (
                <Image source={icons.home} style={{ height: hpx(18), width: wpx(18.52) }} resizeMode="contain" />
              )}
              label="Home"
              labelStyle={styles.drawerLblStyle}
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              style={styles.drawerItemContainer}
              icon={({ focused, color, size }) => (
                <Image
                  source={icons.white_calendar}
                  style={{ height: hpx(20), width: wpx(19.82) }}
                  resizeMode="contain"
                />
              )}
              label="Calendar"
              labelStyle={styles.drawerLblStyle}
            />
            <DrawerItem
              label="Message"
              style={styles.drawerItemContainer}
              labelStyle={[styles.drawerLblStyle]}
              icon={({ focused, color, size }) => (
                <Image
                  source={icons.mesaages}
                  style={[{ height: hpx(16.88), width: wpx(17.98) }]}
                  resizeMode="contain"
                />
              )}
            />
            {
              <DrawerItem
                label="My Profile"
                style={styles.drawerItemContainer}
                labelStyle={[styles.drawerProfileLblStyle]}
                icon={({ focused, color, size }) => (
                  <Image source={icons.myProfile} style={{ height: hpx(20), width: wpx(18) }} resizeMode="contain" />
                )}
                onPress={() => props.navigation.navigate("MyProfile")}
              />
            }
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShowLegalContent(!showLegalContent)}>
              <DrawerItem
                label="Legal"
                style={styles.drawerItemContainer}
                labelStyle={styles.drawerLblLegalStyle}
                icon={({ focused, color, size }) => (
                  <Image source={icons.legal} style={{ height: hpx(20), width: wpx(16.47) }} resizeMode="contain" />
                )}
              />
              {showLegalContent ? (
                <Image
                  source={icons.arrowUp}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={icons.arrowDown}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            {showLegalContent ? (
              <>
                <DrawerItem
                  label="Change Password"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("ChangePassword")}
                />
                <DrawerItem
                  label="FAQ’s"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("Faq")}
                />
                <DrawerItem
                  label="About Us"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("About")}
                />
                <DrawerItem
                  label="Contact Us"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("ContactUs")}
                />
                <DrawerItem
                  label="Privacy Policy"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("PrivacyPolicy")}
                />
                <DrawerItem
                  label="Terms & Conditions"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("TermsCondition")}
                />
              </>
            ) : null}
            <DrawerItem
              labelStyle={styles.drawerLblStyle}
              style={{ ...styles.drawerItemContainer, paddingBottom: wpx(50) }}
              icon={({ focused, color, size }) => (
                <Image source={icons.logout} style={{ height: hpx(20), width: wpx(19.45) }} resizeMode="contain" />
              )}
              label="Logout"
              onPress={() => signingOut()}
            />
          </ScrollView>
        )}

        {userTypeId == 2 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <DrawerItem
              style={styles.drawerItemContainer}
              icon={({ focused, color, size }) => (
                <Image source={icons.home} style={{ height: hpx(18), width: wpx(18.52) }} resizeMode="contain" />
              )}
              label="Home"
              labelStyle={styles.drawerLblStyle}
              onPress={() => props.navigation.navigate("SeekerHome")}
            />

            {
              <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", width: wpx(130) }} onPress={() => setShowSeekerProfileContent(!showSeekerProfileContent)}>
                <DrawerItem
                  label="My Profile"
                  style={{ ...styles.drawerItemContainer, width: wpx(130) }}
                  labelStyle={styles.drawerLblStyle}
                  icon={({ focused, color, size }) => (
                    <Image
                      source={icons.myProfile}
                      style={{}}
                      resizeMode="contain"
                    />
                  )}
                />
                {showSeekerProfileContent ? (
                  <Image
                    source={icons.arrowUp}
                    style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={icons.arrowDown}
                    style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            }
            {showSeekerProfileContent ? (
              <>
                <DrawerItem
                  label="View Profile"
                  labelStyle={{ ...styles.drawerLblStyle1, paddingTop: wpx(20) }}
                  onPress={() => props.navigation.navigate("SeekerProfile")}
                />
                <DrawerItem
                  label="My V-Card"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("SeekerVCard")}
                />
                <DrawerItem
                  label="Calendar"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("SeekerAppliedJobs")}
                />
                <DrawerItem
                  label="Favourite"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("SeekerFavoriteJobs")}
                />
              </>
            ) : null}
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShowMyJobContent(!showMyJobContent)}>
              <DrawerItem
                label="My Jobs"
                style={{ ...styles.drawerItemContainer, width: wpx(110) }}
                labelStyle={styles.drawerLblStyle}
                icon={({ focused, color, size }) => (
                  <Image source={icons.myJob} style={{}} resizeMode="contain" />
                )}
              />
              {showMyJobContent ? (
                <Image
                  source={icons.arrowUp}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={icons.arrowDown}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            {showMyJobContent ? (
              <>
                <DrawerItem
                  label="All Jobs"
                  labelStyle={{ ...styles.drawerLblStyle1, paddingTop: wpx(20) }}
                  onPress={() => props.navigation.navigate("SeekerAppliedJobs")}
                />
                <DrawerItem
                  label="Applied Jobs"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("SeekerAppliedJobs")}
                />
              </>
            ) : null}
            <DrawerItem
              label="Message"
              style={styles.drawerItemContainer}
              labelStyle={[styles.drawerLblStyle]}
              icon={({ focused, color, size }) => (
                <Image
                  source={icons.mesaages}
                  style={[{}]}
                  resizeMode="contain"
                />
              )}
            />
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShowLegalContent(!showLegalContent)}>
              <DrawerItem
                label="Legal"
                style={styles.drawerItemContainer}
                labelStyle={styles.drawerLblStyle}
                icon={({ focused, color, size }) => (
                  <Image source={icons.legal} style={{}} resizeMode="contain" />
                )}
              />
              {showLegalContent ? (
                <Image
                  source={icons.arrowUp}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={icons.arrowDown}
                  style={[{ alignSelf: "center" }, styles.drawerItemContainer]}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            {showLegalContent ? (
              <>
                <DrawerItem
                  label="Change Password"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("ChangePassword")}
                />
                <DrawerItem
                  label="FAQ’s"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("Faq")}
                />
                <DrawerItem
                  label="About Us"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("About")}
                />
                <DrawerItem
                  label="Contact Us"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("ContactUs")}
                />
                <DrawerItem
                  label="Privacy Policy"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("PrivacyPolicy")}
                />
                <DrawerItem
                  label="Terms & Conditions"
                  labelStyle={styles.drawerLblStyle1}
                  onPress={() => props.navigation.navigate("TermsCondition")}
                />
              </>
            ) : null}
            <DrawerItem
              labelStyle={styles.drawerLblStyle}
              style={{ ...styles.drawerItemContainer, paddingBottom: wpx(10) }}
              icon={({ focused, color, size }) => (
                <Image source={icons.logout} style={{ height: hpx(20), width: wpx(19.45) }} resizeMode="contain" />
              )}
              label="Logout"
              onPress={() => signingOut()}
            />
          </ScrollView>
        )}
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerNavigator = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient
      style={styles.container}
      colors={["#0000FF", "#1CB5E0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <Drawer.Navigator
        backBehavior="none"
        initialRouteName="Home"
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={styles.container}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
        sceneContainerStyle={styles.scene}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">{props => <Screens {...props} style={animatedStyle} />}</Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    backgroundColor: "transparent",
  },
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: "hidden",
  },
  drawerStyles: { flex: 1, width: "70%", backgroundColor: "transparent" },
  menu: {
    width: wpx(38),
    height: wpx(38),
    margin: wpx(20),
  },
  drawerLblStyle: {
    fontSize: nf(15),
    color: colors.white,
    fontFamily: fonts.medium,

    marginLeft: -wpx(15),
    width: wpx(100),
  },
  drawerLblLegalStyle: {
    fontSize: nf(16),
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontWeight: "600",

    marginLeft: -wpx(15),
    width: wpx(100),
  },
  drawerProfileLblStyle: {
    fontSize: nf(15),
    color: colors.white,
    fontFamily: fonts.bold,
    fontWeight: "bold",

    marginLeft: -wpx(15),
    width: wpx(100),
  },
  drawerLblStyle1: {
    fontSize: nf(15),
    color: colors.white,
    fontFamily: fonts.regular,
    paddingLeft: wpx(30),
    marginVertical: -wpx(5),
  },
  drawerItemContainer: {
    marginBottom: -wpx(12),
    marginTop: hpx(20),
  },
});
