/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

type Props = {};
export default class BackHeader extends Component<Props> {
    constructor(props){
        super(props);

    }
    render() {
        let title=this.props.titleView?this.props.titleView:
            <Text>{this.props.title}</Text>;
        return(
            <View style={{height:48,backgroundColor:'#B0C4DE',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}
                                  style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{width:13,height:20}}
                        source={require('../res/images/ic_center_back.png')}
                    />
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>{title}</Text>
                </View>
                <View style={{height:48,width:48}}/>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    text:{
        color:'white',
        fontSize:13
    },
    content:{
        height:45,
        backgroundColor:'#4682B4',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3
    }
});
