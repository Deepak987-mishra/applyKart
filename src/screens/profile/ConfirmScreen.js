import React, {useState} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {darkColors} from '../../config';
import {TextElement} from '../../components/text/Text';
import {UserCard} from '../../components/cards';
import {CustomButton} from '../../components/buttons';
import {CustomDropDown} from '../../components/dropdown';
import {CustomView} from '../../components/view';

const ConfirmScreen=(props)=>{
    return(
        <CustomView isFullView>
                <UserCard/>
        </CustomView>
    );
}

export default ConfirmScreen;