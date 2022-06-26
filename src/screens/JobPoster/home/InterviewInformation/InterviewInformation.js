import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors, fonts, hpx, nf, wpx, icons, mobileRegex, emailRegex } from "../../../../constants/constant";
import { InterviewInformationStyles } from "./InterviewInformationStyles";
import Header from "../../../../common/Header/Header";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { types } from "../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import { useSelector, shallowEqual } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
const dummyData = [
  { id: 1, name: "25" },
  { id: 2, name: "50" },
  { id: 3, name: "75" },
  { id: 4, name: "100" },
];

const InterviewInformation = ({ navigation, route }) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState(item?.company ?? null);
  const [jobPosterName, setJobPosterName] = useState(item?.job_Poster_Name ?? null);
  const [contactNumber, setContactNumber] = useState(item?.contact_No ?? null);
  const [emailAddress, setEmailAddress] = useState(item?.email ?? null);
  const [validEmail, setValidEmail] = useState("");
  const [receiveApplicationForm, setReceiveApplicationForm] = useState(item?.recieve_applications_from.toString() ?? 0);
  const [validContact, setValidContact] = useState("");

  console.log("receiveAPplication", receiveApplicationForm);
  console.log("");
  const { jobDetail } = useSelector(
    state => ({
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (emailAddress) {
      if (emailRegex.test(emailAddress.trim().toLowerCase())) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    } else {
      setValidEmail(false);
    }

    if (contactNumber) {
      if (mobileRegex.test(contactNumber)) {
        setValidContact(true);
      } else {
        setValidContact(false);
      }
    } else {
      setValidContact(false);
    }
  }, [emailAddress, contactNumber]);

  const nextButton = () => {
    let body = {
      companyName: companyName,
      jobPoster: jobPosterName,
      contactNumber: contactNumber,
      email: emailAddress,
      receivedRange: receiveApplicationForm,
    };

    if (companyName && jobPosterName && contactNumber && emailAddress) {
      dispatch({
        type: types.FILL_INTERVIEW_DETAIL,
        payload: body,
      });
      navigation.navigate("JobAddress", {
        editable: editable,
        item: editable ? jobDetail : null,
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  return (
    <SafeAreaView style={InterviewInformationStyles.container}>
      <Header
        title={editable ? "Edit Interview Information" : "Interview Information "}
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        enableOnAndroid
        // Doesn't work on RN 0.56 for either Android or iOS
        keyboardShouldPersistTaps="handled"
        extraHeight={100}
        // Works on iOS but not Android in RN 0.56
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: wpx(100) }}>
        <View style={{ marginTop: hpx(20) }}>
          <View style={{ paddingHorizontal: wpx(20) }}>
            <CustomText text="Company Name" medium oh5 />
            <CustomTextInput
              placeholder="Company Name"
              onChangeText={text => setCompanyName(text)}
              value={companyName}
              style={{ marginTop: wpx(5), marginBottom: -10 }}
            />
          </View>
          <View style={{ paddingHorizontal: wpx(20) }}>
            <CustomText text="Name Of Job Poster  " medium oh5 />
            <CustomTextInput
              placeholder="Name Of Job Poster"
              onChangeText={text => setJobPosterName(text)}
              value={jobPosterName}
              style={{ marginTop: wpx(5), marginBottom: -10 }}
            />
          </View>
          <View style={{ paddingHorizontal: wpx(20) }}>
            <CustomText text="Contact Number" medium oh5 />
            <CustomTextInput
              placeholder="Enter Your Mobile Number"
              maxLength={15}
              keyboardType={"phone-pad"}
              onChangeText={text => setContactNumber(text)}
              errorMessage={contactNumber && !validContact ? "Invalid Mobile Number" : null}
              value={contactNumber}
              style={{ marginTop: wpx(5) }}
            />
          </View>
          <View style={{ paddingHorizontal: wpx(20) }}>
            <CustomText text="Email Address" medium oh5 />
            <CustomTextInput
              placeholder="Write Your Email"
              onChangeText={text => setEmailAddress(text)}
              errorMessage={emailAddress && !validEmail ? "Invalid Email Address" : null}
              value={emailAddress}
              style={{ marginTop: wpx(5) }}
            />
          </View>
          <View style={{ paddingHorizontal: wpx(20) }}>
            <CustomText text="Receive Applications From" medium oh5 />
            {/* <Text>{item?.recieve_applications_from}</Text> */}

            <CustomTextInput
              placeholder="Enter Range"
              onChangeText={text => setReceiveApplicationForm(text)}
              value={receiveApplicationForm}
              style={{ marginTop: wpx(5), marginBottom: -10 }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <CustomButton
        title={editable ? "Save & Next" : "Next"}
        nextIcon={"true"}
        style={{ marginBottom: hpx(20) }}
        disabled={!validEmail || !validContact}
        //onPress={() => navigation.navigate('JobAddress')}
        onPress={() => nextButton()}
      />
    </SafeAreaView>
  );
};

export default InterviewInformation;
