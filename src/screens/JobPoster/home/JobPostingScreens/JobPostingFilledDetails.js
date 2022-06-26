import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../../common/Header/Header";
import { fonts, icons, colors } from "../../../../constants/constant";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { JobPostingFillDetailStyles } from "./JobPostingFilledDetailsStyles";
import { hpx, wpx, wp, hp } from "../../../../constants/constant";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const JobPostingFillDetail = ({ route, navigation }, props) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();

  const { jobDetail, loader, categoryList, jobseekerDetail } = useSelector(
    state => ({
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
      loader: state?.globalReducer?.loader,
      jobseekerDetail: state?.jobseekerReducer?.jobSeekerDetail,
      categoryList: state?.jobseekerReducer?.categoryList?.jobCategories?.map(x => {
        return { id: x?.job_Category_id, name: x?.job_Category };
      }),
    }),
    shallowEqual,
  );

  const educationLevel = useSelector(s =>
    s?.jobseekerReducer?.educationLevel?.map(x => {
      return { id: x?.education_Level_Id, name: x?.education_Level };
    }),
  );

  useEffect(() => {
    dispatch({
      type: types.GET_CATEGORY_LIST,
    });
  }, []);

  const dummyExperience = [
    { id: 1, name: "0-1 year" },
    { id: 2, name: "1-2 years" },
    { id: 3, name: "2-3 years" },
    { id: 4, name: "3-5 years" },
    { id: 5, name: "5-7 years" },
    { id: 6, name: "7-10 years" },
    { id: 7, name: "10+ years" },
  ];
  // 0-1 year

  // 1-2 Years

  // 2-3 Years

  // 3-5 Years

  // 5-7 Years

  // 7-10 Years

  // 10+ Years
  const dummyDataForBase = [
    { id: 1, name: "Hourly" },
    { id: 2, name: "Weekly" },
    { id: 3, name: "Monthly" },
  ];
  const dummyDataForLanguages = [
    { id: 1, name: "English" },
    { id: 2, name: "Spanish" },
    { id: 3, name: "German" },
    { id: 4, name: "French" },
  ];

  const onlyDigitsText = value => {
    return value.replace(/[^\d]/g, "");
  };

  const [jobTitle, setJobTitle] = useState(item?.job_Title ?? null);
  const [vacancies, setVacancies] = useState(JSON.stringify(item?.no_Of_Vacancy) ?? null);
  //const [selectedDummyData, setSelectedDummyData] = useState();
  const [jobRole, setJobRole] = useState(item?.role ?? "");
  const [categoryId, setCategoryId] = useState();
  console.log("min_Edu_Qualification", jobDetail);

  // const data = Object.keys(jobDetail).filter(x => console.log("x?.min_Edu_Qualification", x));

  const [education, setEducation] = useState(item?.min_Edu_Qualification ?? "");
  // jobseekerDetail?.education_level_id == 1
  //   ? "UnderGraduate"
  //   : jobseekerDetail?.education_level_id == 2
  //   ? "Graduate"
  //   : jobseekerDetail?.education_level_id == 3
  //   ? "Master"
  //   : "Select Education",
  const [experienceApi, setExperienceApi] = useState(item?.min_Experience > 0 ? item?.min_Experience / 12 : null);
  const [selectBase, setDummyBase] = useState(item?.base ?? null);
  const [selectExperience, setSelectExperience] = useState();

  const [selectDummyDataForLanguage, setSelectedDummyDataForLanguages] = useState(item?.language_preference ?? "");
  const [jobtype, setJobtype] = useState(item?.job_Type ?? null);
  const [experience, setExperience] = useState(item?.min_Experience == 0 ? 0 : item?.min_Experience > 0 ? 1 : null);
  const [gender, setGender] = useState(
    item?.gender == "male" ? "male" : item?.gender == "female" ? "female" : "Non-binary" ?? null,
  );
  const [maximum, setMaximum] = useState(JSON.stringify(item?.max_Salary_Offered) ?? null);
  const [minimum, setMinimum] = useState(JSON.stringify(item?.salary_Offered) ?? null);
  const [validMaximum, setValidMaximum] = useState("");

  console.log("minedu", item?.min_Edu_Qualification);

  useEffect(() => {
    dispatch({
      type: types.GET_EDUCATION_LEVEL,
    });
  }, []);

  useEffect(() => {
    if (minimum) {
      if (minimum > maximum) {
        setValidMaximum(true);
      } else {
        setValidMaximum(false);
      }
    } else {
      setValidMaximum(false);
    }
  }, [minimum]);

  const nextButton = () => {
    let body = {
      jobTitle: jobTitle,
      jobRole: jobRole,
      jobtype: jobtype,
      education: education,
      language: selectDummyDataForLanguage,
      experience: (experience && experienceApi) ?? 0,
      maximum: maximum ? parseFloat(+maximum) : 0.0,
      minimum: minimum ? parseFloat(+minimum) : 0.0,
      base: selectBase,
      vacancies: vacancies,
      gender: gender,
      category: categoryId,
    };

    if (!jobTitle) {
      Snackbar.show({ text: "Please Job Title ", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    } else if (!jobRole) {
      Snackbar.show({
        text: "Please Select Job Role ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!jobtype) {
      Snackbar.show({
        text: "Please Select job type ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!education) {
      Snackbar.show({
        text: "Please Select Education ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!selectDummyDataForLanguage) {
      Snackbar.show({
        text: "Please Select language ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!gender) {
      Snackbar.show({
        text: "Please Select Gender ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (experience == null || (experience && !experienceApi)) {
      Snackbar.show({
        text: "Please Select your Experience ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!maximum) {
      Snackbar.show({
        text: "Please Enter Maximum Salary  ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!minimum) {
      Snackbar.show({
        text: "Please Enter Minimum Salary  ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!selectBase) {
      Snackbar.show({
        text: "Please Select Base  ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!vacancies) {
      Snackbar.show({
        text: "Please Enter total vacancy ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      dispatch({
        type: types.FILL_JOB_DETAIL,
        payload: body,
      });
      navigation.navigate("JobPostingCandidateReq", {
        editable: editable,
        item: editable ? jobDetail : null,
      });
    }
  };

  const setExperienceData = name => {
    switch (name) {
      case "0-1 year":
        setSelectExperience(name);
        setExperienceApi(12);
        break;
      case "1-2 years":
        setSelectExperience(name);
        setExperienceApi(24);
        break;
      case "2-3 years":
        setSelectExperience(name);
        setExperienceApi(36);
        break;
      case "3-5 years":
        setSelectExperience(name);
        setExperienceApi(48);
        break;
      case "5-7 years":
        setSelectExperience(name);
        setExperienceApi(60);
        break;
      case "7-10 years":
        setSelectExperience(name);
        setExperienceApi(72);
        break;
      case "10 years+":
        setSelectExperience(name);
        setExperienceApi(90);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getExperienceData(experienceApi);
  }, []);

  const getExperienceData = name => {
    switch (name) {
      case 1:
        setExperienceApi(12);
        setSelectExperience("0-1 year");
        break;
      case 2:
        setExperienceApi(24);
        setSelectExperience("1-2 years");
        break;
      case 3:
        setExperienceApi(36);
        setSelectExperience("2-3 years");
        break;
      case 4:
        setExperienceApi(48);
        setSelectExperience("3-5 years");
        break;
      case 5:
        setExperienceApi(60);
        setSelectExperience("5-7 years");
        break;
      case 6:
        setExperienceApi(72);
        setSelectExperience("7-10 years");
        break;
      case 7:
        setExperienceApi(90);
        setSelectExperience("10 years+");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={JobPostingFillDetailStyles.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        title={editable ? "Edit Basic Job Details" : "Basic Job Details"}
        headerStyle={JobPostingFillDetailStyles.headerStyle}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        enableOnAndroid
        // Doesn't work on RN 0.56 for either Android or iOS
        keyboardShouldPersistTaps="handled"
        extraHeight={200}
        // Works on iOS but not Android in RN 0.56
        extraScrollHeight={200}
        contentContainerStyle={{ flexGrow: 1 }}
        style={JobPostingFillDetailStyles.scrollViewContainer}>
        <View>
          <CustomText text="Job Title" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.jobTitleTextInputView}>
          <CustomTextInput placeholder="Job Title" onChangeText={text => setJobTitle(text)} value={jobTitle} />
        </View>
        <View style={JobPostingFillDetailStyles.jobRoleView}>
          <CustomText text="Job Role" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.jobRoleTextInputView}>
          <CustomDropdown
            data={categoryList}
            onSelect={item => setJobRole(item)}
            onKeySelect={id => setCategoryId(id)}
            // onKeySelect={id => console.log("IDD", id)}
            title={item?.role ?? "Select Role"}
          />
        </View>
        {/* {console.log("Category id ===1111", categoryId)} */}
        <View style={JobPostingFillDetailStyles.jobTypeView}>
          <CustomText text="Job Type" medium oh5 />
        </View>

        <View style={JobPostingFillDetailStyles.radioBtnmainContainer3}>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setJobtype(2)}>
              <Image resizeMode="contain" source={jobtype == 2 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Full time" regular oh5 />
            </View>
          </View>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setJobtype(4)}>
              <Image resizeMode="contain" source={jobtype == 4 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Part time" regular oh5 />
            </View>
          </View>
        </View>

        <View style={JobPostingFillDetailStyles.radioBtnView}>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setJobtype(6)}>
              <Image
                resizeMode="contain"
                //   style={styles.cb}
                source={jobtype == 6 ? icons.radio_button_on : icons.radio_button_off}
              />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Night shift" regular oh5 />
            </View>
          </View>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setJobtype(1)}>
              <Image resizeMode="contain" source={jobtype == 1 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Freelance" regular oh5 />
            </View>
          </View>
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnView}>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setJobtype(5)}>
              <Image resizeMode="contain" source={jobtype == 5 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Allows remote work" regular oh5 />
            </View>
          </View>
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
          <CustomText text="Education" medium oh5 />
          <CustomText text=" (Minimum requirment)" regular eh5 />
        </View>
        <View style={JobPostingFillDetailStyles.educationDropdownView}>
          <CustomDropdown
            data={educationLevel}
            onKeySelect={id => setEducation(id)}
            title={item?.min_education ?? "Select Education"}
          />
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
          <CustomText text="Languages Preferences" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.languageDropdownView}>
          <CustomDropdown
            data={dummyDataForLanguages}
            onSelect={item => setSelectedDummyDataForLanguages(item)}
            title={item?.language_preference ?? "Select Language"}
          />
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
          <CustomText text="Experience Required" medium oh5 />
        </View>

        <View style={JobPostingFillDetailStyles.radioBtnView}>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setExperience(0)}>
              <Image resizeMode="contain" source={experience == 0 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Newbie" regular oh5 />
            </View>
          </View>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setExperience(1)}>
              <Image resizeMode="contain" source={experience == 1 ? icons.radio_button_on : icons.radio_button_off} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Experienced" regular oh5 />
            </View>
          </View>
        </View>
        {experience == 1 ? (
          <View style={{ marginTop: hpx(8) }}>
            <CustomDropdown
              data={dummyExperience}
              onSelect={item => setExperienceData(item)}
              title={selectExperience ? selectExperience : "Select Experience"}
              // style={{ marginTop: hpx(15) }}
            />
          </View>
        ) : null}
        <View style={JobPostingFillDetailStyles.salaryView}>
          <CustomText text="Gender" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnViewWithContent4}>
          <View style={JobPostingFillDetailStyles.radioBtnViewWithContent}>
            <TouchableOpacity onPress={() => setGender("male")}>
              <Image resizeMode="contain" source={gender == "male" ? icons.selectedCheckBox : icons.checkBox} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Male" regular oh5 />
            </View>
          </View>
          <View style={JobPostingFillDetailStyles.femaleView}>
            <TouchableOpacity onPress={() => setGender("female")}>
              <Image resizeMode="contain" source={gender == "female" ? icons.selectedCheckBox : icons.checkBox} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Female" regular oh5 />
            </View>
          </View>
          <View style={JobPostingFillDetailStyles.nonBinaryView}>
            <TouchableOpacity onPress={() => setGender("Non-binary")}>
              <Image resizeMode="contain" source={gender == "Non-binary" ? icons.selectedCheckBox : icons.checkBox} />
            </TouchableOpacity>
            <View style={JobPostingFillDetailStyles.radioBtnContentTextView}>
              <CustomText text="Non-binary" regular oh5 />
            </View>
          </View>
        </View>
        <View style={JobPostingFillDetailStyles.salaryView}>
          <CustomText text="Salary Offered" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.radioBtnViewWithContent1}>
          <CustomText text="Max" regular eh5 />

          <View style={JobPostingFillDetailStyles.minView}>
            <CustomText text="Min" regular eh5 />
          </View>
          <View style={JobPostingFillDetailStyles.baseView}>
            <CustomText text="Base" regular eh5 />
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: hpx(5),
          }}>
          <CustomTextInput
            type={"$"}
            placeHolderColor={colors.black}
            keyboardType={"phone-pad"}
            onChangeText={text => setMaximum(text)}
            value={maximum}
            maxLength={4}
            style={{ width: wpx(100) }}
          />

          <CustomTextInput
            type={"$"}
            placeHolderColor={colors.black}
            keyboardType={"phone-pad"}
            onChangeText={text => setMinimum(text)}
            style={{ width: wpx(100) }}
            value={minimum}
            maxLength={4}
            // errorMessage={minimum && !validMaximum ? "Salary must be less than maximum salary" : null}
          />

          <CustomDropdown
            data={dummyDataForBase}
            title={item?.base ?? "Base "}
            onSelect={item => setDummyBase(item)}
            style={{ width: wpx(100), height: hpx(50) }}
          />
        </View>
        {validMaximum ? (
          <View>
            <CustomText
              text="Minimum salary must be less than maximum salary"
              textColor="red"
              style={{ marginTop: hpx(5) }}
            />
          </View>
        ) : null}

        <View style={JobPostingFillDetailStyles.vacancyView}>
          <CustomText text="No Of Vacancies" medium oh5 />
        </View>
        <View style={JobPostingFillDetailStyles.vacancyTextInputView}>
          <CustomTextInput
            placeholder="Vacancies"
            onChangeText={text => setVacancies(onlyDigitsText(text))}
            keyboardType={"number-pad"}
            maxLength={10}
            value={vacancies}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={JobPostingFillDetailStyles.nextButton}>
        <CustomButton
          disabled={false}
          title={editable ? "Save & Next" : "Next"}
          nextIcon={true}
          onPress={() => nextButton()}
          style={{ marginBottom: hpx(20) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobPostingFillDetail;
