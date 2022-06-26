import React from "react";

import { Modal, StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { CustomButton, WhiteCustomButton } from "../CustomButton/CustomButton";
import { CustomText } from "../../common/CustomText/CustomText";
import CustomModalStyles from "./CustomModalStyles";
import { useSelector, shallowEqual } from "react-redux";
import { colors, fonts, nf, wpx } from "../../constants/constant";

const SinglebuttonModal = ({
  visible,
  onShow = () => {},
  onDismiss = () => {},
  onBackDropPress = () => {},
  onModalPress = () => {},
  onPress,
  heading,
  modalText,
  buttonText,
  onButtonPress = () => {},
}) => {
  const { loader } = useSelector(
    state => ({
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        close();
      }}
      animationType="fade"
      transparent={true}
      onShow={onShow}
      onDismiss={onDismiss}>
      <TouchableWithoutFeedback onPress={onModalPress}>
        <View style={CustomModalStyles.modalContainer}>
          <View style={CustomModalStyles.modal}>
            <CustomText text={heading} eh2 semiBold style={CustomModalStyles.heading} />
            <CustomText text={modalText} oh5 regular style={CustomModalStyles.text} />

            <CustomButton
              title={buttonText}
              loader={loader}
              onPress={onButtonPress}
              buttonTextStyle={{ fontFamily: fonts.medium, fontSize: nf(16) }}
              buttonStyle={{ width: wpx(200) }}
              style={CustomModalStyles.singleButton}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const DoubleButtonModal = ({
  visible,
  onShow = () => {},
  onDismiss = () => {},
  heading,
  modalText,
  leftButtonText,
  rightButtonText,
  onLeftClick = () => {},
  onRightClick = () => {},
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onShow={onShow} onDismiss={onDismiss}  statusBarTranslucent={true}>
      <View style={CustomModalStyles.modalContainer}>
        <View style={CustomModalStyles.modal}>
          <CustomText text={heading} eh2 semiBold style={CustomModalStyles.heading} />
          <CustomText text={modalText} oh5 regular textColor="#6F6F6F" style={CustomModalStyles.text} />
          <View style={CustomModalStyles.doubleRowButton}>
            <WhiteCustomButton
              title={leftButtonText}
              buttonStyle={{ width: wpx(140) }}
              onPress={onLeftClick}
              buttonTextStyle={{ fontSize: nf(14), fontFamily: fonts.medium }}
            />
            <CustomButton
              title={rightButtonText}
              buttonStyle={{ width: wpx(140) }}
              onPress={onRightClick}
              style={{ marginLeft: wpx(10) }}
              buttonTextStyle={{ fontSize: nf(14), fontFamily: fonts.medium }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export { SinglebuttonModal, DoubleButtonModal };
