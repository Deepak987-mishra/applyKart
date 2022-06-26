import { TouchableOpacity, Image, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons, GooglePlacesKey } from "../../../../constants/constant";
import { JobAddressStyles } from "./JobAddressStyles";
import Header from "../../../../common/Header/Header";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";

import { types } from "../../../../store/action/ActionTypes";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Snackbar from "react-native-snackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const JobAddress = ({ navigation, route }) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();
  const [joblocation, setLocation] = useState(item?.location ?? null);
  const [suburb, setSuburb] = useState(item?.suburb ?? null);
  const [city, setCity] = useState(item?.city ? item?.city : null);
  const [selectLocation, setSelectedLocation] = useState(item?.interview_address ? item?.interview_address : null);
  const [isOnline, setIsOnline] = useState(false);
  const [latitude, setLatitude] = useState(item?.latitude ?? "");
  const [longitude, setLongitude] = useState(item?.longitude ?? "");

  const { jobDetail } = useSelector(
    state => ({
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
    }),
    shallowEqual,
  );

  const nextButton = () => {
    let body = {
      jobLocation: joblocation,
      jobSuburb: suburb,
      jobCity: city,

      latitude: latitude,
      longitude: longitude,
      selectLocation: selectLocation,
    };

    if (joblocation && suburb && city && selectLocation) {
      dispatch({
        type: types.FILL_JOB_ADDRESS,
        payload: body,
      });
      navigation.navigate("Availability", {
        editable: editable,
        item: editable ? jobDetail : null,
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  const setLatLong = data => {
    // setLocation('')
    setLatitude(data.geometry.location.lat);
    setLongitude(data.geometry.location.lng);
  };
  //console.log("LAT", latitude, "long", longitude, "location", selectedDummyData);

  return (
    <SafeAreaView style={JobAddressStyles.container}>
      <Header
        title={editable ? "Edit Job Address" : "Job Address"}
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        // Doesn't work on RN 0.56 for either Android or iOS
        keyboardShouldPersistTaps="handled"
        extraHeight={200}
        // Works on iOS but not Android in RN 0.56
        extraScrollHeight={200}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: hpx(20), marginHorizontal: wpx(20) }}>
          <CustomText text="Job Address" medium oh5 style={{ marginBottom: wpx(20) }} />

          <CustomTextInput placeholder="Location" onChangeText={text => setLocation(text)} value={joblocation} />
          <CustomTextInput placeholder="Add Suburb" onChangeText={text => setSuburb(text)} value={suburb} />
          <CustomTextInput placeholder="Add City" onChangeText={text => setCity(text)} value={city} />

          {/* <CustomDropdown
            title={item?.location ?? "Select Location "}
            data={dummyData}
            onSelect={item => setSelectedDummyData(item)}
          /> */}
          <GooglePlacesAutocomplete
            minLength={3}
            listViewDisplayed="auto"
            placeholder={selectLocation ? selectLocation : "Select Location"}
            onPress={(data, details = null) => {
              setLatLong(details);
              setSelectedLocation(data.description);
              console.log("details.geometry", item.interview_address);
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
              type: "establishment",
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
          <CustomText text="Interview" medium oh5 style={{ marginTop: wpx(10) }} />
          <View>
            <TouchableOpacity
              onPress={() => setIsOnline(!isOnline)}
              style={{ flexDirection: "row", marginVertical: wpx(10), marginTop: wpx(15) }}>
              <Image source={isOnline ? icons.radio_button_off : icons.radio_button_on} />
              <CustomText style={{ marginLeft: wpx(5) }} text="Same as Job Address" medium oh5 />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsOnline(!isOnline)}
              style={{ flexDirection: "row", marginBottom: wpx(10) }}>
              <Image source={isOnline ? icons.radio_button_on : icons.radio_button_off} />
              <CustomText style={{ marginLeft: wpx(5) }} text="Online" medium oh5 />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title={editable ? "Save & Next" : "Next"}
        style={{ marginBottom: wpx(30) }}
        nextIcon={"true"}
        onPress={() => nextButton()}
      />
    </SafeAreaView>
  );
};

export default JobAddress;
