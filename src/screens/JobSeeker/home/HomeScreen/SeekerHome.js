import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../../common/Header/Header";
import { colors, hpx, icons, wp, wpx, nf, fonts } from "../../../../constants/constant";
import { SeekerHomeStyles } from "./SeekerHomeStyles";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import { HorizontalLine } from "../../../../common/HorizontalLine/HorizontalLine";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { TextElement } from "../../../../common/CommonText/CommonText";
import { DrawerActions } from "@react-navigation/native";
import { jobTypeList, suggestedJobTypeList, workTypeList } from "../../../../mock/dummyDropdownList/dummyDropdownList";
import ProgressBar from "../../../../common/CustomLoader/CustomLoader";
import { useIsFocused } from "@react-navigation/native";


const SeekerHome = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    loader,
    seekerLoginData,
    jobseekerDetail,
    newJobList,
    getJobListLocation,
    getJobListSuggested,
    getAppliedJobsList,
    currentUserData
  } = useSelector(
    state => ({
      seekerLoginData: state.authReducer.seekerLoginData,
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      newJobList: state.jobseekerReducer.newJobList,
      getJobListLocation: state.jobseekerReducer.getJobListLocation,
      getJobListSuggested: state.jobseekerReducer.getJobListSuggested,
      getAppliedJobsList: state.jobseekerReducer.getAppliedJobsList,
      loader: state.globalReducer.loader,
      currentUserData: state.authReducer.currentUser,
    }),
    shallowEqual,
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: currentUserData?.user_Id,
    });
    const user_id = currentUserData?.user_Id
    dispatch({
      type: types.GET_SUGGESTED_JOB_LIST, // Suggested Job Lists
      payload: { user_id }
    });
    // dispatch({
    //   type: types.GET_JOB_LIST, // All Job Lists
    //   payload: { user_id }
    // });
    dispatch({
      type: types.GET_NEW_JOB_LIST, // New Job Lists
      payload: { user_id }
    });
    dispatch({
      type: types.GET_JOB_LIST_LOCATION, // Loaction Job Lists
      // payload: jobseekerDetail?.job_location
      payload: { location: jobseekerDetail?.location ? jobseekerDetail?.location.split(',')[0] : 'Noida', user_id },
    });
    dispatch({
      type: types.GET_APPLIED_JOBS, // New Job Lists
    });
    dispatch({
      type: types.GET_FAVORITE_JOB_LIST, // Get Favorite Job Lists
    });
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the App ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  // const { getJobList } = useSelector(state => ({ getJobList: state.jobseekerReducer.getJobList, }), shallowEqual);
  const getJobList = useSelector(state => state.jobseekerReducer.getJobList);

  const jobtypeArray = jobseekerDetail?.user_Id ? JSON.parse(jobseekerDetail?.prefered_job_subcategory ? jobseekerDetail?.prefered_job_subcategory : 'null') : null;

  const renderJobType = ({ item, index }) => {
    return (
      <View>
        <View style={SeekerHomeStyles.renderJobTypemainView}>
          <Image
            source={{ uri: `https://reqres.in/img/faces/${index + 1}-image.jpg` }}
            style={SeekerHomeStyles.rendeJobImage}
          />
          <CustomText text={
            (item.substring(0, 9)) + '...'
          } eh6 medium style={{ marginTop: hpx(10) }} />
        </View>
      </View>
    );
  };

  const renderJobTypeEdit = () => {
    return (
      <View style={SeekerHomeStyles.renderJobTypemainView}>
        <TouchableOpacity
        // onPress={() => (props.onPress ? props.onPress() : {})}
        >
          <LinearGradient
            colors={["#0000FF", "#1CB5E0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={SeekerHomeStyles.rendeJobImage}>
            <View style={SeekerHomeStyles.centerTheImage}>
              <Image source={icons.edit_white} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <CustomText text="Edit" eh6 medium style={{ marginTop: hpx(10) }} />
      </View>
    );
  };

  const renderWorkType = ({ item, index }) => {
    return (
      <View style={{ marginVertical: hpx(10) }}>
        {item?.image ? (
          <View style={SeekerHomeStyles.workTypeMainView}>
            <Image source={item?.image} />
            <CustomText eh6 regular text={item?.title} textColor="#313132" style={{ marginLeft: wpx(10) }} />
          </View>
        ) : (
          <TouchableOpacity
          // onPress={() => (props.onPress ? props.onPress() : {})}
          >
            <LinearGradient
              colors={["#0000FF", "#1CB5E0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={SeekerHomeStyles.workTypeLinearView}>
              <View style={SeekerHomeStyles.centerTheImage}>
                <CustomText text={item?.title} title eh6 medium textColor={colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSuggestedJobList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SeekerJobDetail", { job_id: item?.job_Id })}
        style={{ ...SeekerHomeStyles.jobDetailShadowView, marginLeft: wpx(3) }}>
        <View style={{ ...SeekerHomeStyles.flexRowBetween, marginVertical: hpx(10) }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={icons.googleIcon} />
            <CustomText eh4 medium text={item?.company} style={{ marginLeft: wpx(10) }} />
          </View>
          <Image source={icons.heart_inactive} />
        </View>
        <CustomText oh5 semiBold text={item?.job_Title} />
        <View style={{ ...SeekerHomeStyles.flexRowBetween, marginVertical: hpx(10) }}>
          <CustomText eh5 regular text={`$${item?.salary} K - $${item?.max_Salary} K`} />
          <CustomText eh5 regular textColor={colors.matterHorn} text={
            item?.job_Type == 1
              ? "Freelance"
              : item?.job_Type == 2
                ? "Full Time"
                : item?.job_Type == 3
                  ? "Internship"
                  : item?.job_Type == 4
                    ? "Part Time"
                    : item?.job_Type == 5
                      ? "Temporary"
                      : "Night Shift"
          } />
        </View>
        <CustomText eh5 regular textColor={colors.matterHorn} text={item?.location} />
      </TouchableOpacity>
    );
  };

  const renderAppliedJobs = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SeekerJobDetail", { job_id: item?.job_Id })}
        style={{ ...SeekerHomeStyles.jobDetailShadowView, marginLeft: wpx(5) }}>
        <View style={{ ...SeekerHomeStyles.flexRowBetween, marginVertical: hpx(10) }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={icons.googleIcon} />
            <CustomText eh4 medium text={item?.company} style={{ marginLeft: wpx(10) }} />
          </View>

          {item?.application_Status == 1 ? (
            <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
              <CustomText
                text={"Submitted"}
                textColor="#86BC26"
                style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
              />
            </View>
          ) : item?.application_Status == 2 ? (
            <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
              <CustomText
                text={"Shortlisted"}
                textColor="#86BC26"
                style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
              />
            </View>
          ) : item?.application_Status == 3 ? (
            <View style={{ backgroundColor: "#FFDDDD", borderRadius: wpx(8) }}>
              <CustomText
                text={"Rejected"}
                textColor="#D82828"
                style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
              />
            </View>
          ) : (
            <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
              <CustomText
                text={"In Progress"}
                textColor="#86BC26"
                style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
              />
            </View>
          )}
        </View>
        <CustomText oh5 semiBold text={item?.job_Title} />
        <View style={{ ...SeekerHomeStyles.flexRowBetween, marginVertical: hpx(10) }}>
          <CustomText eh5 regular text={`$${item?.salary} K - $${item?.max_Salary} K`} />
          <CustomText eh5 regular textColor={colors.matterHorn} text={
            item?.job_Type == 1
              ? "Freelance"
              : item?.job_Type == 2
                ? "Full Time"
                : item?.job_Type == 3
                  ? "Internship"
                  : item?.job_Type == 4
                    ? "Part Time"
                    : item?.job_Type == 5
                      ? "Temporary"
                      : "Night Shift"
          } />
        </View>
        <CustomText eh5 regular textColor={colors.matterHorn} text={item?.location} />
      </TouchableOpacity>
    );
  };
  return loader ? (
    <ProgressBar />
  ) : (
    <SafeAreaView style={SeekerHomeStyles.mainContainer}>
      <Header
        leftIcon={icons.sideMenuIcon}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        rightIcon={icons.bellNotificationIcon1}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={SeekerHomeStyles.container}>
        <View style={{ ...SeekerHomeStyles.flexRowBetween, marginVertical: hpx(20) }}>
          <View>
            <CustomText oh5 regular text={`Hello ` + jobseekerDetail?.first_name + " " + jobseekerDetail?.last_name} />
            <CustomText eh1 semiBold text="Find your perfect job!" />
          </View>
          <Image source={jobseekerDetail?.profile_pic ? { uri: jobseekerDetail?.profile_pic } : icons.profilepic} style={SeekerHomeStyles.seekerProfilePic} />
        </View>

        <View style={SeekerHomeStyles.flexRowBetween}>
          <CustomTextInput
            type="search"
            placeholder="What are you looking for?"
            onChangeText={text => { }}
            style={{ width: wp(75), alignSelf: "center" }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SeekerJobFilter")}
            style={SeekerHomeStyles.jobFilterIcon}>
            <Image source={icons.filter} />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: hpx(20) }}>
          <CustomText oh5 regular text="Your Selected job type" textColor={colors.matterHorn} />
        </View>
        <View style={{ marginBottom: hpx(10) }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={jobtypeArray ? jobtypeArray : []}
            ListHeaderComponent={renderJobTypeEdit}
            renderItem={renderJobType}
          />
        </View>

        <HorizontalLine />
        <View style={{ marginTop: hpx(20) }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={icons.locationGrey} style={{ marginRight: wpx(10) }} />
            <CustomText
              oh5
              regular
              text={jobseekerDetail?.location}
              textColor="#313132"
              style={{ marginRight: wpx(5) }}
            />
            <Image source={icons.dropDown} style={{ alignSelf: "center" }} />
          </View>
          <CustomText
            oh6
            regular
            textColor={colors.grey}
            text="Jobs nearest to your location shows first"
            style={SeekerHomeStyles.jobNearestDesc}
          />
        </View>

        <View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={workTypeList} renderItem={renderWorkType} />
        </View>
        <HorizontalLine />

        <View style={{ marginVertical: hpx(10) }}>
          <CustomText eh3 semiBold text="Suggested Jobs For You" style={{ marginVertical: hpx(10) }} />
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={getJobListSuggested}
              renderItem={renderSuggestedJobList}
              ListEmptyComponent={
                <View>
                  <CustomText text="No Suggested Jobs" />
                </View>
              }
            />
          </View>
        </View>

        {/* New Jobs */}
        <View>
          <View style={SeekerHomeStyles.flexRowBetween}>
            <CustomText eh3 semiBold text="New Jobs" />
            <TouchableOpacity onPress={() => navigation.navigate("SeekerNewJobs")}>
              <CustomText oh5 medium text="Show all" textColor="#313132" />
            </TouchableOpacity>
          </View>

          {newJobList ? (
            newJobList.slice(0, 2).map(x => {
              return (
                <View>
                  <View style={{ ...SeekerHomeStyles.newJobmainView }}>
                    <View style={SeekerHomeStyles.newJobImageView}>
                      <Image source={icons.facebookIcon} />
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SeekerJobDetail", { job_id: x?.job_Id })}
                      style={SeekerHomeStyles.newjobPostView}>
                      <View style={SeekerHomeStyles.flexRowBetween}>
                        <CustomText oh5 semiBold text={x ? x?.job_Title : null} />
                        <Image source={icons.heart_inactive} />
                      </View>
                      <View style={SeekerHomeStyles.flexRowBetween}>
                        <CustomText
                          eh5
                          regular
                          text={
                            x?.job_Type == 1
                              ? "Freelance"
                              : x?.job_Type == 2
                                ? "Full Time"
                                : x?.job_Type == 3
                                  ? "Internship"
                                  : x?.job_Type == 4
                                    ? "Part Time"
                                    : x?.job_Type == 5
                                      ? "Temporary"
                                      : "Night Shift"
                          }
                          textColor={colors.matterHorn}
                        />
                        <CustomText oh5 medium text={x ? "$" + x?.salary + "K - " + "$" + x?.max_Salary + "K" : null} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <HorizontalLine />
                </View>

              );
            })
          ) : (
            <View>
              <CustomText text="No New Jobs" />
            </View>
          )}
        </View>

        {/* Jobs near me */}
        <View>
          <View style={{ ...SeekerHomeStyles.flexRowBetween, marginTop: hpx(20) }}>
            <CustomText eh3 semiBold text="Jobs Near Me" />
            <TouchableOpacity onPress={() => navigation.navigate("SeekerNearJobs")}>
              <CustomText oh5 medium text="Show all" textColor="#313132" />
            </TouchableOpacity>
          </View>
          {getJobListLocation ? (
            getJobListLocation.slice(0, 2).map(x => {
              return (
                <View>
                  <View style={{ ...SeekerHomeStyles.newJobmainView }}>
                    <View style={SeekerHomeStyles.newJobImageView}>
                      <Image source={icons.facebookIcon} />
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SeekerJobDetail", { job_id: x?.job_Id })}
                      style={SeekerHomeStyles.newjobPostView}>
                      <View style={SeekerHomeStyles.flexRowBetween}>
                        <CustomText oh5 semiBold text={x ? x?.job_Title : null} />
                        <Image source={icons.heart_inactive} />
                      </View>
                      <View style={SeekerHomeStyles.flexRowBetween}>
                        <CustomText
                          eh5
                          regular
                          text={
                            x?.job_Type == 1
                              ? "Freelance"
                              : x?.job_Type == 2
                                ? "Full Time"
                                : x?.job_Type == 3
                                  ? "Internship"
                                  : x?.job_Type == 4
                                    ? "Part Time"
                                    : x?.job_Type == 5
                                      ? "Temporary"
                                      : "Night Shift"
                          }
                          textColor={colors.matterHorn}
                        />
                        <CustomText oh5 medium text={x ? "$" + x?.salary + "K - " + "$" + x?.max_Salary + "K" : null} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <HorizontalLine />
                </View>
              );
            })
          ) : (
            <View>
              <CustomText text="No Near by Jobs" />
            </View>
          )}
        </View>


        {/* applied Jobs */}
        <View style={{ marginVertical: hpx(10) }}>
          <View style={SeekerHomeStyles.flexRowBetween}>
            <CustomText eh3 semiBold text="Applied jobs" style={{ marginVertical: hpx(10) }} />
            <TouchableOpacity onPress={() => navigation.navigate("SeekerAppliedJobs")}>
              <CustomText oh5 medium text="Show all" textColor="#313132" style={{ alignSelf: "center" }} />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={getAppliedJobsList}
              renderItem={renderAppliedJobs}
              ListEmptyComponent={
                <View>
                  <CustomText text="No Applied Jobs" />
                </View>
              }
              contentContainerStyle={{ paddingBottom: wpx(40) }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeekerHome;
