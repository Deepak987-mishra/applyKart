import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../constants/constant";
import { InterviewAddressStyles } from "./InterviewAddressStyles";
import Header from "../../../../common/Header/Header";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import Snackbar from "react-native-snackbar";
import { types } from "../../../../store/action/ActionTypes";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { locationList } from "../../../../mock/dummyDropdownList/dummyDropdownList";
const dummyData = [
  { id: 1, name: "Noida " },
  { id: 2, name: "Gurgaon" },
  { id: 3, name: "Sec 59" },
  { id: 4, name: "Faridabad" },
];

const InterviewAddress = ({ navigation, route }) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();
  const [interviewlocation, setLocation] = useState(item?.interview_location ?? null);
  const [interviewSuburb, setSuburb] = useState();
  const [interviewCity, setCity] = useState();
  const [selectedinterviewData, setSelectedDummyData] = useState(item?.location ?? null);

  const { jobDetail } = useSelector(
    state => ({
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
    }),
    shallowEqual,
  );

  const nextButton = () => {
    let body = {
      interviewlocation: interviewlocation,
      interviewSuburb: interviewSuburb,
      interviewCity: interviewCity,
      selectedlocation: selectedinterviewData,
    };

    if (interviewlocation && interviewSuburb && interviewCity) {
      dispatch({
        type: types.FILL_INTERVIEW_ADDRESS,
        payload: body,
      });
      navigation.navigate("Availability", {
        editable: editable,
        item: jobDetail,
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  return (
    <SafeAreaView style={InterviewAddressStyles.container}>
      <Header
        title={editable ? "Edit Interview Address" : "Interview Address"}
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()}
       
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        // Doesn't work on RN 0.56 for either Android or iOS
        keyboardShouldPersistTaps="handled"
        extraHeight={200}
        // Works on iOS but not Android in RN 0.56
        extraScrollHeight={200}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: wpx(20), marginHorizontal: wpx(20) }}>
          <CustomText text="Interview Address" medium oh5 />
          <CustomTextInput placeholder="Location" onChangeText={text => setLocation(text)} value={interviewlocation} />
          <CustomTextInput placeholder="Add Suburb" onChangeText={text => setSuburb(text)} />
          <CustomTextInput placeholder="Add City" onChangeText={text => setCity(text)} />

          <CustomDropdown
            title={item?.location ?? "Select Location "}
            data={locationList}
            onSelect={item => setSelectedDummyData(item)}
          />
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title={editable ? "Save & Next" : "Next"}
        style={{ marginVertical: wpx(10) }}
        nextIcon={"true"}
        // onPress={() => navigation.navigate('Availability')}
        onPress={() => nextButton()}
      />
    </SafeAreaView>
  );
};

export default InterviewAddress;
