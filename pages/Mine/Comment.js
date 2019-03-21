
import React, { Component } from 'react'
import {Dimensions, StyleSheet, View,Text} from 'react-native';

class Comment extends Component {
    render () {
        return (
            <View style={styles.comment}>
                <View style={styles.comment_user}>
                    <Text style={styles.comment_username}>{this.props.comment.username}: </Text>
                </View>
                <Text style={styles.comment_content}>{this.props.comment.content}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
export default Comment;