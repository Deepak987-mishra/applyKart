import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { SeekerJobDetailStyles } from "./SeekerJobDetailStyles";
import moment from "moment";
import ProgressBar from "../../../../common/CustomLoader/CustomLoader";
import MapView, { Marker } from 'react-native-maps';
import Snackbar from "react-native-snackbar";


const SeekerJobDetail = ({ navigation, route }) => {
  const { job_id } = route.params;
  const dispatch = useDispatch();

  const jobDetail = useSelector(state => state?.jobseekerReducer?.getJobDetail);
  const jobSeekerDetail = useSelector(state => state?.jobseekerReducer?.jobSeekerDetail);

  const loader = useSelector(state => state.globalReducer.loader);

  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isliked, setIsliked] = useState(false);

  const url = "https://applykart.com.au/";
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
      type: types.GET_JOB_DETAIL,
      payload: job_id,
    });
  }, []);
  const spReq = jobDetail?.special_Requirements;
  console.log("jobDetail", jobDetail);
  console.log("jobSeekerDetail", jobDetail);

  const applyForJob = () => {
    const body = {
      User_Id: jobSeekerDetail?.user_Id,
      job_id: jobDetail?.job_Id,
    };
    dispatch({
      type: types.POST_APPLY_JOB,
      payload: body,
    });
  };


  const saveFavJob = () => {
    dispatch({
      type: types.POST_FAVORITE_JOB,
      payload: jobDetail?.job_Id
    })
  }

  return loader ? (
    <ProgressBar />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        leftIcon={icons.backIcon}
        title="Job Detail"
        onLeftPress={() => navigation.goBack()}
        multipleRight={true}
        multipleRightImage1={icons.share}
        multipleRightImage2={icons.refer}
        onMultipleRightPress={() => Share.open(options)}
        onMultipleLeftPress={() => setModalVisible(!modalVisible)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: wpx(100) }}
        style={{ marginTop: hpx(20), marginHorizontal: wpx(20) }}>
        {/* card view */}
        <View style={SeekerJobDetailStyles.jobDetailShadowView}>
          <View style={{ marginTop: wpx(5) }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: .3 }} />
              <View style={{ flex: .3 }}>
                <View style={SeekerJobDetailStyles.companyIcon}>
                  <Image source={icons.googleIcon} />
                </View>
              </View>
              {jobDetail?.application_Status && <View style={{ alignContent: "flex-end", flex: .3, marginRight: wpx(10) }}>
                {jobDetail?.application_Status == 1 ? (
                  <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                    <CustomText
                      text={"Submitted"}
                      textColor="#86BC26"
                      style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
                    />
                  </View>
                ) : jobDetail?.application_Status == 2 ? (
                  <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                    <CustomText
                      text={"Shortlisted"}
                      textColor="#86BC26"
                      style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
                    />
                  </View>
                ) : jobDetail?.application_Status == 3 ? (
                  <View style={{ backgroundColor: "#FFDDDD", borderRadius: wpx(8) }}>
                    <CustomText
                      text={"Rejected"}
                      textColor="#D82828"
                      style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
                    />
                  </View>
                ) : (
                  <View style={{ backgroundColor: "#F3FFDD", borderRadius: wpx(8) }}>
                    <CustomText
                      text={"In Progress"}
                      textColor="#86BC26"
                      style={{ paddingHorizontal: wpx(8), paddingVertical: wpx(5) }}
                    />
                  </View>
                )}
              </View>}
            </View>
            <CustomText
              text={jobDetail?.job_Title}
              textColor={colors.black}
              semiBold
              oh4
              style={{ alignSelf: "center", marginTop: wpx(5) }}
            />
            <CustomText
              text={jobDetail?.role}
              textColor={colors.black}
              regular
              oh4
              style={{ alignSelf: "center", marginTop: wpx(5) }}
            />
            <View style={{ flexDirection: "row", alignSelf: "center", marginVertical: wpx(5), justifyContent: "space-around" }}>
              <CustomText
                textColor={colors.black}
                regular
                eh5
                text={jobDetail?.salary_Offered + "K - " + jobDetail?.max_Salary_Offered + "K"}
                style={{ marginRight: wpx(8) }}
              />
              <CustomText
                textColor={colors.matterHorn}
                regular
                eh5
                style={{ marginLeft: wpx(5) }}
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
              text={jobDetail?.address}
              textColor={colors.matterHorn}
              regular
              eh5
              style={{ alignSelf: "center" }}
            />
          </View>
        </View>
        <View style={{ marginTop: wpx(20) }}>
          <CustomText text="Description" medium eh4 />
          <View style={{}}>
            <CustomText text={jobDetail?.description} regular eh5 textColor={colors.matterHorn} />
          </View>
        </View>

        <View style={SeekerJobDetailStyles.vacancyView}>
          <View style={{ justifyContent: "space-between" }}>
            <CustomText textColor={colors.black} semiBold eh5 text="Vacancies" />
            <CustomText textColor={colors.grey} regular eh5 text={jobDetail?.no_Of_Vacancy} style={{ alignSelf: "center" }} />
          </View>
          <View
            style={{
              borderColor: "#CECDD3",
              borderRadius: wpx(8),
              // height: wpx(70),
              borderWidth: 1,
              marginHorizontal: wpx(20),
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <CustomText textColor={colors.black} semiBold eh5 text="Education" />
            <CustomText
              textColor={colors.grey}
              regular
              eh5
              // text={jobDetail?.min_education.substring(0, 9)}
              text={jobDetail?.min_education}
              style={{ width: wpx(80) }}
            />
          </View>
          <View
            style={{
              borderColor: "#CECDD3",
              borderRadius: wpx(8),
              // height: wpx(70),
              borderWidth: 1,
              marginHorizontal: wpx(20),
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <CustomText textColor={colors.black} semiBold eh5 text="Experience" />
            <CustomText textColor={colors.grey} regular eh5 text={`${(jobDetail?.min_Experience / 12)} Years`} />
          </View>
        </View>
        {/* Skills View */}
        <View style={{ flexDirection: "row", marginTop: wpx(16) }}>
          <Image source={icons.skill_light} />
          <View style={{ marginLeft: wpx(12.42), marginTop: wpx(3) }}>
            <CustomText text="Skills" semiBold oh5 />
          </View>
        </View>
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

        {/* Job Prefrence */}
        <View>
          <View style={{ flexDirection: "row", marginTop: hpx(24) }}>
            <Image source={icons.union} />
            <View style={{ marginLeft: wpx(10) }}>
              <CustomText text="Job Preference" semiBold oh5 />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: wpx(10) }}>
          <CustomText text="Gender Preference" medium eh4 />
          <View style={{ flexDirection: "row", marginTop: wpx(5) }}>
            <View style={{}}>
              <CustomText
                textColor={colors.matterHorn}
                text={jobDetail?.gender ? jobDetail?.gender : "All"}
                regular
                eh5
              />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: wpx(0) }}>
          <CustomText text="Special Requirements" medium eh4 />
          {/* <CustomText
            textColor="#4C4C4C"
            regular
            eh5
            text={
              jobDetail?.special_requirement
                ? jobDetail?.special_requirement.map(x => {
                  return x + " ";
                })
                : ""
            }
            style={{ marginTop: wpx(10) }}
          /> */}
          {jobDetail?.special_Requirement
            ? jobDetail?.special_Requirement.map(x => {
              return (
                <CustomText
                  textColor="#4C4C4C"
                  regular
                  eh5
                  text={x.special_requirements}
                  style={{ marginTop: wpx(10) }}
                />
              );
            })
            : null}

        </View>

        <View style={{ marginVertical: wpx(10) }}>
          <CustomText text="Vaccination Required" medium eh4 />
          <View style={{ flexDirection: "row", marginTop: wpx(5) }}>
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
            <View style={{ marginLeft: wpx(6) }}>
              <CustomText text={jobDetail?.vaccination_Type} textColor="#4C4C4C" regular eh5 />
            </View>
          </View>
        </View>

        {/* Visa requirement */}
        <View style={{ marginVertical: wpx(10) }}>
          <CustomText text="Visa Requirement" medium eh4 />
          <View style={{ flexDirection: "row", marginTop: wpx(5) }}>
            <View style={{}}>
              <CustomText text={jobDetail?.visa_type} textColor="#4C4C4C" regular eh5 />
            </View>
          </View>
        </View>

        <View style={{
          marginTop: wpx(20),
          alignSelf: "flex-start",
        }}>
          <CustomText text="Language" medium eh4 />
          <CustomText text={jobDetail?.language_preference} textColor="#4C4C4C" regular eh5 />
        </View>

        {/* Availability */}
        <View style={{ flexDirection: "row", marginTop: hpx(16) }}>
          <View>
            <Image
              style={{
                marginTop: hpx(5),
              }}
              source={icons.availability}
            />
          </View>
          <View style={{ marginLeft: wpx(12.42), marginTop: hpx(3) }}>
            <CustomText text="Availability" semiBold oh5 />
          </View>
        </View>
        {/* {
          Object.keys(jobDetail?.availablity).map((x) => {
            return (
              <>
                <View style={{ marginTop: hpx(10) }}>
                  <CustomText text={x} regular eh5 />
                </View>
              </>
            )
          })
        } */}
        <View style={{}}>

          {
            jobDetail?.availablity?.monday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hpx(10), }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Monday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.monday.from + ' to ' + jobDetail?.availablity?.monday.to} regular eh5 />
              </View>
            </View>

          }

          {
            jobDetail?.availablity?.tuesday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Tuesday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.tuesday.from + ' to ' + jobDetail?.availablity?.tuesday.to} regular eh5 />
              </View>
            </View>
          }


          {
            jobDetail?.availablity?.wednesday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Wednesday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.wednesday.from + ' to ' + jobDetail?.availablity?.wednesday.to} regular eh5 />
              </View>
            </View>
          }

          {
            jobDetail?.availablity?.thursday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Thursday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.thursday.from + ' to ' + jobDetail?.availablity?.thursday.to} regular eh5 />
              </View>
            </View>
          }

          {
            jobDetail?.availablity?.friday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Friday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.friday.from + ' to ' + jobDetail?.availablity?.friday.to} regular eh5 />
              </View>
            </View>
          }

          {
            jobDetail?.availablity?.saturday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Saturday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.saturday.from + ' to ' + jobDetail?.availablity?.saturday.to} regular eh5 />
              </View>
            </View>
          }

          {
            jobDetail?.availablity?.sunday.from &&
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text="Sunday" regular eh5 />
              </View>
              <View style={{ marginTop: hpx(10) }}>
                <CustomText text={jobDetail?.availablity?.sunday.from + ' to ' + jobDetail?.availablity?.sunday.to} regular eh5 />
              </View>
            </View>
          }
        </View>

        <View style={{ marginTop: hpx(15) }}>
          <CustomText text="Location" medium eh4 />
        </View>
        {
          jobDetail?.latitude ?
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
                borderRadius: wpx(15),
                shadowColor: '#4C4C4C',
                alignSelf: 'center',
                shadowOffset: {
                  width: 3,
                  height: 5,
                },
                shadowOpacity: 0.6,
                shadowRadius: 6,
                elevation: 8,
              }}
            />
            :
            null
        }

        {/* <Image source={icons.dummy_map} /> */}

        {/* posted by */}
        <View style={{ marginTop: hpx(20) }}>
          <CustomText text="Posted by" medium eh4 />
        </View>
        <View style={{ flexDirection: "row" }}>
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
                text={jobDetail?.job_Poster_Name ? jobDetail?.job_Poster_Name : "Mark Robinson"}
                semiBold
                eh4
              />
            </View>
            <View>
              <CustomText
                text={moment(jobDetail?.posting_Date).format("LL")}
                regular
                oh1
                textColor={colors.matterHorn}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomModal onModalPress={() => setModalVisible(!modalVisible)} visible={modalVisible} modalViewStyle={{ height: wp(110), marginBottom: wp(-10) }}>
        <View style={{ marginHorizontal: wpx(20) }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CustomText eh4 medium text="Refer a friend" />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image source={icons.cancel} />
            </TouchableOpacity>
          </View>
          <CustomText
            style={{ marginTop: hpx(20) }}
            eh5
            regular
            textColor={colors.matterHorn}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <View style={{ marginVertical: hpx(10), marginTop: hpx(20) }}>
            <CustomTextInput value={fullName} placeholder="Full Name" onChangeText={text => setFullName(text)} />
            <CustomTextInput value={emailId} placeholder="Email ID" onChangeText={text => setEmailId(text)} />
            <CustomTextInput
              value={mobileNumber}
              placeholder="Mobile Number"
              onChangeText={text => setMobileNumber(text)}
            />
            <CustomButton title="Send" nextIcon onPress={() => Snackbar.show({
              text: "Email is not working",
              backgroundColor: "#1CB5E0",
              duration: Snackbar.LENGTH_LONG,
            })} />
          </View>
        </View>
      </BottomModal>
      <View style={{ marginVertical: hpx(21), flexDirection: "row", justifyContent: "space-around" }}>
        <CustomButton
          title="Apply this Job"
          nextIcon
          buttonStyle={{ width: wp(70) }}
          onPress={() => applyForJob()}
          loader={loader}
        />
        <TouchableOpacity
          onPress={() => saveFavJob()}
          style={{
            height: wpx(56),
            width: wpx(56),
            backgroundColor: "#F6F5FB",
            borderRadius: wpx(10),
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image source={isliked ? icons.heart : icons.heart_inactive} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SeekerJobDetail;

const styles = StyleSheet.create({
  flatListView: {},
});

