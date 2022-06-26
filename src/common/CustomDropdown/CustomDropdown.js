import React, { useState } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import { hpx, wpx, wp, hp, nf, colors, icons, fonts } from "../../constants/constant";
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from "react-native-popup-menu";
import DropdownStyles from "./DropdownStyles";

// Common DropDown
const CustomDropdown = ({ style, ...props }) => {
  // get the current theme

  const [data, setData] = useState("");

  const { Popover } = renderers;
  return (
    <>
      <Menu
        renderer={Popover}
        anchorStyle
        rendererProps={{
          anchorStyle: { display: "none" },

          placement: props.placement,
        }}>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              backgroundColor: colors.white,
            },
          }}>
          <View
            style={{
              ...DropdownStyles.stateInputContainer,
              ...style,
            }}>
            <Text
              style={{
                ...DropdownStyles.titleText,
                color: colors.black,
                fontFamily: fonts.regular,
                fontSize: nf(14),
                marginLeft: wpx(10),
                ...props.textStyle,
              }}>
              {data ? data : props.title}
            </Text>
            <Image source={icons.dropDownIcon} style={DropdownStyles.dropDownIcon} />
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            ...DropdownStyles.optionsContainerStyle,
          }}>
          <FlatList
            data={props.data}
            keyExtractor={(item, index) => String(index)}
            ItemSeparatorComponent={() => {
              return <View style={DropdownStyles.itemSeperator} />;
            }}
            renderItem={({ item, index }) => (
              <MenuOption
                value={item?.name}
                key={index + ""}
                onSelect={val => {
                  setData(val), props.onSelect(val), props.onKeySelect ? props.onKeySelect(item?.id) : {};
                }}>
                <Text
                  style={{
                    ...DropdownStyles.optionsText,
                    fontFamily: fonts.regular,
                    fontSize: nf(14),
                    ...props.dropdownTextStyle,
                  }}>
                  {item?.name}
                </Text>
              </MenuOption>
            )}
          />
        </MenuOptions>
      </Menu>
    </>
  );
};

CustomDropdown.defaultProps = {
  onSelect: () => {},
  placement: "bottom",
};

export default CustomDropdown;
