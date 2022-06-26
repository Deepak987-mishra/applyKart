import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import BottomModalStyles from "./BottomModalStyles";

const BottomModal = ({
    title,
    visible,
    children,
    onShow,
    onDismiss,
    onCross,
    modalContainerStyle,
    modalViewStyle,
    onModalPress
}) => {
    return (

        <Modal
            visible={visible}
            animationType="fade"
            onShow={onShow}
            transparent={true}
            onDismiss={onDismiss}
            onRequestClose={() => !visible}

        >
            <TouchableWithoutFeedback onPress={onModalPress}>
                <View style={{ ...BottomModalStyles.modalContainer, ...modalContainerStyle }}>
                    <View style={{ ...BottomModalStyles.modalView, ...modalViewStyle }}>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>


    );

}


export { BottomModal };      
