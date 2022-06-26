import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Pressable, ImageBackground, Image, StyleSheet } from "react-native";
import { wp, hp, nf, wpx, hpx, fonts, icons, colors } from "../../../constants/constant";
import { OnBoardingStyles } from "./OnBoardingStyles";
import Swiper from "react-native-swiper";

import { CustomButton } from "../../../common/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  return (
    <Swiper
      paginationStyle={OnBoardingStyles.threeDots}
      onIndexChanged={i => {
        // setTimeout(() => {
        setPage(i);
      }}
      index={page}
      loop={false}
      dot={<View style={OnBoardingStyles.inactiveDot} />}
      activeDot={<View style={OnBoardingStyles.activeDot} />}>
      {/* first on boarding screen */}
      <View style={OnBoardingStyles.container}>
        <ImageBackground source={icons.dummyOnboarding} resizeMode="cover" style={OnBoardingStyles.image}>
          <View style={OnBoardingStyles.skipText}>
            <TouchableOpacity onPress={() => navigation.navigate("AccountType")}>
              <Text style={OnBoardingStyles.text}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={OnBoardingStyles.textContainer}>
            <Text style={OnBoardingStyles.contentText}>
              Find Your Dream Jobs With <Text style={OnBoardingStyles.headingText}>Applykart</Text>
            </Text>
          </View>
          <View style={OnBoardingStyles.detailView}>
            <Text style={OnBoardingStyles.detailText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </Text>
          </View>
          <CustomButton
            title="Next"
            onPress={() => setPage(page + 1)}
            nextIcon={true}
            style={OnBoardingStyles.buttonStyle}
            buttonStyle={OnBoardingStyles.buttonView}
          />
        </ImageBackground>
      </View>

      {/* Second on boarding screen */}

      <View style={OnBoardingStyles.container}>
        <ImageBackground source={icons.dummyOnboarding} resizeMode="cover" style={OnBoardingStyles.image}>
          <View style={OnBoardingStyles.skipText}>
            <TouchableOpacity onPress={() => navigation.navigate("AccountType")}>
              <Text style={OnBoardingStyles.text}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={OnBoardingStyles.textContainer}>
            <Text style={OnBoardingStyles.contentText}>
              Find Your Dream Jobs With <Text style={OnBoardingStyles.headingText}>Applykart</Text>
            </Text>
          </View>
          <View style={OnBoardingStyles.detailView}>
            <Text style={OnBoardingStyles.detailText}>
              Nunc dignissim volutpat felis, sed elementum turpis volutpat vitae
            </Text>
          </View>
          <CustomButton
            title="Next"
            onPress={() => setPage(page + 1)}
            nextIcon={true}
            style={OnBoardingStyles.buttonStyle}
            buttonStyle={OnBoardingStyles.buttonView}
          />
        </ImageBackground>
      </View>
      {/* third on boarding screen */}
      <View style={OnBoardingStyles.container}>
        <ImageBackground source={icons.dummyOnboarding} resizeMode="cover" style={OnBoardingStyles.image}>
          <View style={OnBoardingStyles.skipText}>
            <Text style={OnBoardingStyles.text}>{""}</Text>
          </View>

          <View style={OnBoardingStyles.textContainer}>
            <Text style={OnBoardingStyles.contentText}>
              Find Your Dream Jobs With <Text style={OnBoardingStyles.headingText}>Applykart</Text>
            </Text>
          </View>
          <View style={OnBoardingStyles.detailView}>
            <Text style={OnBoardingStyles.detailText}>
              Nunc dignissim volutpat felis, sed elementum turpis volutpat vitae
            </Text>
          </View>
          <CustomButton
            title="Next"
            nextIcon={true}
            style={OnBoardingStyles.buttonStyle}
            buttonStyle={OnBoardingStyles.buttonView}
            onPress={() => navigation.navigate("AccountType")}
          />
        </ImageBackground>
      </View>
    </Swiper>
  );
};
export default OnBoarding;
