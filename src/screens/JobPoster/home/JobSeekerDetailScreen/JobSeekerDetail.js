import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../../../../common/Header/Header";
import { fonts, nf, icons, wpx, hpx } from "../../../../constants/constant";
import SeekerCards from "../../../../common/SeekerCard/SeekerCard";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import { JobSeekerDetailStyle } from "./JobSeekerDetailStyles";
import { CustomText } from "../../../../common/CustomText/CustomText";

const Jobseeker = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const dispatch = useDispatch();
  const { getSeekerList, job_Id } = useSelector(
    state => ({
      getSeekerList: state.homeReducer.getSeekerList?.data,
      job_Id: state?.homeReducer?.reducerGetRecentJobDetail?.job_Id,
    }),
    shallowEqual,
  );
  console.log("getSeekerList", getSeekerList);
  const renderSeekerList = item => {
    return (
      <View style={{ marginVertical: hpx(15) }}>
        <SeekerCards props={item} />
      </View>
    );
  };

  console.log("job_Id--ttttt----", job_Id);

  useEffect(() => getData(), []);

  const getData = () => {
    setLoading(true);
  };

  const renderFooter = () => {
    return (
      <View style={JobSeekerDetailStyle.footer}>
        <TouchableOpacity activeOpacity={0.9} onPress={getData} style={JobSeekerDetailStyle.loadMoreBtn}>
          <CustomText text="Load More" oh4 semiBold style={JobSeekerDetailStyle.btnText} />
          {loading ? <ActivityIndicator color="white" style={{ marginLeft: 8 }} /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    dispatch({
      type: types.JOB_SEEKER_LISTING,
      payload: job_Id,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        leftIcon={icons.backIcon}
        title="Job Seeker"
        // headerStyle={{ marginHorizontal: wpx(20), marginTop: hpx(10), }}
        onLeftPress={() => navigation.goBack()}
      />

      <FlatList
        bounces={false}
        data={getSeekerList}
        numColumns={2}
        key={2}
        renderItem={renderSeekerList}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        style={{ marginTop: hpx(20) }}
        ListEmptyComponent={
          <View>
            <CustomText text="No Data found" style={{textAlign:'center'}}/>
          </View>
        }
        // ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default Jobseeker;
