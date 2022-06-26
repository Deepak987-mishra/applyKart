import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import Header from '../../../../common/Header/Header'
import { hpx, icons, wpx, colors, wp, hp } from '../../../../constants/constant'
import CustomTextInput from '../../../../common/CustomTextInput/CustomTextInput'
import { CustomText } from '../../../../common/CustomText/CustomText'
import { SeekerAppliedJobsStyles } from './SeekerAppliedJobsStyles'
import Share from "react-native-share";
import CustomBottomModal from '../../../../common/CustomBottomModal/CustomBottomModal'
import { BottomModal } from '../../../../common/BottomModal/BottomModal'
import { CustomButton } from '../../../../common/CustomButton/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerActions } from '@react-navigation/native'
import { types } from '../../../../store/action/ActionTypes'


const SeekerAppliedJobs = ({ navigation }) => {
    const dispatch = useDispatch()
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const getAppliedJobs = useSelector(state => state.jobseekerReducer.getAppliedJobsList)

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

    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch({
            type: types.GET_APPLIED_JOBS, // New Job Lists
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const renderAppliedJobs = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("SeekerJobDetail", { job_id: item?.job_Id })}
                style={{ ...SeekerAppliedJobsStyles.jobCardMainView, paddingVertical: wpx(20) }}>
                <View style={{ ...SeekerAppliedJobsStyles.flexRow, marginVertical: hpx(10) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={icons.googleIcon} />
                            <CustomText eh4 medium text={item?.company} style={{ marginLeft: wpx(10) }} />
                        </View>
                        {
                            item?.application_Status == 1 ?
                                <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                                    <CustomText text={'Submitted'} textColor='#86BC26' style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }} />
                                </View>
                                :
                                item?.application_Status == 2 ?
                                    <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                                        <CustomText text={'Shortlisted'} textColor='#86BC26' style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }} />
                                    </View>
                                    :
                                    item?.application_Status == 3 ?
                                        <View style={{ backgroundColor: "#FFDDDD", borderRadius: wpx(8) }}>
                                            <CustomText text={'Rejected'} textColor='#D82828' style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }} />
                                        </View>
                                        :
                                        <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                                            <CustomText text={'In Progress'} textColor='#86BC26' style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }} />
                                        </View>
                        }
                    </View>

                </View>
                <CustomText oh5 semiBold text={item?.job_Title} />
                <View style={{ ...SeekerAppliedJobsStyles.flexRowBetween, marginVertical: hpx(10) }}>
                    <CustomText eh5 regular text={`${item?.salary} K - ${item?.max_Salary} K`} />
                    <CustomText eh5 regular textColor={colors.matterHorn} text={
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
                    } />
                </View>
                <CustomText eh5 regular textColor={colors.matterHorn} text={item?.location} />
            </TouchableOpacity>
        );
    }

    const [searchText, setSearchText] = useState('')
    const [filteredList, setFilteredList] = useState(getAppliedJobs)
    const [modalVisible, setModalVisible] = useState(false)
    const [fullName, setFullName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const filterJobList = (text) => {
        setSearchText(text)
        const data = getAppliedJobs.filter(x => x?.job_Title.includes(text))
        setFilteredList(data)
    }

    return (
        <SafeAreaView style={SeekerAppliedJobsStyles.mainContainer}>
            <Header
                leftIcon={icons.sideMenuIcon}
                onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                title="Applied Jobs"
                rightIcon={icons.bellNotificationIcon1}
                // multipleRight={true}
                multipleRightImage1={icons.share}
                multipleRightImage2={icons.refer}
                onMultipleRightPress={() => Share.open(options)}
                onMultipleLeftPress={() => setModalVisible(!modalVisible)}
            />
            <View style={SeekerAppliedJobsStyles.container}>

                <CustomTextInput value={searchText} onChangeText={(text) => filterJobList(text)} type="search" placeholder="Search" style={{ marginTop: hpx(20) }} />

                <View>
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        showsVerticalScrollIndicator={false}
                        data={filteredList}
                        renderItem={renderAppliedJobs}
                        contentContainerStyle={{
                            paddingBottom: wp(90)
                        }}
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

export default SeekerAppliedJobs

const styles = StyleSheet.create({})