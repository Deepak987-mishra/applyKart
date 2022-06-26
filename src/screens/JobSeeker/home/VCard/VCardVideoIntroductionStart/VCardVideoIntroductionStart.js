import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import CustomTextInput from "../../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../../common/CustomButton/CustomButton";
import { icons, fonts, wp, hpx, colors, wpx } from "../../../../../constants/constant";
import { VCardVideoIntroductionStartStyles } from "./VCardVideoIntroductionStartStyles";
import CustomDropdown from "../../../../../common/CustomDropdown/CustomDropdown";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomVCard from "../../../../../common/CustomVCard/CustomVCard";
import Header from "../../../../../common/Header/Header";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-crop-picker";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";

const VCardVideoIntroductionStart = ({ navigation }) => {

  const dispatch = useDispatch()

  const { specialSkillList, jobSeekerDetail, seekerLoginData, loader, saveWorkExp, saveSpecialSkills } =
    useSelector(state => ({
      specialSkillList: state.jobseekerReducer.skillList,
      jobSeekerDetail: state.jobseekerReducer.jobSeekerDetail,
      seekerLoginData: state.authReducer.seekerLoginData,
      loader: state.globalReducer.loader,
      saveWorkExp: state.jobseekerReducer.saveWorkExp,
      saveSpecialSkills: state.jobseekerReducer.saveSpecialSkills,


    }), shallowEqual);

  useEffect(() => {
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: jobSeekerDetail?.user_Id
    })
  }, [])

  const [isIntroVideo, setIsIntroVideo] = useState(true)

  const vcardIsIntro = {
    User_Id: jobSeekerDetail?.user_Id,
    action_type: "completed",
    value: 0,
  }
  console.log('specialSkillList', jobSeekerDetail)
  const submitVcardVideo = () => {

    if (isIntroVideo) {
      navigation.navigate('VCardVideoIntroduction')
    }
    else {
      const vcardUserData = {
        user_id: jobSeekerDetail?.user_Id,
        Intro_Video_Available: 1,
        Intro_Video_Link: ''
      }
      dispatch({
        type: types.UPLOAD_SEEKER_VIDEO,
        payload: { vcardUserData }
      })
    }
  }
  const skill = jobSeekerDetail?.skills.map(x => x?.skill)
  console.log('skillskillskill', skill)
  const VCardSkills = ({ item }) => {
    return (
      <View style={{ alignSelf: "center", borderWidth: 1, borderColor: colors.white, borderRadius: wp(5), paddingVertical: wpx(7), paddingHorizontal: wpx(7), marginHorizontal: wpx(10) }}>
        <CustomText eh6 regular text={
          (item.length > 10) ?
            ((item.substring(0, 9)) + '...') :
            item
        } textColor={colors.white} />
      </View>
    )
  }

  let pref = jobSeekerDetail ? jobSeekerDetail?.job_Preference : []
  console.log('pref', pref[0])
  return (
    <SafeAreaView style={VCardVideoIntroductionStartStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} title="V-Card" onLeftPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={VCardVideoIntroductionStartStyles.container} contentContainerStyle={{ paddingBottom: wpx(100) }} >
        <CustomVCard firstName={jobSeekerDetail?.first_name} lastName={jobSeekerDetail?.last_name} image={jobSeekerDetail?.profile_pic}
          vaccine={jobSeekerDetail?.vaccination_Status}
          backgroundCardStyle={{ height: wpx(230) }}

        >

          <View style={{ marginHorizontal: wpx(20) }}>
            <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.job_Preference ? JSON.parse(jobSeekerDetail?.job_Preference)[0] : '""'} style={{ alignSelf: "center", marginTop: wpx(5) }} />
            <View style={{ flexDirection: "row", marginTop: wpx(10), justifyContent: "space-between", flexWrap: "wrap" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.experience_white} />
                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail.totalExperience ? jobSeekerDetail.totalExperience : 'Experience'} style={{ marginHorizontal: wpx(5) }} />
              </View>
              <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.locationWhite} />
                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.location ? jobSeekerDetail?.location.split(',')[0] : 'Sydney'} style={{ marginHorizontal: wpx(5) }} />
              </View>
              <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.language_white} />
                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.language ? jobSeekerDetail?.language : 'English'} style={{ marginHorizontal: wpx(5) }} />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row-reverse", alignSelf: "center", marginTop: wpx(5) }}>
            {
              skill.slice(-3).map(x => {
                return (
                  <VCardSkills item={x} />
                )
              })
            }
          </View>
        </CustomVCard>




        <View style={VCardVideoIntroductionStartStyles.formView}>
          <CustomText eh5 medium text="Do you want to record a 30sec introduction video?" style={{ marginVertical: hpx(10), width: wp(90) }} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setIsIntroVideo(!isIntroVideo)} style={VCardVideoIntroductionStartStyles.radioButtonView}>
              <Image source={isIntroVideo ? icons.radio_button_on : icons.radio_button_off} />
              <CustomText text='Yes' oh5 regular style={{ marginLeft: wpx(10) }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsIntroVideo(!isIntroVideo)} style={{ ...VCardVideoIntroductionStartStyles.radioButtonView, marginLeft: wpx(80) }}>
              <Image source={isIntroVideo ? icons.radio_button_off : icons.radio_button_on} />
              <CustomText text='No' oh5 regular style={{ marginLeft: wpx(10) }} />
            </TouchableOpacity>
          </View>


          <CustomText oh6 lightItalic text="Record an intro video and increase your chances of getting hired by 30%" textColor={colors.black} style={{ marginTop: hpx(30) }} />



        </View>



      </KeyboardAwareScrollView >
      <CustomButton onPress={() => submitVcardVideo()} nextIcon={true} title={"Continue"} style={{ marginBottom: hpx(10) }} />

    </SafeAreaView >
  )
}

export default VCardVideoIntroductionStart



const styles = StyleSheet?.create({
  camerastyle: {
    flex: 1,
    marginTop: wp(5),
    backgroundColor: "grey",
    justifyContent: "flex-end",
    width: wp(95),
    alignSelf: "center",
    borderRadius: 30,
  },
  clickView: { justifyContent: "center", alignItems: "center" },
  clickIcon: { width: wp(15), height: wp(15), marginBottom: wp(4) },
  submitview: { marginVertical: wp(6), justifyContent: "flex-end" },
  cameraMainView: { flex: 1, marginTop: wp(1) },
  deleteMediaStyle: { fontSize: 20, fontFamily: fonts.bold, color: colors?.red, textAlign: "center", marginTop: wp(3) },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    width: 100,
  },
});
