/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';

type Props = {};
export default class Button extends Component<Props> {
    constructor(props){
        super(props);
    }
    render() {
        if(Platform.OS==='android'){
            return(
                <TouchableNativeFeedback
                    onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS==='ios'){
            return(
                <TouchableHighlight
                onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }
    _renderContent(){
        return(
            <View style={styles.content}>
                <Text style={styles.text}>{this.props.text}</Text>
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
        backgroundColor:'#B0C4DE',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:0,
        elevation: 1
    }
});
