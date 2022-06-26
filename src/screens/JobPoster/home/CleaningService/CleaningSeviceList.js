import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../common/Header/Header'
import { hpx, icons, wpx, colors, wp, hp } from '../../../../constants/constant'
import CustomTextInput from '../../../../common/CustomTextInput/CustomTextInput'
import { CustomText } from '../../../../common/CustomText/CustomText'
import { SeekerNearJobsStyles } from './SeekerNearJobsStyles'
import Share from "react-native-share";
import CustomBottomModal from '../../../../common/CustomBottomModal/CustomBottomModal'
import { BottomModal } from '../../../../common/BottomModal/BottomModal'
import { CustomButton } from '../../../../common/CustomButton/CustomButton'
import { shallowEqual, useSelector } from 'react-redux'


const CleaningServiceList = ({ navigation }) => {

    return (
        <SafeAreaView style={SeekerNearJobsStyles.mainContainer}>
             
        </SafeAreaView>
    )
}

export default CleaningServiceList
