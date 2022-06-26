import React, {useState,useEffect, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../../common/Header/Header';
import {hpx, wpx, wp, hp, fonts, icons, colors} from '../../../../constants/constant';
import {CustomButton} from '../../../../common/CustomButton/CustomButton';
import {WhiteCustomButton} from '../../../../common/CustomButton/CustomButton';
import {useSelector,shallowEqual,useDispatch } from 'react-redux';
import { types } from '../../../../store/action/ActionTypes';
import {CandidateDetailStyle} from './CandidateDetailStyle';
import { CustomText } from '../../../../common/CustomText/CustomText';
import CustomDropdown from '../../../../common/CustomDropdown/CustomDropdown';
import {InterviewScheduleStyle} from './InterviewScheduleStyle';
import CustomTextInput from '../../../../common/CustomTextInput/CustomTextInput';
import DatePicker from 'react-native-date-picker'

const InterviewSchedule = ({navigation,route }) => {
const [date, setDate] = useState(new Date())
const [open, setOpen] = useState(false)

  return (
    <SafeAreaView style={InterviewScheduleStyle.mainContainer}>
        <Header
        leftIcon={icons.backIcon}
        // rightIcon={icons.threedoticon}
       
        onLeftPress={() => navigation.goBack()}
      />
     <View style={InterviewScheduleStyle.Heading}>
     <CustomText eh3 text="Schedule an interview"  semiBold />
     </View>
     <TouchableOpacity style={InterviewScheduleStyle.Heading1} onPress={() => setOpen(true)}>
     <Text style={InterviewScheduleStyle.txt}>{date}</Text>
     </TouchableOpacity>
     <View style={InterviewScheduleStyle.subHead}>
     <CustomText oh5 text="Interview Time Slot"  semiBold />
     </View>
     <View>
         <View style={InterviewScheduleStyle.btnContainer}>
         <TouchableOpacity style={InterviewScheduleStyle.btn1} >
     <Text style={InterviewScheduleStyle.txt}>fromTime</Text>
     </TouchableOpacity>
     <TouchableOpacity style={InterviewScheduleStyle.btn1}>
     <Text style={InterviewScheduleStyle.txt}>toTime</Text>
     </TouchableOpacity>
         </View>
  
     </View>
     <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onDateChange={setDate}
        onCancel={() => {
          setOpen(false)
        }}
      />
     
     <View style={InterviewScheduleStyle.btnContainer}>
         <TouchableOpacity style={InterviewScheduleStyle.btn}>
         <CustomText oh5 text="Confirm" semiBold />
         </TouchableOpacity>
         <View style={ButtonStyles.buttonInsideView}>
        </View>
        </View>
    </SafeAreaView>
  );
};

export default InterviewSchedule;
