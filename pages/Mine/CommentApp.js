import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import {Dimensions, StyleSheet, View} from 'react-native';
import {CommentHeader} from "../../component/BackHeader";
import realm from "../../util/realm";

let {height, width} = Dimensions.get('window');

class CommentApp extends Component {
    constructor () {
        super();
        this.state = {
            comments: [],
            content:'',
            from_uid:'',
            to_uid:''
        }
    }

    render() {
        const { navigation } = this.props;
        const to_uid = navigation.getParam('itemId', 'NO-ID');//从屋主详情获取发布房屋的用户的ID/用作评论目标人的ID
        return (
            <View style={{ flex: 1 }}>
                <CommentHeader navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <CommentInput
                        {...this.props}
                        onSubmit={this.handleSubmitComment.bind(this)} />
                    <CommentList comments={this.state.comments}/>
                </View>
            </View>
        )
    }
    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.username) return alert('获取用户信息失败');
        if (!comment.content) return alert('请输入评论内容');
        this.state.comments.push(comment);
        this.setState({
            //当用户发表评论时就将评论数据插入this.state.comments中，通过setState把数据更新到页面上
            comments: this.state.comments,
            content:comment.content,
            from_uid:comment.from_uid,
            to_uid:this.props.navigation.getParam('itemId','NO-ID')
        });
        console.log(comment);
        console.log('评论内容：'+this.state.content+'评论来自：'+this.state.from_uid+'评论对象：'+this.state.to_uid);

        //写评论入数据库
        realm.write(()=> {
            realm.create('Comments', {
                id:realm.objects('Comments').length,
                content:  [this.state.content].toString(),
                from_uid: [this.state.from_uid],
                to_uid:   [this.state.to_uid],
                commentTime:new Date().toLocaleTimeString()
            });
        });
        //测试：查询评论数据库
        let commentdatas=realm.objects('Comments').filtered("from_uid == $0", 0);
        let commentdata=commentdatas[0];
        console.log('！！！数据库中的评论数据！！！'+JSON.stringify(commentdata));
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
    }

});
export default CommentApp