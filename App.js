// App.js
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./stack/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <StatusBar style="dark" />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          <Toast
            ref={(ref) => Toast.setRef(ref)}
            visibilityTime={3000}
            swipeable={true}
            position="bottom"
          />
        </PaperProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default App;
