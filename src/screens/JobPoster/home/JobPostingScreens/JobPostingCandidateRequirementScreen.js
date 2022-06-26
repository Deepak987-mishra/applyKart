import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList, TextInput, SafeAreaView, Pressable } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Header from "../../../../common/Header/Header";
import { fonts, icons, colors, wpx, hpx, currencyFormat } from "../../../../constants/constant";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { JobPostingCandidateReqStyles } from "./JobPostingCandidateRequirementStyles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const JobPostingCandidateReq = ({ route, navigation }, props) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.GET_SPECIAL_SKILL_LIST,
    });
    dispatch({
      type: types.GET_VISA_TYPE_LIST,
    });
  }, []);

  const { specialSkillList, jobDetail, visaTypeList, specialRequirementList } = useSelector(
    state => ({
      specialSkillList: state?.jobseekerReducer?.skillList,
      specialRequirementList: state?.jobpostReducer?.specialRequirements,
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
      visaTypeList: state?.jobseekerReducer?.visaTypeList?.map(x => {
        return { id: x?.visa_id, name: x?.visa_type };
      }),
    }),
    shallowEqual,
  );

  const [jobSkills, setJobSkills] = useState([]);
  const [selectedDummyDataForVisaType, setSelectedDummyDataForVisaType] = useState(item?.visa_requirement ?? null);
  const [description, setDescription] = useState(item?.description ? item?.description : "");
  const [requirements, setRequirements] = useState(
    item?.special_Requirement
      ? item?.special_Requirement.map(x => {
          return x.special_requirements_id;
        })
      : [],
  );
  const [vaccinated, setVaccinated] = useState(item?.vaccination_Type ? item?.vaccination_Type : "");
  const [skills, setskills] = useState([]);
  const [addedSkills, setAddedSkills] = useState(item?.skills ? item?.skills : []);

  const [filteredSkillsList, setFilteredSkillsList] = useState(specialSkillList);
  const [visaType, setVisaType] = useState(item?.visa_type ?? null);
  const [visaId, setVisaId] = useState();

  useEffect(() => {
    onChange(
      item?.special_Requirement.map(x => {
        return x?.special_requirements_id;
      }),
    );
  }, []);

  const onChange = (item, index) => {
    let array = [...requirements];
    array.includes(item?.special_requirements_id)
      ? array.splice(array.indexOf(item?.special_requirements_id), 1)
      : array.push(item?.special_requirements_id);
    setRequirements(array);
  };

  // const data = requirements.fil
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  var unique = requirements.filter(onlyUnique);

  const addSkills = item => {
    let skillsArray = [...addedSkills];
    console.log("skillsArray", skillsArray);
    if (skillsArray.find(x => x.skill_id == item?.skill_id)) {
      skillsArray.splice(skillsArray.indexOf(item?.skill_id), 1);
    } else {
      skillsArray.push(item);
    }
    setskills("");
    setAddedSkills(skillsArray);
  };

  const specialRequirementCard = (item, index) => {
    return (
      <TouchableOpacity style={JobPostingCandidateReqStyles.checkBoxView}>
        <TouchableOpacity onPress={() => onChange(item, index)}>
          <Image
            resizeMode="contain"
            source={requirements.includes(item.special_requirements_id) ? icons.selectedCheckBox : icons.checkBox}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(item, index)}
          style={JobPostingCandidateReqStyles.checkBoxContentVoiew}>
          <CustomText text={item.special_requirements} regular oh5 />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const specialSkillsCard = (item, index) => {
    return (
      <View style={{ backgroundColor: colors.offWhite2, padding: wpx(2) }}>
        <Pressable onPress={() => addSkills(item, index)}>
          <CustomText regular oh5 text={item?.skill} />
        </Pressable>
      </View>
    );
  };

  const filterSkills = text => {
    setskills(text);
    const data = specialSkillList
      .filter(x => !addedSkills.find(y => x?.skill_id == y?.skill_id))
      .filter(x => x?.skill?.includes(text));
    setFilteredSkillsList(data);
  };

  const nextButton = () => {
    let skillsId = [];
    addedSkills?.map(item => skillsId.push(item?.skill_id));

    // console.log("skills1====", requirements);

    let body = {
      jobSkills: skillsId,
      visa: visaType,
      description: description,
      specialRequirement: requirements,
      vaccine: vaccinated,
      visaId: visaId,
    };

    if (addedSkills.length < 1) {
      Snackbar.show({ text: "Please Enter Job skills ", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    } else if (requirements.length < 1) {
      Snackbar.show({
        text: "Please Select Special Requirements ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!vaccinated) {
      Snackbar.show({
        text: "Please Select Vaccination Detail ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!visaType) {
      Snackbar.show({
        text: "Please Select Visa Type ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else if (!description) {
      Snackbar.show({
        text: "Please Enter description ",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      dispatch({
        type: types.FILL_CANDIDATE_DETAIL,
        payload: body,
      });
      navigation.navigate("InterviewInformation", {
        editable: editable,
        item: editable ? jobDetail : null,
      });
    }
  };

  return (
    <SafeAreaView style={JobPostingCandidateReqStyles.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        title={editable ? "Edit Candidate Requirement" : "Candidate Requirement"}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        // Doesn't work on RN 0.56 for either Android or iOS
        keyboardShouldPersistTaps="handled"
        extraHeight={200}
        // Works on iOS but not Android in RN 0.56
        extraScrollHeight={200}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(100) }}
        style={JobPostingCandidateReqStyles.scrollViewContainer}>
        <View style={{ marginHorizontal: wpx(20) }}>
          <View style={JobPostingCandidateReqStyles.JobSkillView}>
            <CustomText text="Job Skills" medium oh5 />
          </View>
          <View style={JobPostingCandidateReqStyles.JobSkillTextInputView}>
            <TextInput
              value={skills}
              placeholder="Type here"
              onChangeText={text => filterSkills(text)}
              placeholderTextColor={colors.grey}
              style={{
                width: wpx(335),
                height: hpx(50),
                color: colors.black,
                borderRadius: wpx(8),
                paddingHorizontal: wpx(10),
                justifyContent: "center",
                backgroundColor: colors.offWhite,
              }}
            />
          </View>

          {/* {skills.length > 0 &&
          filteredSkillsList?.map((item, index) => {
            return specialSkillsCard(item);
          })} */}
          <View style={{ marginTop: hpx(10) }}>
            {skills.length > 0 && (
              <FlatList
                data={filteredSkillsList}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: "stretch",
                        width: wpx(330),
                        marginTop: hpx(4),
                        borderBottomColor: colors.black,
                        borderBottomWidth: 1,
                      }}
                    />
                  );
                }}
                renderItem={({ item, index }) => specialSkillsCard(item, index)}
              />
            )}
          </View>

          {/* {addedSkills.length > 0 &&
          addedSkills?.map((item, index) => {


            123456+


            return (
              <View style={JobPostingCandidateReqStyles.skillContainer}>
                <CustomText regular oh6 text={item?.name} />
              </View>
            ),
          })} */}
          <ScrollView nestedScrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
            {console.log("added skill===", addedSkills)}
            <FlatList
              data={addedSkills}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={JobPostingCandidateReqStyles.skillContainer}>
                  <CustomText regular oh6 text={item?.skill} />
                </View>
              )}
            />
          </ScrollView>

          <View style={JobPostingCandidateReqStyles.speacialReqView}>
            <CustomText text="Special Requirements" medium oh5 />
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={specialRequirementList}
            renderItem={({ item, index }) => specialRequirementCard(item, index)}
          />

          <View style={JobPostingCandidateReqStyles.vaccineView}>
            <CustomText text="Vaccination Required" medium oh5 />
          </View>
          <TouchableOpacity
            style={JobPostingCandidateReqStyles.checkBoxView}
            onPress={() => setVaccinated("Single dose")}>
            <TouchableOpacity onPress={() => setVaccinated("Single dose")}>
              <Image
                resizeMode="contain"
                source={vaccinated == "Single dose" ? icons.selectedCheckBox : icons.checkBox}
              />
            </TouchableOpacity>
            <View style={JobPostingCandidateReqStyles.checkBoxContentVoiew}>
              <CustomText text="Single dose" regular oh5 />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={JobPostingCandidateReqStyles.checkBoxView}
            onPress={() => setVaccinated("Double Dose")}>
            <TouchableOpacity onPress={() => setVaccinated("Double Dose")}>
              <Image
                resizeMode="contain"
                source={vaccinated == "Double Dose" ? icons.selectedCheckBox : icons.checkBox}
              />
            </TouchableOpacity>
            <View style={JobPostingCandidateReqStyles.checkBoxContentVoiew}>
              <CustomText text="Double vaccinated" regular oh5 />
            </View>
          </TouchableOpacity>
          <View style={JobPostingCandidateReqStyles.visatypeView}>
            <CustomDropdown
              //placeholder="Select Visa Type"
              title={item?.visa_type ?? "Select Visa Type"}
              data={visaTypeList}
              //onSelect={item => setSelectedDummyDataForVisaType(item)}
              onSelect={item => setVisaType(item)}
              onKeySelect={id => setVisaId(id)}
            />
          </View>
          <View style={JobPostingCandidateReqStyles.descriptionView}>
            <CustomText text="Description" medium oh5 />
          </View>
          <View style={JobPostingCandidateReqStyles.descriptionTextInputView}>
            <CustomTextInput onChangeText={text => setDescription(text)} value={description} />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={JobPostingCandidateReqStyles.nextButton}>
        <CustomButton title={editable ? "Save & Next" : "Next"} nextIcon={true} onPress={() => nextButton()} />
      </View>
    </SafeAreaView>
  );
};

export default JobPostingCandidateReq;
