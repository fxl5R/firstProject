

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export class Collecthouse extends Component {

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                {/* Rest of the app comes ABOVE the action button component !*/}
{/*                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                        <Icon name="md-star-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                        <Icon name="md-star" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="添加房屋" onPress={()=>{this.props.navigation.navigate('ProtocolPage')}}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
{/*               <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { alert('hi')}}
                />*/}
            </View>
        );
    }

}
export default class AddHouseButton extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <ActionButton buttonColor='#B0C4DE'>
                    <ActionButton.Item buttonColor='#6495ED' title="添加房屋" onPress={()=>{this.props.navigation.navigate('ProtocolPage')}}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});