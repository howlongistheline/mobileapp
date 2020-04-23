import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

import axios from "axios";
import { Store } from '../components/Store';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearestShops, setnearestShops] = useState([]);

  // get and set location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let ll = await Location.getCurrentPositionAsync({});
      setLocation(ll)
    })();
  }, []);

  // test location
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Long: ${JSON.stringify(location.coords.longitude)}, Lat: ${JSON.stringify(location.coords.latitude)}`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = {
          lat: location.coords.latitude,
          long: location.coords.longitude
        }
        const response = await axios.post('/nearme', {...data});
        setnearestShops(response.data);
      } catch (error) {
        console.log("Error =>", error);
      }
    }
    fetchData();
  }, [location]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>STORES NEAR YOU</Text>
        {/* <Text style={{ paddingLeft: 20, paddingBottom: 30}}>Location {text}</Text> */}
        <FlatList
          data={nearestShops}
          renderItem={({ item }) => 
            <Store name={item.name} address={item.address} people={item.line} time={item.lastUpdate}/>
          }
          keyExtractor={item => item._id}
        />
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20
  }
});
