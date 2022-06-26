import { StyleSheet, Text, View, ScrollView, Image, Touchableopacity, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { colors, fonts, hpx, nf, wpx, icons } from "../../../../constants/constant";
import { CustomText } from "../../../../common/CustomText/CustomText";
import Header from "../../../../common/Header/Header";

import { TouchableOpacity } from "react-native-gesture-handler";

import { FAQStyles } from "./FaqStyle";
import { DrawerActions } from "@react-navigation/routers";

const Faq = ({ navigation, route }) => {
  const FaqData = [
    {
      id: 1,
      checked: false,
      que: "What do I do if my Registration Key expired?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 2,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 3,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 4,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 5,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 6,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
    {
      id: 7,
      checked: false,
      que: "What do I do if I forgot my Login name?",
      ans: "Reach out to your community manager, they will generate a new Registration Key or send you an email with a link to register.",
    },
  ];
  const [faqArray, setFaqArray] = useState(FaqData);

  const checkHandler = id => {
    let arr = [...faqArray];
    for (const item in arr) {
      if (arr[item].id === id) {
        if (arr[item].checked != true) {
          arr[item].checked = true;
          let itemChoosed = arr[item];
          setFaqArray([itemChoosed]);
        } else {
          arr[item].checked = false;
        }
      }
    }
    setFaqArray(arr);
  };

  const renderItem = item => {
    return (
      <View>
        <TouchableOpacity onPress={() => checkHandler(item.id)} style={FAQStyles.queContainer}>
          <View style={FAQStyles.listHeading}>
            <CustomText oh5 medium text="What is Lorem ipsumn" />
          </View>
          <View style={FAQStyles.queIcon}>
            <Image source={item.checked && item.id ? icons.dropDown : icons.dropDown} />
          </View>
        </TouchableOpacity>
        {item.checked && (
          <View style={FAQStyles.ansContainer}>
            <CustomText
              eh5
              regular
              textColor={colors.grey}
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              style={FAQStyles.ansText}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={FAQStyles.mainContainer}>
      <Header
        leftIcon={icons.sideMenuIcon}
        rightIcon={icons.bellNotificationIcon1}
        // onRightPress={() => navigation.navigate("EditCompanyDetail")}
        onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="FAQ's"
      />
      <View style={FAQStyles.listContainer}>
        <FlatList
          data={FaqData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Faq;
