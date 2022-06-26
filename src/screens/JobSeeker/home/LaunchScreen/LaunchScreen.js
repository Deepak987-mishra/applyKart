import { StyleSheet, Image, View, SafeAreaView } from 'react-native'
import React from 'react'
import { colors, hp, hpx, icons, wp } from '../../../../constants/constant'
import { CustomButton } from '../../../../common/CustomButton/CustomButton'
import { CustomText } from '../../../../common/CustomText/CustomText'
import { LaunchScreenStyles } from './LaunchScreenStyles'

const LaunchScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={LaunchScreenStyles.mainContainer}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={icons.launching_graphics} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <CustomText eh2 semiBold text="Launching soon!" style={{ marginVertical: hpx(20) }} />
                    <CustomText eh5 regular text="Lorem Ipsum is simply dummy text of the printing and typesetting industry." textColor={colors.matterHorn} style={{ width: wp(80), textAlign: "center" }} />

                    <CustomButton onPress={() => navigation.replace("DrawerNav", { screen: "Home" })}
                        title="Go to Home" style={{ marginVertical: hpx(20) }} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default LaunchScreen

const styles = StyleSheet.create({})