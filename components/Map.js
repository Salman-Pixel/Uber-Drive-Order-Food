import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Icon } from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useRef } from "react";
import { isAnyOf } from '@reduxjs/toolkit';

// pulling data from the redux data layer 
// Using Ref Hook here -This is sorta pointer
// sq brackets show that it's Dependent on Origin and Destination
// Zoom & fit to markers
// console.log(origin); 
// lng and lat are used based on the origin values


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination); 
    const mapRef = useRef(null);   
    const dispatch = useDispatch();

        useEffect(() => {
            if (!origin || !destination) return;
            
            setTimeout(() => {
                mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                    edgePadding: { top: 190, right: 50, bottom: 90, left: 50 },
                });

            }, 500);

    }, [origin, destination]);

    useEffect(() => {
        if(!origin || !destination) return;
        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            )
            .then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                // console.log(data);
            });
            

        };

        getTravelTime();

    }, [origin,destination, GOOGLE_MAPS_APIKEY])
    


  return (
    <MapView 
        ref = {mapRef} 
        style = {tw `flex-1`}
        mapType="mutedStandard"
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >

        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination= {destination.description}
                apikey = {GOOGLE_MAPS_APIKEY}
                strokeWidth = {3}
                strokeColor="black"

            />
        )}
        
        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title = 'Origin'
                description = {origin.description}
                identifier = "origin"

            />
        )}

        {destination?.location && (
            <Marker
                coordinate={{

                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title = 'destination'
                description = {destination.description}
                identifier = "destination"

            />
        )}

    </MapView>

  );
}; 

export default Map;

const styles = StyleSheet.create({});