/**
 * 房屋信息提交结果
 */
'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { NaviGoBack } from '../util/CommonUtils';
import BackHeader from '../component/BackHeader';
import realm from '../util/realm';

let {height, width} = Dimensions.get('window');
console.log('pingmugao:'+height+'pingmukuan:'+width);

let user_publisher=realm.objects('User').filtered("online == $0", 1)[0];
class PublishResult extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction=this.buttonBackAction.bind(this);
        this.itemButtonAction=this.itemButtonAction.bind(this);
    }
    //返回
    buttonBackAction(){
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }
    itemButtonAction(position){
        if(position === 0){
            this.props.navigation.navigate('HouseManager',{
                itemId:user_publisher.id
            });
        }else if(position === 1){

        }
    }
    render() {
        const {navigator,route} = this.props;
        return (
            <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <BackHeader navigation={this.props.navigation} title={'发布成功'} />
                <View style={{marginTop:20,marginLeft:10,marginRight:10,backgroundColor:'white'}}>
                    <View style={{justifyContent:'center',alignItems:'center',height:100}}>
                        <Image source={require('../res/images/ic_putout.png')} style={{width:40,height:40}}/>
                        <Text style={{color:'black',fontSize:15,marginTop:25}}>发布完成，待实名认证</Text>
                    </View>
                    <Image source={require('../res/images/ic_center_line.png')} style={{height:1,width:'100%',marginTop:22}}/>
                    <View style={{marginTop:22,marginLeft:13,marginRight:13}}>
                        <View style={styles.ButtonContainer}>
                        <Text style={{marginTop:10,fontSize:13.5,color:'#999'}}>为保护双方权益，实名认证后，房源可在平台展示</Text>
                        <TouchableOpacity onPress={()=>{this.itemButtonAction(0)}} activeOpacity={0.7} style={styles.button0} >
                            <Text style={styles.TextStyle}> 管理房屋 </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('RealConfirm')}} activeOpacity={0.7} style={styles.button1} >
                            <Text style={{ textAlign:'center',color:'#B0C4DE',fontSize:15,}}> 立即认证 </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    ButtonContainer: {
        flexDirection:'column',
        alignItems:'center'
    },
    button0: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#B0C4DE',
        borderRadius:7,
        marginTop: 14,
        elevation: 1
    },
    button1: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius:7,
        marginTop: 14,
        marginBottom:15,
        elevation: 1
    },

    TextStyle:{
        fontSize:15,
        color:'#fff',
        textAlign:'center',
    },
});

export default PublishResult;
