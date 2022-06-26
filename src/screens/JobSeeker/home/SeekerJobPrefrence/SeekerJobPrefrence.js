import {
  View,
  TextInput,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SeekerJobPrefrenceStyles } from "./SeekerJobPrefrenceStyles";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { fonts, wpx, hpx, icons, wp, hp, colors, GooglePlacesKey, nf } from "../../../../constants/constant";
import Header from "../../../../common/Header/Header";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { categoryList, languageKnown, locationList } from "../../../../mock/dummyDropdownList/dummyDropdownList";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import Snackbar from "react-native-snackbar";
import { dummyJobPreferenceList } from "../../../../mock/JobPreferenceList";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SeekerJobPrefrence = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { jobseekerDetail, loader, typeOfJob, seekerLoginData } = useSelector(
    state => ({
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      seekerLoginData: state.authReducer.seekerLoginData,
      loader: state.globalReducer.loader,
      typeOfJob: state.jobseekerReducer.typeOfJob
        ? state?.jobseekerReducer.typeOfJob.map(x => {
          return { id: x?.job_Type_id, name: x?.job_Type };
        })
        : null,
    }),
    shallowEqual,
  );
  const [jobType, setJobType] = useState(jobseekerDetail?.preffered_job_type ? JSON.parse(jobseekerDetail?.preffered_job_type) : '');
  const [jobPreference, setJobPreference] = useState("");
  const [location, setLocation] = useState(jobseekerDetail?.location);
  const [language, setLanguage] = useState(jobseekerDetail?.language);
  const [multiSliderValue, setMultiSliderValue] = useState(jobseekerDetail?.salary_range ? [Number(jobseekerDetail?.salary_range.split('-')[0].slice(0, -2)), Number(jobseekerDetail?.salary_range.split('-')[1].slice(1, -1))] : [500, 800]);
  const multiSliderValuesChange = values => setMultiSliderValue(values);
  const inputRef = useRef();
  const [skills, setskills] = useState([]);
  const dummyJobPref = dummyJobPreferenceList;
  const [filterJobPref, setFilterJobPref] = useState(dummyJobPref);
  const [dropJobPref, setDropJobPref] = useState(jobseekerDetail?.job_Preference ? JSON.parse(jobseekerDetail?.job_Preference) : []);
  const [seekerLat, setSeekerLat] = useState(jobseekerDetail?.latitude)
  const [seekerLong, setSeekerLong] = useState(jobseekerDetail?.longitude)
  //location
  const [locationArray, setLocationArray] = useState("");

  useEffect(() => {
    dispatch({
      type: types.GET_SEEKER_TYPE_JOB,
    });
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: jobseekerDetail?.user_Id,
    });

  }, []);

  const id = jobseekerDetail?.user_Id;
  const CustomSliderMarkerLeft = () => {
    return <View style={{ height: wpx(20), width: wpx(20), borderRadius: wpx(10), backgroundColor: "#252728" }} />;
  };

  const addElementToArray = item => {
    let arr = [...dropJobPref];
    arr.push(item);
    setDropJobPref(arr);
    setJobPreference('')
  };

  const addLocationToArray = () => {
    let mainArray = [...locationArray];
    mainArray.push(location);
    inputRef.current.clear();
    setLocationArray(mainArray);
  };

  const filterJobPrefFunction = item => {
    if (item.length > 2) {
      setJobPreference(item);
      const data = filterJobPref.filter(x => x?.name?.includes(item));
      setFilterJobPref(data);
    } else {
      setJobPreference(item);
    }
  };

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    setDropJobPref(arr);
    // addElementToArray();
    const data = dropJobPref.filter(function (element) {
      return element !== undefined;
    });
    setDropJobPref(data);
  }

  const addElementAndValidation = item => {
    if (dropJobPref.length <= 3) {
      let arr = [...dropJobPref];
      arr.push(item);
      setDropJobPref(arr);
    } else {
      Snackbar.show({
        text: "Maximum 3 Prefrences you can add",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const vcardJobPref = {
    user_id: id,
    job_type: JSON.stringify(jobType),
    job_preference: JSON.stringify(dropJobPref),
    salary_range: `${multiSliderValue[0]}K - ${multiSliderValue[1]}K`,
    location: JSON.stringify(location),
    language: language,
    latitude: seekerLat,
    longitude: seekerLong
  };

  const submitJobPreference = () => {
    if (jobType && location && dropJobPref && language) {
      dispatch({
        type: types.POST_SEEKER_JOB_PREFERENCE,
        payload: vcardJobPref,
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  const setLatLong = (data) => {
    setSeekerLat(data.geometry.location.lat)
    setSeekerLong(data.geometry.location.lng)
  }

  return (
    <SafeAreaView style={SeekerJobPrefrenceStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={SeekerJobPrefrenceStyles.container}>
        <View>
          <CustomText eh1 text="Job Preference" style={SeekerJobPrefrenceStyles.mainHeading} />
          <CustomText text="Please add your job preference here." regular oh5 textColor={colors.grey} />
        </View>
        <View>
          <CustomText oh5 medium text="Type Of Job" style={SeekerJobPrefrenceStyles.salaryRangeView} />
          <CustomDropdown title={jobType ? jobType : "Select Type"} data={typeOfJob} onSelect={item => setJobType(item)} />
          <CustomText oh5 medium text="Job Preference" style={SeekerJobPrefrenceStyles.salaryRangeView} />
          {/* <CustomDropdown
            title="Select Preference"
            data={dummyJobPreferenceList}
            onSelect={item => setJobPreference(item)}
          /> */}
          <TextInput
            ref={inputRef}
            value={jobPreference}
            placeholder="Enter Job prefrence (Max 3 preference)"
            onChangeText={text => setJobPreference(text)}
            style={SeekerJobPrefrenceStyles.typingTextInput}
            onSubmitEditing={() => addElementToArray(jobPreference)}
          />

          {/* {
            jobPreference.length > 2 ?
              <FlatList
                data={filterJobPref}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => addElementAndValidation(item?.name)}
                    style={SeekerJobPrefrenceStyles.jobPrefrenceTextContainer}>
                    <CustomText regular oh6 text={item?.name} />
                  </TouchableOpacity>
                )}
              />
              : null
          } */}
          {/* <FlatList
            data={dropJobPref}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View style={SeekerJobPrefrenceStyles.jobPrefrenceTextContainer}>
                <CustomText regular oh6 text={item} />
                <TouchableOpacity onPress={() => removeItemOnce(dropJobPref, item)}>
                  <Image source={icons.cross} style={{ marginLeft: wpx(5) }} />
                </TouchableOpacity>
              </View>
            )}
          /> */}
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            {
              dropJobPref.slice(0, 3).map(x => {
                return (
                  <View style={SeekerJobPrefrenceStyles.jobPrefrenceTextContainer}>
                    <CustomText regular oh6 text={x} />
                    <TouchableOpacity onPress={() => removeItemOnce(dropJobPref, x)}>
                      <Image source={icons.cross} style={{ marginLeft: wpx(5) }} />
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CustomText oh5 medium text="Salary Range" style={SeekerJobPrefrenceStyles.salaryRangeView} />
            <CustomText
              oh6
              regular
              text={"$ " + multiSliderValue[0] + "K-$ " + multiSliderValue[1] + "K"}
              style={SeekerJobPrefrenceStyles.salaryRangeView}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <MultiSlider
              trackStyle={{ backgroundColor: "#F6F5FB", height: hpx(5), borderRadius: hpx(8) }}
              selectedStyle={{ backgroundColor: "#252728" }}
              step={50}
              values={[multiSliderValue[0], multiSliderValue[1]]}
              snapped={true}
              customMarker={() => <CustomSliderMarkerLeft />}
              sliderLength={wp(85)}
              onValuesChange={multiSliderValuesChange}
              min={200}
              max={2000}
              allowOverlap={false}
              minMarkerOverlapDistance={100}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CustomText oh6 regular text={`$ 0K`} />
            <CustomText oh6 regular text={`$ 2000K`} />
          </View>
          <CustomText oh5 medium text="Location" style={SeekerJobPrefrenceStyles.salaryRangeView} />
          {/* <CustomDropdown
                        title="Select Location"
                        data={locationList}
                        onSelect={item => setLocation(item)}
                    /> */}
          {/* <TextInput
            ref={inputRef}
            value={location}
            placeholder="Enter Location here"
            onChangeText={item => setLocation(item)}
            style={SeekerJobPrefrenceStyles.typingTextInput}
          // onSubmitEditing={() => addLocationToArray()}
          /> */}
          <GooglePlacesAutocomplete
            keyboardShouldPersistTaps='always'
            listViewDisplayed={false}
            placeholder={location ? location : 'Your Location'}
            onPress={(data, details = null) => {
              setLatLong(details)
              setLocation(data.description)
            }}
            GooglePlacesDetailsQuery={{
              fields: ['formatted_address', 'geometry']
            }}
            query={{
              key: GooglePlacesKey,
              language: 'en',
              type: "(cities)"
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
                color: "#000",
                fontFamily: fonts.regular,
                fontSize: nf(15),
                height: wpx(50),
                borderRadius: wpx(8),
              },
            }}
          />
          {/* <FlatList
            data={locationArray}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={SeekerJobPrefrenceStyles.jobPrefrenceTextContainer}>
                <CustomText regular oh6 text={item} />
              </View>
            )}
          /> */}
          <CustomText oh5 medium text="Languages Known" style={SeekerJobPrefrenceStyles.salaryRangeView} />
          <CustomDropdown title={language ? language : "Select Language"} data={languageKnown} onSelect={item => setLanguage(item)} />
          <View style={{ height: wpx(100) }} />
        </View>
      </ScrollView>
      <CustomButton
        loader={loader}
        onPress={() => submitJobPreference()}
        nextIcon={true}
        title="Next"
        style={{ marginBottom: wpx(10) }}
      />
    </SafeAreaView>
  );
};

export default SeekerJobPrefrence;

const styles = StyleSheet.create({});
