import { SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../../common/Header/Header'
import { SeekerPortfolioStyles } from './SeekerPortfolioStyles'
import { colors, icons, wpx } from '../../../../../constants/constant'
import { CustomText } from '../../../../../common/CustomText/CustomText'
import CustomTextInput from '../../../../../common/CustomTextInput/CustomTextInput'
import { CustomButton } from '../../../../../common/CustomButton/CustomButton'
import ImagePicker from "react-native-image-crop-picker";


const SeekerPortfolio = ({ navigation }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [portImage, setPortImage] = useState("")

    const openImagePicker = () => {
        ImagePicker.openPicker({
            height: 300,
            width: 300,
            cropping: true,
        }).then(image => {
            setPortImage({
                uri: Platform.OS == "android" ? image?.path : image?.sourceURL,
            });
        });
    };

    return (
        <SafeAreaView style={SeekerPortfolioStyles.mainContainer}>
            <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.navigate("SeekerLogin")} />
            <ScrollView
                style={SeekerPortfolioStyles.container}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ paddingBottom: wpx(50) }}>
                <View>
                    <CustomText text="My Portfolio" eh1 semiBold />
                </View>
                <View style={{ marginTop: wpx(20) }}>
                    <CustomText text="Title" oh5 medium />
                    <CustomTextInput
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Title"
                        style={SeekerPortfolioStyles.titleInputStyle}
                    />
                </View>
                <View style={{ marginTop: wpx(20) }}>
                    <CustomText text="Description" oh5 medium />
                    <CustomTextInput
                        multiline={true}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Write here..."
                        style={SeekerPortfolioStyles.multilineTextinput}
                    />
                </View>
                <View style={{ ...SeekerPortfolioStyles.portfolioView, alignItems: !portImage ? "stretch" : "center", }}>
                    <CustomText text="Attach Image" oh5 medium />
                    {!portImage ? <TouchableOpacity onPress={() => openImagePicker()} style={SeekerPortfolioStyles.attachImageButton} >
                        <Image source={icons.attachImage} style={{ marginRight: wpx(10) }} />
                        <CustomText text="Attach Image" eh6 medium />
                    </TouchableOpacity> :
                        <View style={SeekerPortfolioStyles.portfolioImageView}>
                            <Image source={portImage} style={SeekerPortfolioStyles.portfolioImage} />
                        </View>
                    }
                </View>
            </ScrollView>

            <CustomButton
                title="Next"
                nextIcon
                onPress={() => { }}
            />

        </SafeAreaView>
    )
}

export default SeekerPortfolio
