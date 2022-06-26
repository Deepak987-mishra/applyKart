import React, { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../../common/Header/Header";
import { hpx, wpx, wp, hp, fonts, icons, colors } from "../../../../constants/constant";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { WhiteCustomButton } from "../../../../common/CustomButton/CustomButton";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { CandidateDetailStyle } from "./CandidateDetailStyle";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomDropdown from "../../../../common/CustomDropdown/CustomDropdown";
import CustomVCard from "../../../../common/CustomVCard/CustomVCard";
import Snackbar from "react-native-snackbar";
import ProgressBar from "../../../../common/CustomLoader/CustomLoader";

const ShotListedCandidateDetail = ({ navigation, route }) => {
  const [selectedDummyData, setSelectedDummyData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const [activeButton, setactiveButton] = useState(false);
  const [activeButton1, setactiveButton1] = useState(false);
  const [activeButton2, setactiveButton2] = useState(false);
  const [activeButton3, setactiveButton3] = useState(false);

  const { getCandidateDetail, loader } = useSelector(
    state => ({
      getCandidateDetail: state.homeReducer.getCandidateDetail,
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  const dummyData = [
    { id: 1, name: "Peter" },
    { id: 2, name: "Paul" },
    { id: 3, name: "Andrew" },
    { id: 4, name: "Matthew" },
    { id: 5, name: "Adam" },
  ];

  const skill = [
    { id: 0, name: "MySql" },
    { id: 1, name: "Java" },
    { id: 2, name: "React" },
  ];

  const VCardSkills = ({ item }) => {
    return (
      <View
        style={{
          alignSelf: "center",
          borderWidth: 1,
          borderColor: colors.white,
          borderRadius: wp(5),
          paddingVertical: wpx(7),
          paddingHorizontal: wpx(7),
          marginHorizontal: wpx(10),
        }}>
        <CustomText eh6 regular text={item} textColor={colors.white} />
      </View>
    );
  };

  const renderSkillList = ({ item }) => {
    return (
      <View style={CandidateDetailStyle.fullTimeContainer}>
        <CustomText oh6 text={item.skill} regular />
      </View>
    );
  };

  //   const {id}=route.params;
  //   const dispatch = useDispatch();

  //   const { getCandidateDetail } =
  //         useSelector(state => ({
  //           getCandidateDetail: state.homeReducer.getCandidateDetail,
  //         }), shallowEqual);

  //   useEffect(()=>{
  //     dispatch({
  //       type:types.VIEW_CANDIDATE_DETAIL,
  //       payload:id
  //     })
  //       },[])

  const onSchedule = () => {
    setactiveButton(e => !e);
    Snackbar.show({
      text: "Under Development",
      duration: Snackbar.LENGTH_LONG,
    });
  };

  const onCall = () => {
    setactiveButton1(e => !e);
  };

  const onEmail = () => {
    setactiveButton2(e => !e);
  };

  const onChat = () => {
    setactiveButton3(e => !e);
  };
  console.log("getCandidateDetail?.profile_pic", getCandidateDetail?.profile_Pic);
  return loader ? (
    <ProgressBar />
  ) : (
    <SafeAreaView style={CandidateDetailStyle.mainContainer}>
      <Header
        leftIcon={icons.backIcon}
        title="Candidate Detail"
        rightIcon={icons.threedoticon}
       
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={CandidateDetailStyle.container}>
        {/* <Image style={CandidateDetailStyle.img} source={icons.dummy_vcard}/> */}

        <CustomVCard
          firstName={getCandidateDetail?.first_Name ? getCandidateDetail?.first_Name : "Jacqueline Baum"}
          lastName={getCandidateDetail?.last_Name ? getCandidateDetail?.last_Name : ""}
          vaccine
          shift
          night
          image={getCandidateDetail?.profile_Pic}>
          <View style={{ marginHorizontal: wpx(20) }}>
            <CustomText
              eh5
              regular
              textColor="#FFF"
              text={getCandidateDetail?.title ? getCandidateDetail?.title : "UI/UX Designer"}
              style={{ alignSelf: "center", marginTop: wpx(5) }}
            />
            <View style={{ flexDirection: "row", marginTop: wpx(10), justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.experience_white} />
                <CustomText
                  eh5
                  regular
                  textColor="#FFF"
                  text={getCandidateDetail?.totalExperience ? getCandidateDetail?.totalExperience : "0 Months"}
                  style={{ marginHorizontal: wpx(5) }}
                />
              </View>
              <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.locationWhite} />
                <CustomText
                  eh5
                  regular
                  textColor="#FFF"
                  text={getCandidateDetail?.location ? getCandidateDetail?.location.split(", ")[0] : "Sydney"}
                  style={{ marginHorizontal: wpx(5) }}
                />
              </View>
              <View style={{ height: wpx(18), width: wpx(1.5), backgroundColor: "#fff" }} />
              <View style={{ flexDirection: "row" }}>
                <Image source={icons.language_white} />
                <CustomText
                  eh5
                  regular
                  textColor="#FFF"
                  text={getCandidateDetail?.language ? getCandidateDetail?.language : "English"}
                  style={{ marginHorizontal: wpx(5) }}
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center", marginTop: wpx(10), marginBottom:hpx(30) }}>
            {skill.map(x => {
              return <VCardSkills item={x?.name} />;
            })}
          </View>
        </CustomVCard>
        <View style={CandidateDetailStyle.workExpHeading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={CandidateDetailStyle.workExpIcon} source={icons.workExperienceIcon} />
            <CustomText oh5 text="Work Experience" style={CandidateDetailStyle.text1} semiBold />
          </View>
          <View>
            <Image style={CandidateDetailStyle.arrowIcon} source={icons.arrowRight} />
          </View>
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Organization:" regular textColor={colors.grey} />
          <CustomText
            eh5
            text={
              getCandidateDetail?.experience?.experience[0]?.company
                ? getCandidateDetail?.experience?.experience[0]?.company
                : "Microsoft"
            }
            regular
          />
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Designation:" regular textColor={colors.grey} />
          <CustomText eh5 text={getCandidateDetail?.title ? getCandidateDetail?.title : "Bussiness Analyst"} regular />
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Experience:" regular textColor={colors.grey} />
          <CustomText
            eh5
            text={getCandidateDetail?.totalExperience ? getCandidateDetail?.totalExperience : "4 years"}
            regular
          />
        </View>
        <View style={CandidateDetailStyle.horizontalLine}></View>
        <View style={CandidateDetailStyle.skillHeading}>
          <Image style={CandidateDetailStyle.skillIcon} source={icons.union1} />
          <CustomText oh5 text="Skills" style={CandidateDetailStyle.text2} semiBold />
          <Image style={CandidateDetailStyle.arrowIcon2} source={icons.arrowRight} />
        </View>

        {/* <View style={CandidateDetailStyle.skillContainer}> */}

        {/* {getCandidateDetail?.skills?.skills ? getCandidateDetail?.skills?.skills.map(x => {
                            return (
                                <View style={{ backgroundColor: "#F6F5FB", paddingHorizontal: wpx(10), paddingVertical: wpx(8), borderRadius: wpx(8), margin: wpx(5) }}>
                                    <CustomText oh6 regular text={x?.skill} />
                                </View>
                            )
                        }) : null} */}

        <ScrollView
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={CandidateDetailStyle.skillContainer}>
<View style={{ flexDirection: "row", flexWrap: "wrap",width:wp(90) }}>
{getCandidateDetail?.skills?.skills ? getCandidateDetail?.skills?.skills.map(x => {
                            return (
                                <View style={{ backgroundColor: "#F6F5FB", paddingHorizontal: wpx(10), paddingVertical: wpx(8), borderRadius: wpx(8), margin: wpx(5) }}>
                                    <CustomText oh6 regular text={x?.skill} />
                                </View>
                            )
                        }) : null}
                        </View>

          {/* <FlatList
            data={getCandidateDetail?.skills?.skills}
            columnWrapperStyle={{ flexWrap: "wrap", margin: 4 }}
            key={3}
            numColumns={3}
            renderItem={renderSkillList}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
          /> */}
        </ScrollView>

        <View style={CandidateDetailStyle.horizontalLine}></View>
        <View style={CandidateDetailStyle.workExpHeading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={CandidateDetailStyle.educationIcon} source={icons.education} />
            <CustomText oh5 text="Education Detail" style={CandidateDetailStyle.text3} semiBold />
          </View>
          <View>
            <Image style={CandidateDetailStyle.arowRight3} source={icons.arrowRight} />
          </View>
        </View>
        <View style={CandidateDetailStyle.eduContainer}>
          <CustomText eh5 text="Qualification:" regular textColor={colors.grey} />
          <CustomText
                    style={{textAlign:'right',width:wpx(140)}}

            eh5
            text={getCandidateDetail?.qualification ? getCandidateDetail?.qualification : "Bachelor of Engineering"}
            regular
          />
        </View>
        <View style={CandidateDetailStyle.eduContainer}>
          <CustomText eh5 text="College/University:" regular textColor={colors.grey}  style={{width:wpx(140)}}/>
          <CustomText
          style={{textAlign:'right',width:wpx(140)}}
            eh5
            text={getCandidateDetail?.university ? getCandidateDetail?.university : "Oxford University"}
            regular
          />
        </View>

        <View style={CandidateDetailStyle.eduContainer}>
          <CustomText eh5 text="Specialization:" regular textColor={colors.grey} />
          <CustomText
                     style={{textAlign:'right',width:wpx(140)}}

            eh5
            text={getCandidateDetail?.specialization ? getCandidateDetail?.specialization : "Computer science"}
            regular
          />
        </View>
        <View style={CandidateDetailStyle.horizontalLine}></View>
        <View style={CandidateDetailStyle.workExpHeading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={CandidateDetailStyle.jobPreferenceIcon} source={icons.union} />
            <CustomText oh5 text="Job Preference" style={CandidateDetailStyle.text4} semiBold />
          </View>
          <View>
            <Image style={CandidateDetailStyle.arrowRight4} source={icons.arrowRight} />
          </View>
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Type of Job:" regular textColor={colors.grey} />
          <CustomText
               style={{textAlign:'right',width:wpx(140)}}
            eh5
            text={getCandidateDetail?.job_Type ? JSON.parse(getCandidateDetail?.job_Type) : "Trainee"}
            regular
          />
        </View>
        {/* <View style={CandidateDetailStyle.workExpContainer1}>
          <CustomText eh5 text="Job Preference:" regular textColor={colors.grey} />
          <View style={{ flexDirection:"row", flexWrap:"wrap"}}>

          {getCandidateDetail?.job_Preference
                ? JSON.parse(getCandidateDetail?.job_Preference).map(x => {
                  return (
                      <CustomText eh5 regular text={x+", "} />
                  );
                })
                : null}   
                    </View>

        </View> */}
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Shift:" regular textColor={colors.grey} />
          <CustomText   style={{textAlign:'right',width:wpx(140)}} eh5 text={getCandidateDetail?.shift ? getCandidateDetail?.shift : "Night"} regular
            />
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Location:" regular textColor={colors.grey} />
          <CustomText eh5 text={getCandidateDetail?.location ? getCandidateDetail?.location : "Sydney"} regular   style={{textAlign:'right',width:wpx(140)}} />
        </View>
        <View style={CandidateDetailStyle.workExpContainer}>
          <CustomText eh5 text="Language:" regular textColor={colors.grey} />
          <CustomText
            style={{textAlign:'right',width:wpx(140)}}
            eh5
            text={getCandidateDetail?.language ? getCandidateDetail?.language : "Australian English"}
            regular
          />
        </View>
        <View style={CandidateDetailStyle.horizontalLine}></View>
        <View style={CandidateDetailStyle.workExpHeading3}>
          <Image style={CandidateDetailStyle.availabilityIcon} source={icons.availability} />
          <CustomText oh5 text="Availability" style={CandidateDetailStyle.text5} semiBold />
        </View>
        <View style={{}}>

{
  getCandidateDetail?.availablities?.monday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hpx(10), }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Monday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.monday?.from + ' to ' + getCandidateDetail?.availablities?.monday?.to} regular eh5 />
    </View>
  </View>

}

{
  getCandidateDetail?.availablities?.tuesday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Tuesday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.tuesday?.from + ' to ' + getCandidateDetail?.availablities?.tuesday?.to} regular eh5 />
    </View>
  </View>
}


{
  getCandidateDetail?.availablities?.wednesday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Wednesday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.wednesday?.from + ' to ' + getCandidateDetail?.availablities?.wednesday?.to} regular eh5 />
    </View>
  </View>
}

{
  getCandidateDetail?.availablities?.thursday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Thursday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.thursday?.from + ' to ' + getCandidateDetail?.availablities?.thursday?.to} regular eh5 />
    </View>
  </View>
}

{
  getCandidateDetail?.availablities?.friday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Friday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.friday?.from + ' to ' + getCandidateDetail?.availablities?.friday?.to} regular eh5 />
    </View>
  </View>
}

{
  getCandidateDetail?.availablities?.saturday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Saturday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.saturday?.from + ' to ' + getCandidateDetail?.availablities?.saturday?.to} regular eh5 />
    </View>
  </View>
}

{
  getCandidateDetail?.availablities?.sunday?.from &&
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text="Sunday" regular eh5 />
    </View>
    <View style={{ marginTop: hpx(10) }}>
      <CustomText text={getCandidateDetail?.availablities?.sunday?.from + ' to ' + getCandidateDetail?.availablities?.sunday?.to} regular eh5 />
    </View>
  </View>
}
</View>


        <View style={CandidateDetailStyle.horizontalLine}></View>
        <View style={CandidateDetailStyle.workExpHeading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={CandidateDetailStyle.contactIcon} source={icons.contactIcon} />
            <CustomText oh5 text="Contact info" style={CandidateDetailStyle.text6} semiBold />
          </View>
          <View>
            <Image style={CandidateDetailStyle.arrowRight7} source={icons.arrowRight} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wpx(5),
            marginTop: hpx(10),
          }}>
          <CustomText eh5 text="Email ID" regular textColor={colors.grey} />
          <CustomText
            eh5
            text={getCandidateDetail?.email ? getCandidateDetail?.email : "Jaquene@fakemail.com"}
            regular
            textColor={colors.blue3}
            style={{textAlign:'right',width:wpx(140)}}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: wpx(5) }}>
          <CustomText eh5 text="Phone Number" regular textColor={colors.grey} />
          <CustomText
            eh5
            text={getCandidateDetail?.phone_No ? getCandidateDetail?.phone_No : "+65- 9876 5432 10"}
            regular
          />
        </View>
        <View style={CandidateDetailStyle.horizontalLine}></View>
      </ScrollView>
      <View style={CandidateDetailStyle.btnContainer}>
        {activeButton ? (
          <CustomButton
            title={"Schedule"}
            onPress={() => onSchedule()}
            buttonStyle={{ width: wp(43), height: hpx(56) }}
          />
        ) : (
          <WhiteCustomButton
            title={"Schedule"}
            onPress={() => onSchedule()}
            buttonStyle={{
              width: wp(43),
              marginLeft: wpx(15),
              height: hpx(56),
              shadowOffset: {
                width: 3,
                height: 5,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6,
              elevation: 3,

              shadowColor: colors.shadow,
            }}
          />
        )}
        {activeButton1 ? (
          <CustomButton
            title={"Call"}
            onPress={() => onCall()}
            buttonStyle={{ width: wp(43), marginLeft: wpx(15), height: hpx(56) }}
          />
        ) : (
          <WhiteCustomButton
            onPress={() => onCall()}
            title={"Call"}
            buttonStyle={{
              width: wp(43),
              marginLeft: wpx(15),
              height: hpx(56),
              shadowOffset: {
                width: 3,
                height: 5,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6,
              elevation: 3,

              shadowColor: colors.shadow,
            }}
          />
        )}
      </View>
      <View style={CandidateDetailStyle.btnContainer1}>
        {activeButton2 ? (
          <CustomButton onPress={() => onEmail()} title={"Email"} buttonStyle={{ width: wp(43), height: hpx(56) }} />
        ) : (
          <WhiteCustomButton
            onPress={() => onEmail()}
            title={"Email"}
            // buttonStyle={{ width: wp(43), height: hpx(56) }}
            buttonStyle={{
              width: wp(43),
              //  marginLeft: wpx(15),
              height: hpx(56),
              shadowOffset: {
                width: 3,
                height: 5,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6,
              elevation: 3,

              shadowColor: colors.shadow,
            }}
          />
        )}
        {activeButton3 ? (
          <CustomButton
            onPress={() => onChat()}
            title={"Chat"}
            buttonStyle={{ width: wp(43), height: hpx(56), marginLeft: wpx(15) }}
          />
        ) : (
          <WhiteCustomButton
            onPress={() => onChat()}
            title={"Chat"}
            buttonStyle={{
              width: wp(43),
              marginLeft: wpx(15),
              height: hpx(56),
              shadowOffset: {
                width: 3,
                height: 5,
              },
              shadowOpacity: 0.6,
              shadowRadius: 6,
              elevation: 3,

              shadowColor: colors.shadow,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ShotListedCandidateDetail;
