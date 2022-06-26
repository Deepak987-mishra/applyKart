import { View, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { colors, wpx, icons, hpx } from "../../../../constants/constant";
import { AcknowledgementStyle } from "./AcknowledgementStyles";
import Header from "../../../../common/Header/Header";
import Snackbar from "react-native-snackbar";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { types } from "../../../../store/action/ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, shallowEqual } from "react-redux";
import { SinglebuttonModal } from "../../../../common/CustomModal/CustomModal";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useFocusEffect } from "@react-navigation/native";

const Acknowledgement = ({ navigation, route }) => {
  const { editable, item } = route.params;
  const dispatch = useDispatch();
  const [cb, setcb] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { userId, jobpostReducer, loader, skipUploading, companyDetails } = useSelector(
    state => ({
      userId: state?.authReducer?.currentUser?.user_Id,
      jobpostReducer: state.jobpostReducer,
      loader: state.globalReducer.loader,
      skipUploading: state.globalReducer.skipUploadingDocument,
      companyDetails: state?.homeReducer?.companyDetails,
    }),
    shallowEqual,
  );

  console.log("companyDetails111", companyDetails?.abn);

  console.log("jobId==", item?.job_Id);

  // console.log("userId", userId);
  //const skipUploading = useSelector(state => state.globalReducer.skipUploadingDocument);

  useFocusEffect(
    useCallback(() => {
      let body = {
        userId: userId,
      };
      dispatch({
        type: types.GET_COMPANY_DETAILS,
        payload: body,
      });
    }, []),
  );

  const updateAcn = () => {
    setShowModal(!showModal) || navigation.navigate("UploadDocument");
  };

  const uploadDocument = () => {
    if (!cb) {
      Snackbar.show({ text: "Please Accept Terms and Conditions to proceed further ", duration: Snackbar.LENGTH_LONG });
    } else {
      setShowModal(true);
    }
  };
  const onSubmit = () => {
    if (!cb) {
      Snackbar.show({ text: "Please Accept Terms and Conditions to proceed further ", duration: Snackbar.LENGTH_LONG });
    } else {
      dispatch({
        type: types.TOGGLE_APP_LOADER,
        payload: true,
      });
      dispatch({
        type: types.POST_JOBS,
        userId: userId,
        payload: {
          Job_Title: jobpostReducer.fillJobDetail.jobTitle,
          Company: jobpostReducer?.fillInterviewDetail?.companyName,
          Location: jobpostReducer.fillJobAddress.jobLocation, // interview address city
          Posting_Date: new Date(),
          Contact_No: jobpostReducer.fillInterviewDetail.contactNumber,
          Description: jobpostReducer.fillCandidateDetail.description,
          Designation_Id: 1, //not mentioned
          // Salary_Offered: 7.9,
          Role: jobpostReducer.fillJobDetail.jobRole,
          Job_Type: jobpostReducer.fillJobDetail.jobtype,
          Min_Edu_Qualification: jobpostReducer.fillJobDetail.education,
          Min_Experience: jobpostReducer.fillJobDetail.experience,
          Work_Permit_Req: true, //not in ui
          Duration: 3, // not mention in ui
          No_Of_Vacancy: jobpostReducer.fillJobDetail.vacancies,
          Shift: 1, // not mentiones
          // Availablity: '{"monday":{"from":"06:00","to":"07:00"},"friday":{"from":"03:00","to":"05:00"}}',
          Availablity: JSON.stringify(jobpostReducer.fillJobAvailability.Availablity),
          // Interview_Location_Same: true,
          Interview_Option: 1, //not mention
          Intro_Video: "video", //
          vaccination_Type: jobpostReducer.fillCandidateDetail.vaccine,
          Company_Description: "great company", //not mention
          Address: jobpostReducer.fillJobAddress.jobLocation,
          Special_Requirement: JSON.stringify(jobpostReducer.fillCandidateDetail.specialRequirement),
          Category_id: jobpostReducer.fillJobDetail.category, // not mention
          Skill: JSON.stringify(jobpostReducer.fillCandidateDetail.jobSkills),
          // Interview_location: jobpostReducer.fillInterviewAddress.interviewLocation,
          Interview_address: jobpostReducer.fillJobAddress.selectLocation,
          visa_requirement: jobpostReducer.fillCandidateDetail.visaId, //not mention
          language_preference: jobpostReducer.fillJobDetail.language,
          Base: jobpostReducer.fillJobDetail.base,
          gender: jobpostReducer.fillJobDetail.gender,
          Salary_Offered: jobpostReducer.fillJobDetail.minimum,
          Max_Salary_Offered: jobpostReducer.fillJobDetail.maximum,
          email: jobpostReducer.fillInterviewDetail.email,
          // interview_location: jobpostReducer.fillInterviewAddress.email,
          latitude: jobpostReducer?.fillJobAddress?.latitude,
          longitude: jobpostReducer?.fillJobAddress?.longitude,
          city: jobpostReducer?.fillJobAddress?.jobCity,
          suburb: jobpostReducer?.fillJobAddress?.jobSuburb,
          recieve_applications_from: jobpostReducer?.fillInterviewDetail?.receivedRange,
        },
      });
    }
  };

  const onJobEdit = () => {
    if (!cb) {
      Snackbar.show({ text: "Please Accept Terms and Conditions to proceed further ", duration: Snackbar.LENGTH_LONG });
    } else {
      dispatch({
        type: types.TOGGLE_APP_LOADER,
        payload: true,
      });
      dispatch({
        type: types.EDIT_JOBS,

        payload: {
          job_id: item?.job_Id,
          Job_Title: jobpostReducer.fillJobDetail.jobTitle,
          Company: jobpostReducer?.fillInterviewDetail?.companyName,
          Location: jobpostReducer.fillJobAddress.jobLocation, // interview address city
          Posting_Date: new Date(),
          Contact_No: jobpostReducer.fillInterviewDetail.contactNumber,
          Description: jobpostReducer.fillCandidateDetail.description,
          Designation_Id: 1, //not mentioned
          // Salary_Offered: 7.9,
          Role: jobpostReducer.fillJobDetail.jobRole,
          Job_Type: jobpostReducer.fillJobDetail.jobtype,
          Min_Edu_Qualification: jobpostReducer.fillJobDetail.education,
          Min_Experience: jobpostReducer.fillJobDetail.experience,
          Work_Permit_Req: true, //not in ui
          Duration: 3, // not mention in ui
          No_Of_Vacancy: jobpostReducer.fillJobDetail.vacancies,
          Shift: 1, // not mentiones
          // Availablity: '{"monday":{"from":"06:00","to":"07:00"},"friday":{"from":"03:00","to":"05:00"}}',
          Availablity: JSON.stringify(jobpostReducer.fillJobAvailability.Availablity),
          // Interview_Location_Same: true,
          Interview_Option: 1, //not mention
          Intro_Video: "video", //
          vaccination_Type: jobpostReducer.fillCandidateDetail.vaccine,
          Company_Description: "great company", //not mention
          Address: jobpostReducer.fillJobAddress.jobLocation,
          Special_Requirement: JSON.stringify(jobpostReducer.fillCandidateDetail.specialRequirement),
          Category_id: jobpostReducer.fillJobDetail.category, // not mention
          Skill: JSON.stringify(jobpostReducer.fillCandidateDetail.jobSkills),
          // Interview_location: jobpostReducer.fillInterviewAddress.interviewLocation,
          Interview_address: jobpostReducer.fillJobAddress.selectLocation,
          visa_requirement: jobpostReducer.fillCandidateDetail.visaId, //not mention
          language_preference: jobpostReducer.fillJobDetail.language,
          Base: jobpostReducer.fillJobDetail.base,
          gender: jobpostReducer.fillJobDetail.gender,
          Salary_Offered: jobpostReducer.fillJobDetail.minimum,
          Max_Salary_Offered: jobpostReducer.fillJobDetail.maximum,
          email: jobpostReducer.fillInterviewDetail.email,
          // interview_location: jobpostReducer.fillInterviewAddress.email,
          latitude: jobpostReducer?.fillJobAddress?.latitude,
          longitude: jobpostReducer?.fillJobAddress?.longitude,
          city: jobpostReducer?.fillJobAddress?.jobCity,
          suburb: jobpostReducer?.fillJobAddress?.jobSuburb,
          recieve_applications_from: jobpostReducer?.fillInterviewDetail?.receivedRange,
        },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Header title="Acknowledgement" leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <ScrollView
        style={AcknowledgementStyle.mainContainer}
        bounces={false}
        contentContainerStyle={{ paddingBottom: hpx(150) }}>
        <SinglebuttonModal
          visible={showModal}
          heading={"ACN/ABN Updation"}
          onModalPress={() => setShowModal(!showModal)}
          modalText={
            "Mentioning your ABN/ACN will increase the chances of job applicants applying for jobs by 30% and let them post directly to your jobs!"
          }
          buttonText="Update"
          //  onButtonPress={() => navigation.navigate("UploadDocument")}
          onButtonPress={() => updateAcn()}
        />

        <View style={AcknowledgementStyle.mainTextView}>
          <CustomText
            text="1. If you have mentioned your number respond to the calls/WhatsApp when the candidate contacts you or if you have scheduled a meeting please be present during the meeting."
            regular
            oh5
          />
        </View>
        <View style={AcknowledgementStyle.textView}>
          <CustomText
            text="2. Videos uploaded are for screening purposed only and can't be shared or used to any other purpose."
            regular
            oh5
          />
        </View>
        <View style={AcknowledgementStyle.textView}>
          <CustomText text="3. Be polite and respectful to a candidate wanting to work for you." regular oh5 />
        </View>
        <View style={AcknowledgementStyle.textView}>
          <CustomText text="4. Deactivate the job once you have to stop interviewing for it." regular oh5 />
        </View>
        <View style={AcknowledgementStyle.textView}>
          <CustomText text="5. Not charge any money for any purpose of selecting and hiring." regular oh5 />
        </View>
        <View style={AcknowledgementStyle.bottomView}>
          <CustomText
            text="**Jobs automatically deactivated after 15days of posting. you can come back and reactivate them if candidate is still not selected."
            regular
            oh6
            textColor={colors.black2}
          />
        </View>
        <View style={AcknowledgementStyle.cbView}>
          <TouchableOpacity onPress={() => setcb(!cb)}>
            <Image resizeMode="contain" source={cb ? icons.selectedCheckBox : icons.checkBox} />
          </TouchableOpacity>
          <View>
            <View style={AcknowledgementStyle.btnText}>
              <CustomText text="I agree to Applykart terms and conditions and code of conduct." regular oh5 />
            </View>
          </View>
        </View>
        <View>{/* <CustomButton title="Remove" /> */}</View>
      </ScrollView>
      <CustomButton
        style={AcknowledgementStyle.buttonStyle}
        //disabled={!cb}t
        title={editable ? "Edit Job" : "Post"}
        nextIcon={true}
        loader={loader}
        onPress={() =>
          editable
            ? onJobEdit()
            : companyDetails?.abn == null || companyDetails?.acn == null
            ? uploadDocument()
            : onSubmit()
        }
        // onPress={() => onSubmit()}
      />
    </SafeAreaView>
  );
};

export default Acknowledgement;
