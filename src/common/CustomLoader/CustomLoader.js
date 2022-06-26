import React, { useEffect } from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../constants/constant";

const ProgressBar = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={() => {
        props.toggleFuction(false);
      }}
      onDismiss={() => {}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.1)" }}>
        <ActivityIndicator animating={true} size="large" color={colors.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewParent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressBar;
