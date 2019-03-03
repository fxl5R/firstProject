/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
//import SQLite from 'react-native-sqlite-storage';
import MySQLite from '../component/sqlite';
const sqLite=new MySQLite();
let db1;//=SQLite.openDatabase("houserent", "1.0", "MySQLite", 200000);
export default class SQLiteDemo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:""
            ,age:""
            ,phone:""
            ,email:""
            ,address:""
        };
    }
    componentDidMount() {
        //关闭数据库
        sqLite.close();
    }
    componentWillMount(){
        //开启数据库

        if(!db1){
            db1=sqLite.open();
        }
        //建表
        sqLite.createTable();
        //删除数据
        sqLite.deleteData();
        //模拟数据
        let userData = [];
        let user = {};
        user.name = "Mr.Onion";
        user.age = "26";
        user.sex = "男";
        user.phone = "12345678910";
        user.email = "123454321@qq.com";
        user.address = "A市B街111号C室";
        userData.push(user);
        //插入数据
        sqLite.insertUserData(userData);
        //查询
        db1.transaction((tx)=>{
            tx.executeSql("select * from user", [],(tx,results)=>{
                let len = results.rows.length;
                for(let i=0; i<len; i++){
                    let u = results.rows.item(i);
                    this.setState({
                        name:u.name,
                        age:u.age,
                        phone:u.phone,
                        email:u.email,
                        address:u.address,
                    });
                }
            });
        },(error)=>{
            console.log(error);
        });
    }
    render(){
        return (
            <View>
                <Text> 姓名:{this.state.name} </Text>
                <Text> 年龄：{this.state.age} </Text>
                <Text> 电话：{this.state.phone} </Text>
                <Text> Email：{this.state.email} </Text>
                <Text> 地址：{this.state.address} </Text>
            </View> );
    } }