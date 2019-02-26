
import React, {Component} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';


export default class HomePage extends Component<Props> {
    render() {
        const {navigation}=this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to HomePage</Text>
                <Button
                    title={'go to MsgBox'}
                    onPress={()=>{
                        navigation.navigate('MsgBox')
                    }}
                />
                <Button
                    title={'go to TabNavigator'}
                    onPress={()=>{
                        navigation.navigate('MsgBox')
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
