import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import CustomTextInput from "../../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../../common/CustomButton/CustomButton";
import { icons, fonts, wp, hpx, colors, wpx, hp } from "../../../../../constants/constant";
import { VCardSpecialSkillStyles } from "./VCardSpecialSkillStyles";
import CustomDropdown from "../../../../../common/CustomDropdown/CustomDropdown";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomVCard from "../../../../../common/CustomVCard/CustomVCard";
import Header from "../../../../../common/Header/Header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";

const VCardSpecialSkill = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isEdit } = route.params
  const { specialSkillList, jobseekerDetail, seekerLoginData, loader } = useSelector(
    state => ({
      specialSkillList: state.jobseekerReducer.skillList,
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      seekerLoginData: state.authReducer.seekerLoginData,
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  const [firstName, setFirstName] = useState(jobseekerDetail?.first_name);
  const [lastName, setLastName] = useState(jobseekerDetail?.last_name);

  const [saveSkillId, setSaveSkillId] = useState([]);
  useEffect(() => {
    dispatch({
      type: types.GET_SPECIAL_SKILL_LIST,
    });
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: jobseekerDetail?.user_Id,
    });
  }, []);

  useEffect(() => { }, [belowSkills, upSkills]);

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const onChange = item => {
    let array = [...belowSkills];
    array.push(item);
    const uniqueAges = array.filter(unique);
    setBelowSkills(uniqueAges);
    setUpSkills(uniqueAges);
  };

  function removeItemOnce(up, below, value) {
    var index = up.indexOf(value);
    if (index > -1) {
      up.splice(index, 1);
    }
    setUpSkills(up);

    var index = below.indexOf(value);
    if (index > -1) {
      below.splice(index, 1);
    }
    setBelowSkills(below);


    const data = upSkills.filter(function (element) {
      return element !== undefined;
    });
    const bskills = belowSkills.filter(function (element) {
      return element !== undefined;
    });

    setUpSkills(data)
    setBelowSkills(bskills)

    // onChange();
  }

  const VCardSkills = ({ item }) => {
    return (
      <View
        style={{
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.white,
          borderRadius: wp(5),
          paddingVertical: wpx(7),
          paddingHorizontal: wpx(7),
          marginHorizontal: wpx(10),
        }}>
        <CustomText eh6 regular text={item} textColor={colors.white} />
      </View>
    );
  };

  const UserSkills = props => {
    return (
      <View
        style={{
          margin: wpx(5),
          flexDirection: "row",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.black,
          borderRadius: wp(5),
          paddingVertical: wpx(7),
          paddingHorizontal: wpx(7),
          marginHorizontal: wpx(10),
        }}>
        <CustomText eh6 regular text={props.skill} textColor={colors.black} />
        <TouchableOpacity>
          <Image source={icons.cross} style={{ marginLeft: wpx(10) }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSpecialSkillList = ({ item, index }) => {
    return (
      <View
        style={{
          margin: wpx(5),
          flexDirection: "row",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.black,
          borderRadius: wp(5),
          paddingVertical: wpx(7),
          paddingHorizontal: wpx(7),
          marginHorizontal: wpx(10),
        }}>
        <CustomText eh6 regular text={item} textColor={colors.black} />
        {/* <TouchableOpacity onPress={() => { }}> */}
        <TouchableOpacity onPress={() => removeItemOnce(upSkills, item)}>
          <Image source={icons.cross} style={{ marginLeft: wpx(10) }} />
        </TouchableOpacity>
      </View>
    );
  };

  const submitEducationSkill = () => {
    if (upSkills.length > 2) {
      const body = {
        user_id: jobseekerDetail?.user_Id,
        Skill: JSON.stringify(saveSkillId.slice(0, 3))
      }
      dispatch({
        type: types.POST_VCARD_SPECIAL_SKILL,
        payload: { body, isEdit }
      })
    } else {
      Snackbar.show({ text: "Please enter at least 3 skills", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };


  const onSpecialIdSelect = (id) => {
    let idArr = [...saveSkillId]
    idArr.push(id)
    setSaveSkillId(idArr)
  }
  const reducerSkillList = specialSkillList ? specialSkillList.map(x => {
    return { id: x?.skill_id, name: x?.skill }
  }) : null

  const vcardskills = jobseekerDetail.skills.map(x => {
    return x?.skill
  })
  console.log('vacrskills', vcardskills)
  const [upSkills, setUpSkills] = useState(vcardskills);
  const [belowSkills, setBelowSkills] = useState(vcardskills);
  return (
    <SafeAreaView style={VCardSpecialSkillStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: wpx(100) }}
        style={VCardSpecialSkillStyles.container}>
        <View>
          <CustomText eh1 text="Special Skills" style={VCardSpecialSkillStyles.mainHeading} />
          <CustomText text="Please add your skills here." regular oh5 textColor={colors.grey} />
        </View>

        <CustomVCard firstName={firstName} lastName={lastName} image={jobseekerDetail?.profile_pic}
          backgroundCardStyle={{ height: wpx(230) }}
        >
          <View
            style={{
              width: wp(70),
              justifyContent: "center",
              alignSelf: "center",
              alignContent: "center",
              flexDirection: "row",
              marginTop: hpx(10),
            }}>
            <View style={{ flexDirection: "row-reverse", marginTop: hpx(10) }}>

              {/* <FlatList numColumns={3} data={upSkills ? upSkills.slice(0, 3) : null} renderItem={VCardSkills} /> */}

              {
                upSkills.slice(-3).map(x => {
                  return (
                    <View
                      style={{
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: colors.white,
                        borderRadius: wp(5),
                        paddingVertical: wpx(7),
                        paddingHorizontal: wpx(7),
                        marginHorizontal: wpx(3),
                        marginVertical: wpx(3),
                      }}>
                      <CustomText eh6 regular text={
                        (x.length > 10) ?
                          ((x.substring(0, 9)) + '...') :
                          x
                      } textColor={colors.white} />
                    </View>
                  );

                }
                )
              }
            </View>
          </View>
        </CustomVCard>

        <View style={VCardSpecialSkillStyles.formView}>
          <CustomText oh5 medium text="Special Skills" style={{ marginVertical: hpx(10) }} />
          <CustomDropdown title="Select Special Skills" data={reducerSkillList} onKeySelect={(id) => onSpecialIdSelect(id)} onSelect={item => onChange(item)} />

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: hpx(10) }}>
            {/* {
              specialSkillList.map(x =>
                <UserSkills skill={x?.skill} />
              )
            } */}
            {/* <FlatList numColumns={3} data={belowSkills} renderItem={renderSpecialSkillList} /> */}

            {
              belowSkills.map(x => {
                return (
                  <View
                    style={{
                      margin: wpx(5),
                      flexDirection: "row",
                      alignSelf: "center",
                      borderWidth: 1,
                      borderColor: colors.black,
                      borderRadius: wp(5),
                      paddingVertical: wpx(7),
                      paddingHorizontal: wpx(7),
                      marginHorizontal: wpx(10),
                    }}>
                    <CustomText eh6 regular text={x} textColor={colors.black} />
                    {/* <TouchableOpacity onPress={() => { }}> */}
                    <TouchableOpacity onPress={() => removeItemOnce(upSkills, belowSkills, x)}>
                      <Image source={icons.cross} style={{ marginLeft: wpx(10) }} />
                    </TouchableOpacity>
                  </View>
                );

              }
              )
            }
          </View>
        </View>
      </ScrollView>
      <CustomButton
        loader={loader}
        onPress={() => submitEducationSkill()}
        nextIcon={true}
        title={isEdit ? "Save" : "Next"}
        style={{ marginBottom: hpx(10) }}
      />
    </SafeAreaView>
  );
};

export default VCardSpecialSkill;
