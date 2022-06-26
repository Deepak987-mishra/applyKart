import { SafeAreaView, Text, View, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../../constants/constant";

import Header from "../../../../../common/Header/Header";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../../common/CustomButton/CustomButton";

import { SetAvailablityStyles } from "./SetAvailablityStyles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";
import moment from "moment";
import Snackbar from "react-native-snackbar";

const SetAvailablity = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { jobSeekerDetail, loader, loginData } = useSelector(
    state => ({
      jobSeekerDetail: state.jobseekerReducer.jobSeekerDetail,
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
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const [allStart, setAllStart] = useState("");
  const [allEnd, setAllEnd] = useState("");

  const [mon, setMonday] = useState(jobSeekerDetail?.avalablity?.monday ? jobSeekerDetail?.avalablity?.monday.from : false);
  const [tue, setTuesday] = useState(jobSeekerDetail?.avalablity?.tuesday ? jobSeekerDetail?.avalablity?.tuesday.from : false);
  const [wed, setWednesday] = useState(jobSeekerDetail?.avalablity?.wednesday ? jobSeekerDetail?.avalablity?.wednesday.from : false);
  const [thu, setThursday] = useState(jobSeekerDetail?.avalablity?.thursday ? jobSeekerDetail?.avalablity?.thursday.from : false);
  const [fri, setFriday] = useState(jobSeekerDetail?.avalablity?.friday ? jobSeekerDetail?.avalablity?.friday.from : false);
  const [sat, setSaturday] = useState(jobSeekerDetail?.avalablity?.saturday ? jobSeekerDetail?.avalablity?.saturday.from : false);
  const [sun, setSunday] = useState(jobSeekerDetail?.avalablity?.sunday ? jobSeekerDetail?.avalablity?.sunday.from : false);

  // start and end time of availability
  const [monStart, setMonStart] = useState(jobSeekerDetail?.avalablity?.monday ? jobSeekerDetail?.avalablity?.monday.from : '');
  const [monEnd, setMonEnd] = useState(jobSeekerDetail?.avalablity?.monday ? jobSeekerDetail?.avalablity?.monday.to : '');
  const [tueStart, setTueStart] = useState(jobSeekerDetail?.avalablity?.tuesday ? jobSeekerDetail?.avalablity?.tuesday.from : '');
  const [tueEnd, setTueEnd] = useState(jobSeekerDetail?.avalablity?.tuesday ? jobSeekerDetail?.avalablity?.tuesday.to : '');
  const [wedStart, setWedStart] = useState(jobSeekerDetail?.avalablity?.wednesday ? jobSeekerDetail?.avalablity?.wednesday.from : '');
  const [wedEnd, setWedEnd] = useState(jobSeekerDetail?.avalablity?.wednesday ? jobSeekerDetail?.avalablity?.wednesday.to : '');
  const [thuStart, setThuStart] = useState(jobSeekerDetail?.avalablity?.thursday ? jobSeekerDetail?.avalablity.thursday.from : '');
  const [thuEnd, setThuEnd] = useState(jobSeekerDetail?.avalablity?.thursday ? jobSeekerDetail?.avalablity.thursday.to : '');
  const [friStart, setFriStart] = useState(jobSeekerDetail?.avalablity?.friday ? jobSeekerDetail?.avalablity.friday.from : '');
  const [friEnd, setFriEnd] = useState(jobSeekerDetail?.avalablity?.friday ? jobSeekerDetail?.avalablity.friday.to : '');
  const [satStart, setSatStart] = useState(jobSeekerDetail?.avalablity?.saturday ? jobSeekerDetail?.avalablity.saturday.from : '');
  const [satEnd, setSatEnd] = useState(jobSeekerDetail?.avalablity?.saturday ? jobSeekerDetail?.avalablity.saturday.to : '');
  const [sunStart, setSunStart] = useState(jobSeekerDetail?.avalablity?.sunday ? jobSeekerDetail?.avalablity.sunday.from : '');
  const [sunEnd, setSunEnd] = useState(jobSeekerDetail?.avalablity?.sunday ? jobSeekerDetail?.avalablity.sunday.to : '');



  useEffect(() => {
    if (moment(allStart, "h:mma").isBefore(moment(allEnd, "h:mma"))) {
      setMonStart(allStart)
      setTueStart(allStart)
      setWedStart(allStart)
      setThuStart(allStart)
      setFriStart(allStart)
      setSatStart(allStart)
      setSunStart(allStart)

      setMonEnd(allEnd)
      setTueEnd(allEnd)
      setWedEnd(allEnd)
      setThuEnd(allEnd)
      setFriEnd(allEnd)
      setSatEnd(allEnd)
      setSunEnd(allEnd)
    }
  }, [allStart, allEnd])


  const TimeAvailablity = {
    monday: {
      from: mon ? monStart ? monStart : null : null,
      to: mon ? monEnd ? monEnd : null : null,
    },
    tuesday: {
      from: tue ? tueStart ? tueStart : null : null,
      to: tue ? tueEnd ? tueEnd : null : null,
    },
    wednesday: {
      from: wed ? wedStart ? wedStart : null : null,
      to: wed ? wedEnd ? wedEnd : null : null,
    },
    thursday: {
      from: thu ? thuStart ? thuStart : null : null,
      to: thu ? thuEnd ? thuEnd : null : null,
    },
    friday: {
      from: fri ? friStart ? friStart : null : null,
      to: fri ? friEnd ? friEnd : null : null,
    },
    saturday: {
      from: sat ? satStart ? satStart : null : null,
      to: sat ? satEnd ? satEnd : null : null,
    },
    sunday: {
      from: sun ? sunStart ? sunStart : null : null,
      to: sun ? sunEnd ? sunEnd : null : null,
    },
  }

  const vcardSetAvail = {
    User_id: jobSeekerDetail?.user_Id,
    Available_Slot_From: new Date(),
    Availablity: JSON.stringify(TimeAvailablity)
  };

  const submitSetAvailability = () => {
    if (mon || tue || wed || thu || fri || sat || sun || selectAll) {
      if (mon) {
        if (!monStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!monEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(monStart, "h:mma").isAfter(moment(monEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (tue) {
        if (!tueStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!tueEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(tueStart, "h:mma").isAfter(moment(tueEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (wed) {
        if (!wedStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!wedEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(wedStart, "h:mma").isAfter(moment(wedEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (thu) {
        if (!thuStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!thuEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(thuStart, "h:mma").isAfter(moment(thuEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (fri) {
        if (!friStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!friEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(friStart, "h:mma").isAfter(moment(friEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (sat) {
        if (!satStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!satEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        } else if (moment(satStart, "h:mma").isAfter(moment(satEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (sun) {
        if (!sunStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!sunEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        }
        if (moment(sunStart, "h:mma").isAfter(moment(sunEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (selectAll) {
        if (!allStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!allEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        }
        if (moment(allStart, "h:mma").isAfter(moment(allEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
    } else {
      Snackbar.show({
        text: "Please enter atleast one day availabilty",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
      return
    }
    dispatch({
      type: types.POST_SEEKER_JOB_AVAILABILITY,
      payload: vcardSetAvail,
    });
  };

  return (
    <SafeAreaView style={SetAvailablityStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={SetAvailablityStyles.container}>
        <CustomText text="Set Availability" style={SetAvailablityStyles.mainHeading} />
        <CustomText text="Please add your Availability here." regular oh5 textColor={colors.grey} />

        <View>
          <View style={SetAvailablityStyles.selectAllContainer}>
            <Pressable onPress={() => setSelectAll(!selectAll)}>
              <Image
                source={selectAll ? icons.selectedCheckBox : icons.checkBox}
                style={SetAvailablityStyles.selectAllIcon}
              />
            </Pressable>

            <CustomText text="Select All" regular oh5 />
          </View>
          {selectAll ? (
            <View style={SetAvailablityStyles.dayContainer}>
              <CustomText text="Monday to Sunday" medium oh5 />
              <View style={SetAvailablityStyles.timeContainer}>
                <CustomTextInput value={allStart} setTime={t => setAllStart(t)} type="time" placeholder="From" />
                <CustomTextInput value={allEnd} setTime={t => setAllEnd(t)} type="time" placeholder="To" />
              </View>
            </View>
          ) : (
            <View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setMonday(!mon)}>
                    <Image
                      source={mon ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Monday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={monStart} setTime={t => setMonStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={monEnd} setTime={t => setMonEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setTuesday(!tue)}>
                    <Image
                      source={tue ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Tuesday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={tueStart} setTime={t => setTueStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={tueEnd} setTime={t => setTueEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setWednesday(!wed)}>
                    <Image
                      source={wed ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Wednesday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={wedStart} setTime={t => setWedStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={wedEnd} setTime={t => setWedEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setThursday(!thu)}>
                    <Image
                      source={thu ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Thursday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={thuStart} setTime={t => setThuStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={thuEnd} setTime={t => setThuEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setFriday(!fri)}>
                    <Image
                      source={fri ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Friday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={friStart} setTime={t => setFriStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={friEnd} setTime={t => setFriEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setSaturday(!sat)}>
                    <Image
                      source={sat ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Saturday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={satStart} setTime={t => setSatStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={satEnd} setTime={t => setSatEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
              <View style={SetAvailablityStyles.dayContainer}>
                <View style={SetAvailablityStyles.checkBoxView}>
                  <Pressable onPress={() => setSunday(!sun)}>
                    <Image
                      source={sun ? icons.selectedCheckBox : icons.checkBox}
                      style={SetAvailablityStyles.dayIcon}
                    />
                  </Pressable>
                  <CustomText text="Sunday" medium oh5 />
                </View>
                <View style={SetAvailablityStyles.timeContainer}>
                  <CustomTextInput value={sunStart} setTime={t => setSunStart(t)} type="time" placeholder="From" />
                  <CustomTextInput value={sunEnd} setTime={t => setSunEnd(t)} type="time" placeholder="To" />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <CustomButton
        onPress={() => submitSetAvailability()}
        title={"Next"}
        nextIcon
        style={{ marginBottom: hpx(10) }}
        loader={loader}
      />
    </SafeAreaView>
  );
};

export default SetAvailablity;
