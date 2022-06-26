import { StyleSheet, SafeAreaView, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../common/Header/Header'
import { icons, wpx, wp, colors } from '../../../../constants/constant'
import { DrawerActions } from '@react-navigation/native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { SeekerVCardStyles } from './SeekerVCardStyles'
import CustomVCard from '../../../../common/CustomVCard/CustomVCard'
import { CustomText } from '../../../../common/CustomText/CustomText'
import { CustomButton } from '../../../../common/CustomButton/CustomButton'
import Share from "react-native-share";

const url = "https://applykart.com.au/";
const title = "My V-Card";
const message = "ApplyKart Share V-Card on Social Media";
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

const SeekerVCard = ({ navigation }) => {
    const dispatch = useDispatch()
    const { jobSeekerDetail, loader } =
        useSelector(state => ({
            jobSeekerDetail: state.jobseekerReducer.jobSeekerDetail,
            loader: state.globalReducer.loader,
        }), shallowEqual);

    const [videoLink, setVideoLink] = useState(jobSeekerDetail?.intro_video_link)

    const VCardSkills = ({ item }) => {
        return (
            <View style={{ alignSelf: "center", borderWidth: 1, borderColor: colors.white, borderRadius: wp(5), paddingVertical: wpx(7), paddingHorizontal: wpx(7), marginHorizontal: wpx(10) }}>
                <CustomText eh6 regular text={
                    (item.length > 10) ?
                        ((item.substring(0, 9)) + '...') :
                        item
                } textColor={colors.white} />
            </View>
        )
    }

    const skill = jobSeekerDetail?.skills.map(x => x?.skill)
    console.log('videoLink', videoLink)
    return (
        <SafeAreaView style={SeekerVCardStyles.mainContainer}>
            <Header
                leftIcon={icons.sideMenuIcon}
                onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                title="My Card"
                rightIcon={icons.share}
                onRightPress={() => Share.open(options)}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: wpx(100) }}>
                <CustomVCard firstName={jobSeekerDetail?.first_name} lastName={jobSeekerDetail?.last_name} image={jobSeekerDetail?.profile_pic}
                    vaccine={jobSeekerDetail?.vaccination_Status}
                    backgroundCardStyle={{ height: wpx(230) }}

                >

                    <View style={{ marginHorizontal: wpx(20) }}>
                        <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.job_Preference ? JSON.parse(jobSeekerDetail?.job_Preference)[0] : '""'} style={{ alignSelf: "center", marginTop: wpx(5) }} />
                        <View style={{ flexDirection: "row", marginTop: wpx(10), justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.experience_white} />
                                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.totalExperience ? jobSeekerDetail?.totalExperience : 'Experience'} style={{ marginHorizontal: wpx(5) }} />
                            </View>
                            <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.locationWhite} />
                                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.location ? jobSeekerDetail?.location.split(',')[0] : 'Sydney'} style={{ marginHorizontal: wpx(5) }} />
                            </View>
                            <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.language_white} />
                                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.language ? jobSeekerDetail?.language : 'English'} style={{ marginHorizontal: wpx(5) }} />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row-reverse", alignSelf: "center", marginTop: wpx(5) }}>
                        {
                            skill.slice(0, 3).map(x => {
                                return (
                                    <VCardSkills item={x} />
                                )
                            })
                        }
                    </View>
                </CustomVCard>

                <View style={SeekerVCardStyles.container}>
                    <CustomText text="Introduction Video" oh5 semiBold />
                    <Image source={{ uri: videoLink }} style={{ height: wp(60), width: wp(90), backgroundColor: colors.black, borderRadius: wp(10), marginTop: wpx(10) }} />
                </View>
            </ScrollView>
            <CustomButton
                title="Search Job"
                nextIcon
                onPress={() => navigation.navigate('SeekerNewJobs')}
                style={{ marginBottom: wpx(10) }}
            />
        </SafeAreaView>
    )
}

export default SeekerVCard

const styles = StyleSheet.create({})