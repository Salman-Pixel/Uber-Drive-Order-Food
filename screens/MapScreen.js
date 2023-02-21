import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const MapScreen = () => {
  
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  
  return (
    
    <View>
      {/* <Text style={tw`p-2 mt-10`} >Here's the Map Screen.</Text> */}
        <View style={{position: 'absolute',  top:20 ,  left: 10,  elevation: 5, zIndex: 4, padding: 3,}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')} 
            style={tw`rounded-full p-3 bg-gray-100 shadow-xl`}>
            <Icon name="home" />
          </TouchableOpacity>
        </View>

      {/* the below View is for the map half half */}
      <View style = {tw `h-1/2`} >
        <Map />
        
      </View>

      {/* the below view is for the map location deatails */}
      <View style = {tw `h-1/2`} >
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options = {{
              headerShown: false,
              
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options = {{
              headerShown: false,
            }}
          />
        </Stack.Navigator>

      </View>


    </View>
  )
}

export default MapScreen;

const styles = StyleSheet.create({});