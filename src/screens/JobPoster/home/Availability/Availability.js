import { StyleSheet, Text, View, ScrollView, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../constants/constant";

import Header from "../../../../common/Header/Header";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";

import { types } from "../../../../store/action/ActionTypes";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { AvailabilityStyles } from "./AvailabilityStyles";
import Snackbar from "react-native-snackbar";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

const Availability = ({ navigation, route }) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [allDaysStart, setAllDaysStart] = useState("");
  const [allDaysEnd, setAllDaysEnd] = useState("");
  const [monday, setMonday] = useState(item?.availablity?.monday?.from != null ? true : false);
  const [tuesday, setTuesday] = useState(item?.availablity?.tuesday?.from != null ? true : false);
  const [wednesday, setWednesday] = useState(item?.availablity?.wednesday?.from != null ? true : false);
  const [thursday, setThursday] = useState(item?.availablity?.thursday?.from != null ? true : false);
  const [friday, setFriday] = useState(item?.availablity?.friday?.from != null ? true : false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  // start and end time of availability
  // const [allDaysStart, setAllDaysStart] = useState("");
  // const [allDaysEnd, setAllDaysEnd] = useState("");
  const [monStart, setMonStart] = useState(item?.availablity?.monday?.from ?? "");
  const [monEnd, setMonEnd] = useState(item?.availablity?.monday?.to ?? "");
  const [tueStart, setTueStart] = useState(item?.availablity?.tuesday?.from ?? "");
  const [tueEnd, setTueEnd] = useState(item?.availablity?.tuesday?.to ?? "");
  const [wedStart, setWedStart] = useState(item?.availablity?.wednesday?.from ?? "");
  const [wedEnd, setWedEnd] = useState(item?.availablity?.wednesday?.to ?? "");
  const [thuStart, setThuStart] = useState(item?.availablity?.thursday?.from ?? "");
  const [thuEnd, setThuEnd] = useState(item?.availablity?.thursday?.to ?? "");
  const [friStart, setFriStart] = useState(item?.availablity?.friday?.from ?? "");
  const [friEnd, setFriEnd] = useState(item?.availablity?.friday?.to ?? "");
  const [satStart, setSatStart] = useState(item?.availablity?.saturday?.from ?? "");
  const [satEnd, setSatEnd] = useState(item?.availablity?.saturday?.to ?? "");
  const [sunStart, setSunStart] = useState(item?.availablity?.sunday?.from ?? "");
  const [sunEnd, setSunEnd] = useState(item?.availablity?.sunday?.to ?? "");

  console.log("monday", typeof item?.availablity?.monday?.from);
  console.log("mondayEnd", item?.availablity?.monday?.to);

  // useEffect(() => {
  //   setMonStart(allDaysStart);
  //   setMonEnd(allDaysEnd);
  //   setTueStart(allDaysStart);
  //   setTueEnd(allDaysEnd);
  //   setWedStart(allDaysStart);
  //   setWedEnd(allDaysEnd);
  //   setThuStart(allDaysStart);
  //   setThuEnd(allDaysEnd);
  //   setFriStart(allDaysStart);
  //   setFriEnd(allDaysEnd);
  //   setSatStart(allDaysStart);
  //   setSatEnd(allDaysEnd);
  //   setSunStart(allDaysStart);
  //   setSunEnd(allDaysEnd);
  // }, [allDaysStart, allDaysEnd]);

  useEffect(() => {
    if (moment(allDaysStart, "h:mma").isBefore(moment(allDaysEnd, "h:mma"))) {
      setMonStart(allDaysStart);
      setTueStart(allDaysStart);
      setWedStart(allDaysStart);
      setThuStart(allDaysStart);
      setFriStart(allDaysStart);
      setSatStart(allDaysStart);
      setSunStart(allDaysStart);

      setMonEnd(allDaysEnd);
      setTueEnd(allDaysEnd);
      setWedEnd(allDaysEnd);
      setThuEnd(allDaysEnd);
      setFriEnd(allDaysEnd);
      setSatEnd(allDaysEnd);
      setSunEnd(allDaysEnd);
    }
  }, [allDaysStart, allDaysEnd]);

  const nextButton = () => {
    let body = {
      Availablity: {
        monday: {
          from: monStart ? monStart : null,
          to: monEnd ? monEnd : null,
        },
        tuesday: {
          from: tueStart ? tueStart : null,
          to: tueEnd ? tueEnd : null,
        },
        wednesday: {
          from: wedStart ? wedStart : null,
          to: wedEnd ? wedEnd : null,
        },
        thursday: {
          from: thuStart ? thuStart : null,
          to: thuEnd ? thuEnd : null,
        },
        friday: {
          from: friStart ? friStart : null,
          to: friEnd ? friEnd : null,
        },
        saturday: {
          from: satStart ? satStart : null,
          to: satEnd ? satEnd : null,
        },
        sunday: {
          from: sunStart ? sunStart : null,
          to: sunEnd ? sunEnd : null,
        },
      },
    };

    if (monday || tuesday || wednesday || thursday || friday || saturday || sunday || selectAll) {
      if (monday) {
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
            text: "Please enter correct time for Monday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (tuesday) {
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
            text: "Please enter correct time for Tuesday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (wednesday) {
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
            text: "Please enter correct time for Wednesday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (thursday) {
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
            text: "Please enter correct time for Thursday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (friday) {
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
            text: "Please enter correct time for Friday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (saturday) {
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
            text: "Please enter correct time for Saturday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (sunday) {
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
            text: "Please enter correct time for Sunday",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      if (selectAll) {
        if (!allDaysStart) {
          Snackbar.show({
            text: "Please select start time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        } else if (!allDaysEnd) {
          Snackbar.show({ text: "Please select end time", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
          return;
        }
        if (moment(allDaysStart, "h:mma").isAfter(moment(allDaysEnd, "h:mma"))) {
          Snackbar.show({
            text: "Please enter correct time",
            backgroundColor: "#1CB5E0",
            duration: Snackbar.LENGTH_LONG,
          });
          return;
        }
      }
      dispatch({
        type: types.FILL_AVAIALABILITY,
        payload: body,
      });
      navigation.navigate("Acknowledgement", {
        editable: editable,
        item: item,
      });
    } else {
      Snackbar.show({
        text: "Please enter atleast one day availabilty",
        backgroundColor: "#1CB5E0",
        duration: Snackbar.LENGTH_LONG,
      });
    }

    // if (selectAll || monday || tuesday || wednesday || thursday || friday || saturday || sunday) {
    //   dispatch({
    //     type: types.FILL_AVAIALABILITY,
    //     payload: body,
    //   });
    //   navigation.navigate("Acknowledgement", {
    //     editable: editable,
    //   });
    // } else {
    //   Snackbar.show({
    //     text: "Please select Availability ",
    //     backgroundColor: "#1CB5E0",
    //     duration: Snackbar.LENGTH_LONG,
    //   });
    // }
  };

  return (
    <SafeAreaView style={AvailabilityStyles.container}>
      <Header
        title={editable ? "Edit Availability" : "Availability"}
        // title={"Availability"}
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        style={AvailabilityStyles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(50) }}>
        <View style={AvailabilityStyles.selectAllContainer}>
          <Pressable onPress={() => setSelectAll(!selectAll)}>
            <Image
              source={selectAll ? icons.selectedCheckBox : icons.checkBox}
              style={AvailabilityStyles.selectAllIcon}
            />
          </Pressable>

          <CustomText text="Select All" regular oh5 />
        </View>

        {selectAll ? (
          <View style={AvailabilityStyles.dayContainer}>
            <CustomText text="Monday to Sunday" regular oh5 />
            <View style={AvailabilityStyles.timeContainer}>
              <CustomTextInput
                value={allDaysStart}
                type="time"
                placeholder="From"
                // onChangeText={text => setAllDaysStart(text)}
                setTime={t => setAllDaysStart(t)}
              />
              <CustomTextInput value={allDaysEnd} type="time" placeholder="To" setTime={t => setAllDaysEnd(t)} />
            </View>
          </View>
        ) : (
          <View>
            <View style={AvailabilityStyles.dayContainer}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setMonday(!monday)}>
                  <Image source={monday ? icons.selectedCheckBox : icons.checkBox} style={AvailabilityStyles.dayIcon} />
                </Pressable>
                <CustomText text="Monday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={monStart} type="time" placeholder="From" setTime={t => setMonStart(t)} />
                <CustomTextInput value={monEnd} type="time" placeholder="To" setTime={t => setMonEnd(t)} />
              </View>
            </View>

            <View style={AvailabilityStyles.dayContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}>
                <Pressable onPress={() => setTuesday(!tuesday)}>
                  <Image
                    source={tuesday ? icons.selectedCheckBox : icons.checkBox}
                    style={AvailabilityStyles.dayIcon}
                  />
                </Pressable>
                <CustomText text="Tuesday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={tueStart} type="time" placeholder="From" setTime={t => setTueStart(t)} />
                <CustomTextInput value={tueEnd} type="time" placeholder="To" setTime={t => setTueEnd(t)} />
              </View>
            </View>
            <View style={AvailabilityStyles.dayContainer}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setWednesday(!wednesday)}>
                  <Image
                    source={wednesday ? icons.selectedCheckBox : icons.checkBox}
                    style={AvailabilityStyles.dayIcon}
                  />
                </Pressable>
                <CustomText text="Wednesday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={wedStart} type="time" placeholder="From" setTime={t => setWedStart(t)} />
                <CustomTextInput value={wedEnd} type="time" placeholder="To" setTime={t => setWedEnd(t)} />
              </View>
            </View>
            <View style={AvailabilityStyles.dayContainer}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setThursday(!thursday)}>
                  <Image
                    source={thursday ? icons.selectedCheckBox : icons.checkBox}
                    style={AvailabilityStyles.dayIcon}
                  />
                </Pressable>
                <CustomText text="Thursday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={thuStart} type="time" placeholder="From" setTime={t => setThuStart(t)} />
                <CustomTextInput value={thuEnd} type="time" placeholder="To" setTime={t => setThuEnd(t)} />
              </View>
            </View>
            <View style={AvailabilityStyles.dayContainer}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setFriday(!friday)}>
                  <Image source={friday ? icons.selectedCheckBox : icons.checkBox} style={AvailabilityStyles.dayIcon} />
                </Pressable>
                <CustomText text="Friday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={friStart} type="time" placeholder="From" setTime={t => setFriStart(t)} />
                <CustomTextInput value={friEnd} type="time" placeholder="To" setTime={t => setFriEnd(t)} />
              </View>
            </View>
            <View style={AvailabilityStyles.dayContainer}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setSaturday(!saturday)}>
                  <Image
                    source={saturday ? icons.selectedCheckBox : icons.checkBox}
                    style={AvailabilityStyles.dayIcon}
                  />
                </Pressable>
                <CustomText text="Saturday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={satStart} type="time" placeholder="From" setTime={t => setSatStart(t)} />
                <CustomTextInput value={satEnd} type="time" placeholder="To" setTime={t => setSatEnd(t)} />
              </View>
            </View>
            <View style={{ marginHorizontal: wpx(20), marginTop: wpx(16) }}>
              <View style={AvailabilityStyles.checkBoxView}>
                <Pressable onPress={() => setSunday(!sunday)}>
                  <Image source={sunday ? icons.selectedCheckBox : icons.checkBox} style={AvailabilityStyles.dayIcon} />
                </Pressable>
                <CustomText text="Sunday" medium oh5 />
              </View>
              <View style={AvailabilityStyles.timeContainer}>
                <CustomTextInput value={sunStart} type="time" placeholder="From" setTime={t => setSunStart(t)} />
                <CustomTextInput value={sunEnd} type="time" placeholder="To" setTime={t => setSunEnd(t)} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <CustomButton
        title={editable ? "Save & next" : "Next"}
        // title={"Save"}
        style={{ marginVertical: wpx(10) }}
        nextIcon
        onPress={() => nextButton()}
      />
    </SafeAreaView>
  );
};
export default Availability;
