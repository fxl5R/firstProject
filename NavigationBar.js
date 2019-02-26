
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform
}from 'react-native';
import PropTypes from 'prop-types';
/*定义常量*/
const NAVBAR_HEIGHT_ANDROID=50;
const NAVBAR_HEIGHT_IOS=44;
const STATUS_BAR_HEIGHT=20;
const StatusBarShape={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden:PropTypes.bool
    };
export default class NavigationBar extends  Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,


        leftButton: PropTypes.element,
        leftButtonTitle:PropTypes.string,
        rightButton:PropTypes.element,
        statusBar :PropTypes.shape(StatusBarShape)
    };
    static defaultProps={
        statusBar:{
            color:'#B0C4DE',
            barStyle: 'light-content',
            hidden:false
        }
    };
/*    static HeaderBackButton={
        headerButton: (
            <Button
                onPress={()=>alert('this is headerbtn')}
            />
        )
    }*/
    getButtonElement(data) {
        return (
            <View>
                {data? data : null}
            </View>
        );
    }
    /*构造方法*/
    constructor(props){
        super(props);
        this.state={
            title:'',
            hide:false
        }
    }
    render(){
        let status=
            <View style={[styles.statusBar,this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
            </View>;
        let titleView=this.props.titleView?this.props.titleView:   //如果用户同时自定义了title和tileView，分级，先判断titleView空值：如果没有设置titleView
            <Text style={styles.title}>{this.props.title}</Text>;
        let content=this.props.hide?null:
            <View style={styles.navBar}>
            {this.getButtonElement(this.props.leftButton)}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.getButtonElement(this.props.rightButton)}
        </View>;
        return(
            <View style={[styles.container,this.props.style]}>
                {status}
                {content}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#B0C4DE'
    },
    navBar:{
        justifyContent: 'space-between',
        alignItems: 'center',
        height:Platform.OS==='ios'?NAVBAR_HEIGHT_IOS:NAVBAR_HEIGHT_ANDROID,
        backgroundColor: '#B0C4DE',
        flexDirection: 'row'
    },
    titleViewContainer:{             //绝对位置显示
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:'white'
    },
    statusBar:{
        height: Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
    }
});