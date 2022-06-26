import { StyleSheet } from "react-native";
import { colors, wpx, wp, hp, hpx, nf, fonts } from "../../constants/constant";

export default CustomModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: wpx(335),
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wpx(10),

    paddingVertical: wpx(15),
    shadowColor: "#0000004D",

    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },

  text: {
    width: wpx(250),
    marginTop: hpx(15),
    textAlign: "center",
    color: colors.grey,
    textAlign:'center',
  },
  headingDoubleButton: {
    width: wpx(230),
    textAlign: "center",
  },
  heading: {
    width: wpx(265),
    textAlign: "center",
  },
  outLineButton: {
    width: wpx(60),
  },
  doublePinkButton: {
    width: wpx(60),
  },
  singleButton: {
    paddingTop: hpx(20),
    fontFamily: fonts.medium,
    fontSize: nf(16),
  },
  doubleRowButton: {
    flexDirection: "row",

    marginTop: hpx(20),
  },
  textSubHeading: {
    width: wpx(230),
    // marginTop: hpx(15),
    textAlign: "center",
    backgroundColor: "red",
  },
  doubleRowButtonView: {
    elevation: 3
  }
});
