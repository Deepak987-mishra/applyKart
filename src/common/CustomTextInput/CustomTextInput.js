import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
} from "react-native";
import { countryCode } from "../../constants/countryCode";
import moment from "moment";
import { icons, fonts, wpx, hpx, colors, nf, wp } from "../../constants/constant";
import Header from "../Header/Header";
import { HorizontalLine } from "../HorizontalLine/HorizontalLine";

import InputStyles from "./InputStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomText } from "../CustomText/CustomText";

const CustomTextInput = props => {
  const [country, setCountry] = useState("+91");
  const [countryName, setCountryName] = useState("");
  const [filteredData, setFilteredData] = useState(countryCode);
  const [showModal, setShowModal] = useState(false);
  const [isTimeVisible, setTimeVisibile] = useState(false);
  const [time, setTime] = useState();
  const [showTime, setShowTime] = useState();
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [date, setDate] = useState();
  const [showDate, setShowDate] = useState();

  const setCountryCode = item => {
    props.code(item?.dial_code);
    setCountry(item?.dial_code);
    setShowModal(!showModal);
    setCountryName("");
    setFilteredData(countryCode);
  };

  const filterCountryCode = text => {
    setCountryName(text);
    const data = countryCode?.filter(x => x?.name.includes(text) || x?.dial_code.includes(text));
    setFilteredData(data);
  };

  const renderCountryCode = ({ item }) => {
    return (
      <>
        <TouchableOpacity style={InputStyles.renderItemMainView} onPress={() => setCountryCode(item)}>
          <CustomText eh3 bold text={item.dial_code} style={{}} />
          <CustomText eh3 regular text={item.flag} style={{ marginHorizontal: wpx(10) }} />
          <CustomText eh3 regular text={item.name} style={{}} />
        </TouchableOpacity>
        <HorizontalLine />
      </>
    );
  };

  const handleTime = time => {
    let selectedTime = moment(time).format("HH:MM");
    setShowTime(selectedTime);
    setTime(moment(time).format("hh:mm"));
    setTimeVisibile(false);
    props.setTime(moment(time).format("HH:mm"));
  };

  const handleDate = date => {
    let selectedDate = moment(date).format("YYYY-MM-DD");
    setShowDate(selectedDate);
    setDate(selectedDate);
    setIsDateVisible(false);
    props.setDate(() => moment(date).format("YYYY-MM-DD"));
  };

  return props.type == "password" ? (
    <>
      <View style={{ ...InputStyles.textInputViewStyle, ...props.style }}>
        <View
          style={{
            ...InputStyles.textInputViewStyle,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <TextInput
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
            style={InputStyles.textInputStyle}
            secureTextEntry={props.showPassword}
            onSubmitEditing={props.onSubmitEditing}
            placeholderTextColor={colors.grey}
          />
          <TouchableOpacity onPress={() => props.setShowPassword(!props.showPassword)}>
            {props.showPassword ? (
              <Image style={InputStyles.eyeIconStyle} source={icons.eyeInactive} resizeMode={"contain"} />
            ) : (
              <Image style={InputStyles.eyeIconStyle} source={icons.eyeActive} resizeMode={"contain"} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: nf(14), fontFamily: fonts.regular, color: "red" }}>{props.errorMessage}</Text>
    </>
  ) : props.type == "mobile" ? (
    <>
      <Modal visible={showModal}>
        <SafeAreaView style={InputStyles.modalSafeView}>
          <Header leftIcon={icons.backIcon} onLeftPress={() => setShowModal(!showModal)} />
          <CustomTextInput
            placeholder="Enter Country Name/Dial Code"
            onChangeText={e => filterCountryCode(e)}
            value={countryName}
            placeholderTextColor={colors.grey}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={renderCountryCode}
            contentContainerStyle={{ paddingBottom: hpx(50) }}
          />
        </SafeAreaView>
      </Modal>
      <View style={{ ...InputStyles.textInputViewStyle, ...props.style }}>
        <View style={InputStyles.mobileInputMainView}>
          <TouchableOpacity onPress={() => setShowModal(!showModal)} style={InputStyles.countryCodeButtonView}>
            <CustomText text={country} oh5 regular textColor={colors.grey} />
            <Image resizeMode={"contain"} source={icons.dropDown} tintColor={colors.grey} />
          </TouchableOpacity>
          <TextInput
            keyboardType={"phone-pad"}
            placeholder={props.placeholder}
            value={props.value}
            maxLength={props.maxLength}
            onChangeText={text => props.onChangeText(text)}
            style={InputStyles.textInputMobileStyle}
            placeholderTextColor={colors.grey}
          />
        </View>
      </View>
      <Text style={{ fontSize: nf(14), fontFamily: fonts.regular, color: "red" }}>{props.errorMessage}</Text>
    </>
  ) : props.type == "time" ? (
    <>
      <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setTimeVisibile(!isTimeVisible)}>
        <View style={{ ...InputStyles.timeInputViewStyle, ...props.style }}>
          <TextInput
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            editable={false}
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
            style={InputStyles.timeInputStyle}
            placeholderTextColor={colors.grey}
          />
          <Image source={icons.dropDownIcon} style={{ ...InputStyles.eyeActive, alignSelf: "center" }} />
        </View>
      </TouchableOpacity>

      <Text style={{ fontSize: nf(14), fontFamily: fonts.regular, color: "red" }}>{props.errorMessage}</Text>
      {isTimeVisible && (
        <DateTimePickerModal
          isVisible={isTimeVisible}
          themeVariant={"light"}
          mode="time"
          onConfirm={handleTime}
          onCancel={() => setTimeVisibile(false)}
          // minimumDate={moment(time).format("10:00:00a")}
          // maximumDate={moment(time).format("05:00:00p")}
          // date={new Date()}
          is24Hour={true}
          locale="en_GB"
        />
      )}
    </>
  ) : props.type == "date" ? (
    <>
      <View style={{ ...InputStyles.timeInputViewStyle, ...props.style }}>
        <TextInput
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          editable={false}
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
          style={InputStyles.timeInputStyle}
          placeholderTextColor={colors.grey}
        />
        <TouchableOpacity onPress={() => setIsDateVisible(true)}>
          <Image source={icons.calendar} style={InputStyles.eyeActive} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: nf(14), fontFamily: fonts.regular, color: "red" }}>{props.errorMessage}</Text>
      {isDateVisible && (
        <DateTimePickerModal
          isVisible={isDateVisible}
          themeVariant={"light"}
          mode="date"
          onConfirm={handleDate}
          onCancel={() => setIsDateVisible(false)}
        />
      )}
    </>
  ) : props.type == "$" ? (
    <>
      <>
        <View style={{ ...InputStyles.dollarInputViewStyle, ...props.style }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: nf(14),
              color: colors.black,
              paddingLeft: wpx(5),
              paddingTop: hpx(2),
            }}>
            $
          </Text>
          {/* <Image source={icons.search} style={InputStyles.searchIconStyle} /> */}
          <TextInput
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            value={props.value}
            maxLength={props.maxLength}
            onChangeText={text => props.onChangeText(text)}
            style={InputStyles.searchInputStyle}
            placeholderTextColor={colors.grey}
          />
        </View>
      </>
    </>
  ) : props.type == "search" ? (
    <>
      <View style={{ ...InputStyles.searchInputViewStyle, ...props.style }}>
        <Image source={icons.search} style={InputStyles.searchIconStyle} />
        <TextInput
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
          style={InputStyles.searchInputStyle}
          placeholderTextColor={colors.grey}
        />
      </View>
    </>
  ) : (
    <>
      <View style={{ ...InputStyles.textInputViewStyle, ...props.style }}>
        <TextInput
          multiline={props.multiline}
          keyboardType={props.keyboardType}
          editable={props.editable}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
          style={InputStyles.textInputStyle}
          maxLength={props.maxLength}
          placeholderTextColor={colors.grey}
        />
      </View>
      <Text style={{ fontSize: nf(14), fontFamily: fonts.regular, color: "red" }}>{props.errorMessage}</Text>
    </>
  );
};

export default CustomTextInput;
