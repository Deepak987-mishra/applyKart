import React, { useEffect, useState } from "react";
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
import { VCardWorkDetailStyles } from "./VCardWorkDetailStyles";
import CustomDropdown from "../../../../../common/CustomDropdown/CustomDropdown";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomVCard from "../../../../../common/CustomVCard/CustomVCard";
import Header from "../../../../../common/Header/Header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import moment from "moment";

const VCardWorkDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isEdit } = route.params
  const { jobseekerDetail, loginData } = useSelector(
    state => ({
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      loginData: state.authReducer.loginData,
    }),
    shallowEqual,
  );

  const { seekerLoginData, loader, saveWorkExp, visaTypeList } = useSelector(
    state => ({
      seekerLoginData: state.authReducer.seekerLoginData,
      loader: state.globalReducer.loader,
      saveWorkExp: state.jobseekerReducer.saveWorkExp,
      visaTypeList: state.jobseekerReducer.visaTypeList.map(x => {
        return { id: x?.visa_id, name: x?.visa_type };
      }),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: loginData?.user_Id,
    });
    dispatch({
      type: types.GET_VISA_TYPE_LIST,
    });
  }, []);

  console.log('company', jobseekerDetail?.professionaldetails?.experience[0])
  const [visaType, setVisaType] = useState(jobseekerDetail?.visa_type);
  const [isWorkedBefore, setIsWorkedBefore] = useState(true);
  const [workExp, setWorkExp] = useState(
    jobseekerDetail?.totalExperience ? jobseekerDetail.totalExperience : "Experience",
  );
  const [companyName, setCompanyName] = useState(
    jobseekerDetail?.professionaldetails?.experience[0] != undefined ? jobseekerDetail?.professionaldetails?.experience[0].company : "",
  );
  const [jobRole, setJobRole] = useState(
    jobseekerDetail?.professionaldetails?.experience[0] != undefined ? jobseekerDetail?.professionaldetails?.experience[0].job_Title : "",
  );
  const [jobSpec, setJobSpec] = useState(
    jobseekerDetail?.professionaldetails?.experience[0] != undefined ? jobseekerDetail?.professionaldetails?.experience[0].job_Responsiblity : "",
  );
  const [startDate, setStartDate] = useState(
    jobseekerDetail?.professionaldetails?.experience[0] != undefined ? moment(jobseekerDetail?.professionaldetails?.experience[0].start_date).format('YYYY-MM-DD') : "",

  );
  const [endDate, setEndDate] = useState(
    jobseekerDetail?.professionaldetails?.experience[0] != undefined ? moment(jobseekerDetail?.professionaldetails?.experience[0].end_date).format('YYYY-MM-DD') : "",

  );

  const workExpList = [
    { id: 1, name: "0-1 Year" },
    { id: 2, name: "1-2 Years" },
    { id: 3, name: "2-3 Years" },
    { id: 4, name: "3-7 Years" },
    { id: 5, name: "7-10 Years" },
    { id: 6, name: "10+ Years" },
  ];

  const vcardWork = {
    user_id: jobseekerDetail?.user_Id,
    visa_type: visaType ? visaType : "Normal",
    worked_before: isWorkedBefore ? 1 : 0,
    work_experience: [
      {
        months: workExp,
        company: companyName,
        role: jobRole,
        specialisation: jobSpec,
        start_date: startDate,
        end_date: endDate,
      },
    ],
  };

  const submitVcardWorkDetail = () => {
    // dispatch({
    //   type: types.SEEKER_SAVE_WORK_EXP,
    //   payload: vcardWork,
    // });

    if (isWorkedBefore) {
      if (workExp && companyName && jobRole && jobSpec && startDate && endDate) {
        if (moment(startDate).isAfter(moment(endDate))) {
          Snackbar.show({
            text: "Please enter correct date",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
        } else if (visaType == null) {
          Snackbar.show({ text: "Please enter Visa type", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
        } else {
          dispatch({
            type: types.POST_VCARD_WORK_DETAIL,
            payload: { vcardWork, isEdit },
          });
        }
      }

      else {
        Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
      }
    }
    else if (visaType == null) {
      Snackbar.show({ text: "Please enter Visa type", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
    else {
      console.log('visaType', visaType)
      navigation.navigate("VCardEducationDetail");
    }
  };
  return (
    <SafeAreaView style={VCardWorkDetailStyles.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={VCardWorkDetailStyles.container}>
        <View>
          <CustomText eh1 text="Work Details" style={VCardWorkDetailStyles.mainHeading} />
          <CustomText text="Please add your work details here." regular oh5 textColor={colors.grey} />
        </View>

        <CustomVCard
          firstName={jobseekerDetail?.first_name}
          lastName={jobseekerDetail?.last_name}
          backgroundCardStyle={{ height: wpx(230) }}
          image={jobseekerDetail?.profile_pic}>
          {isWorkedBefore ? (
            <View style={VCardWorkDetailStyles.isWorkedBeforeView}>
              <CustomText text={workExp ? workExp : "Total work experience"} eh5 regular textColor={colors.white} />
              <View style={VCardWorkDetailStyles.vcardCompanyNameView}>
                <CustomText text={companyName ? companyName : "Company name"} eh5 regular textColor={colors.white} />
                <CustomText text={jobRole ? jobRole : "Job role"} eh5 regular textColor={colors.white} />
              </View>
              <CustomText text={jobSpec ? jobSpec : "Job specialization"} eh5 regular textColor={colors.white} />
            </View>
          ) : (
            <CustomText text="Newbie" eh5 regular textColor={colors.white} style={{ alignSelf: "center" }} />
          )}
        </CustomVCard>

        <View style={VCardWorkDetailStyles.formView}>
          <CustomText oh5 medium text="Visa Type" style={{ marginVertical: hpx(10) }} />
          <CustomDropdown
            title={jobseekerDetail?.visa_type ? jobseekerDetail?.visa_type : "Select Visa Type"}
            data={visaTypeList}
            onSelect={item => setVisaType(item)}

          />
          <CustomText oh5 medium text="Have you worked before?" style={{ marginVertical: hpx(10) }} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setIsWorkedBefore(!isWorkedBefore)}
              style={VCardWorkDetailStyles.radioButtonView}>
              <Image source={isWorkedBefore ? icons.radio_button_on : icons.radio_button_off} />
              <CustomText text="Yes" oh5 regular style={{ marginLeft: wpx(10) }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsWorkedBefore(!isWorkedBefore)}
              style={{ ...VCardWorkDetailStyles.radioButtonView, marginLeft: wpx(80) }}>
              <Image source={isWorkedBefore ? icons.radio_button_off : icons.radio_button_on} />
              <CustomText text="No" oh5 regular style={{ marginLeft: wpx(10) }} />
            </TouchableOpacity>
          </View>

          {isWorkedBefore ? (
            <View>
              <CustomText oh5 medium text="Total Work Experience" style={{ marginVertical: hpx(10) }} />
              <CustomDropdown title={workExp ? workExp : "Select Months"} data={workExpList} onSelect={item => setWorkExp(item)} />
              <CustomTextInput
                value={companyName}
                onChangeText={text => setCompanyName(text)}
                placeholder="Company Name"
                style={{ alignSelf: "center", marginTop: hpx(15) }}
              />
              <CustomTextInput
                value={jobRole}
                onChangeText={text => setJobRole(text)}
                placeholder="Job Role"
                style={{ alignSelf: "center" }}
              />
              <CustomTextInput
                value={jobSpec}
                onChangeText={text => setJobSpec(text)}
                placeholder="Job Specialization"
                style={{ alignSelf: "center" }}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CustomTextInput
                  date={new Date()}
                  type="date"
                  placeholder="Start Date"
                  setDate={t => setStartDate(t)}
                  value={startDate}
                />
                <CustomTextInput
                  type="date"
                  placeholder="End Date"
                  setDate={t => setEndDate(t)}
                  value={endDate}
                />
              </View>
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        loader={loader}
        onPress={() => submitVcardWorkDetail()}
        nextIcon={true}
        title={isEdit ? "Save" : "Next"}
        style={{ marginBottom: hpx(10) }}
      />
    </SafeAreaView>
  );
};

export default VCardWorkDetail;

const styles = StyleSheet.create({});
