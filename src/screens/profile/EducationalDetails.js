import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { darkColors } from "../../config";
import { TextElement } from "../../components/text/Text";
import { UserCard } from "../../components/cards";
import { CustomButton } from "../../components/buttons";
import { CustomDropDown } from "../../components/dropdown";
import { CustomView } from "../../components/view";
// import {useNavigation} from '@react-navigation/core';
import Education from "../../mock/Education";
import CustomModal from "../../components/modal/Modal";

const EducationDetails = ({ route, navigation }, props) => {
  const [firstName, setfirstName] = useState(route.params.firstName);
  const [lastName, setlastName] = useState(route.params.lastName);
  const [educationStatus, seteducationStatus] = useState(false);
  const [specializationStatus, setspecializationStatus] = useState(false);

  return (
    <CustomView isFullView>
      <CustomModal
        visible={educationStatus}
        list={Education}
        onPress={item => {
        }}></CustomModal>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
        <TextElement h3 semibold h3Style={{ color: darkColors.colors.black1 }}>
          Education Details
        </TextElement>
        <TextElement h5 regular h5Style={{ color: darkColors.colors.grey, marginTop: 10 }}>
          Please add your education details here.
        </TextElement>
        <UserCard
          firstname={firstName == "" ? "Your" : firstName}
          lastname={lastName == "" ? " Name" : " " + lastName}
          firstTitle="Education"
          secondTitle="Specialization"
          thirdTitle="Visa type"
        />
        <TextElement medium h5 h5Style={{ color: darkColors.colors.black, marginTop: 20 }}>
          Select education
        </TextElement>
        <CustomDropDown title="Select education" onPress={() => seteducationStatus(true)} list={Education} />
        <TextElement medium h5 h5Style={{ color: darkColors.colors.black, marginTop: 20 }}>
          Select specialization
        </TextElement>
        <CustomDropDown title="Select specialization" />
        <TextElement medium h5 h5Style={{ color: darkColors.colors.black, marginTop: 20 }}>
          Institute/College/University
        </TextElement>
        <CustomDropDown title="Institute/College/University" />
        <TextElement medium h5 h5Style={{ color: darkColors.colors.black, marginTop: 20 }}>
          Special skills
        </TextElement>
        <CustomDropDown title="Special skills" />
        <View style={{ marginTop: 40 }} />
        <CustomButton buttonText="Next" onPress={() => navigation.navigate("ConfirmScreen")} />
      </ScrollView>
    </CustomView>
  );
};

export default EducationDetails;
