import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons, Sa } from "../../../../constants/constant";
import { UploadDocumentStyle } from "./UploadDocumentStyle";
import Header from "../../../../common/Header/Header";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DocumentPicker, { types } from "react-native-document-picker";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { types as actionTypes } from "../../../../store/action/ActionTypes";
import { SinglebuttonModal } from "../../../../common/CustomModal/CustomModal";
import { perPlatformTypes } from "react-native-document-picker/lib/typescript/fileTypes";
import Snackbar from "react-native-snackbar";

const UploadDocument = ({ navigation }) => {
  const dispatch = useDispatch();

  const { jobpostReducer } = useSelector(
    state => ({
      jobpostReducer: state.jobpostReducer,
    }),
    shallowEqual,
  );
  const { authReducer } = useSelector(
    state => ({
      authReducer: state.authReducer,
    }),
    shallowEqual,
  );

  const [rb1, setRb1] = useState(false);
  const [abn, setAbn] = useState(false);
  const [acn, setAcn] = useState(false);
  const [type, setType] = useState(1);
  const [abnFileResponse, setAbnFileResponse] = useState([]);
  const [acnFileResponse, setAcnFileResponse] = useState([]);
  const [acnImage, setAcnImage] = useState(null);
  const [abnImage, setAbnImage] = useState(null);
  const [drivingLicenceFrontImage, setDrivingLicenseFrontImage] = useState(null);
  const [drivingLicenceBackImage, setDrivingLicenseBackImage] = useState(null);
  const [medicareFrontImage, setMedicareFrontImage] = useState(null);
  const [modal, showModal] = useState(false);

  const onlyDigitsText = value => {
    return value.replace(/[^\d]/g, "");
  };
  // const uploadAbnDocument = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       type: [types.pdf],
  //     });
  //     console.log("response is here", response);
  //     setAbnFileResponse(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // const uploadAcnDocument = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       type: [types.pdf],
  //     });
  //     setAcnFileResponse(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const openAcnImage = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 44,
      cropping: true,
    }).then(image => {
      setAcnImage({
        mime: image.mime,

        uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
      });
    });
  };

  const openAbnImage = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 44,
      cropping: true,
    }).then(image => {
      setAbnImage({
        mime: image.mime,

        uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
      });
    });
  };

  // setImage(Platform.OS == 'android' ? image?.path : image?.sourceURL);
  // props.setPic((i) => Platform.OS == 'android' ? image?.path : image?.sourceURL)
  //  console.log("abnUri", abnImage);
  const openLicenceFrontImage = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 44,
      cropping: true,
    }).then(image => {
      setDrivingLicenseFrontImage({
        mime: image.mime,

        uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
      });
    });
  };
  console.log("Driving licence front ===", drivingLicenceFrontImage);
  const openLicenceBackImage = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 44,
      cropping: true,
    }).then(image => {
      setDrivingLicenseBackImage({
        mime: image.mime,

        uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
      });
    });
  };
  const openMedicareFrontImage = () => {
    ImagePicker.openPicker({
      width: 70,
      height: 44,
      cropping: true,
    }).then(image => {
      setMedicareFrontImage({
        mime: image.mime,

        uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
      });
    });
  };

  let abnFile = {
    uri: abnImage ? abnImage?.uri : null,
    type: "image/jpg",
    name: abnImage ? abnImage.uri.substring(abnImage.uri.lastIndexOf("/") + 1) : null,
  };

  let acnFile = {
    uri: acnImage ? acnImage?.uri : null,
    type: "image/jpg",
    name: acnImage ? acnImage.uri.substring(acnImage.uri.lastIndexOf("/") + 1) : null,
  };

  let licenseFront = {
    uri: drivingLicenceFrontImage ? drivingLicenceFrontImage.uri : null,
    type: "image/jpg",
    name: drivingLicenceFrontImage
      ? drivingLicenceFrontImage.uri.substring(drivingLicenceFrontImage.uri.lastIndexOf("/") + 1)
      : null,
  };
  // console.log(
  //   "DrivinglicenceFront",
  //   drivingLicenceBackImage[0]?.uri.substring(drivingLicenceBackImage[0]?.uri.lastIndexOf("/") + 1),
  // );
  let licenseBack = {
    uri: drivingLicenceBackImage ? drivingLicenceBackImage.uri : null,
    type: "image/jpg",
    name: drivingLicenceBackImage
      ? drivingLicenceBackImage?.uri.substring(drivingLicenceBackImage?.uri.lastIndexOf("/") + 1)
      : null,
  };

  let medicareFront = {
    uri: medicareFrontImage ? medicareFrontImage.uri : null,
    type: "image/jpg",
    name: medicareFrontImage ? medicareFrontImage.uri.substring(medicareFrontImage.uri.lastIndexOf("/") + 1) : null,
  };
  const payload = {
    user_id: authReducer?.currentUser?.user_Id,
    company: jobpostReducer?.fillInterviewDetail?.companyName,
    owner: jobpostReducer?.fillInterviewDetail?.jobPoster,
    website: null,
    location: jobpostReducer?.fillJobAddress?.jobLocation,
    abn: abn,
    abn_doc: abnFile?.name,
    acn: acn,
    acn_doc: acnFile?.name,
    Aus_Driving_License_Front: licenseFront?.name,
    Aus_Driving_License_Back: licenseBack?.name,
    Medicare_Front: medicareFront?.name,
    latitude: jobpostReducer?.fillJobAddress?.latitude,
    longitude: jobpostReducer?.fillJobAddress?.longitude,
  };

  const onSubmit = () => {
    if (
      abn &&
      acn &&
      abnImage &&
      acnImage &&
      drivingLicenceFrontImage &&
      drivingLicenceFrontImage &&
      medicareFrontImage
    ) {
      dispatch({
        type: actionTypes.UPLOAD_DOCUMENTS,
        payload: { payload, abnFile, acnFile, licenseFront, licenseBack, medicareFront },
      });
    } else {
      Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <SinglebuttonModal
        visible={modal}
        heading={"Admin Approval Pending"}
        modalText={
          " Enable notification for a job that you have posted and also that your job will be posted once our team has verified your posting!"
        }
        buttonText="Upload Document"
        onModalPress={() => showModal(!modal)}
        //  onButtonPress={() => navigation.navigate("UploadDocument")}
        onButtonPress={() => onSubmit()}
      />
      <Header title="Upload Document" leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(250) }}>
        <View style={{ marginHorizontal: wpx(20) }}>
          <View style={UploadDocumentStyle.radioBtnmainContainer}>
            <View style={UploadDocumentStyle.radioBtnViewWithContent}>
              <TouchableOpacity onPress={() => setType(1)}>
                <Image resizeMode="contain" source={type == 1 ? icons.radio_button_on : icons.radio_button_off} />
              </TouchableOpacity>
              <View style={UploadDocumentStyle.radioBtnContentTextView}>
                <CustomText text="Individual" regular oh5 />
              </View>
            </View>
            <View style={UploadDocumentStyle.radioBtnViewWithContent}>
              <TouchableOpacity onPress={() => setType(2)}>
                <Image resizeMode="contain" source={type == 2 ? icons.radio_button_on : icons.radio_button_off} />
              </TouchableOpacity>
              <View style={UploadDocumentStyle.radioBtnContentTextView}>
                <CustomText text="Agency" regular oh5 />
              </View>
            </View>
          </View>
          <View style={UploadDocumentStyle.textStyle}>
            <CustomText text="ABN Number" medium oh5 />
          </View>
          <View style={UploadDocumentStyle.textInputStyle}>
            <CustomTextInput
              placeholder="ABN Number"
              onChangeText={text => setAbn(onlyDigitsText(text))}
              keyboardType={"number-pad"}
              maxLength={10}
            />
          </View>
          <View style={UploadDocumentStyle.abnView}>
            <CustomText text="ABN Document" medium oh5 />
            {abnImage ? (
              <View style={{ marginHorizontal: wpx(25), backgroundColor: colors.offWhite }}>
                <TouchableOpacity
                  onPress={() => setAbnImage(null)}
                  style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
                  <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
                </TouchableOpacity>
                <Image
                  source={abnImage ? abnImage : icons.placeholderUserImage}
                  style={{ height: hpx(60), width: wpx(44) }}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => openAbnImage()} style={UploadDocumentStyle.attachAbnView}>
                <Image resizeMode="contain" source={icons.attachImage} />
                <View style={UploadDocumentStyle.attachImg}>
                  <CustomText text="Attach Image" medium eh6 />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={UploadDocumentStyle.textStyle}>
            <CustomText text="ACN Number" medium oh5 />
          </View>
          <View style={UploadDocumentStyle.textInputStyle}>
            <CustomTextInput
              placeholder="ACN Number"
              onChangeText={text => setAcn(onlyDigitsText(text))}
              keyboardType={"number-pad"}
              maxLength={10}
            />
          </View>
          <View style={UploadDocumentStyle.abnView}>
            <CustomText text="ACN Document" medium oh5 />
            {acnImage ? (
              <View style={{ marginHorizontal: wpx(25), backgroundColor: colors.offWhite }}>
                <TouchableOpacity
                  onPress={() => setAcnImage(null)}
                  style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
                  <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
                </TouchableOpacity>
                <Image
                  source={acnImage ? acnImage : icons.placeholderUserImage}
                  style={{ height: hpx(60), width: wpx(44) }}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => openAcnImage()} style={UploadDocumentStyle.attachAbnView}>
                <Image resizeMode="contain" source={icons.attachImage} />
                <View style={UploadDocumentStyle.attachImg}>
                  <CustomText text="Attach Image" medium eh6 />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              height: 1,
              width: wpx(335),
              alignSelf: "center",
              backgroundColor: "#0000001A",
              marginVertical: wpx(15),
            }}
          />
          <View style={UploadDocumentStyle.adlView}>
            <CustomText text="Australian Driving License" medium oh5 />
          </View>
          <View style={UploadDocumentStyle.frontmainView}>
            <View style={UploadDocumentStyle.frontmainView}>
              <CustomText text="Front" medium oh5 />
            </View>

            {drivingLicenceFrontImage ? (
              <View style={{ marginHorizontal: wpx(25), backgroundColor: colors.offWhite }}>
                <TouchableOpacity
                  onPress={() => setDrivingLicenseFrontImage(null)}
                  style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
                  <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
                </TouchableOpacity>
                <Image
                  source={drivingLicenceFrontImage ? drivingLicenceFrontImage : icons.cadidateIcon}
                  style={{ height: hpx(60), width: wpx(44) }}
                />
              </View>
            ) : (
              <View style={UploadDocumentStyle.frontmainView}>
                <TouchableOpacity onPress={() => openLicenceFrontImage()} style={UploadDocumentStyle.attachAbnView}>
                  <Image resizeMode="contain" source={icons.attachImage} />
                  <View style={UploadDocumentStyle.attachImg}>
                    <CustomText text="Attach Image" medium eh6 />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={UploadDocumentStyle.backMainView}>
            <View style={UploadDocumentStyle.backMainView}>
              <CustomText text="Back" medium oh5 />
            </View>

            {drivingLicenceBackImage ? (
              <View style={{ marginHorizontal: wpx(25), backgroundColor: colors.offWhite }}>
                <TouchableOpacity
                  onPress={() => setDrivingLicenseBackImage(null)}
                  style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
                  <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
                </TouchableOpacity>
                <Image
                  source={drivingLicenceBackImage ? drivingLicenceBackImage : icons.cadidateIcon}
                  style={{ height: hpx(60), width: wpx(44) }}
                />
              </View>
            ) : (
              <View style={UploadDocumentStyle.backMainView}>
                <TouchableOpacity onPress={() => openLicenceBackImage()} style={UploadDocumentStyle.attachAbnView}>
                  <Image resizeMode="contain" source={icons.attachImage} />
                  <View style={UploadDocumentStyle.attachImg}>
                    <CustomText text="Attach Image" medium eh6 />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={UploadDocumentStyle.adlView}>
            <CustomText text="Mediacare Card" medium oh5 />
          </View>
          <View style={UploadDocumentStyle.frontmainView}>
            <View style={UploadDocumentStyle.frontmainView}>
              <CustomText text="Front" medium oh5 />
            </View>
            {medicareFrontImage ? (
              <View style={{ marginHorizontal: wpx(25), backgroundColor: colors.white }}>
                <TouchableOpacity
                  onPress={() => setMedicareFrontImage(null)}
                  style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
                  <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
                </TouchableOpacity>
                <Image
                  source={medicareFrontImage ? medicareFrontImage : icons.cadidateIcon}
                  style={{ height: hpx(60), width: wpx(44) }}
                />
              </View>
            ) : (
              <View style={UploadDocumentStyle.frontmainView}>
                <TouchableOpacity onPress={() => openMedicareFrontImage()} style={UploadDocumentStyle.attachAbnView}>
                  <Image resizeMode="contain" source={icons.attachImage} />
                  <View style={UploadDocumentStyle.attachImg}>
                    <CustomText text="Attach Image" medium eh6 />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <CustomButton
        //  isEnabled={rb1}
        title="Submit"
        nextIcon={true}
        onPress={() => showModal(!modal)}

        // onPress={() => onSubmit()}
      />
    </SafeAreaView>
  );
};

export default UploadDocument;
