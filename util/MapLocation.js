/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ToastAndroid, View} from 'react-native';

import HouseCell from '../component/HouseCell';
import {HouseSchema} from '../component/HouseCell';
const Realm=require('realm');
type Props = {};
export default class MapLocation extends Component<Props> {
    render() {
        let mydata = new Realm({schema:[HouseSchema]}).objects('House_Info');
        let isHouseData=mydata.filtered("certification == $0", null)
            .sorted("door_model", true);
        if(isHouseData){
            console.log('testtttt success'+isHouseData);
        }else {
            ToastAndroid.show('!!import failed!!',ToastAndroid.SHORT);
        }
        return (
            <View style={styles.container}>
                <HouseCell/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});
