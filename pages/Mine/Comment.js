
import React, { Component } from 'react'
import {Dimensions, StyleSheet, View, Text, Image} from 'react-native';

class Comment extends Component {
    render () {
        return (
            <View>

                <View style={{flexDirection:'row',margin:10}}>
                    <Image source={{uri:this.props.comment.from_portrait}} style={{width:35,height:35}}/>
                    <View style={{flex:1,marginLeft:8}}>
                        <Text style={styles.comment_username}>{this.props.comment.username}</Text>
                        <Text style={{color:'#777',fontSize:12,marginTop:5}}>{this.props.comment.content}</Text>
                    </View>
                    <View style={{marginLeft:5}}><Text style={{color:'#777',fontSize:12}}>{this.props.comment.createTime}</Text></View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    comment: {
        //display: 'flex',
        borderBottomWidth: 1,
        borderBottomColor:'#f1f1f1',
        marginBottom: 10,
        paddingBottom: 10,
        minHeight: 110,
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