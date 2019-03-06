

import React, {Component} from 'react';

import {
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';

export default class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {house: null};
        console.log("0.HouseDetail-constructor(props)")
    }
    componentWillMount() {
        console.log("3.HouseDetail-componentWillMount()")
        if (React.Platform.OS === 'android') {
            React.BackAndroid.addEventListener('hardwareBackPress', ()=>this._pressButton());
        }
    }

    componentWillUnmount() {
        console.log("10.HouseDetail-componentWillUnmount()")
        if (React.Platform.OS === 'android') {
            React.BackAndroid.removeEventListener('hardwareBackPress', ()=>this._pressButton());
        }
    }
    _pressButton() {
        this.props.navigation.goBack();
    };

    render() {
        console.log("4.JobDetail-render()")
        let {house} = this.props;
        return (
            <View style={{flex: 1}}>
                <View
                    style={{padding: 10,marginTop:20,justifyContent: 'center',alignItems: 'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>this._pressButton()}>
                        <Image source={require('../res/images/ic_left-circle.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:17,flex:1,textAlign:'center',marginRight:30}}>房屋详情</Text>
                </View>
                <View style={{padding:15, flexDirection:'row'}}>
                    <Text style={{flex:1}}>{house.title}</Text>
                    <Text style={{color:'red'}}>{house.salary}</Text>
                </View>
                <View style={{padding: 15}}>
                    <Text style={{marginTop:8,marginBottom:8}}>{house.company}</Text>
                    <Text style={{color: '#999'}}>{house.info}</Text>
                </View>
            </View>
        );
    }
}
