import React, {useState, useRef} from 'react';

import {
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';

var mainArray = [];

export default function DummyFile() {
  const inputRef = useRef();
  const [InputDATA, setInputData] = useState(' ');

  const addElementToArray = () => {
    mainArray.push(InputDATA.toString());
    inputRef.current.clear();
  };
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
      <Text style={styleSheet.text}>
        {' '}
        Add TextInput Item To Array in React Native{' '}
      </Text>

      <TextInput
        ref={inputRef}
        placeholder="Enter Value here"
        onChangeText={item => setInputData(item)}
        style={styleSheet.textInput}
        onSubmitEditing={() => addElementToArray()}
      />

      {mainArray.map((item, index) => (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text>{item}</Text>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20,
  },

  textInput: {
    textAlign: 'center',
    marginBottom: 20,
    height: 44,
    width: '88%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
  },
});
