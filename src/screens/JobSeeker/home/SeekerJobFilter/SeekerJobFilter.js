import { StyleSheet, SafeAreaView, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SeekerJobFilterStyles } from './SeekerJobFilterStyles'
import Header from '../../../../common/Header/Header'
import { colors, hp, hpx, icons, wp, wpx } from '../../../../constants/constant'
import { CustomText } from '../../../../common/CustomText/CustomText'
import CustomDropdown from '../../../../common/CustomDropdown/CustomDropdown'
import CustomTextInput from '../../../../common/CustomTextInput/CustomTextInput'
import { CustomButton } from '../../../../common/CustomButton/CustomButton'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { FlatList } from 'react-native-gesture-handler'

const SeekerJobFilter = ({ navigation }) => {

    const categoryList = [
        { id: 0, category: "Accounts" },
        { id: 1, category: "Analysis" },
        { id: 2, category: "Programming" },
        { id: 3, category: "Chef" },
        { id: 4, category: "Repairer" },
        { id: 5, category: "Beauticians" },
    ]

    const locationList = [
        { id: 1, name: 'New Delhi' },
        { id: 2, name: 'Noida' },
        { id: 3, name: 'Faridabad' },
        { id: 4, name: 'Ghaziabad' },
        { id: 5, name: 'Gurgaon' },
    ];

    let categoryArray = new Set()
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')
    const [jobType, setJobType] = useState('Part Time')
    const [multiSliderValue, setMultiSliderValue] = useState([500, 800]);
    const multiSliderValuesChange = (values) => setMultiSliderValue(values);
    const [modalSkills, setModalSkills] = useState([])
    const [filteredCategoryList, setFilteredCategoryList] = useState(categoryList)

    const CustomSliderMarkerLeft = () => {
        return (
            <View style={{ height: hpx(20), width: hpx(20), borderRadius: hpx(10), backgroundColor: "#252728" }} />
        )
    }
    const pushcat = (cat) => {
        categoryArray.add(cat)
    }

    const onChange = (item, index) => {
        let array = [...modalSkills];
        array.includes(item)
            ? array.splice(array.indexOf(item), 1)
            : array.push(item);
        setModalSkills(array);
    };

    const rendercategoryList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onChange(item?.id)} style={SeekerJobFilterStyles.categoryTouchView}>
                <Image
                    resizeMode="contain"
                    source={
                        modalSkills.includes(item.id)
                            ? icons.selectedCheckBox
                            : icons.checkBox
                    }
                />
                <CustomText eh5 regular text={item?.category} style={{ marginLeft: wpx(5) }} />
            </TouchableOpacity>
        )
    }

    const filterCategoryList = (text) => {
        const data = categoryList.filter(x => x?.category.includes(text))
        setFilteredCategoryList(data)
    }

    return (
        <SafeAreaView style={SeekerJobFilterStyles.mainContainer}>
            <Header
                    leftIcon={icons.backIcon}
                    title="Filter"
                    onLeftPress={() => navigation.navigate('SeekerHome')}
                />
            <View style={SeekerJobFilterStyles.container}>
                
            </View>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                <View style={SeekerJobFilterStyles.mainFilterShadowView}>
                    <View style={SeekerJobFilterStyles.filterInsideView}>
                        <CustomText oh5 medium text="Location" />
                        <CustomDropdown data={locationList} title="Select location" style={{ marginVertical: hpx(10) }} onSelect={(text) => setLocation(text)} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <CustomText oh5 medium text="Salary Range" style={SeekerJobFilterStyles.salaryRangeView} />
                            <CustomText oh6 regular text={'$ ' + multiSliderValue[0] + '-$ ' + multiSliderValue[1]} style={SeekerJobFilterStyles.salaryRangeView} />
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <MultiSlider
                                trackStyle={{ backgroundColor: "#F6F5FB", height: hpx(5), borderRadius: hpx(8) }}
                                selectedStyle={{ backgroundColor: "#252728" }}
                                step={50}
                                values={[multiSliderValue[0], multiSliderValue[1]]}
                                snapped={true}
                                customMarker={() => <CustomSliderMarkerLeft />}
                                sliderLength={wp(85)}
                                onValuesChange={multiSliderValuesChange}
                                min={200}
                                max={2000}
                                allowOverlap={false}
                                minMarkerOverlapDistance={100}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: hpx(10) }}>
                            <CustomText oh6 regular text={`$ 0`} />
                            <CustomText oh6 regular text={`$ 2000`} />
                        </View>
                        <CustomText oh5 medium text="Category" style={{}} />
                        <CustomTextInput onChangeText={(text) => filterCategoryList(text)} type="search" placeholder="Select category" style={{ marginTop: hpx(10) }} />

                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

                            <FlatList
                                numColumns={2}
                                data={filteredCategoryList}
                                renderItem={rendercategoryList}
                            />
                        </View>

                        <CustomText oh5 medium text="Type" style={SeekerJobFilterStyles.typetextStyle} />
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setJobType('Part Time')} style={SeekerJobFilterStyles.jobTypeMainView}>
                                    <Image source={jobType == 'Part Time' ? icons.radio_button_on : icons.radio_button_off} />
                                    <CustomText eh5 regular text="Part Time" style={{ marginLeft: wpx(10) }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setJobType('Full Time')} style={SeekerJobFilterStyles.jobTypeMainView}>
                                    <Image source={jobType == 'Full Time' ? icons.radio_button_on : icons.radio_button_off} />
                                    <CustomText eh5 regular text='Full Time' style={{ marginLeft: wpx(10) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setJobType('Freelance')} style={SeekerJobFilterStyles.jobTypeMainView}>
                                    <Image source={jobType == 'Freelance' ? icons.radio_button_on : icons.radio_button_off} />
                                    <CustomText eh5 regular text='Freelance' style={{ marginLeft: wpx(10) }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setJobType('On off basis')} style={SeekerJobFilterStyles.jobTypeMainView}>
                                    <Image source={jobType == 'On off basis' ? icons.radio_button_on : icons.radio_button_off} />
                                    <CustomText eh5 regular text='On off basis' style={{ marginLeft: wpx(10) }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <CustomButton onPress={() => navigation.navigate('SeekerHome')} title="Apply" style={{ marginTop: hpx(20) }} />

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default SeekerJobFilter

const styles = StyleSheet.create({})