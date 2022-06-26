import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Image, Pressable } from "react-native";
import { darkColors, lightColors } from "../../config";
import { TextElement } from "../../components/text/Text";
import { hpx, wpx } from "../../components/helpers";
import { screenWidth } from "../../components/helpers/ratio";
import { UserCard } from "../../components/cards";
import { CustomTextInput } from "../../components/textInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomButton } from "../../components/buttons";
import { CustomDropDown } from "../../components/dropdown";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../../components/modal/Modal";
import VaccinationList from "../../mock/VaccinationList";
import LocationList from "../../mock/LocationList";
import { profileStack } from "../../config/navigator";
import { images } from "../../config/images";

const SignUpDetails = () => {
  const navigation = useNavigation();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [locationStatus, setlocationStatus] = useState(false);
  const [vaccinationStatus, setvaccinationStatus] = useState(false);
  const [location, setlocation] = useState("");
  const [vaccination, setvaccination] = useState("");
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
      <CustomModal
        visible={locationStatus}
        list={LocationList}
        onPress={item => {
          setlocation(item.title), setlocationStatus(false);
        }}
        onClose={() => setlocationStatus(false)}
      />
      <CustomModal
        visible={vaccinationStatus}
        list={VaccinationList}
        onPress={item => {
          setvaccination(item.title), setvaccinationStatus(false);
        }}
        onClose={() => setvaccinationStatus(false)}
      />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.topView}>
          <TextElement h3 semibold h3Style={{ color: darkColors.colors.black1 }}>
            V-Card
          </TextElement>
          <TextElement h5 regular h5Style={{ color: darkColors.colors.grey, marginTop: 10 }}>
            This will be your resume and qualifications that helps the employer and companies to know you better
          </TextElement>
          <UserCard
            firstname={firstName == "" ? "Your" : firstName}
            lastname={lastName == "" ? " Name" : " " + lastName}
            firstTitle={location == "" ? "Your Location" : location}
            secondTitle={gender == "" ? "Gender" : gender}
            thirdTitle={vaccination == "" ? "Vaccination status" : vaccination}
            firstImage={images.profile.location}
            secondImage={images.profile.gender}
            thirdImage={images.profile.vaccination}
          />
          <CustomTextInput placeholder="First name" onChangeText={text => setfirstName(text)} />
          <CustomTextInput placeholder="Last name" onChangeText={text => setlastName(text)} />

          <CustomDropDown title={location == "" ? "Location" : location} onPress={() => setlocationStatus(true)} />

          <CustomDropDown
            title={vaccination == "" ? "Vaccination Status" : vaccination}
            onPress={() => setvaccinationStatus(true)}
          />

          <TextElement medium h4 h4Style={{ marginTop: 20 }}>
            I am
          </TextElement>
          <View style={styles.genderSelection}>
            <Pressable onPress={() => setgender("Male")}>
              <View style={styles.inner_gender_selection}>
                <Image
                  style={styles.genderImage}
                  resizeMode="contain"
                  source={gender === "Male" ? images.profile.male_active : images.profile.male_inactive}></Image>
                <TextElement
                  h5
                  regular
                  h5Style={gender === "Male" ? { marginLeft: 10, color: darkColors.colors.blue } : { marginLeft: 10 }}>
                  Male
                </TextElement>
              </View>
            </Pressable>
            <Pressable onPress={() => setgender("Female")}>
              <View style={styles.inner_gender_selection}>
                <Image
                  style={styles.genderImage}
                  resizeMode="contain"
                  source={gender === "Female" ? images.profile.female_active : images.profile.female_inactive}></Image>

                <TextElement
                  h5
                  regular
                  h5Style={
                    gender === "Female" ? { marginLeft: 10, color: darkColors.colors.blue } : { marginLeft: 10 }
                  }>
                  Female
                </TextElement>
              </View>
            </Pressable>

            <Pressable onPress={() => setgender("Others")}>
              <View style={styles.inner_gender_selection}>
                <Image
                  style={styles.genderImage}
                  resizeMode="contain"
                  source={gender === "Others" ? images.profile.others_active : images.profile.others_inactive}></Image>

                <TextElement
                  h5
                  regular
                  h5Style={
                    gender === "Others" ? { marginLeft: 10, color: darkColors.colors.blue } : { marginLeft: 10 }
                  }>
                  Others
                </TextElement>
              </View>
            </Pressable>
          </View>
          <View style={styles.marginView}></View>
          <CustomButton
            buttonText="Next"
            onPress={() => {
              if (firstName && lastName)
                navigation.navigate(profileStack.workDetails, {
                  firstName: firstName,
                  lastName: lastName,
                });
            }}
          />
          <View style={styles.marginView}></View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: lightColors.colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContainer: {
    borderWidth: 1,
    height: hpx(150),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 120,
    width: "100%",
  },
  backgroundCard: {
    height: hpx(230),
    width: wpx(screenWidth / 1.06),
  },
  foregroundCard: { height: "100%", width: "100%" },
  genderSelection: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  genderImage: { height: 20, width: 20 },
  inner_gender_selection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  marginView: { marginTop: 20 },
});

export default SignUpDetails;
