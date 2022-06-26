import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import CustomBottomModalStyles from './CustomBottomModalStyles'

const CustomBottomModal = (props) => {
    return (
        <View style={CustomBottomModalStyles.mainView}>
            <Modal
                visible={props.visible}
                animationType='slide'
                onRequestClose={() => props.setVisible(!visible)}
                style={CustomBottomModalStyles.modalView}
            >
                <Text>Hii</Text>
                {props.children}
            </Modal>
        </View>
    )
}

export default CustomBottomModal

const styles = StyleSheet.create({})