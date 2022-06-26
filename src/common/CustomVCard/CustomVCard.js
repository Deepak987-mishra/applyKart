import { Platform, Text, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CustomText } from "../../common/CustomText/CustomText";
import CustomVCardStyles from "./CustomVCardStyles";
import { colors, hp, wp, hpx, wpx, icons } from "../../constants/constant";
import ImagePicker from "react-native-image-crop-picker";

const CustomVCard = props => {
  const [image, setImage] = useState(props.image);

  // open gallery function
  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: "image/jpeg",
    }).then(image => {
      setImage(Platform.OS == "android" ? image?.path : image?.sourceURL);
      props.setPic(i => (Platform.OS == "android" ? image?.path : image?.sourceURL));
    });
  };

  return (
    <View style={{ ...CustomVCardStyles.mainCardView, ...props.mainCardStyle }}>
      <ImageBackground source={icons.blueCard} style={{ ...CustomVCardStyles.backgroundCard, ...props.backgroundCardStyle }} resizeMode="stretch">
        <ImageBackground style={CustomVCardStyles.foregroundCard} resizeMode="stretch" source={icons.pattern}>
          <View>
            <Image
              source={
                props.vaccine == 1
                  ? icons.single_dose_white
                  : props.vaccine == 2
                    ? icons.double_dose_white
                    : props.vaccine == 3
                      ? icons.triple_dose_white
                      : props.vaccine == 0
                        ? icons.not_vaccinated_white
                        : null
              }
              style={{ position: "absolute", top: wpx(25), left: wpx(25) }}
            />
            <Image
              source={
                props.shift == 1
                  ? icons.night_shift_white
                  : props.shift == 2
                    ? icons.night_shift_white
                    : props.shift == 3
                      ? icons.night_shift_white
                      : props.shift == 4
                        ? icons.night_shift_white
                        : null
              }
              style={{ position: "absolute", top: wpx(25), right: wpx(25) }}
            />
          </View>
          <TouchableOpacity
            onPress={() => (props.onPress ? openGallery(image) : {})}
            style={CustomVCardStyles.profileView}>
            <Image
              style={CustomVCardStyles.userprofileImage}
              source={image ? { uri: props.image } : icons.placeholderUserImage}
            />
          </TouchableOpacity>
          <View style={CustomVCardStyles.nameSplit}>
            <CustomText
              text={props.firstName ? props.firstName + " " : "Your "}
              eh3
              semiBold
              style={CustomVCardStyles.profileName}
            />
            <CustomText
              text={props.lastName ? props.lastName : "Name"}
              eh3
              semiBold
              style={CustomVCardStyles.profileName}
            />
          </View>
          {props.children}
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default CustomVCard;
