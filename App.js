import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import RideOptionsCard from './components/RideOptionsCard';




export default function App() {
    const stack = createNativeStackNavigator();
      return (
        // <SafeAreaView>
          
          <Provider store={store}>

            <NavigationContainer>
              <SafeAreaProvider>
                <KeyboardAvoidingView 
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{flex:1}}
                  keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                >
                <stack.Navigator>
                  <stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <stack.Screen
                    name='MapScreen'
                    component={MapScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </stack.Navigator>

                </KeyboardAvoidingView>
                     
                {/* <HomeScreen /> */}
              </SafeAreaProvider>
            </NavigationContainer>

          </Provider>

      /* </SafeAreaView> */



      );
    }

//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
// }
// );



