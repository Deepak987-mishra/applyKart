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
import React, { useState, useCallback } from "react";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { fonts, wpx, hpx, icons, wp, hp, colors } from "../../../../constants/constant";
import Header from "../../../../common/Header/Header";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import { EditCompanyDetailStyle } from "./EditCompanyDetailStyle";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import DocumentPicker, { types } from "react-native-document-picker";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
//import { types } from "../../../../store/action/ActionTypes";
const EditCompanyDetail = ({ navigation }) => {
  const { companyDetails } = useSelector(
    state => ({
      companyDetails: state.homeReducer.companyDetails,
    }),
    shallowEqual,
  );
  const [company, setCompany] = useState(companyDetails?.company ?? null);
  const [owner, setOwner] = useState(companyDetails?.owner ?? null);
  const [location, setLocation] = useState(companyDetails?.location ?? null);
  const [website, setWebsite] = useState(companyDetails?.website ?? null);
  const [abn, setAbn] = useState(companyDetails?.abn ?? null);
  const [acn, setAcn] = useState(companyDetails?.acn ?? null);
  const [fileResponse, setFileResponse] = useState([]);

  const onlyDigitsText = value => {
    return value.replace(/[^\d]/g, "");
  };

  const locationList = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Australia" },
    { id: 3, name: "Us" },
    { id: 4, name: "U.P" },
  ];

  const uploadDocument = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [types.pdf],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={EditCompanyDetailStyle.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        onLeftPress={() => navigation.goBack()}
        title="Edit Company Details"
      
      />
      <ScrollView showsVerticalScrollIndicator={false} style={EditCompanyDetailStyle.container}>
        <View>
          <CustomText medium oh5 text="Company Name" />
          <CustomTextInput
            style={EditCompanyDetailStyle.textInput}
            placeholder="Company Name"
            onChangeText={e => setCompany(e)}
            value={company}
            maxLength={20}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Owner Name" style={EditCompanyDetailStyle.heading2} />
          <CustomTextInput
            style={EditCompanyDetailStyle.textInput1}
            placeholder="Owner Name"
            onChangeText={e => setOwner(e)}
            value={owner}
            maxLength={20}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Location" style={EditCompanyDetailStyle.heading2} />
          <CustomDropdown
            title={companyDetails?.location ?? "title"}
            data={locationList}
            style={EditCompanyDetailStyle.textInput1}
            onSelect={item => setLocation(item)}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Website URL" style={EditCompanyDetailStyle.heading2} />
          <CustomTextInput
            style={EditCompanyDetailStyle.textInput1}
            placeholder="Website URL"
            onChangeText={e => setWebsite(e)}
            value={companyDetails?.website ?? null}
            keyboardType={"email-address"}
          />
        </View>
        <View>
          <CustomText medium oh5 text="Abn Number" style={EditCompanyDetailStyle.heading2} />
          <CustomTextInput
            style={EditCompanyDetailStyle.textInput1}
            placeholder="Abn Number"
            onChangeText={e => setAbn(onlyDigitsText(e))}
            value={companyDetails?.abn ?? null}
            keyboardType={"number-pad"}
            maxLength={10}
          />
        </View>
        {setFileResponse && (
          <View style={EditCompanyDetailStyle.abnDoc}>
            <CustomText text="Abn Document" medium oh5 />
            <TouchableOpacity onPress={() => uploadDocument()} style={EditCompanyDetailStyle.attachAbn}>
              <Image resizeMode="contain" source={icons.attachImage} />
              <View style={EditCompanyDetailStyle.attachImg}>
                <CustomText text="Attach Image" medium oh5 />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <CustomText medium oh5 text="Acn Number" style={EditCompanyDetailStyle.heading2} />
          <CustomTextInput
            style={EditCompanyDetailStyle.textInput1}
            placeholder="Acn Number"
            onChangeText={e => setAcn(onlyDigitsText(e))}
            value={companyDetails?.acn ?? null}
            keyboardType={"number-pad"}
            maxLength={10}
          />
        </View>
        <View style={EditCompanyDetailStyle.abnDoc}>
          <CustomText text="Acn Document" medium oh5 />
          <TouchableOpacity onPress={() => uploadDocument()} style={EditCompanyDetailStyle.attachAbn}>
            <Image resizeMode="contain" source={icons.attachImage} />
            <View style={EditCompanyDetailStyle.attachImg}>
              <CustomText text="Attach Image" medium oh5 />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <CustomText medium oh5 text="Australian Driving License" style={EditCompanyDetailStyle.adlView} />
        </View>

        <View style={EditCompanyDetailStyle.frontmainView}>
          <View style={EditCompanyDetailStyle.frontmainView}>
            <CustomText text="Front" medium oh5 />
          </View>
          <View style={EditCompanyDetailStyle.frontmainView}>
            <TouchableOpacity onPress={() => uploadDocument()} style={EditCompanyDetailStyle.attachAbn}>
              <Image resizeMode="contain" source={icons.attachImage} />
              <View style={EditCompanyDetailStyle.attachImg}>
                <CustomText text="Attach Image" medium oh5 />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={EditCompanyDetailStyle.frontmainView}>
          <View style={EditCompanyDetailStyle.frontmainView}>
            <CustomText text="Back" medium oh5 />
          </View>
          <View style={EditCompanyDetailStyle.frontmainView}>
            <TouchableOpacity onPress={() => uploadDocument()} style={EditCompanyDetailStyle.attachAbn}>
              <Image resizeMode="contain" source={icons.attachImage} />
              <View style={EditCompanyDetailStyle.attachImg}>
                <CustomText text="Attach Image" medium oh5 />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomButton nextIcon={true} title="Save" onPress={() => navigation.navigate("ComapnyDetails")} />
    </SafeAreaView>
  );
};

export default EditCompanyDetail;
