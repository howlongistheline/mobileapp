import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import moment from 'moment';
import Slider from "react-native-slider";
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

function lineLength(people) {
    if(people) {
        if(people > 1) {
            return "There was one person in line"
        } else {
            return `There were ${people} people in line`
        }
    } else {
        return "There was no line"
    }
}

export function Store({ name, address, people, time }) {
    const [line, setLine] = useState(people);
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text>{lineLength(people)} {moment(time).fromNow()}</Text>
            <Slider
                value={line}
                step={1}
                maximumValue={50}
                onValueChange={value => setLine(value)}
            />
            <Button
                title={`Confirm ${line} people in line`}
                onPress={() => Alert.alert('Updated line')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        elevation: 1,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        // fontWeight: 'bold'
    },
    address: {
        fontSize: 16,
        paddingBottom: 5,
        color: "#555"
    }
})