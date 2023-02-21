import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import "intl";
import "intl/locale-data/jsonp/en";


const data = [
  {
    id:"Uber-X-123",
    title: "UberX",
    multiplier:1,
    image:"https://links.papareact.com/3pn",
  },
  {
    id:"Uber-XL-456",
    title: "Uber XL",
    multiplier:1.2,
    image:"https://links.papareact.com/5w8",
  },
  {
    id:"Uber-LUX-789",
    title: "Uber LUX",
    multiplier:1.75,
    image:"https://links.papareact.com/7pf",
  },

  // for scroll View to appear properly uncomment below
  // {
  //   id:"Uber-LUX-789",
  //   title: "Uber LUX",
  //   multiplier:1.75,
  //   image:"https://links.papareact.com/7pf",
  // },

];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
    const[selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);


  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      {/* <ScrollView vertical> */}
        {/* <SafeAreaView style={tw`bg-white`}> */}
          <View style={tw`bg-white items-center flex-row p-3 ml-5`}>
            <TouchableOpacity 
              onPress={() => navigation.navigate("NavigateCard")}
              style={tw`top-1`}
            >
              <Icon name='chevron-left' type='fontawesome'/>
              {/* <Icon name='chevron-left' type='fontawesome' style={tw`mx-auto p-5`}/> */}
              {/* <Icon name='chevron-left' type='fontawesome'/> */}
            </TouchableOpacity>
            {/* <Text style={tw`text-center color-red mx-64 p-5 text-xl`}>Select a Ride.</Text> For Tablet */}
            <Text style={tw`text-xl font-semibold px-60`}>Select a Ride - {travelTimeInformation?.distance?.text}
            </Text>
          </View>

          <FlatList data={data} keyExtractor={(item) => item.id}
          
            renderItem={({item:{id, title, multiplier, image}, item }) => (
  
              <TouchableOpacity
                onPress={()=>setSelected(item)} 
                style={tw`flex-row justify-between items-baseline px-16 py-5 -mt-4`}>
                <Image 
                  style={{
                    width:100,
                    height:100,
                    resizeMode:"contain",
                    
                  }}
                  
                  source = {{ uri: image }}
                  
                  />
                  <View style={tw`-ml-7`}>
                    <Text style={tw`text-xl font-semibold `}>{title}</Text>
                    <Text>{travelTimeInformation?.duration?.text}</Text>
                  </View>
              <Text style={tw`text-xl mt-10`}>
                  {new Intl.NumberFormat('en-gb', {
                    style: 'currency',
                    currency: 'PKR',
                  }
                  ).format(
                    (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 5
                  )}


              </Text>
              </TouchableOpacity>
            
            )}
          
          />
      {/* </ScrollView> */}
      {/* </SafeAreaView> */}

      <View style={tw`mt-auto border-t border-gray-200`}>

        <TouchableOpacity 
          disabled={!selected }
          style={tw`bg-black py-3 m-3 rounded-full ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});

