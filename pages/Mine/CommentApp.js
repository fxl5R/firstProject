
import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import {Dimensions, ListView, ScrollView, StyleSheet, Text, View,Image} from 'react-native';
import {CommentHeader} from "../../component/BackHeader";
import realm from "../../util/realm";
import {toastShort} from "../../util/ToastUtil";

let {height, width} = Dimensions.get('window');


class CommentApp extends Component {
    constructor () {
        super();
        /*const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let commentdatas=realm.objects('Comments').filtered('to_uid==$0',itemId);*/
        this.state = {
            comments: [],
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            content:'',
            from_uid:'',
            from_portrait:'',
            from_nickName:'',
            to_uid:'',
            commentTime:''
        }
    }
    _renderSeparatorView(sectionID: number, rowID: number) {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
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
                            <Image source={{uri:rowData.from_portrait}} style={{width:35,height:35}}/>
                            <View style={{flex:1,marginLeft:8}}>
                                <Text style={styles.comment_username}>{rowData.from_nickName}</Text>
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
    //渲染底部评论信息模块
    renderExistComment(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');//从房屋详情获取发布房屋的用户的ID
        let comments=realm.objects('Comments').filtered('to_uid==$0',itemId);
        console.log('renderBottomComment!!!!'+JSON.stringify(this.state.dataSource)+JSON.stringify(comments));
        return (
            <View style={{flex:1}}>
                {this.renderContent(this.state.dataSource.cloneWithRows(
                    comments === undefined ? [] : comments))}
            </View>
        );
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <CommentHeader navigation={this.props.navigation}/>
                <View>
                <ScrollView style={{flex:1}}>
                    <View>
                        {this.renderExistComment()}
                    </View>
                    <CommentList comments={this.state.comments}/>
                </ScrollView>
                <View style={styles.container}>
                    <CommentInput
                        {...this.props}
                        onSubmit={this.handleSubmitComment.bind(this)} />
                </View>
                </View>

            </View>
        )
    }
    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.username) return alert('获取用户信息失败');
        if (!comment.content)  return alert('请输入评论内容');
        let to_uid=this.props.navigation.getParam('itemId','NO-ID');
        this.setState({
            //当用户发表评论时就将评论数据插入this.state.comments中，通过setState把数据更新到页面上
            comments: this.state.comments,
            //赋相应值到state中，然后利用this.state写入数据表
            content:comment.content,
            from_uid:comment.from_uid,
            from_portrait:comment.from_portrait,
            to_uid:to_uid,
            commentTime:comment.commentTime
        });
        this.state.comments.push(comment);
        console.log(comment);
        console.log('评论内容：'+comment.content+'评论来自：'+comment.from_uid+'评论对象：'+to_uid+
            '评论时间：'+comment.commentTime+'评论者头像：'+comment.from_portrait);
        toastShort('评论发表成功');
        //alert('111from_uid is '+comment.from_uid);
        //写评论入数据库
        realm.write(()=> {
            realm.create('Comments', {
                id:realm.objects('Comments').length,
                content: comment.content,
                from_uid:comment.from_uid,
                from_portrait:comment.from_portrait,
                from_nickName:comment.username,
                to_uid:  to_uid,
                commentTime:comment.commentTime
            });
        });
    }
}

const styles = StyleSheet.create({
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
    comment_content:{
        margin:0
    }

});
export default CommentApp