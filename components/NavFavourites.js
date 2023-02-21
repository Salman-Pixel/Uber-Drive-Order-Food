import React, { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import RideOptionsCard from './RideOptionsCard';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Sector G-9/1, Street 49, Islamabad",
    // destination: "33.6938, 73.0653",
    coordinates: {
        latitude: 33.702817,
        longitude: 73.047606,
      }
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Sector I-9, STP, Islamabad",
    coordinates: {
        latitude: 13.702817,
        longitude: 37.047606,
      }
  },
  {
    id: "789",
    icon: "business",
    location: "Business",
    destination: "Olympus, F-11, Islamabad",
    coordinates: {
        latitude: 93.702817,
        longitude: 11.047606,
      }
  },
  {
    id: "101",
    icon: "football",
    location: "Game",
    destination: "Total, F-6, Islamabad",
    coordinates: {
        latitude: 18.702817,
        longitude: 65.047606,
      }
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

    
//     mapRef.current.fitToSuppliedMarkers([origin, data.coordinates]), {
//         edgePadding: { top: 190, right: 50, bottom: 90, left: 50 },}
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination); 

//   const mapRef = useRef();   

//       useEffect(() => {
//           if (!origin || !destination) {return;}
          
//           setTimeout(() => {
//               mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
//                   edgePadding: { top: 190, right: 50, bottom: 90, left: 50 },
//               });

//           }, 500);
//     }, [origin, destination]);


//   const handlePress = (destination) => {
//     dispatch(setDestination(destination));
//     navigation.navigate('MapScreen');
//   };

  const handlePress = (destination) => {
    dispatch(setDestination({
      description: destination,
      location: destination.coordinates,
    }));

    navigation.navigate('MapScreen');
  };
  

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.8 }]} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => handlePress(destination)}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
