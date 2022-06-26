import { Image, SafeAreaView, ScrollView, StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import Header from '../../../../common/Header/Header'
import { icons, wpx, colors, wp } from '../../../../constants/constant'
import { SeekerProfileStyles } from './SeekerProfileStyles'
import { DrawerActions } from "@react-navigation/native";
import CustomVCard from '../../../../common/CustomVCard/CustomVCard'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { CustomText } from '../../../../common/CustomText/CustomText'
import moment from 'moment'

const SeekerProfile = ({ navigation }) => {

    const dispatch = useDispatch()

    const { jobSeekerDetail, loader, } =
        useSelector(state => ({
            jobSeekerDetail: state.jobseekerReducer.jobSeekerDetail,
            loader: state.globalReducer.loader,


        }), shallowEqual);

    const skill = jobSeekerDetail?.skills.map(x => x?.skill)

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

    return (
        <SafeAreaView style={SeekerProfileStyles.mainContainer}>
            <Header
                leftIcon={icons.sideMenuIcon}
                onLeftPress={() => navigation.dispatch(DrawerActions.openDrawer)}
                rightIcon={icons.edit}
                onRightPress={() => navigation.navigate('VCardVaccination', { isEdit: true })}
            />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: wpx(200) }}>
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
                            skill.slice(0, 3).map(x => {
                                return (
                                    <VCardSkills item={x} />
                                )
                            })
                        }

                    </View>
                </CustomVCard>

                <View style={{ marginHorizontal: wpx(20) }}>
                    {/* Work Experience */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={icons.workExperienceIcon} />
                            <CustomText text="Work Experience" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                        </View>
                        <Image source={icons.arrowRight} />
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                            <CustomText text="Organisation:" regular eh5 textColor={"#6F6F6F"} />
                            <CustomText text={jobSeekerDetail?.professionaldetails ? jobSeekerDetail?.professionaldetails?.experience[0].company : ''} regular eh5 textColor={colors.black} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                            <CustomText text="Designation:" regular eh5 textColor={"#6F6F6F"} />
                            <CustomText text={jobSeekerDetail?.professionaldetails ? jobSeekerDetail?.professionaldetails?.experience[0].job_Responsiblity : ''} regular eh5 textColor={colors.black} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <CustomText text="Experience:" regular eh5 textColor={"#6F6F6F"} />
                            <CustomText text={jobSeekerDetail?.professionaldetails ? moment(jobSeekerDetail?.professionaldetails?.experience[0].start_date).diff(jobSeekerDetail?.professionaldetails?.experience[0].end_date, ' year') + ' Year' : '0 Year'} regular eh5 textColor={colors.black} />
                        </View>
                    </View>

                    {/* Skills */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.skill_light} />
                                <CustomText text="Skills" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                            <Image source={icons.arrowRight} />
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: wpx(10) }}>
                            {
                                skill.slice(0, 3).map(x => {
                                    return (
                                        <View style={{ paddingVertical: wpx(8), paddingHorizontal: wpx(10), backgroundColor: "#F6F5FB", margin: wpx(5), borderRadius: wpx(8) }}>
                                            <CustomText text={x} />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>


                    {/* Education Details */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.education} />
                                <CustomText text="Education Detail" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                            <Image source={icons.arrowRight} />
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                                <CustomText text="Qualification:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.education ? jobSeekerDetail?.education?.education[0].education_Level : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="College/University:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.education ? jobSeekerDetail?.education?.education[0].university : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Specialization:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.education ? jobSeekerDetail?.education?.education[0].specialization : ''} regular eh5 textColor={colors.black} />
                            </View>
                        </View>
                    </View>

                    {/* Job Preference */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.union} />
                                <CustomText text="Job Preference" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                            <Image source={icons.arrowRight} />
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                                <CustomText text="Type of Job:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.preffered_job_type ? JSON.parse(jobSeekerDetail?.preffered_job_type) : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="Job Preference:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.job_Preference ?
                                    JSON.parse(jobSeekerDetail?.job_Preference).map(x => { return x + ", " })
                                    : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Shift:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.shift ? jobSeekerDetail?.shift : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="Location:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.location ? jobSeekerDetail?.location : ''} regular eh5 textColor={colors.black} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Language:" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.language ? jobSeekerDetail?.language : ''} regular eh5 textColor={colors.black} />
                            </View>
                        </View>
                    </View>

                    {/* Availability */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.availability} />
                                <CustomText text="Availability" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                            <Image source={icons.arrowRight} />
                        </View>
                        <View>
                            {jobSeekerDetail?.avalablity.monday.from && <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                                <CustomText text="Monday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.monday.from ? jobSeekerDetail?.avalablity.monday.from + ' to ' + jobSeekerDetail?.avalablity.monday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.tuesday.from && <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="Tuesday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.tuesday.from ? jobSeekerDetail?.avalablity.tuesday.from + ' to ' + jobSeekerDetail?.avalablity.tuesday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.wednesday.from && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Wednesday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.wednesday.from ? jobSeekerDetail?.avalablity.wednesday.from + ' to ' + jobSeekerDetail?.avalablity.wednesday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.thursday.from && <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="Thursday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.thursday.from ? jobSeekerDetail?.avalablity.thursday.from + ' to ' + jobSeekerDetail?.avalablity.thursday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.thursday.from && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Friday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.friday.from ? jobSeekerDetail?.avalablity.friday.from + ' to ' + jobSeekerDetail?.avalablity.friday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.thursday.from && <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: wpx(10) }}>
                                <CustomText text="Saturday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.saturday.from ? jobSeekerDetail?.avalablity.saturday.from + ' to ' + jobSeekerDetail?.avalablity.saturday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                            {jobSeekerDetail?.avalablity.thursday.from && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <CustomText text="Sunday" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.avalablity.sunday.from ? jobSeekerDetail?.avalablity.sunday.from + ' to ' + jobSeekerDetail?.avalablity.sunday.to : ''} regular eh5 textColor={colors.black} />
                            </View>}
                        </View>
                    </View>

                    {/* Contact info */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.contactIcon} />
                                <CustomText text="Contact info" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                            <Image source={icons.arrowRight} />
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                                <CustomText text="Email ID" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.email ? jobSeekerDetail?.email : ''} regular eh5 textColor={"#116EEC"} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wpx(10) }}>
                                <CustomText text="Phone Number" regular eh5 textColor={"#6F6F6F"} />
                                <CustomText text={jobSeekerDetail?.contact_no ? "+" + jobSeekerDetail?.contact_no : ''} regular eh5 textColor={colors.black} />
                            </View>
                        </View>
                    </View>

                    {/* My Portfolio */}
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wpx(30) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={icons.portfolio} />
                                <CustomText text="My Portfolio" semiBold oh5 textColor={colors.black} style={{ marginLeft: wpx(10) }} />
                            </View>
                        </View>
                        <View style={{ marginTop: wpx(20) }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Image source={{ uri: `https://reqres.in/img/faces/${index + 1}-image.jpg` }} style={{ height: wpx(125), width: wpx(125), borderRadius: wpx(10), marginRight: wpx(20) }} />
                                            <CustomText text="Work Title" oh5 medium style={{ marginTop: wpx(5) }} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SeekerProfile

const styles = StyleSheet.create({})