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
import { DrawerActions } from '@react-navigation/native'


const SeekerNearJobs = ({ navigation }) => {

    const { getJobListLocation } = useSelector(
        state => ({
            getJobListLocation: state.jobseekerReducer.getJobListLocation,
        }),
        shallowEqual,
    );

    const url = "https://africau.edu/images/default/sample.pdf";
    const title = "Awesome Contents";
    const message =
        "ApplyKart Share Job on Social Media";
    const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";
    const options = Platform.select({
        ios: {
            activityItemSources: [
                {
                    // For sharing url with custom title.
                    placeholderItem: { type: "url", content: url },
                    item: {
                        default: { type: "url", content: url },
                    },
                    subject: {
                        default: title,
                    },
                    linkMetadata: { originalUrl: url, url, title },
                },
                {
                    // For sharing text.
                    placeholderItem: { type: "text", content: message },
                    item: {
                        default: { type: "text", content: message },
                        message: null, // Specify no text to share via Messages app.
                    },
                    linkMetadata: {
                        // For showing app icon on share preview.
                        title: message,
                    },
                },
                {
                    // For using custom icon instead of default text icon at share preview when sharing with message.
                    placeholderItem: {
                        type: "url",
                        content: icon,
                    },
                    item: {
                        default: {
                            type: "text",
                            content: `${message} ${url} ${icon}`,
                        },
                    },
                    linkMetadata: {
                        title: message,
                        icon: icon,
                    },
                },
            ],
        },
        default: {
            title,
            subject: title,
            message: `${message} ${url} ${icon}`,
        },
    });


    const renderNearJobs = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('SeekerJobDetail', { job_id: item?.job_Id })}
                style={{ ...SeekerNearJobsStyles.jobCardMainView, paddingBottom: wpx(20) }}
            >
                <View style={SeekerNearJobsStyles.jobImageTextView}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={icons.googleIcon} />
                        <CustomText eh4 medium text={item?.company} style={{ marginLeft: wpx(10) }} />
                    </View>
                </View>
                <CustomText oh5 semiBold text={item?.job_Title} />
                <View style={SeekerNearJobsStyles.jobImageTextView}>
                    <CustomText eh5 regular text={'$' + item?.salary + 'K - ' + '$' + item?.max_Salary + 'K'} />
                    <CustomText
                        eh5
                        regular
                        text={
                            item?.job_Type == 1
                                ? "Freelance"
                                : item?.job_Type == 2
                                    ? "Full Time"
                                    : item?.job_Type == 3
                                        ? "Internship"
                                        : item?.job_Type == 4
                                            ? "Part Time"
                                            : item?.job_Type == 5
                                                ? "Temporary"
                                                : "Night Shift"
                        }
                        textColor={colors.matterHorn}
                    />

                </View>
                <CustomText eh5 regular textColor={colors.matterHorn} text={item?.location} />

            </TouchableOpacity>
        )
    }

    const [searchText, setSearchText] = useState('')
    const [filteredList, setFilteredList] = useState(getJobListLocation)
    const [modalVisible, setModalVisible] = useState(false)
    const [fullName, setFullName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const filterJobList = (text) => {
        setSearchText(text)
        const data = getJobListLocation.filter(x => x?.role.includes(text))
        setFilteredList(data)
    }

    return (
        <SafeAreaView style={SeekerNearJobsStyles.mainContainer}>
             <Header
                    leftIcon={icons.sideMenuIcon}
                    onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    title="Jobs Near Me"
                    rightIcon={icons.bellNotificationIcon1}
                 
                />
            <View style={SeekerNearJobsStyles.container}>
               
                <CustomTextInput value={searchText} onChangeText={(text) => setSearchText(text)} type="search" placeholder="Search" style={{ marginTop: hpx(20) }} />

                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={getJobListLocation}
                        renderItem={renderNearJobs}
                        contentContainerStyle={{ paddingBottom: wp(70) }}
                    />
                </View>

                <BottomModal visible={modalVisible} modalViewStyle={{ height: hp(50) }}>
                    <View style={{ marginHorizontal: wpx(20) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <CustomText eh4 medium text="Refer a friend" />
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Image source={icons.cancel} />
                            </TouchableOpacity>
                        </View>
                        <CustomText style={{ marginTop: hpx(20) }} eh5 regular textColor={colors.matterHorn} text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                        <View style={{ marginVertical: hpx(10), marginTop: hpx(20) }}>
                            <CustomTextInput value={fullName} placeholder="Full Name" onChangeText={(text) => setFullName(text)} />
                            <CustomTextInput value={emailId} placeholder="Email ID" onChangeText={(text) => setEmailId(text)} />
                            <CustomTextInput value={mobileNumber} placeholder="Mobile Number" onChangeText={(text) => setMobileNumber(text)} />
                            <CustomButton title="Send" nextIcon />
                        </View>
                    </View>
                </BottomModal>
            </View>
        </SafeAreaView>
    )
}

export default SeekerNearJobs

const styles = StyleSheet.create({})