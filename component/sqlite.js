import React,{Component} from 'react';

import SQLiteStorage from 'react-native-sqlite-storage';
//import SQLite from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
//SQLite.enablePromise(true);
//SQLite.enablePromise(false);
const database_name = "houserent.db";//数据库文件
const database_version = "1.0";//版本号
const database_displayname = "MyFirstSQLite";
const database_size = 200000;
let db;//=SQLite.openDatabase("houserent", "1.0", "MySQLite", 200000);
export default class MySQLite extends Component {
    constructor(){
        super();
        this.progress=[];
        this.state={
            progress:[]
        }
    }
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    }
    open(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                this._successCB('openDatabase');
            },
            (err)=>{
                this._errorCB('openDatabase error',err);
            });
        /*db=SQLiteStorage.openDatabase("houserent", "1.0", "MySQLite", -1,
            (suc)=>{
                this._successCB('open',suc);
            },
            (err)=>{
                this._errorCB('open',err);
            });*/
        return db;
    }
    createTable(){
        if (!db) {
            this.open();
        }
        //创建用户表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS USER(' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'name varchar,'+
                'age VARCHAR,' +
                'sex VARCHAR,' +
                'phone VARCHAR,' +
                'email VARCHAR,' +
                'address VARCHAR)'
                , [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    }
    deleteData(){
        if (!db) {
            this.open();
        }
        db.transaction((tx)=>{
            tx.executeSql('delete from user',[],()=>{

            });
        });
    }
    dropTable(){
        db.transaction((tx)=>{
            tx.executeSql('drop table user',[],()=>{
            });
        },(err)=>{
            this._errorCB('transaction', err);
        },()=>{
            this._successCB('transaction');
        });
    }
    insertUserData(userData){
        let len = userData.length;
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx)=>{
            for(let i=0; i<len; i++){
                let user = userData[i];
                let name= user.name;
                let age = user.age;
                let sex = user.sex;
                let phone = user.phone;
                let email = user.email;
                let address = user.address;
                let sql = "INSERT INTO user(name,age,sex,phone,email,address)"+
                    "values(?,?,?,?,?,?)";
                tx.executeSql(sql,[name,age,sex,phone,email,address],()=>{

                    },(err)=>{
                        console.log(err);
                    }
                );
            }
        },(error)=>{
            this._errorCB('transaction', error);
        },()=>{
            this._successCB('transaction insert data');
        });
    }
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    }
    _errorCB(name, err){
        console.log("SQLiteStorage "+name);
        console.log(err);
    }

    render(){
        return null;
    }
}