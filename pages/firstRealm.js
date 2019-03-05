/*

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ToastAndroid,
    TextInput,
    PixelRatio
} from 'react-native';
import Button from '../component/Button';
const Realm = require('realm');
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}
const CarSchema = {
    name: 'Car',
    primaryKey: 'id',
    properties: {
        id: 'int',
        car_type: 'string',
        car_name: 'string',
        driver_name: 'string',
    }
};
/!*const UserSchema = {
    name: 'User',                          // 表名
    primaryKey: 'id',                           // 设置id为主键
    properties: {                               // 属性
        id: { type:'int', indexed: true },        // 用户ID
        userName: 'string',                        // 用户名称
        userPassword: 'string',                    // 用户密码
        userSex: 'string',                      // 用户性别
        portrait: 'string',               // 头像
        cTime: { type: 'date', optional: true } // 创建时间
    },
};*!/
//初始化Realm
let realm1 = new Realm({schema: [CarSchema,UserSchema]});

export default class firstRealm extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        };
    }
    _handleClick(){
        realm1.write(()=> {
            realm1.create('User', {
                id:realm1.objects('User').length,
                userName: [this.state.text].toString(),
                userPassword: [this.state.password].toString(),
                userSex: 'female',
                portrait:'https://b-ssl.duitang.com/uploads/item/201901/09/20190109121033_lxkdt.thumb.300_300_c.jpg',
                cTime:new Date()
            })
        });
        console.log('name'+this.state.text+'passwd'+this.state.password);
        ToastAndroid.show("regist success", ToastAndroid.SHORT)
    }
    render() {
        return (
            <View style={{marginTop: 20}}>
                <Text style={styles.welcome}>
                    Realm基础使用实例-增删改查
                </Text>
                <CustomButton
                    text="表新增"
                    onPress={()=>
                        realm1.write(()=> {
                            realm1.create('Car', {id: 1, car_type: 'QQ', car_name: 'SB001', driver_name: '张三'});
                            realm1.create('Car', {id: 2, car_type: '宝马', car_name: 'SB002', driver_name: '李四'});
                            realm1.create('Car', {id: 3, car_type: '奔驰', car_name: 'SB003', driver_name: '王五'});
                            realm1.create('Car', {id: 4, car_type: '劳斯莱斯', car_name: 'SB004', driver_name: '张六'});
                            realm1.create('Car', {id: 5, car_type: '比亚迪', car_name: 'SB005', driver_name: '理七'});
                            ToastAndroid.show('添加数据完成', ToastAndroid.SHORT);
                        })
                    }/>
                <CustomButton
                    text="表修改"
                    onPress={()=> {
                        //更新id = 1的数据
                        realm1.write(()=> {
                            realm1.create('Car', {id: 3, driver_name: 'feiyang'}, true)
                            ToastAndroid.show("修改完成...", ToastAndroid.SHORT);
                        });
                    }}
                />
                <CustomButton
                    text="表数据删除-删除id=3的数据"
                    onPress={()=> {
                        realm1.write(()=> {
                            let cars = realm1.objects('Car');
                            let car = cars.filtered('id==3');
                            realm1.delete(car);
                        });
                    }}
                />
                <CustomButton
                    text="查询所有数据"
                    onPress={()=> {
                        let cars = realm1.objects('Car');
                        ToastAndroid.show('Car的数据为，'+cars.length, ToastAndroid.SHORT);
                    }}
                />
                <CustomButton
                    text="根据id=2 进行查询数据"
                    onPress={()=> {
                        let cars = realm1.objects('Car');
                        let car = cars.filtered('id==2');
                        if (car) {
                            ToastAndroid.show('Car的数据为，'
                                + '编号=' + car[0].id
                                + 'car_type=' + car[0].car_type
                                + 'car_name=' + car[0].car_name
                                + 'driver_name=' + car[0].driver_name, ToastAndroid.SHORT);
                        }
                    }}
                />
                <View style={styles.username}>
                    <TextInput
                        style={styles.edit}
                        placeholder="用户名"
                        placeholderTextColor='#4682B4'
                        onChangeText={(text)=>this.setState({text})}
                    />
                </View>

                <View style={{height:1/PixelRatio.get(),backgroundColor: '#c4c4c4'}}/>

                <View style={styles.password}>
                    <TextInput
                        style={styles.edit}
                        placeholder='密码'
                        placeholderTextColor='#4682B4'
                        secureTextEntry={true}
                        onChangeText={(password)=>this.setState({password})}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button text={'注册'} onPress={this._handleClick.bind(this)}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 3,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd'
    },

    view:{
        flex:1,
        backgroundColor: '#BAE4F5'
    },
    edit:{
        height: 40,
        fontSize:13,
        backgroundColor:'#fff',
        paddingRight:15,
        paddingLeft:15
    },
    editGroup:{
        margin:20
    },
    username:{
        marginTop:100,
        height:48,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },
    password: {
        height:48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
    }

});*/
