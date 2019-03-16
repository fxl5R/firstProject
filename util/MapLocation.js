/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { ScrollView,  StyleSheet, Text, ToastAndroid, View} from 'react-native';

import HouseCell from '../component/HouseCell';
import realm from '../util/realm.js';
type Props = {};
export default class MapLocation extends Component<Props> {
    render() {
        let mydata = realm.objects('House_Info');
        let isHouseData=mydata.filtered("certification == $0", null)
            .sorted("door_model", true);
        if(isHouseData){
            console.log('testtttt success'+JSON.stringify(isHouseData));
        }else {
            ToastAndroid.show('!!import failed!!',ToastAndroid.SHORT);
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                <HouseCell navigation={this.props.navigation}/>
            </View>
            </ScrollView>
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
