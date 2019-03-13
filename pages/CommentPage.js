import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    FlatList,
    TextInput,
    TouchableHighlight
} from 'react-native';

const { width, height } = Dimensions.get('window');
import Icon from'react-native-vector-icons/FontAwesome';
import MOCK from 'mockjs'
// pp2={
//     avatar:'http://dummyimage.com/600x300/f7d8d3)'
// }

let i=3;
let ArrayHuiFu = [];
// var liuyan = {};
export default class CommentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            ping: {},
            huifu: [],
            content:'',
            _isSending: false
        }
    }

    componentDidMount() {
        this._getData();
        this._getDataHuiFu();
    }

    _getData() {
        fetch('http://rapapi.org/mockjs/22101/api/pinglun')
            .then( (response) => response.json() )
            .then( (data) => {
                let pp = MOCK.mock(data).pinglist;
                // var pp2 = MOCK.mock(data);
                // console.log(pp)
                // console.log(pp2)
                this.setState({
                    ping: pp,
                    // ping2: pp2
                })
            } )
            .catch( (err)=> {
                console.error(err)
            })
    }

    _getDataHuiFu() {
        fetch('http://rapapi.org/mockjs/22101/api/pinglun/huifu')
            .then( (response) => response.json() )
            .then( (data) => {
                // console.log(data)
                let Mock = MOCK.mock(data).huifulist;
                // console.log(Mock)
                // var mockDataArray = [];
                // mockDataArray = Mock.fuhuilist;
                // console.log(mockDataArray)
                this.setState({
                    huifu: Mock
                })

            } )
            .catch( (err)=> {
                console.error(err)
            })
    }


    _renderItemHuiFu(data) {
        // console.log(data)
        // liuyan = data
        return(
            <View style={{ padding:16,flexDirection:'row',justifyContent:'flex-start'}}>
                <View style={{ width:60,}}>
                    <Image source={{ uri: data.item.avatar1}} style={{ width:60,height:60,borderRadius:30}}/>
                </View>

                <View style={{paddingLeft:10}}>
                    <Text style={{fontSize: 18 }}>{data.item.name1}</Text>
                    <Text style={{ fontSize:18 ,lineHeight:30,width:width-102}}>{ data.item.content1 }</Text>
                    <Text>{ data.item.date1 }</Text>
                </View>


            </View>
        )
    }

    _submit() {
        if(!this.state.content) {
            return alert('留言不能为空')
        }
        if( this.state._isSending){
            return alert('评论正在提交')
        }
        this.setState({
            _isSending:true
        },() => {
            fetch('http://rapapi.org/mockjs/22101/api/pinglun/huifupost',{
                method:'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    'content':this.state.content
                })
            }).then( (response)=> response.json() )
                .then( (data) => {
                    if( data && data.success){
                        let liuyanContent = this.state.huifu;
                        // liuyanContent.map( (item) => {
                        //     ArrayHuiFu.push({
                        //         key: g,
                        //         data: item
                        //     })
                        //     g++;
                        // })
                        // console.log(ArrayHuiFu)
                        let item = [{
                            avatar1: "http://dummyimage.com/200x200/f2c779)",
                            date1: "1994-04-20",
                            key: "120000199" + i +"31207725X",
                            name1: "Cynthia Perez",
                            content1:this.state.content
                        }].concat(liuyanContent);

                        i++;

                        this.setState({
                            huifu:item,
                            _isSending: false
                        })

                    }
                })
        } )
    }

    render() {
        // console.log(this.state.huifu)
        // console.log(pp2.avatar)
        // console.log(this.state.ping2)
        // console.log(this.state.ping2.pinglist)
        // console.log(this.state.ping2.pinglist)
        // console.log(this.state.ping2.pinglist.avatar1)

        return (
            <View style={styles.container}>
                <View style={ styles.myCircle } >
                    <Text style={ styles.myCircleText }>我的圈子</Text>
                    <Icon name="angle-right" size={ 30 } color="black"/>
                </View>

                <ScrollView
                    automaticallAdjustContentInsert = { false }
                    style={ styles.ScrollView}
                >
                    <View style={ styles.infoBox }>
                        <View style={ styles.infoxBoxTop}>
                            <Image style={ styles.avatar } source={{ uri : this.state.ping.avatar1 }}/>
                            <Text style={ styles.name1}>{this.state.ping.name1}</Text>
                        </View>
                        <View style={styles.infoxContentContainer}>
                            <Text style={ styles.infoxContent }>{ this.state.ping.content1 }</Text>
                        </View>
                        <View>
                            <Text style={ styles.infoxDate }>{ this.state.ping.date1 }</Text>
                        </View>
                    </View>
                    <View style={{margin:16,
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        borderRadius:4,
                        alignItems:'center'
                    }}>
                        <TextInput
                            placeholder='写下你的评论'
                            underlineColorAndroid="transparent"
                            keybordType='numeric'
                            style={{height:80,width:width/2,fontSize:17}}
                            multiline={ true }
                            onChangeText={ (text) => {
                                this.setState({
                                    content: text
                                })
                            } }
                        >
                        </TextInput>

                        <TouchableHighlight onPress={ this._submit.bind(this) }>
                            <View style={{
                                width:50,
                                height:72,
                                backgroundColor:'#ff7454',
                                justifyContent:'center',
                                alignItems:"center",
                                borderRadius:4,
                            }}>
                                <Text style={{color:'white',fontSize:17,letterSpacing:20}}>提 交</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <FlatList
                        data= { this.state.huifu }
                        renderItem = { this._renderItemHuiFu }
                    />


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    infoxContentContainer: {
        marginTop:10,
        marginBottom:10
    },
    infoxDate: {
        fontSize: 16
    },
    infoxContent: {
        fontSize: 18,
        lineHeight:36
    },
    name1: {
        fontSize: 20
    },
    infoBox: {
        padding:16,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    },
    infoxBoxTop: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    avatar: {
        width:100,
        height:100,
        borderRadius:50,
        marginRight: 10
    },
    myCircleText: {
        fontSize: 18
    },
    myCircle: {
        height: 60,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});