

import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default class Home extends Component {
    render() {
        return (
            <View style={styles.MainContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserTable')}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../res/images/users.png')} />
                    <Text>用户数据</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CommentTable')}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../res/images/trades.png')} />
                    <Text>评论数据</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('HouseTable')}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../res/images/houses.png')} />
                    <Text>房屋数据</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        height:90,
        width:90,
        backgroundColor: '#F5FCFF',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height: 75,
        width: 75
    }
});
