import { StyleSheet, Text, View, Modal,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import ThreeDotModalStyles from './ThreeDotModalStyle';
import { CustomText } from '../CustomText/CustomText';


const ThreeDotModal= ({
    visible,
    onShow = () => { },
    onDismiss = () => { },
    heading,
    modalText,
    modalText1,
    leftButtonText,
    rightButtonText,
    children,
    onLeftClick = () => { },
    onRightClick = () => { },
    onModalPress
  }) => {
    return (
        <Modal
        visible={visible}
        animationType="fade"
        onShow={onShow}
        transparent={true}
        onDismiss={onDismiss}
        statusBarTranslucent={true}
    >
         <TouchableWithoutFeedback onPress={onModalPress}>
        <View style={{ ...ThreeDotModalStyles.modalContainer}}>
            <View style={{ ...ThreeDotModalStyles.modalView, }}>
                {children}
                <CustomText text="Inactive" eh5 regular style={ThreeDotModalStyles.text1}/>
                <View style={ThreeDotModalStyles.line}></View>
                <CustomText text="Remove" regular eh5 style={ThreeDotModalStyles.text1}/>
                <View style={ThreeDotModalStyles.line}></View>
            </View>  
        </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
}
export default ThreeDotModal

