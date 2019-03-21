

import React, { Component } from 'react'
import {Text, View} from 'react-native';

import Comment from './Comment'
class CommentList extends Component {
    static defaultProps = {
        comments: []
    }
    render() {
        const comments = [
            {username: 'Jerry', content: 'Hello'},
            {username: 'Tomy', content: 'World'},
            {username: 'Lucy', content: 'Good'}
        ]
        return (
            /*<View>{comments.map((comment, i) => {
                return (
                    <View key={i}>
                        {comment.username}：{comment.content}
                    </View>
                )
            })}
            </View>*/
            /*<View>
                {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
            </View>*/
            <View>
                {this.props.comments.map((comment, i) =>
                    <Comment comment={comment} key={i} />)}
            </View>
        )
    }
}

export default CommentList;