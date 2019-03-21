import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import {Dimensions, StyleSheet, View} from 'react-native';
import {CommentHeader} from "../../component/BackHeader";

let {height, width} = Dimensions.get('window');

class CommentApp extends Component {
    constructor () {
        super();
        this.state = {
            comments: []
        }
    }

    render() {
        return (
            <View>
                <CommentHeader navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <CommentHeader navigation={this.props.navigation}/>
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
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        this.state.comments.push(comment);
        this.setState({
            //当用户发表评论时就将评论数据插入this.state.comments中，通过setState把数据更新到页面上
            comments: this.state.comments
        });
        console.log(comment);
    }
}

const styles = StyleSheet.create({
    container:{
        width: '95%',
        marginTop: 10,
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