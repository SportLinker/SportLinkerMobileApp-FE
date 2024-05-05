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

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <StatusBar style="dark" />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default App;
