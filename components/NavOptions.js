import React from "react";
import tw from 'tailwind-react-native-classnames';
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data=[
    {
        id: "123",
        title: "Get a Ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
        
    },
    {
        id: "456",
        title: "Order Food",
        color: "red",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
        
    },
    
];


const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

  return (
    // <View><Text>This is Nav </Text>
    //         <TouchableOpacity>
    //         <Text>{item.id}</Text>
    //     </TouchableOpacity>
    
    // </View>

    <FlatList
    data = {data}
    horizontal
    keyExtractor={(item)=>item.id}
    renderItem={({item}) => (
        <TouchableOpacity
            onPress={ () => navigation.navigate(item.screen)} 
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-1 w-36 rounded-2xl`} 
            disabled={!origin}
            >
            
                <View style={tw`${!origin && "opacity-20"}`} >
                    <Image
                        style={{ width:90, height:90, resizeMode:"contain"}}
                        source={{uri: item.image}}
                    />
                    <Text style={tw`text-lg mt-2 font-semibold`} >{item.title} </Text>
                    <Icon 
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    name="arrowright" color="white"  
                        type="antdesign"
                    
                    />


                </View>
        </TouchableOpacity>
    )}
    
     />
  );
};

export default NavOptions;
