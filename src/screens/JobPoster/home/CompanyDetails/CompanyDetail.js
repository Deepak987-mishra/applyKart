import {
  View,
  Modal,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { fonts, wpx, hpx, icons, wp, hp, colors } from "../../../../constants/constant";
import Header from "../../../../common/Header/Header";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { CompanyDetailStyle } from "./CompanyDetailStyle";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import DocumentPicker, { types } from "react-native-document-picker";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { types as actionTypes } from "../../../../store/action/ActionTypes";

const ComapnyDetails = ({ navigation }) => {
  const dispatch = useDispatch();

  const { companyDetails } = useSelector(
    state => ({
      companyDetails: state.homeReducer.companyDetails,
    }),
    shallowEqual,
  );
  console.log("details", companyDetails.abn_Doc);
  const [company, setComapny] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [abn, setAbn] = useState(companyDetails?.abn ?? "");
  const [acn, setAcn] = useState(companyDetails?.acn ? companyDetails?.acn : "");
  const [abnFileResponse, setAbnFileResponse] = useState([]);
  const [acnFileResponse, setAcnFileResponse] = useState([]);
  const [acnImage, SetAcnImage] = useState(companyDetails?.acn_Doc);
  const [abnImage, SetAbnImage] = useState(companyDetails?.abn_Doc);

  const [frontImage, setFrontImage] = useState(companyDetails?.aus_Driving_License_Front);
  const [backImage, setBackImage] = useState(companyDetails?.aus_Driving_License_Back);

  console.log("company===", companyDetails?.aus_Driving_License_Back);
  console.log("company11===", companyDetails?.acn);

  const onlyDigitsText = value => {
    return value.replace(/[^\d]/g, "");
  };

  const locationList = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Us" },
    { id: 4, name: "U.P" },
  ];

  // const uploadAbnDocument = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       type: [types.pdf],
  //     });
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
  // const openFrontImage = () => {
  //   ImagePicker.openPicker({
  //     width: 70,
  //     height: 44,
  //     cropping: true,
  //   }).then(image => {
  //     setFrontImage({
  //       mime: image.mime,

  //       uri: image?.path,
  //     });
  //   });
  // };

  // const openBackImage = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     setBackImage({
  //       mime: image.mime,

  //       uri: image?.path,
  //     });
  //   });
  // };

  return (
    <SafeAreaView style={CompanyDetailStyle.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        rightIcon={icons.edit}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => alert("Comming Soon")}
        title="Company Details"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hpx(50) }}
        style={CompanyDetailStyle.container}>
        <View>
          <CustomText medium oh5 text="Company Name" />
          <CustomTextInput
            editable={false}
            style={CompanyDetailStyle.textInput}
            placeholder="Company Name"
            onChangeText={e => setComapny(e)}
            value={companyDetails.company ?? null}
            maxLength={20}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Owner Name" style={CompanyDetailStyle.heading2} />
          <CustomTextInput
            editable={false}
            // style={CompanyDetailStyle.textInput1}
            placeholder="Owner Name"
            onChangeText={e => setOwner(e)}
            value={companyDetails.owner ?? null}
            maxLength={20}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Location" style={CompanyDetailStyle.heading2} />
          <CustomDropdown
            title={companyDetails.location ?? "Select Location"}
            data={locationList}
            onSelect={item => setLocation(item)}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Website URL" style={CompanyDetailStyle.heading2} />
          <CustomTextInput
            editable={false}
            // style={CompanyDetailStyle.textInput1}
            placeholder="Website URL"
            onChangeText={e => setWebsite(e)}
            value={companyDetails.website}
            keyboardType={"email-address"}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Abn Number" style={CompanyDetailStyle.heading2} />
          <CustomTextInput
            editable={false}
            placeholder="Abn Number"
            onChangeText={e => setAbn(onlyDigitsText(e))}
            value={abn}
            keyboardType={"number-pad"}
            maxLength={10}
          />
        </View>

        <View style={CompanyDetailStyle.abnDoc}>
          <View>
            <CustomText text="Abn Document" medium oh5 />
          </View>

          <View style={{ marginHorizontal: wpx(25) }}>
            <Image
              source={abnImage ? { uri: abnImage } : icons.placeholderUserImage}
              style={{ height: hpx(60), width: wpx(44) }}
            />
            {/* <Pdf
              source={companyDetails.abn}
              onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            /> */}
          </View>
        </View>

        <View>
          <CustomText medium oh5 text="Acn Number" style={CompanyDetailStyle.heading2} />
          <CustomTextInput
            editable={false}
            placeholder="Acn Number"
            onChangeText={e => setAcn(onlyDigitsText(e))}
            value={acn}
            keyboardType={"number-pad"}
            maxLength={10}
          />
        </View>
        <View style={CompanyDetailStyle.abnDoc}>
          <View>
            <CustomText text="Acn Document" medium oh5 />
          </View>

          <View style={{ marginHorizontal: wpx(25) }}>
            {/* <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: hpx(5) }}>
              <Image source={icons.cross} style={{ height: hpx(13), width: wpx(13), resizeMode: "contain" }} />
            </TouchableOpacity> */}
            <Image
              source={acnImage ? { uri: acnImage } : icons.placeholderUserImage}
              style={{ height: hpx(60), width: wpx(44) }}
            />
            {/* <Image
              source={abnImage ? { uri: abnImage } : icons.placeholderUserImage}
              style={{ height: hpx(60), width: wpx(44) }}
            /> */}
          </View>

          {/* <TouchableOpacity onPress={() => uploadAcnDocument()} style={CompanyDetailStyle.attachAbn}>
            <Image resizeMode="contain" source={icons.attachImage} />
            <View style={CompanyDetailStyle.attachImg}>
              <CustomText text="Attach Image" medium oh5 />
            </View>
          </TouchableOpacity> */}
          {/* )} */}
        </View>
        <View>
          <CustomText medium oh5 text="Australian Driving License" style={CompanyDetailStyle.adlView} />
        </View>

        <View style={CompanyDetailStyle.frontmainView}>
          <View style={CompanyDetailStyle.frontmainView}>
            <CustomText text="Front" medium oh5 />
          </View>

          <View style={CompanyDetailStyle.frontmainView}>
            <View style={{ marginHorizontal: wpx(25) }}>
              <Image
                source={frontImage ? { uri: frontImage } : icons.placeholderUserImage}
                style={{ height: hpx(60), width: wpx(40) }}
              />
            </View>

            {/* )} */}
          </View>
        </View>
        <View style={CompanyDetailStyle.frontmainView}>
          <View style={CompanyDetailStyle.frontmainView}>
            <CustomText text="Back" medium oh5 />
          </View>
          <View style={CompanyDetailStyle.frontmainView}>
            <View style={{ marginHorizontal: wpx(25) }}>
              <Image
                source={backImage ? { uri: backImage } : icons.placeholderUserImage}
                style={{ height: hpx(60), width: wpx(40) }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComapnyDetails;
