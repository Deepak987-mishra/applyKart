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
import { icons, fonts, wp, hpx, colors, wpx, fontSizes, nf, GooglePlacesKey } from "../../../../../constants/constant";
import { VCardVaccinationStyles } from "./VCardVaccinationStyles";
import CustomDropdown from "../../../../../common/CustomDropdown/CustomDropdown";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomVCard from "../../../../../common/CustomVCard/CustomVCard";
import Header from "../../../../../common/Header/Header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import { locationList } from "../../../../../mock/dummyDropdownList/dummyDropdownList";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const VCardVaccination = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isEdit } = route.params
  const { seekerLoginData, jobseekerDetail, loader, loginData } = useSelector(
    state => ({
      seekerLoginData: state.authReducer.seekerLoginData,
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      loader: state.globalReducer.loader,
      loginData: state.authReducer.loginData,
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
  // console.log('jobseekerDetailjobseekerDetail', jobseekerDetail?.first_name)
  const [firstName, setFirstName] = useState(jobseekerDetail?.first_name);
  const [lastName, setLastName] = useState(jobseekerDetail?.last_name);
  const [vacStatus, setVacStatus] = useState(jobseekerDetail?.vaccination_Status);
  const [gender, setGender] = useState(jobseekerDetail?.gender ? jobseekerDetail?.gender : "male");
  const [location, setLocation] = useState(jobseekerDetail?.location);
  const [profilePic, setProfilePic] = useState(jobseekerDetail?.profile_pic);
  const [seekerLat, setSeekerLat] = useState(jobseekerDetail?.latitude);
  const [seekerLong, setSeekerLong] = useState(jobseekerDetail?.longitude);

  const vcardVacc = {
    user_id: jobseekerDetail?.user_Id,
    first_name: firstName,
    last_name: lastName,
    vaccination_status: vacStatus,
    gender: gender,
    location: location,
    profile_pic: profilePic ? profilePic.substring(profilePic.lastIndexOf("/") + 1) : null,
    latitude: seekerLat,
    longitude: seekerLong,
  };
  let file = {
    uri: profilePic ? profilePic : null,
    type: "image/jpeg",
    name: profilePic ? profilePic.substring(profilePic.lastIndexOf("/") + 1) : null,
  };
  const SubmitVCardVacc = () => {
    if (firstName && lastName && location) {
      dispatch({
        type: types.POST_VCARD_VACC_DETAIL,
        payload: { vcardVacc, file, isEdit },
      });
    } else if (profilePic) {
      Snackbar.show({ text: "Please add Profile Picture", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  const setLatLong = data => {
    setSeekerLat(data.geometry.location.lat);
    setSeekerLong(data.geometry.location.lng);
  };

  return (
    <SafeAreaView style={VCardVaccinationStyles.mainContainer}>
      {isEdit ?
        <Header
          leftIcon={icons.backIcon}
          title="Edit Profile"
          onLeftPress={() => navigation.goBack()} />

        :
        <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      }
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={VCardVaccinationStyles.container}>
        {!isEdit && <View>
          <CustomText eh1 text="V-Card" style={VCardVaccinationStyles.mainHeading} />
          <CustomText
            text="This will be your resume and qualifications that helps the employer and companies to know you better"
            regular
            oh5
            style={{ color: colors.grey, width: wp("93%") }}
          />
        </View>}

        <CustomVCard
          firstName={firstName}
          lastName={lastName}
          onPress={true}
          backgroundCardStyle={{ height: wpx(230) }}
          setPic={i => setProfilePic(i)}
          image={profilePic}>
          <View style={{ width: "60%" }}>
            <View style={VCardVaccinationStyles.cardImageTextView}>
              <View style={{ width: "20%" }}>
                <Image source={icons.locationWhite} />
              </View>
              <CustomText style={{ width: wp(60) }} text={location ? location : "Your Location"} eh5 regular textColor={colors.white} />
            </View>
            <View
              style={{
                ...VCardVaccinationStyles.cardImageTextView,
                marginTop: 10,
              }}>
              <View style={{ width: "20%" }}>
                <Image source={icons.gender} />
              </View>
              <CustomText
                text={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : null}
                eh5
                regular
                textColor={colors.white}
              />
            </View>
            <View
              style={{
                ...VCardVaccinationStyles.cardImageTextView,
                marginTop: 10,
              }}>
              <View style={{}}>
                <Image
                  source={
                    vacStatus == 1
                      ? icons.single_dose_white
                      : vacStatus == 2
                        ? icons.double_dose_white
                        : vacStatus == 3
                          ? icons.triple_dose_white
                          : icons.not_vaccinated_white
                  }
                />
              </View>
              <CustomText
                text={
                  vacStatus == 1
                    ? "Single Dose"
                    : vacStatus == 2
                      ? "Double Dose"
                      : vacStatus == 3
                        ? "Triple Dose"
                        : "Not Vaccinated"
                }
                eh5
                regular
                textColor={colors.white}
                style={{ marginLeft: wpx(15) }}
              />
            </View>
          </View>
        </CustomVCard>

        <View style={VCardVaccinationStyles.formView}>
          <CustomTextInput
            maxLength={20}
            placeholder="First Name"
            onChangeText={e => setFirstName(e)}
            value={firstName}
          />
          <CustomTextInput maxLength={20} placeholder="Last Name" onChangeText={e => setLastName(e)} value={lastName} />
          {/* <CustomDropdown
            title={jobseekerDetail?.location ? jobseekerDetail?.location : "Your Location"}
            data={locationList}
            onSelect={item => setLocation(item)}
          /> */}
          <GooglePlacesAutocomplete
            minLength={3}
            listViewDisplayed="auto"
            placeholder={jobseekerDetail?.location ? jobseekerDetail?.location : "Select Location"}
            keepResultsAfterBlur={true}
            onPress={(data, details = null) => {
              setLatLong(details);
              setLocation(data.description);
              // console.log('details.geometry', details);
            }}
            GooglePlacesDetailsQuery={{
              fields: ["formatted_address", "geometry"],
            }}
            textInputProps={{
              placeholderTextColor: "black",
            }}
            query={{
              key: GooglePlacesKey,
              language: "en",
              type: "(cities)",
            }}
            fetchDetails={true}
            debounce={300}
            enablePoweredByContainer={false}
            suppressDefaultStyles={false}
            styles={{
              textInputContainer: {
                borderRadius: wpx(8),
                fontSize: nf(15),
                width: wpx(335),
              },
              textInput: {
                backgroundColor: "#F3F5F9",
                color: "black",
                fontFamily: fonts.regular,
                fontSize: nf(15),
                height: wpx(50),
                borderRadius: wpx(8),
              },
              predefinedPlacesDescription: {
                color: "red",
              },
            }}
          />
        </View>
        <View>
          <CustomText text="Vaccination Status" oh5 medium style={VCardVaccinationStyles.vaccinationStatus} />

          <View style={VCardVaccinationStyles.vaccStatusMainView}>
            <TouchableOpacity onPress={() => setVacStatus(1)} style={VCardVaccinationStyles.doseView}>
              <Image source={vacStatus == 1 ? icons.single_dose_active : icons.single_dose_inactive} />
              <CustomText
                oh5
                text="Single Dose"
                style={
                  vacStatus == 1 ? VCardVaccinationStyles.vaccineTextActive : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVacStatus(2)} style={VCardVaccinationStyles.doseView}>
              <Image source={vacStatus == 2 ? icons.double_dose_active : icons.double_dose_inactive} />
              <CustomText
                oh5
                text="Double Dose"
                style={
                  vacStatus == 2 ? VCardVaccinationStyles.vaccineTextActive : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
          </View>

          <View style={VCardVaccinationStyles.vaccStatusMainView}>
            <TouchableOpacity onPress={() => setVacStatus(3)} style={VCardVaccinationStyles.doseView}>
              <Image source={vacStatus == 3 ? icons.triple_dose_active : icons.triple_dose_inactive} />
              <CustomText
                oh5
                text="Triple Dose"
                style={
                  vacStatus == 3 ? VCardVaccinationStyles.vaccineTextActive : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVacStatus(0)} style={VCardVaccinationStyles.doseView}>
              <Image source={vacStatus == 0 ? icons.not_vaccinated_active : icons.not_vaccinated_inactive} />
              <CustomText
                oh5
                text="Not Vaccinated"
                style={
                  vacStatus == 0 ? VCardVaccinationStyles.vaccineTextActive : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <CustomText text="I am" oh5 medium style={VCardVaccinationStyles.vaccinationStatus} />
          <View
            style={{
              flexDirection: "row",
              width: wp(90),
              justifyContent: "space-around",
              marginTop: wpx(10),
            }}>
            <TouchableOpacity onPress={() => setGender("male")} style={VCardVaccinationStyles.genderImageText}>
              <Image source={gender == "male" ? icons.male_active : icons.male_inactive} />
              <CustomText
                oh5
                text="Male"
                style={
                  gender == "male"
                    ? VCardVaccinationStyles.vaccineTextActive
                    : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("female")}
              style={{
                ...VCardVaccinationStyles.genderImageText,
                width: wp(25),
              }}>
              <Image source={gender == "female" ? icons.female_active : icons.female_inactive} />
              <CustomText
                oh5
                text="Female"
                style={
                  gender == "female"
                    ? VCardVaccinationStyles.vaccineTextActive
                    : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("non-binary")}
              style={{ ...VCardVaccinationStyles.doseView, width: wp(35) }}>
              <Image source={gender == "non-binary" ? icons.non_binary_active : icons.non_binary_inactive} />
              <CustomText
                oh5
                text="Non-binary"
                style={
                  gender == "non-binary"
                    ? VCardVaccinationStyles.vaccineTextActive
                    : VCardVaccinationStyles.vaccineTextInactive
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        loader={loader}
        onPress={() => SubmitVCardVacc()}
        style={{ marginBottom: hpx(10) }}
        nextIcon={true}
        title={isEdit == true ? "Save" : "Next"}
      />
    </SafeAreaView>
  );
};

export default VCardVaccination;
