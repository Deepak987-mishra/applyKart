import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../../common/Header/Header";
import { fonts, nf, icons, colors } from "../../../../constants/constant";
import { hpx, wpx, wp, hp } from "../../../../constants/constant";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import JobDetailCard from "../../../../common/JobDetailCard/JobDetailCard";
import JobDetailCard2 from "../../../../common/JobDetailCard/JobCardDetailCard2";
import { CustomText } from "../../../../common/CustomText/CustomText";
import Share from "react-native-share";
import { BottomModal } from "../../../../common/BottomModal/BottomModal";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { SeekerJobDetailStyles } from "./SeekerJobDetailStyles";
import moment from "moment";
import ThreeDotModal from "../../../../common/ThreeDotModal/ThreeDotModal";
import ProgressBar from "../../../../common/CustomLoader/CustomLoader";
import MapView from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";

const JobDetail = ({ navigation, route }) => {
  const { job_Id } = route.params;
  const dispatch = useDispatch();
  const { jobDetail, loader } = useSelector(
    state => ({
      jobDetail: state?.homeReducer?.reducerGetRecentJobDetail,
      loader: state?.globalReducer?.loader,
    }),
    shallowEqual,
  );

  const [refreshing, setRefreshing] = useState(false);
  console.log("jobDetail", jobDetail);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isliked, setIsliked] = useState(false);
  const url = "https://africau.edu/images/default/sample.pdf";
  const title = "Awesome Contents";
  const message = "ApplyKart Share Job on Social Media";
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

  useEffect(() => {
    dispatch({
      type: types.GET_RECENT_JOB_DETAIL,
      payload: job_Id,
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: types.GET_RECENT_JOB_DETAIL,
      payload: job_Id,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return loader ? (
    <ProgressBar />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        leftIcon={icons.backIcon}
        rightIcon={icons.threedoticon}
        title="Job Detail"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => setModal(!modal)}
      />
      <ThreeDotModal
        visible={modal}
        onModalPress={() => setModal(!modal)}
        modalText={"Inactive"}
        modalText1={"Remove"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{ paddingBottom: wpx(100) }}
        refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* card view */}
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <View style={JobDetailStyles.jobDetailShadowView}>
            <View style={{ marginTop: wpx(5) }}>
              <View style={JobDetailStyles.companyIcon}>
                <Image source={icons.googleIcon} />
              </View>
              <CustomText
                text={jobDetail?.job_Title}
                textColor={colors.black}
                semiBold
                oh5
                style={{ alignSelf: "center", marginTop: wpx(5) }}
              />
              <View style={{ flexDirection: "row", alignSelf: "center", marginVertical: wpx(5) }}>
                <CustomText
                  textColor={colors.black}
                  regular
                  eh5
                  text={` $ ${jobDetail?.salary_Offered}` + "K - " + ` $ ${jobDetail?.max_Salary_Offered}` + "K"}
                  style={{ marginRight: wpx(25) }}
                />
                <CustomText
                  textColor={colors.matterHorn}
                  regular
                  eh5
                  text={
                    jobDetail?.job_Type == 1
                      ? "Freelance"
                      : jobDetail?.job_Type == 2
                      ? "Full Time"
                      : jobDetail?.job_Type == 3
                      ? "Internship"
                      : jobDetail?.job_Type == 4
                      ? "Part Time"
                      : jobDetail?.job_Type == 5
                      ? "Temporary"
                      : "Night Shift"
                  }
                />
              </View>
              <CustomText
                text={jobDetail?.location}
                textColor={colors.matterHorn}
                regular
                eh5
                style={{ alignSelf: "center" }}
              />
            </View>
          </View>
          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Description" medium eh4 />
            <CustomText text={jobDetail?.description} regular eh5 textColor={colors.matterHorn} />
          </View>

          <View style={JobDetailStyles.vacancyView}>
            <View style={{ justifyContent: "space-around", height: wpx(60) }}>
              <CustomText textColor={colors.black} semiBold eh5 text="Vacancies" style={{ marginTop: wpx(10) }} />
              <CustomText textColor={colors.grey} regular eh5 text={jobDetail?.no_Of_Vacancy} />
            </View>
            <View
              style={{
                borderColor: "#CECDD3",
                borderRadius: wpx(8),
                paddingVertical: hpx(25),
                marginTop: hpx(5),
                borderWidth: 1,
                marginLeft: wpx(3),
                alignSelf: "center",
              }}
            />
            <View style={{ marginLeft: wpx(5) }}>
              <CustomText
                textColor={colors.black}
                semiBold
                eh5
                text="Education"
                style={{ textAlign: "center", marginTop: wpx(10), marginLeft: wpx(5) }}
              />
              <CustomText
                textColor={colors.grey}
                regular
                eh5
                //text="jdi osos osps codoppds opspsps opp "
                text={jobDetail?.min_education ?? null}
                style={{ width: wpx(80), textAlign: "center" }}
              />
            </View>
            <View
              style={{
                borderColor: "#CECDD3",
                borderRadius: wpx(8),
                paddingVertical: hpx(25),
                marginTop: hpx(5),
                borderWidth: 1,
                marginHorizontal: wpx(20),
                alignSelf: "center",
              }}
            />
            <View>
              <CustomText textColor={colors.black} semiBold eh5 text="Experience" style={{ marginTop: wpx(10) }} />
              <CustomText textColor={colors.grey} regular eh5 text={`${jobDetail?.min_Experience} Months`} />
            </View>
          </View>

          <View style={JobDetailStyles.descriptionView1}>
            <View style={JobDetailStyles.jobprefDescriptionView1}>
              <Image source={icons.skill_light} />
              <CustomText text="Number of Candidates" medium eh4 style={{ marginLeft: wpx(5), marginTop: wpx(5) }} />
            </View>
          </View>

          <TouchableOpacity
            style={{ ...JobDetailStyles.descriptionView2, width: wpx(50) }}
            onPress={() => navigation.navigate("Jobseeker")}>
            <CustomText
              textColor={colors.matterHorn}
              text={jobDetail?.no_Of_Candidates ? jobDetail?.no_Of_Candidates : 0}
              regular
              eh5
            />
          </TouchableOpacity>

          {/* Skills View */}
          <View style={JobDetailStyles.descriptionView1}>
            <View style={JobDetailStyles.jobprefDescriptionView1}>
              <Image source={icons.skill_light} />

              <CustomText text="Skills" semiBold oh5 style={{ marginLeft: wpx(5), marginTop: wpx(5) }} />
            </View>
          </View>
          <View style={JobDetailStyles.descriptionView2}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {jobDetail?.skills
                ? jobDetail?.skills.map(x => {
                    return (
                      <View
                        style={{
                          backgroundColor: "#F6F5FB",
                          paddingHorizontal: wpx(10),
                          paddingVertical: wpx(8),
                          borderRadius: wpx(8),
                          margin: wpx(5),
                        }}>
                        <CustomText oh6 regular text={x?.skill} />
                      </View>
                    );
                  })
                : null}
            </View>
          </View>

          {/* Job Prefrence */}

          <View style={JobDetailStyles.descriptionView1}>
            <View style={JobDetailStyles.jobprefDescriptionView1}>
              <Image source={icons.union} />
              <CustomText text="Job Preference" semiBold oh5 style={{ marginTop: wpx(3), marginLeft: wpx(5) }} />
            </View>
          </View>

          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Gender Preference" medium eh4 />
            <CustomText
              textColor={colors.matterHorn}
              text={jobDetail?.gender ? jobDetail?.gender : "All"}
              regular
              eh5
              style={{ marginTop: hpx(10) }}
            />
          </View>

          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Special Requirements" medium eh4 />
            {jobDetail?.special_Requirement
              ? jobDetail?.special_Requirement.map(x => {
                  return (
                    <CustomText
                      textColor="#4C4C4C"
                      regular
                      eh5
                      text={x?.special_requirements}
                      style={{ marginTop: wpx(10) }}
                    />
                  );
                })
              : null}
          </View>

          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Vaccination Required" medium eh4 />
            <View style={JobDetailStyles.vaccineView}>
              <Image
                source={
                  jobDetail?.vaccination_Type == "Single dose"
                    ? icons.single_dose_inactive
                    : jobDetail?.vaccination_Type == "Double dose"
                    ? icons.triple_dose_inactive
                    : jobDetail?.vaccination_Type == "Triple dose"
                    ? icons.triple_dose_inactive
                    : icons.not_vaccinated_inactive
                }
              />

              <CustomText
                text={jobDetail?.vaccination_Type}
                textColor="#4C4C4C"
                regular
                eh5
                style={{ marginLeft: wpx(5), marginTop: wpx(3) }}
              />
            </View>
          </View>

          {/* Visa requirement */}
          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Visa Requirement" medium eh4 />

            <CustomText text={jobDetail?.visa_type ? jobDetail?.visa_type : null} textColor="#4C4C4C" regular eh5 />
            {}
          </View>

          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Language" medium eh4 />
            <CustomText text={jobDetail?.language_preference ?? null} textColor="#4C4C4C" regular eh5 />
          </View>

          {/* Availability */}
          <View style={JobDetailStyles.descriptionView1}>
            <Image
              style={{
                marginTop: hpx(5),
              }}
              source={icons.availability}
            />

            <CustomText text="Availability" semiBold oh5 style={{ marginLeft: wpx(5), marginTop: wpx(5) }} />
          </View>

          <View style={JobDetailStyles.availDescriptionView}>
            {jobDetail?.availablity?.monday.from && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hpx(10), width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Monday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.monday.from + " to " + jobDetail?.availablity?.monday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.tuesday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Tuesday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.tuesday.from + " to " + jobDetail?.availablity?.tuesday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.wednesday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Wednesday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.wednesday.from + " to " + jobDetail?.availablity?.wednesday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.thursday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Thursday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.thursday.from + " to " + jobDetail?.availablity?.thursday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.friday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Friday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.friday.from + " to " + jobDetail?.availablity?.friday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.saturday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Saturday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.saturday.from + " to " + jobDetail?.availablity?.saturday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}

            {jobDetail?.availablity?.sunday.from && (
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: wp(85) }}>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text="Sunday" regular eh5 />
                </View>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText
                    text={jobDetail?.availablity?.sunday.from + " to " + jobDetail?.availablity?.sunday.to}
                    regular
                    eh5
                  />
                </View>
              </View>
            )}
          </View>

          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Location" medium eh4 />
          </View>

          {jobDetail?.latitude ? (
            <View
              style={{
                height: wpx(210),
                width: wp(90),
                borderRadius: wpx(10),
                shadowColor: "#4C4C4C",
                shadowOffset: {
                  width: 10,
                  height: 10,
                },
                shadowOpacity: 0.6,
                shadowRadius: 10,
                elevation: 8,
              }}>
              <MapView
                initialRegion={{
                  latitude: jobDetail?.latitude,
                  longitude: jobDetail?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  height: wpx(200),
                  width: wp(90),
                  borderRadius: wpx(20),
                  marginTop: wpx(10),
                  shadowColor: "#4C4C4C",
                  alignSelf: "center",
                  shadowOffset: {
                    width: 3,
                    height: 5,
                  },
                  shadowOpacity: 0.6,
                  shadowRadius: 6,
                  elevation: 8,
                }}
              />
            </View>
          ) : null}

          {/* posted by */}
          <View style={JobDetailStyles.descriptionView}>
            <CustomText text="Posted by" medium eh4 />
          </View>
          <View style={{ flexDirection: "row", marginLeft: wpx(20) }}>
            <View style={{ flex: 0.2 }}>
              <Image
                style={{
                  marginTop: hpx(10),
                }}
                source={icons.profilepic}
              />
            </View>
            <View style={{ flex: 1, marginTop: hpx(18) }}>
              <View>
                <CustomText
                  text={jobDetail?.job_Poster_Name ? jobDetail?.job_Poster_Name : "Michael Bruno"}
                  semiBold
                  eh4
                />
              </View>
              <View>
                <CustomText
                  text={`On ${moment(jobDetail?.posting_Date).format("LL")}`}
                  regular
                  oh1
                  textColor={colors.matterHorn}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ marginVertical: hpx(21) }}>
        <CustomButton
          title="Edit Job"
          nextIcon
          onPress={() =>
            navigation.navigate("JobPostingFillDetail", {
              editable: true,
              item: jobDetail,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default JobDetail;

export const JobDetailStyles = StyleSheet.create({
  jobDetailShadowView: {
    backgroundColor: "#FFFFFF",
    height: wpx(180),
    width: wpx(315),
    borderRadius: wpx(8),
    shadowColor: "#4C4C4C",
    alignItems: "center",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    marginTop: wpx(20),
  },

  companyIcon: {
    borderColor: "#55555533",
    borderWidth: wpx(1),
    height: hpx(60),
    width: wpx(60),
    borderRadius: 15,
    alignItems: "center",
    marginTop: hpx(15),
    justifyContent: "center",
    alignSelf: "center",
  },
  vacancyView: {
    backgroundColor: "#FFFFFF",
    // height: wpx(95),
    width: wp(88),
    borderRadius: wpx(15),
    shadowColor: "#4C4C4C",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    marginTop: wpx(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wpx(10),
    paddingBottom: wpx(8),
  },
  descriptionView: {
    paddingTop: wpx(20),
    alignSelf: "flex-start",
    paddingLeft: wpx(30),
  },
  descriptionView1: {
    marginTop: wpx(20),
    alignSelf: "flex-start",
    paddingLeft: wpx(20),
    flexDirection: "row",
  },
  availabilityStyle: {
    marginTop: wpx(10),
    flexDirection: "row",
    justifyContent: "space-between",

    width: wpx(320),
  },
  vaccineView: {
    marginTop: wpx(20),
    alignSelf: "flex-start",
    // paddingLeft: wpx(20),
    flexDirection: "row",
  },
  descriptionView2: {
    marginTop: wpx(10),
    alignSelf: "flex-start",
    paddingLeft: wpx(20),
  },
  availDescriptionView: {
    // marginTop: wpx(20),
    alignSelf: "flex-start",
    paddingLeft: wpx(30),
  },
  jobprefDescriptionView1: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
