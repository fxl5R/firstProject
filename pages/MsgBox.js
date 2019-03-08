import React, { Component } from 'react';

import { StyleSheet, Platform, View, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';

let Realm = require('realm');

let realm ;

import { createStackNavigator } from 'react-navigation';

/*const MainNavigator = createStackNavigator({
    Profile: {screen: ProfileScreen},
});*/
class MsgBox extends Component{

    static navigationOptions =
        {
            title: 'MainActivity',
            header:null
        };

    GoToSecondActivity = () =>
    {
        this.props.navigation.navigate('Second');

    };

    constructor(){

        super();

        this.state = {

            Student_Name : '',

            Student_Class : '',

            Student_Subject : ''

        };

        realm = new Realm({
            schema: [{name: 'Student_Info',
                properties:
                    {
                        student_id: {type: 'int',   default: 0},
                        student_name: 'string',
                        student_class: 'string',
                        student_subject: 'string'
                    }}]
        });

    }

    add_Student=()=>{


        realm.write(() => {

            let ID = realm.objects('Student_Info').length + 1;

            realm.create('Student_Info', {
                student_id: ID,
                student_name: this.state.Student_Name,
                student_class: this.state.Student_Class,
                student_subject : this.state.Student_Subject
            });

        });

        Alert.alert("Student Details Added Successfully.")

    };

    render() {

        return (

            <View style={styles.MainContainer}>

                <TextInput
                    placeholder="Enter Student Name"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Student_Name: text })} }
                />

                <TextInput
                    placeholder="Enter Student Class"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Student_Class: text })} }
                />

                <TextInput
                    placeholder="Enter Student Subject"
                    style = { styles.TextInputStyle }
                    underlineColorAndroid = "transparent"
                    onChangeText = { ( text ) => { this.setState({ Student_Subject: text })} }
                />


                <TouchableOpacity onPress={this.add_Student} activeOpacity={0.7} style={styles.button} >

                    <Text style={styles.TextStyle}> CLICK HERE TO ADD STUDENT DETAILS </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={this.GoToSecondActivity} activeOpacity={0.7} style={styles.button} >

                    <Text style={styles.TextStyle}> SHOW ALL ENTERED DATA INTO LISTVIEW </Text>

                </TouchableOpacity>

            </View>

        );
    }
}

class HDetail extends Component
{
    static navigationOptions =
        {
            title: 'ShowDataActivity',
            header:null
        };

    constructor() {

        super();

        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        let mydata = realm.objects('Student_Info');

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(mydata),
        };

    }

    GetClickedItem (student_name) {

        Alert.alert(student_name);

    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    render()
    {
        return(
            <View style = { styles.MainContainer }>

                <ListView

                    dataSource={this.state.dataSource}

                    renderSeparator= {this.ListViewItemSeparator}

                    renderRow={(rowData) => <View style={{flex:1, flexDirection: 'column'}} >

                        <TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.student_name)} >

                            <Text style={styles.textViewContainer} >{'id = ' + rowData.student_id}</Text>

                            <Text style={styles.textViewContainer} >{'Name = ' + rowData.student_name}</Text>

                            <Text style={styles.textViewContainer} >{'Class = ' + rowData.student_class}</Text>

                            <Text style={styles.textViewContainer} >{'Subject = ' + rowData.student_subject}</Text>

                        </TouchableOpacity>

                    </View> }

                />

            </View>
        );
    }
}

export default MsgBox = createStackNavigator(
    {
        First: { screen: MsgBox },

        Second: { screen: HDetail }
    });
const styles = StyleSheet.create({

    MainContainer :{

        flex:1,
        justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 10

    },

    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#009688',
            width: '100%',
            height: 40,
            borderRadius: 10,
            marginBottom: 10,
            textAlign: 'center',
        },

    button: {

        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius:7,
        marginTop: 12
    },

    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },

    textViewContainer: {

        textAlignVertical:'center',
        padding:10,
        fontSize: 20,
        color: '#000',

    }

});