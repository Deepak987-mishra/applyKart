import { Dimensions, PixelRatio, Platform } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 375;

const normalizeFont = size => {
  const newSize = size * scale;

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

// export const currencyFormat = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 2,
// });

const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

const widthFromPixel = (widthPx, w = 375) => {
  const newSize = widthPx * (SCREEN_WIDTH / w);

  return newSize;
};

const heightFromPixel = (heightPx, h = 812) => {
  const newSize = heightPx * (SCREEN_HEIGHT / h);

  return newSize;
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
//export const mobileRegex='^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
export const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
export const firstnameRegex = /^[a-zA-Z_ -]{3,40}$/;
export const lastnameRegex = /^[a-zA-Z_ -]{3,40}$/;

export const fonts = {
  black: "Poppins-Black",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
  light: "Poppins-Light",
  extraLight: "Poppins-ExtraLight",
  medium: "Poppins-Medium",
  thin: "Poppins-Thin",
  semiBold: "Poppins-SemiBold",
  semiBoldItalic: "Poppins-SemiBoldItalic",
  regular: "Poppins-Regular",
  lightItalic: "Poppins-LightItalic",
};

export const colors = {
  black1: "#313132",
  black: "#000",
  backwithopacity: "#7F7F7F",
  white: "#FFFFFF",
  grey: "#6F6F6F",
  offWhite: "#F3F5F9",
  buttonGradientColor1: "#0000FF",
  buttonGradientColor2: "##1CB5E0",
  blue: "#0F65ED",
  offWhite2: "#F6F5FB",
  backgroundShadow: "rgba(0,0,0,0.1)",
  inactiveDot: "#DADADA",
  black2: "#4C4C4C",
  matterHorn: "#4C4C4C",
  blue1: "#1CB3E0",
  blue3: "#116EEC",
  purple: "#9795FA",
  black4: "#000000",
  shadow: "#0000004D",
};

export const fontSizes = {
  //even font size
  eh1: 22,
  eh2: 20,
  eh3: 18,
  eh4: 16,
  eh5: 14,
  eh6: 12,
  eh7: 10,
  eh8: 8,
  //odd font size
  oh1: 23,
  oh2: 21,
  oh3: 19,
  oh4: 17,
  oh5: 15,
  oh6: 13,
  oh1: 11,
  oh8: 9,
};

export const icons = {
  eyeActive: require("../assets/images/eye_active.png"),
  eyeInactive: require("../assets/images/eye_inactive.png"),
  dropDown: require("../assets/images/drop_down.png"),
  nextArrow: require("../assets/images/next_arrow.png"),
  googleIcon: require("../assets/images/google.png"),
  facebookIcon: require("../assets/images/facebook.png"),
  appleIcon: require("../assets/images/apple.png"),
  backIcon: require("../assets/images/back.png"),
  cadidateIcon: require("../assets/images/candidate.png"),
  job_poster: require("../assets/images/job_poster.png"),
  dropDownIcon: require("../assets/images/drop_down.png"),
  dummy_vcard: require("../assets/images/dummy_vcard.png"),
  dummyOnboarding: require("../assets/images/dummy_onBoarding.jpg"),
  single_dose_active: require("../assets/images/single_dose_active.png"),
  double_dose_active: require("../assets/images/double_dose_active.png"),
  triple_dose_active: require("../assets/images/triple_dose_active.png"),
  not_vaccinated_active: require("../assets/images/not_vaccinated_active.png"),
  single_dose_inactive: require("../assets/images/single_dose_inactive.png"),
  double_dose_inactive: require("../assets/images/double_dose_inactive.png"),
  triple_dose_inactive: require("../assets/images/triple_dose_inactive.png"),
  not_vaccinated_inactive: require("../assets/images/not_vaccinated_inactive.png"),
  male_active: require("../assets/images/male_active.png"),
  female_active: require("../assets/images/female_active.png"),
  non_binary_active: require("../assets/images/non_binary_active.png"),
  male_inactive: require("../assets/images/male_inactive.png"),
  female_inactive: require("../assets/images/female_inactive.png"),
  non_binary_inactive: require("../assets/images/non_binary_inactive.png"),
  camera: require("../assets/images/Group.png"),
  checkBox: require("../assets/images/box.png"),
  selectedCheckBox: require("../assets/images/checkbox.png"),
  blueCard: require("../assets/images/card.png"),
  pattern: require("../assets/images/pattern.png"),
  placeholderUserImage: require("../assets/images/placeholderUserImage.png"),
  locationWhite: require("../assets/images/location.png"),
  locationGrey: require("../assets/images/material-location-on.png"),
  gender: require("../assets/images/gender.png"),
  single_dose_white: require("../assets/images/single_dose_white.png"),
  double_dose_white: require("../assets/images/double_dose_white.png"),
  triple_dose_white: require("../assets/images/triple_dose_white.png"),
  not_vaccinated_white: require("../assets/images/not_vaccinated_white.png"),
  radio_button_on: require("../assets/images/radio_button_on.png"),
  radio_button_off: require("../assets/images/radio_button_off.png"),
  plusIcon: require("../assets/images/plus.png"),
  bellNotificationIcon: require("../assets/images/notification1.png"),
  sideMenuIcon: require("../assets/images/side_menu.png"),
  bellNotificationIcon1: require("../assets/images/notification.png"),
  contactIcon: require("../assets/images/conatc_info.png"),
  threedoticon: require("../assets/images/3_dot.png"),
  union: require("../assets/images/Union.png"),
  location: require("../assets/images/locationIcon.png"),
  arrowRight: require("../assets/images/arrow_right.png"),
  attachImage: require("../assets/images/attach_image.png"),
  cross: require("../assets/images/cross.png"),
  search: require("../assets/images/search.png"),
  mail: require("../assets/images/mail.png"),
  launching_graphics: require("../assets/images/launching_graphics.png"),
  edit: require("../assets/images/edit.png"),
  availability: require("../assets/images/availability.png"),
  union1: require("../assets/images/Union1.png"),
  profilepic: require("../assets/images/8.png"),
  workExperienceIcon: require("../assets/images/work_experience.png"),
  education: require("../assets/images/education_detail.png"),
  work_from_home: require("../assets/images/work_from_home.png"),
  part_time: require("../assets/images/part_time.png"),
  night_shift: require("../assets/images/night_shift.png"),
  latest_jobs: require("../assets/images/latest_jobs.png"),
  heart: require("../assets/images/heart.png"),
  heart_inactive: require("../assets/images/heart_inactive.png"),
  share: require("../assets/images/share.png"),
  refer: require("../assets/images/refer.png"),
  cancel: require("../assets/images/cancel.png"),
  home: require("../assets/images/home.png"),
  logout: require("../assets/images/logout.png"),
  myProfile: require("../assets/images/profile.png"),
  myJob: require("../assets/images/my_job.png"),
  mesaages: require("../assets/images/message.png"),
  legal: require("../assets/images/legal.png"),
  arrowUp: require("../assets/images/arrow_up_white.png"),
  arrowDown: require("../assets/images/arrow_down_white.png"),
  calendar: require("../assets/images/calendar.png"),
  white_calendar: require("../assets/images/calendar_white.png"),
  filter: require("../assets/images/filter.png"),
  edit_white: require("../assets/images/edit_white.png"),
  experience_white: require("../assets/images/experience.png"),
  language_white: require("../assets/images/language.png"),
  night_shift_white: require("../assets/images/night_shift_white.png"),
  dummy_map: require("../assets/images/dummy_map.png"),
  cross_white: require("../assets/images/cross_white.png"),
  white_experience: require("../assets/images/experience_white.png"),
  skill_light: require("../assets/images/skill_light.png"),
  homeIcon: require("../assets/images/undraw_job_offers_re_634p.png"),
  akloading: require("../assets/images/akloading.gif"),
  portfolio: require("../assets/images/portfolio.png"),

};

export const apiStatusCode = {
  success: 200,
  created: 201,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  notModified: 304,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFount: 404,
  invalidRefreshToken: 410,
  invalidAccessToken: 417,
};

export {
  widthFromPixel as wpx,
  heightFromPixel as hpx,
  normalizeFont as nf,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
};

export const GooglePlacesKey = 'AIzaSyB7gbUYh5mOI5i5F3yI6fF25mg1bD3z_HU'