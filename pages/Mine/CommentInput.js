import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
} from 'react-native';

class CommentInput extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            content: ''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    render() {
        return (
            <View style={styles.comment_input}>
                <View style={styles.comment_field}>
                    <Text style={styles.comment_field_name}>用 户 名 ：{this.state.username}</Text>
                </View>
                <View style={styles.comment_field}>
                    <Text style={styles.comment_field_name}>评论内容：</Text>
                    <View style={styles.comment_field_input}>
                        <TextInput
                            multiline
                            numberOfLines={5}
                            value={this.state.content}
                            onChangeText={(text) => {this.setState({content: text})}}
                        />
                    </View>
                </View>
                <View style={styles.comment_field_button}>
                    <Button
                        onPress={()=>{
                            this.state.username='username';
                            this.handleSubmit();
                        }}
                        title={'发布'}
                    />
                </View>
            </View>
        )
    }

    handleSubmit () {
        if (this.props.onSubmit) {
            const { username, content } = this.state;
            this.props.onSubmit({username, content})
        }
        this.setState({ content: '' })
    }
}
const styles = StyleSheet.create({
    comment_input:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor:'#f1f1f1',
        padding:30,
        marginBottom: 10,
    },
    comment_field:{
        marginBottom: 15,
        display:'flex',
    },
    comment_field_name:{
        display:'flex',
        fontSize:14,
    },
    comment_field_input:{
        borderWidth:1,
        borderColor:'#f1f1f1',
        //numberOfLines:5,
        height:100,
        marginTop:10,
        marginBottom:10,
        paddingVertical: 0
    },
    comment_field_button:{
        display:'flex',
        justifyContent: 'flex-end',
        marginRight:10,
        width:'25%',
        borderRadius:3,
        backgroundColor: '#00a3cf',
        color:'#fff'
    }
});
export default CommentInput