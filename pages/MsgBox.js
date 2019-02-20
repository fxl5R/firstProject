/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
    } from 'react-native';


type Props = {};
export default class MsgBox extends Component<Props> {
    render() {
        const {navigation}=this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>消息盒子</Text>
                {/*<Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>*/}
                <Button
                    title="Go Back"
                    onPress={()=>{
                        navigation.goBack();//返回某一页面的Key
                    }}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});
