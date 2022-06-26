// import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/configureStore";
import { LogBox, StatusBar, SafeAreaView } from "react-native";
import RootStack from "./navigation/main-stack";
import { MenuProvider } from "react-native-popup-menu";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(["Sending `onReanimatedPropsChange` with no listeners registered."]);

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent backgroundColor="white" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MenuProvider>
            <RootStack />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
