import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import CustomTextInput from '../../../../../common/CustomTextInput/CustomTextInput';
import { CustomButton } from '../../../../../common/CustomButton/CustomButton';
import {
    icons,
    fonts,
    wp,
    hpx,
    colors,
    wpx,
    hp,
} from '../../../../../constants/constant';
import { VCardVideoIntroductionStyles } from './VCardVideoIntroductionStyles';
import CustomDropdown from '../../../../../common/CustomDropdown/CustomDropdown';
import { CustomText } from '../../../../../common/CustomText/CustomText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomVCard from '../../../../../common/CustomVCard/CustomVCard';
import Header from '../../../../../common/Header/Header';
import ImagePicker from 'react-native-image-crop-picker';
import { DoubleButtonModal } from '../../../../../common/CustomModal/CustomModal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { types } from '../../../../../store/action/ActionTypes';
import Snackbar from 'react-native-snackbar';

const VCardVideoIntroduction = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { jobSeekerDetail, loader } =
        useSelector(state => ({
            jobSeekerDetail: state.jobseekerReducer.jobSeekerDetail,
            loader: state.globalReducer.loader,


        }), shallowEqual);

    const [image, setImage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)


    const videoRecordConfirm = () => {
        setModalVisible(!modalVisible)

    }
    // open gallery function
    const openCamera = () => {
        ImagePicker.openCamera({
            mediaType: "video",
        }).then(image => {
            setImage(image?.path);
        });
    };

    const skill = jobSeekerDetail?.skills.map(x => x?.skill)


    let file = {
        uri: image,
        type: 'video/mp4',
        name: image.substring(image.lastIndexOf('/') + 1)
    }
    const vcardUserData = {
        user_id: jobSeekerDetail?.user_Id,
        Intro_Video_Available: 1,
        Intro_Video_Link: image.substring(image.lastIndexOf('/') + 1)
    }
    const onConfirmRecording = () => {
        if (image) {
            dispatch({
                type: types.UPLOAD_SEEKER_VIDEO,
                payload: { vcardUserData, file }
            })
            setModalVisible(!modalVisible)
        }
        else {
            Snackbar.show({ text: "Please record introduction video", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
            setModalVisible(!modalVisible)
        }
    }

    const onCancelRecording = () => {
        setModalVisible(!modalVisible)
        setImage('')
    }

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
    let pref = jobSeekerDetail && jobSeekerDetail?.job_Preference
    return (
        <SafeAreaView style={VCardVideoIntroductionStyles.mainContainer}>
            <DoubleButtonModal visible={modalVisible} heading={"Confirmation?"}
                modalText={"Are you sure you don't want to record your introduction video?"}
                leftButtonText={"Record now"}
                rightButtonText={"Confirm"}
                onLeftClick={() => onCancelRecording()}
                onRightClick={() => onConfirmRecording()}
            />
            <Header leftIcon={icons.backIcon} title="V-Card" onLeftPress={() => navigation.goBack()} headerStyle={{ marginBottom: wpx(15) }} />

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={VCardVideoIntroductionStyles.container} contentContainerStyle={{ paddingBottom: wpx(100) }} >

                <CustomVCard firstName={jobSeekerDetail?.first_name} lastName={jobSeekerDetail?.last_name} image={jobSeekerDetail?.profile_pic}
                    vaccine={jobSeekerDetail?.vaccination_Status}
                    backgroundCardStyle={{ height: wpx(230) }}

                >

                    <View style={{ marginHorizontal: wpx(20) }}>
                        <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail?.job_Preference ? JSON.parse(jobSeekerDetail?.job_Preference)[0] : '""'} style={{ alignSelf: "center", marginTop: wpx(5) }} />
                        <View style={{ flexDirection: "row", marginTop: wpx(10), justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.experience_white} />
                                <CustomText eh5 regular textColor='#FFF' text={jobSeekerDetail.totalExperience ? jobSeekerDetail.totalExperience : 'Experience'} style={{ marginHorizontal: wpx(5) }} />
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

                            skill.slice(-3).map(x => {
                                return (
                                    <VCardSkills item={x} />
                                )
                            })

                        }

                    </View>
                </CustomVCard>




                <CustomText text="Introduction Video" oh5 semiBold />

                {
                    image ?
                        <View>
                            {/* <Video
                                source={{ uri: image }}
                                style={{ flex: 1 }}
                            /> */}
                            <Image source={{ uri: image }} style={{ height: hp(30), width: wp(90), borderRadius: wp(5) }} />
                        </View>
                        :

                        <View>
                            <CustomText oh6 lightItalic text="You have not uploaded your introduction video, Record now and increase your chances of getting hired by 30%" textColor={colors.black} style={{ marginTop: hpx(10) }} />
                            <CustomButton onPress={() => openCamera()} nextIcon={false} title={"Record Now"} buttonStyle={{ marginTop: wp(10), width: wp(45) }} />
                        </View>
                }






            </KeyboardAwareScrollView >
            <CustomButton loader={loader} onPress={() => videoRecordConfirm()} nextIcon={true} title={"Submit"} style={{ marginBottom: hpx(10) }} />

        </SafeAreaView >
    )
}

export default VCardVideoIntroduction

