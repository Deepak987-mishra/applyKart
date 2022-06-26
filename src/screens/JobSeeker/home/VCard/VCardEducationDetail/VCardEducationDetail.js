import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import CustomTextInput from "../../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../../common/CustomButton/CustomButton";
import { icons, fonts, wp, hpx, colors, wpx } from "../../../../../constants/constant";
import { VCardEducationDetailStyle } from "./VCardEducationDetailStyle";
import CustomDropdown from "../../../../../common/CustomDropdown/CustomDropdown";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomVCard from "../../../../../common/CustomVCard/CustomVCard";
import Header from "../../../../../common/Header/Header";
import { ScrollView } from "react-native-gesture-handler";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";

const VCardEducationDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isEdit } = route.params
  const { jobseekerDetail, loginData } = useSelector(
    state => ({
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      loginData: state.authReducer.loginData,
    }),
    shallowEqual,
  );

  const { seekerLoginData, loader } = useSelector(
    state => ({
      seekerLoginData: state.authReducer.seekerLoginData,
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: jobseekerDetail?.user_Id,
    });
  }, []);

  const allCollege = useSelector(s => s?.jobseekerReducer?.collegeList);
  const educationLevel = useSelector(s =>
    s?.jobseekerReducer?.educationLevel?.map(x => {
      return { id: x?.education_Level_Id, name: x?.education_Level };
    }),
  );
  const [educationLevelId, setEducationLevelId] = useState(null)
  const [education, setEducation] = useState(jobseekerDetail?.education?.education[0]?.education_Level);
  const [specialization, setSpecialization] = useState(jobseekerDetail?.education?.education[0]?.specialization);
  const [college, setCollege] = useState(jobseekerDetail?.education?.education[0]?.university);
  const [filteredCollegeList, setFilteredCollegeList] = useState(allCollege);

  useEffect(() => {
    dispatch({
      type: types.GET_COLLEGE_LIST,
    });
    dispatch({
      type: types.GET_EDUCATION_LEVEL,
    });
  }, []);


  const vcardEdu = {
    user_id: jobseekerDetail?.user_Id,
    education_details: [
      {
        education_level: educationLevelId,
        specialization: specialization,
        university: college,
        start_date: "July 21, 2015 01:15:00",
        end_date: "August 21, 2020 01:15:00",
        skills: "[]",
      },
    ],
  };

  const renderFilterCollegeList = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => setCollege(item?.university)}>
        <CustomText oh5 text={item?.university} />
      </TouchableOpacity>
    );
  };

  const filterCollege = text => {
    setCollege(text);
    const data = allCollege.filter(x => x?.university?.includes(text));
    setFilteredCollegeList(data);
  };

  const submitEducationList = () => {
    if (education && specialization && college) {
      dispatch({
        type: types.POST_EDUCATION_AND_SKILL,
        payload: { vcardEdu, isEdit },
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  return (
    <SafeAreaView style={VCardEducationDetailStyle.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={VCardEducationDetailStyle.container}>
        <View>
          <CustomText eh1 text="Education Details" style={VCardEducationDetailStyle.mainHeading} />
          <CustomText text="Please add your education details here." regular oh5 textColor={colors.grey} />
        </View>

        <CustomVCard
          firstName={jobseekerDetail?.first_name}
          lastName={jobseekerDetail?.last_name}
          backgroundCardStyle={{ height: wpx(230) }}
          image={jobseekerDetail?.profile_pic}>
          <View style={VCardEducationDetailStyle.isWorkedBeforeView}>
            <CustomText text={education ? education : "Education"} eh5 regular textColor={colors.white} />
            <CustomText
              text={specialization ? specialization : "Specialization"}
              eh5
              regular
              textColor={colors.white}
              style={{ marginVertical: hpx(10) }}
            />
            <CustomText text={college ? college : "College"} eh5 regular textColor={colors.white} />
          </View>
        </CustomVCard>

        <View style={VCardEducationDetailStyle.formView}>
          <CustomText oh5 medium text="Select Education" style={{ marginVertical: hpx(10) }} />
          <CustomDropdown title={education ? education : "Select Education"} data={educationLevel} onSelect={item => setEducation(item)} onKeySelect={(id) => setEducationLevelId(id)} />

          <CustomText oh5 medium text="Select Specialization" style={{ marginVertical: hpx(10) }} />
          {/* <CustomDropdown
            title="Select Specialization"
            data={specializationList}
            onSelect={item => setSpecialization(item)}
          /> */}

          <CustomTextInput
            placeholder="e.g Biology, Computer Science, Nursing, Psychology, etc"
            value={specialization}
            onChangeText={i => setSpecialization(i)}
          />

          <CustomText oh5 medium text="Institute/College/University" style={{ marginVertical: hpx(10) }} />
          {/* <CustomDropdown
                        title="Institute/College/University"
                        data={collegeList}
                        onSelect={item => setCollege(item)}
                    /> */}
          <CustomTextInput
            placeholder="Type Institue/College/University"
            value={college}
            onChangeText={text => filterCollege(text)}
          />
          <FlatList
            data={filteredCollegeList ? filteredCollegeList.slice(0, 2) : null}
            renderItem={renderFilterCollegeList}
          />
          <View style={{ height: hpx(100) }} />
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        loader={loader}
        onPress={() => submitEducationList()}
        nextIcon={true}
        title={isEdit ? "Save" : "Next"}
        style={{ marginBottom: hpx(10) }}
      />
    </SafeAreaView>
  );
};

export default VCardEducationDetail;
