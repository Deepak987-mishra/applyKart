import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, Image, Pressable} from 'react-native';
import {darkColors, lightColors} from '../../config';
import {TextElement} from '../../components/text/Text';
import {hpx, wpx} from '../../components/helpers';
import {screenWidth} from '../../components/helpers/ratio';
import {UserCard} from '../../components/cards';
import {CustomTextInput} from '../../components/textInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton} from '../../components/buttons';
import {CustomDropDown} from '../../components/dropdown';
import {profileStack} from '../../config/navigator';
import Visa from '../../mock/Visa';
import CustomModal from '../../components/modal/Modal';
import Months from '../../mock/Months';

const WorkDetails = ({route, navigation}, props) => {
  const [firstName, setfirstName] = useState(route.params.firstName);
  const [lastName, setlastName] = useState(route.params.lastName);
  const [gender, setgender] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [months, setmonths] = useState('');
  const [jobRole, setjobRole] = useState('');
  const [specialization, setspecialization] = useState('');
  const [workedBefore, setworkedBefore] = useState('');
  const [visastatus, setvisastatus] = useState(false);
  const [visatype, setvisatype] = useState('');
  const [monthstatus, setmonthstatus] = useState('');

  return (
    <KeyboardAwareScrollView
      bounces={true}
      showsVerticalScrollIndicator={false}
      overScrollMode="never">
      <CustomModal
        visible={visastatus}
        list={Visa}
        onPress={item => {
          setvisatype(item.title), setvisastatus(false);
        }}></CustomModal>
      <CustomModal
        visible={monthstatus}
        list={Months}
        onPress={item => {
          setmonthstatus(false), setmonths(item.title);
        }}></CustomModal>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.topView}>
          <TextElement h3 semibold h3Style={{color: darkColors.colors.black1}}>
            Work Details
          </TextElement>
          <TextElement
            h5
            regular
            h5Style={{color: darkColors.colors.grey, marginTop: 10}}>
            Please add your work details here.
          </TextElement>
          <UserCard
            firstname={firstName == '' ? 'Your' : firstName}
            lastname={lastName == '' ? ' Name' : ' ' + lastName}
            firstTitle={
              months == '' ? 'Total work experience' : months + ' month'
            }
            secondTitle={companyName == '' ? 'Company name' : companyName}
            thirdTitle={
              specialization == '' ? 'Job specialization' : specialization
            }
            jobrole={jobRole == '' ? 'Job Role' : jobRole}
          />
          <TextElement medium h5 h5Style={{color: darkColors.colors.black}}>
            Have you worked before?
          </TextElement>
          <View style={styles.checkBoxSelection}>
            <Pressable onPress={() => setworkedBefore('Yes')}>
              <View style={styles.checkBoxOption}>
                <Image
                  style={styles.radioButtonImage}
                  resizeMode="contain"
                  source={
                    workedBefore == 'Yes'
                      ? require('../../assets/images/common/radio_botton_on.png')
                      : require('../../assets/images/common/radio_botton_off.png')
                  }
                />
                <TextElement
                  h6
                  regular
                  h6Style={{color: darkColors.colors.black, marginLeft: 10}}>
                  Yes
                </TextElement>
              </View>
            </Pressable>
            <Pressable onPress={() => setworkedBefore('No')}>
              <View style={styles.checkBoxOption}>
                <Image
                  style={styles.radioButtonImage}
                  resizeMode="contain"
                  source={
                    workedBefore == 'No'
                      ? require('../../assets/images/common/radio_botton_on.png')
                      : require('../../assets/images/common/radio_botton_off.png')
                  }
                />
                <TextElement
                  h6
                  regular
                  h6Style={{color: darkColors.colors.black, marginLeft: 10}}>
                  No
                </TextElement>
              </View>
            </Pressable>
          </View>
          <TextElement
            medium
            h5
            h5Style={{color: darkColors.colors.black, marginTop: 20}}>
            Visa type
          </TextElement>
          <CustomDropDown
            title={visatype == '' ? 'Select visa type' : visatype}
            onPress={() => setvisastatus(true)}
          />
          <TextElement
            medium
            h5
            h5Style={{color: darkColors.colors.black, marginTop: 20}}>
            Total work experience
          </TextElement>
          <CustomDropDown
            title={months == '' ? 'Select months' : months}
            onPress={() => setmonthstatus(true)}
          />
          <CustomTextInput
            placeholder="Company name"
            onChangeText={text => setcompanyName(text)}
          />
          <CustomTextInput
            placeholder="Job role"
            onChangeText={text => setjobRole(text)}
          />
          <CustomTextInput
            placeholder="Job specialization"
            onChangeText={text => setspecialization(text)}
          />
          <View style={styles.checkBoxSelection}>
            <View style={styles.dateView}>
              <TextElement h6 h6Style={{color: darkColors.colors.black2}}>
                Start date
              </TextElement>
              <Image
                style={styles.radioButtonImage}
                resizeMode="contain"
                source={require('../../assets/images/profile/calendar.png')}
              />
            </View>
            <View style={styles.dateView}>
              <TextElement h6 h6Style={{color: darkColors.colors.black2}}>
                End date
              </TextElement>
              <Image
                style={styles.radioButtonImage}
                resizeMode="contain"
                source={require('../../assets/images/profile/calendar.png')}
              />
            </View>
          </View>
          {/* <View style={styles.addmore}>
            <TextElement h4 medium h4Style={{color:darkColors.colors.black,marginLeft:10}} >Add more</TextElement>
            <Image style={styles.radioButtonImage} resizeMode="contain" source={  require('../../assets/images/profile/calendar.png') }/>
          </View> */}

          <View style={styles.marginView}></View>
          <CustomButton
            buttonText="Next"
            onPress={() =>
              navigation.navigate(profileStack.educationalData, {
                firstName: firstName,
                lastName: lastName,
              })
            }
          />
          <View style={styles.marginView}></View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: lightColors.colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContainer: {
    borderWidth: 1,
    height: hpx(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 120,
    width: '100%',
  },
  backgroundCard: {
    height: hpx(230),
    width: wpx(screenWidth / 1.06),
  },
  foregroundCard: {height: '100%', width: '100%'},

  marginView: {marginTop: 20},
  checkBoxSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  checkBoxOption: {
    width: screenWidth / 2.3,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  dateView: {
    width: screenWidth / 2.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: lightColors.colors.offWhite2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  radioButtonImage: {
    height: 20,
    width: 20,
  },
  addmore: {
    borderWidth: 1,
    height: 50,
    width: '100%',
    flexDirection: 'row-reverse',
    marginTop: 10,
    alignItems: 'center',
  },
});

export default WorkDetails;
