
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, ListView, Image, StyleSheet} from 'react-native';
import { Tabs } from '@ant-design/react-native';
import BackHeader from '../../component/BackHeader';
import realm from '../../util/realm';

export default class CommentDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            comments: [],
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            content:'',
            from_uid:'',
            from_portrait:'',
            from_nickName:'',
            to_uid:'',
            commentTime:''
        };
        this.GoToUserDetail=this.GoToUserDetail.bind(this);
    }

    /**
     * 根据用户id跳转用户个人主页
     **/
    GoToUserDetail(from_uid) {
        this.props.navigation.navigate('UserPage',{
            itemId: from_uid});
    };
    /**
     * 根据house_id跳转房源详情
     **/
    GoToHouseDetail(house_id) {
        this.props.navigation.navigate('HouseDetail',{
            itemId: house_id,
            //isEdit:1 只能在管理房屋页面对房屋进行修改
        });
    };

    _renderSeparatorView(sectionID: number, rowID: number) {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
        );
    }

    renderContent(dataSource){
        return(
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={(rowData) =>
                    <View>
                        <View style={{flexDirection:'row',margin:10}} >
                            <TouchableOpacity onPress={this.GoToUserDetail.bind(this,rowData.from_uid)}>
                                <Image source={{uri:rowData.from_portrait}} style={{width:35,height:35}}/>
                            </TouchableOpacity>
                            <View style={{flex:1,marginLeft:8}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.comment_username}>{rowData.from_nickName}</Text>
                                    <TouchableOpacity onPress={
                                        this.GoToHouseDetail.bind(this,rowData.to_hid)}>
                                        <Text style={styles.link_housetext}>{rowData.h_tile}►</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color:'#777',fontSize:12,marginTop:5}}>{rowData.content}</Text>
                            </View>
                            <View style={{marginLeft:5}}><Text style={{color:'#777',fontSize:12}}>{rowData.createTime}</Text></View>
                        </View>
                        {/*{this.renderCommentImage(comment.imges)}*/}
                    </View>}
                style={{backgroundColor:'white',flex:1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
                renderSeparator={this._renderSeparatorView}
            />
        );
    }
    //渲染接收到的评论信息模块
    renderExistCommentGet(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从个人中心获取用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        console.log('收到的评论'+JSON.stringify(this.state.dataSource)+JSON.stringify(comments));
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    comments === undefined ? [] : comments))}
            </View>
        );
    }
    //渲染发出的评论信息模块
    renderExistCommentTo(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从个人中心获取用户的ID
        let comments=realm.objects('Comments').filtered('from_uid==$0',itemId);
        console.log('发出的评论'+JSON.stringify(this.state.dataSource)+JSON.stringify(comments));
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    comments === undefined ? [] : comments))}
            </View>
        );
    }

    render() {
        const tabs = [
            { title: '发出的评论' },
            { title: '收到的评论' },
        ];
        return (

            <View style={{ flex: 1 }}>
                <BackHeader navigation={this.props.navigation} title={'评论查看'}/>
                <View style={{ flex: 2 }}>
                    <Tabs tabs={tabs} initialPage={1} tabBarPosition="top">
                        <ScrollView>{this.renderExistCommentTo()}</ScrollView>
                        <ScrollView>{this.renderExistCommentGet()}</ScrollView>
                    </Tabs>
                </View>
            </View>

        );
    }
}
let styles = StyleSheet.create({

    separator: {
        height: 1,
        backgroundColor: '#eee'
    },
    container:{
        width: '95%',
        //marginTop: 10,
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
        fontSize: 14,
        backgroundColor: '#fff',
        borderWidth: 1 ,
        borderColor:'#f1f1f1',
        padding: 10
    },
    comment: {
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomColor:'#f1f1f1',
        marginBottom: 10,
        paddingBottom: 10,
        minHeight: 50,
    },
    comment_user:{
        flexShrink:0,
    },
    comment_username:{
        color:'#00a3cf',
        fontStyle:'italic'
    },
    link_housetext:{
        color:'black',
        fontStyle:'italic',
        fontSize:12,
        marginLeft:30
    },
    comment_content:{
        margin:0
    }

});
/*
export const title = 'Tabs';
export const description = 'Tabs example';*/
