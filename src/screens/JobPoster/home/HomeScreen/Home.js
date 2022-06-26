import React, { useState, useEffect,} from "react";
import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, BackHandler, Alert, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../../common/Header/Header";
import { fonts, icons, colors } from "../../../../constants/constant";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomDropDown } from "../../../../common/CustomDropdown";
import { hpx, wpx, wp, hp } from "../../../../constants/constant";
import { PosterHomeStyles } from "./HomeStyle";
import { DrawerActions } from "@react-navigation/routers";
import HomeCard from "../../../../common/JobPosterHomeCard/HomeCard";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import ProgressBar from "../../../../common/CustomLoader/CustomLoader";
import moment from "moment";

const Home = ({ route, navigation, drawerAnimationStyle }, props) => {

  const dispatch = useDispatch();
  const [skill, setSkill] = useState();
  const { reducerGetPosterJobList, ReducerecentlyPostedJobList, user_Id, loader, reducerGetJobPosterDetail, ReducerGetPosterJobListForCleaning} = useSelector(
    state => ({
      currentUser: state.authReducer.currentUser,
      userId: state?.authReducer?.currentUser?.user_Id,
      reducerGetPosterJobList: state.homeReducer.reducerGetPosterJobList,
      ReducerecentlyPostedJobList: state.homeReducer.ReducerecentlyPostedJobList,
      ReducerGetPosterJobListForCleaning: state.homeReducer.ReducerGetPosterJobListForCleaning,
      user_Id: state?.authReducer?.currentUser?.user_Id,
      loader: state?.globalReducer?.loader,
      reducerGetJobPosterDetail: state?.homeReducer?.reducerGetJobPosterDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    let body = {
      search: "recent",
      user_Id: user_Id,
    };
    dispatch({
      type: types.RECENTLY_POSTED_JOBS_LIST,
      payload: body,
    });
    dispatch({
      type: types.GET_SPECIAL_REQUIREMENTS,
    });
    dispatch({
      type: types.GET_JOB_POSTER_DETAILS,
      payload: user_Id,
    });
  }, []);

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

  const renderItSupportList = (item, index) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("JobDetail", { job_Id: item.job_Id })}>
        <View style={{ flexDirection: "row", width: wpx(335), height: hpx(80) }}>
          <View
            style={{
              borderColor: "#55555533",
              borderWidth: wpx(1),
              height: wpx(50),
              width: wpx(50),
              borderRadius: wpx(15),
              alignItems: "center",
              justifyContent: "center",
              flex: 0.2,
            }}>
            <Image style={{ height: wpx(25), width: wpx(25) }} source={icons.googleIcon} />
          </View>

          <View style={{ flex: 1, paddingLeft: hpx(15) }}>
            {console.log("item?.job_Title ", item)}
            <CustomText oh5 semiBold text={item?.role ? item?.role : null} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hpx(10),
              }}>
              <CustomText
                eh5
                regular
                text={
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
                }
                textColor={colors.matterHorn}
              />
              {/* <CustomText  eh5 regular text={item?.role ? item?.role : null} /> */}
              <CustomText oh5 medium text={"$" + item?.salary + "K - " + "$" + item?.max_Salary + "K"} />
            </View>
            <View style={{ paddingTop: wpx(10) }}>
              <CustomText text={"Posted on: " + moment(item?.posted_Date).format("LL")} textColor={colors.matterHorn}/>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: wpx(335),
            alignSelf: "center",
            backgroundColor: "#0000001A",
            marginVertical: wpx(15),
            marginTop: hpx(20),
          }}
        />
      </TouchableOpacity>
    );
  };

  const rendercleaningServicedData = (item, index) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("JobDetail", { job_Id: item.job_Id })}>
        <View style={{ flexDirection: "row", width: wpx(335), height: hpx(80) }}>
          <View
            style={{
              flex: 0.2,
              borderColor: "#55555533",
              borderWidth: wpx(1),
              height: wpx(50),
              width: wpx(50),
              borderRadius: wpx(15),
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image resizeMode="contain" source={icons.appleIcon} style={{ height: wpx(25), width: wpx(25) }} />
          </View>
          <View style={{ flex: 1, paddingLeft: wpx(15) }}>
            <CustomText oh5 semiBold text={item?.role ? item?.role : null} />
            {/* <CustomText oh5 semiBold text={item?.designation  ? item?.designation : null} /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hpx(10),
              }}>
              <CustomText
                eh5
                regular
                text={
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
                }
                textColor={colors.matterHorn}
              />
              {/* <CustomText  eh5 regular text={item?.role ? item?.role : null} /> */}
              <CustomText oh5 medium text={"$ " + item?.salary + "K - " + "$ " + item?.max_Salary + "K"} />
            </View>
            <View style={{ marginTop: hpx(10) }}>
              <CustomText text={"Posted on: " + moment(item?.posted_Date).format("LL")} textColor={colors.matterHorn}/>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: wpx(335),
            alignSelf: "center",
            backgroundColor: "#0000001A",
            marginVertical: wpx(15),
            marginTop: hpx(20),
          }}
        />
      </TouchableOpacity>
    );
  };

  const emptyData = () => {
    return (
      <>
        <View>
          <CustomText text="You have not posted any job" medium eh4 />
        </View>
        <View style={{ marginBottom: wpx(40) }}></View>
      </>
    );
  };

  return loader ? (
    <ProgressBar />
  ) : (
    <SafeAreaView style={{ ...PosterHomeStyles.mainContainer, ...drawerAnimationStyle }}>
      <Header
        leftIcon={icons.sideMenuIcon}
        rightIcon={icons.bellNotificationIcon1}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        leftIconStyle={{width:wpx(20), height:wpx(20)}}
        rightIconStyle={{width:wpx(17.04), height:wpx(20)}}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={PosterHomeStyles.scrollViewContainer}>
        <View style={PosterHomeStyles.mainView}>
          <View style={PosterHomeStyles.View1}>
            <CustomText
              text={`Hello ` + reducerGetJobPosterDetail?.first_Name + " " + reducerGetJobPosterDetail?.last_Name}
              regular
              oh5
              textColor={colors.black4}
            />
            <CustomText text="Find candidate here!" semiBold eh1 />
          </View>
          <View style={PosterHomeStyles.imgView}>
            <Image style={PosterHomeStyles.img} source={icons.dummyOnboarding} />
          </View>
        </View>
        <View style={PosterHomeStyles.mainView}>
          <View style={PosterHomeStyles.View1}>
            <CustomTextInput
              type="search"
              placeholder="Search candidate by skills, exp..."
              onChangeText={text => setSkill(text)}
              style={PosterHomeStyles.txtInput}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobPostingFillDetail", {
                editable: false,
              })
            }
            style={{
              backgroundColor: "black",
              height: wpx(50),
              flex: 0.2,
              width: wpx(50),
              borderRadius: wpx(10),
              marginLeft: wpx(20),
              marginTop: hpx(20),
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image source={icons.plusIcon} />
          </TouchableOpacity>
        </View>
         {ReducerecentlyPostedJobList === null  || ReducerecentlyPostedJobList.length === 0  ?
          (<View>
         <View style={{paddingTop:wpx(63.88), alignItems:'center'}}>
         <Image style={{ height: wpx(147.31), width: wpx(200.59) }} source={icons.homeIcon} />
         </View>
         <CustomText text=" You’ve not posted any job yet" medium eh3 style={{paddingTop:wpx(15.81), textAlign:'center'}}/>
        <CustomText text=" Lorem Ipsum is simply dummy text of the printing and typesetting industry." regular eh5 textColor={colors.matterHorn} style={{textAlign:'center',paddingTop:wpx(10) }}/>
        <View style={{paddingTop:wpx(30)}}>
        <CustomButton
         onPress={() =>
          navigation.navigate("JobPostingFillDetail", {
            editable: false,
          })
        }
          nextIcon={"true"}
          title={"Post Now"}
          buttonStyle={{ width: wpx(214), 
            borderRadius: wpx(10)}}
        />
        </View> 
        </View>)
         :       (<View>
          <CustomText text=" Recently posted" semiBold eh3 style={{paddingTop:wpx(34)}}/>
        <View>
          <FlatList
            extraData={ReducerecentlyPostedJobList}
            style={{ flexDirection: "row" , paddingTop:wpx(20)}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={ReducerecentlyPostedJobList.slice(0, 4)}
            renderItem={({ item, index }) => (
              <HomeCard
                role={item.role}
                salary={item.salary}
                jobype={item.job_Type}
                posted_Date={item.posted_Date}
                location={item.location}
                maxSal={item.max_Salary}
                onPress={() => navigation.navigate("JobDetail", { job_Id: item.job_Id })}
              />
            )}
            ListEmptyComponent={emptyData}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop:wpx(35)
          }}>
          <CustomText text="IT support" semiBold eh3/>
          <TouchableOpacity>
            <CustomText text="Show all" medium oh5 />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: wpx(20), maarginHorizontal:wpx(20) }}>
          <FlatList
            extraData={reducerGetPosterJobList}
            data={reducerGetPosterJobList ? reducerGetPosterJobList.slice(0, 2) : []}
            // style={styles?.flatListView}
            renderItem={({ item, index }) => renderItSupportList(item, index)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyData}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop:wpx(35) }}>
          <CustomText text="Cleaning service" semiBold eh3/>
          <TouchableOpacity>
            <CustomText text="Show all" medium oh5 />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: hpx(20) }}>
          <FlatList
            extraData={ReducerGetPosterJobListForCleaning}
            data={ReducerGetPosterJobListForCleaning ? ReducerGetPosterJobListForCleaning.slice(0, 2) : []}
            // style={styles?.flatListView}
            renderItem={({ item, index }) => rendercleaningServicedData(item, index)}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyData}
          />
        </View>
        </View>)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
