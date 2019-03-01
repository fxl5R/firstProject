/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';

let image1=require('../res/images/bg_guide1.png');
let image2=require('../res/images/bg_guide33.png');
let image3=require('../res/images/bg_guide5.png');

import Util from './Utils';

type Props = {};
export default class Guide extends Component<Props> {
    constructor(){
        super();
    };
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                pagingEnabled={true}
                horizontal={true}>
                <Image source={image1} style={styles.backgroundImage}/>
                <Image source={image2} style={styles.backgroundImage}/>
                <Image source={image3} style={styles.backgroundImage}/>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer:{
        width:Util.size.width*3,//引导页的宽度，即三张图片的总长
        height:Util.size.height,
        backgroundColor:'#BAE4F5',
    },
    backgroundImage:{
        width: Util.size.width,
        height: Util.size.height
    },
});
