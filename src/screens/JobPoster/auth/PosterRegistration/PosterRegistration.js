import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, SafeAreaView } from "react-native";
import {
  icons,
  colors,
  wpx,
  hpx,
  firstnameRegex,
  lastnameRegex,
  emailRegex,
  passwordRegex,
  mobileRegex,
  nf,
  fonts,
} from "../../../../constants/constant";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { PosterRegisterationStyles } from "./PosterRegisterationStyles";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";

const dummyData = [
  { id: 1, name: "Peter" },
  { id: 2, name: "Paul" },
  { id: 3, name: "Andrew" },
  { id: 4, name: "Matthew" },
  { id: 5, name: "Adam" },
];

const PosterRegistration = ({ route, navigation }, props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState("");
  //const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState("");
  //const [lastnameError, setLastNameError] = useState('');
  const [emailId, setEmailId] = useState("");
  const [validEmail, setValidEmail] = useState("");
  //const [emailIdError, setEmailIdError] = useState(false);

  const [countryCode, setCountryCode] = useState("91");
  const [mobileNo, setMobileNo] = useState("");
  const [validMobile, setValidMobile] = useState("");
  //const [mobileError, setMobileError] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  //const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [selectedDummyData, setSelectedDummyData] = useState();
  const [profileImage, setProfileImage] = useState(null);

  const [firstNameError, setFirstNameError] = useState(false);

  const { loader } = useSelector(
    state => ({
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (firstName) {
      if (firstnameRegex.test(firstName)) {
        setValidFirstName(true);
      } else {
        setValidFirstName(false);
      }
    } else {
      setValidFirstName(false);
    }

    if (lastName) {
      if (lastnameRegex.test(lastName)) {
        setValidLastName(true);
      } else {
        setValidLastName(false);
      }
    } else {
      setValidLastName(false);
    }

    if (emailId) {
      if (emailRegex.test(emailId.trim().toLowerCase())) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    } else {
      setValidEmail(false);
    }
    if (mobileNo) {
      if (mobileRegex.test(mobileNo)) {
        setValidMobile(true);
      } else {
        setValidMobile(false);
      }
    } else {
      setValidMobile(false);
    }

    if (password) {
      if (passwordRegex.test(password)) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    } else {
      setValidPassword(false);
    }
  }, [firstName, lastName, emailId, mobileNo, password]);

  // validation for email and password

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileImage(image?.path);
    });
  };

  const onSubmit = () => {
    dispatch({
      type: types.TOGGLE_APP_LOADER,
      payload: false,
    });
    dispatch({
      type: types.POSTER_SIGN_UP,
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: emailId,
        phone_no: `${countryCode}${mobileNo}`,
        password: password,
        user_type_id: 3,
      },
    });
  };
  return (
    <SafeAreaView style={PosterRegisterationStyles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hpx(100),paddingHorizontal:wpx(15) }}>
        <View style={PosterRegisterationStyles.registerAccountView}>
          <CustomText text="Register Account" eh1 semiBold />
        </View>
        <View style={PosterRegisterationStyles.detailView}>
          <CustomText
            text="Please fill your detail and Find a job & grow your career"
            regular
            oh5
            style={{ color: colors.grey }}
          />
        </View>
        <View
          style={{
            marginTop: hpx(20),
            alignSelf: "center",
          }}>
          <View>
            <Image
              source={profileImage ? { uri: profileImage } : icons.profilepic}
              style={{ height: wpx(100), width: wpx(100), borderRadius: wpx(50) }}
            />
            <TouchableOpacity onPress={() => openGallery()}>
              <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                <Image source={icons.camera} style={{ height: wpx(30), width: wpx(30) }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={PosterRegisterationStyles.textInputView}>
          <CustomTextInput
            placeholder="First Name"
            onChangeText={text => setFirstName(text)}
            errorMessage={firstName && !validFirstName ? "Invalid First Name" : null}
          />

          <CustomTextInput
            placeholder="Last Name"
            onChangeText={text => setLastName(text)}
            // style={PosterRegisterationStyles.textInput}
            errorMessage={lastName && !validLastName ? "Invalid Last name" : null}
          />

          <CustomTextInput
            placeholder="Email Id"
            onChangeText={text => setEmailId(text)}
            // style={PosterRegisterationStyles.textInput}
            errorMessage={emailId && !validEmail ? "Invalid Email" : null}
          />

          <CustomTextInput
            type="mobile"
            placeholder="Mobile Number"
            onChangeText={text => setMobileNo(text)}
            maxLength={15}
            code={code => setCountryCode(code)}
            // style={PosterRegisterationStyles.textInput}
            errorMessage={mobileNo && !validMobile ? "Invalid Mobile Number" : null}
          />

          <CustomTextInput
            setShowPassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            type="password"
            placeholder="Password"
            maxLength={20}
            value={password}
            onChangeText={text => setPassword(text)}
            //  style={PosterRegisterationStyles.textInput}
            errorMessage={password && !validPassword ? "Password should be Alphanumeric and of 8 characters" : null}
          />
        </View>
        <View style={PosterRegisterationStyles.termsAndCondMainView}>
          <Text style={PosterRegisterationStyles.continueText}>By Continuing you confirm that you agree with </Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ ...PosterRegisterationStyles.continueText }}>our </Text>
            <TouchableOpacity style={PosterRegisterationStyles.termsAndCondButtonView}>
              <Text style={PosterRegisterationStyles.termsAndCondText}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={PosterRegisterationStyles.continueButton}>
          <CustomButton
            disabled={
              !validFirstName ||
              !validLastName ||
              !validMobile ||
              !validPassword ||
              !validEmail ||
              !emailId ||
              !firstName ||
              !lastName ||
              !password
            }
            title="Continue"
            nextIcon={true}
            onPress={() => onSubmit()}
            loader={loader}
          />
        </View>
        <View style={PosterRegisterationStyles.loginView}>
          <View>
            <CustomText text="Already on Applykart? " regular eh5 />
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("PosterLogin")}>
              <CustomText onPress={() => navigation.navigate("PosterLogin")} text="Login Now" bold eh5 />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PosterRegistration;
