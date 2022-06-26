import {
  View,
  Modal,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SelectJobTypeStyles } from "./SelectJobTypeStyles";
import Header from "../../../../common/Header/Header";
import { fonts, wpx, hpx, icons, wp, hp, colors } from "../../../../constants/constant";
import { CustomText } from "../../../../common/CustomText/CustomText";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import CustomBottomModal from "../../../../common/CustomBottomModal/CustomBottomModal";
import { BottomModal } from "../../../../common/BottomModal/BottomModal";
import { types } from "../../../../store/action/ActionTypes";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";

const SelectJobType = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isEdit } = route.params
  const { categoryList, jobseekerDetail, subcategoryList, loader } = useSelector(
    state => ({
      categoryList: state.jobseekerReducer.categoryList,
      jobseekerDetail: state.jobseekerReducer.jobSeekerDetail,
      subcategoryList: state.jobseekerReducer.subcategoryList,
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  const jobTypeList = [
    { id: 1, image: "https://reqres.in/img/faces/1-image.jpg", jobType: "Plumber" },
    { id: 2, image: "https://reqres.in/img/faces/2-image.jpg", jobType: "Beautician" },
    { id: 3, image: "https://reqres.in/img/faces/3-image.jpg", jobType: "Artist" },
    { id: 4, image: "https://reqres.in/img/faces/4-image.jpg", jobType: "Freelance" },
    { id: 5, image: "https://reqres.in/img/faces/5-image.jpg", jobType: "Delivery boy" },
    { id: 6, image: "https://reqres.in/img/faces/6-image.jpg", jobType: "Artist" },
    { id: 7, image: "https://reqres.in/img/faces/1-image.jpg", jobType: "Plumber" },
    { id: 8, image: "https://reqres.in/img/faces/2-image.jpg", jobType: "Beautician" },
    { id: 9, image: "https://reqres.in/img/faces/3-image.jpg", jobType: "Artist" },
    { id: 2, image: "https://reqres.in/img/faces/2-image.jpg", jobType: "Beautician" },
    { id: 3, image: "https://reqres.in/img/faces/3-image.jpg", jobType: "Artist" },
    { id: 4, image: "https://reqres.in/img/faces/4-image.jpg", jobType: "Freelance" },
    { id: 5, image: "https://reqres.in/img/faces/5-image.jpg", jobType: "Delivery boy" },
    { id: 6, image: "https://reqres.in/img/faces/6-image.jpg", jobType: "Artist" },
    { id: 7, image: "https://reqres.in/img/faces/1-image.jpg", jobType: "Plumber" },
    { id: 8, image: "https://reqres.in/img/faces/2-image.jpg", jobType: "Beautician" },
    { id: 9, image: "https://reqres.in/img/faces/3-image.jpg", jobType: "Artist" },
  ];

  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(categoryList);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalJobImage, setModalJobImage] = useState("");
  const [modalItem, setModalItem] = useState("");
  const [modalSkills, setModalSkills] = useState([]);
  const [prefJobCategory, setPrefJobCategory] = useState("");
  const [prefJobSubCategory, setPrefJobSubCategory] = useState("");

  useEffect(() => {
    dispatch({
      type: types.GET_CATEGORY_LIST,
    });
  }, []);

  const filterJobType = text => {
    if (text.length >= 1) {
      setSearch(text);
      const data = filteredSearch.filter(x => x?.job_Category.includes(text));
      setFilteredSearch(data);
    } else {
      setSearch(text);
      setFilteredSearch(jobTypeList);
    }
  };

  const vcardJobType = {
    User_Id: jobseekerDetail?.user_Id,
    Prefered_Job_Subcategory: JSON.stringify(modalSkills),
    Prefered_Job_Category: JSON.stringify(prefJobCategory),
  };

  const openJobTypeModal = (item, index) => {
    dispatch({
      type: types.GET_SUB_CATEGORY_LIST,
      payload: item?.job_Category_id,
    });
    setModalVisible(true);
    setModalJobImage(`https://reqres.in/img/faces/${index + 1}-image.jpg`);
    setModalItem(item);
    setPrefJobCategory(item?.job_Category);
  };

  const onChange = (item, index) => {
    let array = [...modalSkills];
    array.includes(item?.job_Subcategory)
      ? array.splice(array.indexOf(item?.job_Subcategory), 1)
      : array.push(item?.job_Subcategory);
    setModalSkills(array);
  };

  const renderJobTypeSkills = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onChange(item, index)}>
        <View style={{ flexDirection: "row", marginVertical: hpx(10) }}>
          <Image
            resizeMode="contain"
            source={modalSkills.includes(item.job_Subcategory) ? icons.selectedCheckBox : icons.checkBox}
          />
          <CustomText eh5 regular text={item?.job_Subcategory} style={{ marginLeft: wpx(10) }} />
        </View>
      </TouchableOpacity>
    );
  };

  const ModalView = ({ item }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: wpx(20) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: hpx(20) }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: modalJobImage }} style={{ height: wpx(60), width: wpx(60) }} />
            <CustomText eh5 medium text={item?.jobType} style={{ alignSelf: "center", marginLeft: wpx(20) }} />
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image source={icons.cancel} />
          </TouchableOpacity>
        </View>

        <FlatList data={subcategoryList} renderItem={({ item, index }) => renderJobTypeSkills(item, index)} />
        <CustomButton
          loader={loader}
          title="Continue"
          nextIcon
          onPress={() => submitVcardJobtype()}
          style={{ marginBottom: wpx(20) }}
        />
      </ScrollView>
    );
  };

  const renderJobType = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => openJobTypeModal(item, index)}
        style={{ alignItems: "center", justifyContent: "center", marginRight: wpx(20) }}>
        <Image
          source={{ uri: `https://reqres.in/img/faces/${index + 1}-image.jpg` }}
          style={{ height: wpx(100), width: wpx(100), borderRadius: wpx(10) }}
        />
        <CustomText
          text={
            ((item?.job_Category).length > 12) ?
              (((item?.job_Category).substring(0, 12 - 3)) + '...') :
              item?.job_Category
          }
          oh5
          medium
          style={{ width: wpx(99), height: wpx(25) }}
          lines={1}
        />
      </TouchableOpacity>
    );
  };

  const submitVcardJobtype = () => {

    // if (prefJobCategory) {
    dispatch({
      type: types.POST_SEEKER_CATEGORY_JOB_TYPE,
      payload: vcardJobType,
    });
    loader == false ? setModalVisible(false) : null
    // } else {
    //   Snackbar.show({ text: "Please enter all details", backgroundColor: "#1CB5E0", duration: Snackbar.LENGTH_LONG });
    // }
  };

  return (
    <SafeAreaView style={SelectJobTypeStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={SelectJobTypeStyles.container}>
        <View>
          <CustomText eh1 text="Select Job Type" style={SelectJobTypeStyles.mainHeading} />
          <CustomText text="Please select what type of jobs are you looking for?" regular oh5 textColor={colors.grey} />
        </View>

        <CustomTextInput
          value={search}
          type="search"
          placeholder="Search job type"
          onChangeText={text => setSearch(text)}
          style={{ marginTop: hpx(30) }}
        />

        <CustomText text="All job type" oh5 regular textColor={colors.matterHorn} style={{ marginVertical: hpx(20) }} />

        <View style={{}}>
          <FlatList numColumns={3} data={categoryList?.jobCategories} renderItem={renderJobType} />
        </View>
      </ScrollView>
      <CustomButton
        loader={loader}
        onPress={() => submitVcardJobtype()}
        nextIcon={true}
        title="Next"
        style={{ marginBottom: hpx(10) }}
      />

      <BottomModal visible={modalVisible} modalViewStyle={{ height: wp(100), marginBottom: -wpx(30) }}>
        {/* <View>
                    <Image source={{ uri: modalJobImage }} style={{ height: wpx(60), width: wpx(60) }} />
                    <CustomText />
                </View> */}
        <ModalView item={modalItem} />
      </BottomModal>
    </SafeAreaView>
  );
};

export default SelectJobType;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
