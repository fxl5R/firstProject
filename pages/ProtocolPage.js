
import React,{Component} from 'react';
import {StyleSheet, View, Image, Dimensions, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import BackHeader from "../component/BackHeader";
import {Checkbox} from "teaset";

let {height, width} = Dimensions.get('window');

export default class ProtocolPage extends Component{


    constructor(props) {
        super(props);
        this.state={
            checkedEmpty:false,

        }}
    render(){
        return(
            <View style={styles.container}>
                <BackHeader navigation={this.props.navigation} title={'租房条约'}/>
                <View style={styles.concontainer}>
                    <ScrollView>
                        <View>
                            <Text style={styles.text}>尊敬的房东，您好，欢迎来到智能租房平台。我们将竭诚为您提供最优质的出租服务，
                                我们也需要您遵守下列公约，以保证公平、良好、有序的租房环境。</Text>
                            <Text style={styles.text}>保证在平台上登录的个人信息及相关证据真实、有效；</Text>
                            <Text style={styles.text}>保证所出租房屋登记信息的完整性和真实性；</Text>
                            <Text style={styles.text}>保证所出租房屋的完全所有权，或出租房屋在租赁期间的完全处置权；</Text>
                            <Text style={styles.text}>保证所出租房屋的建筑结构和设备设施符合建筑、消防、治安、卫生等方面的安全条件，不得危及人身安全；</Text>
                            <Text style={styles.text}>您必须保证如果通过本平台寻找到租客，不通过其它途径与租客发生平台职责范围之内的接触或经济往来；</Text>
                            <Text style={styles.text}>在房屋未租赁状态，您可以随时下线房屋，下线后的房屋不会再被租客求租。
                                但已有租赁关系的房屋如果想停止出租，则必须等到当前租约结束，或者您主动违约。</Text>
                            <Text style={styles.text}>在租赁过程中，您须遵循契约精神，满足租客的合法、合理要求。和睦友善，一起打造优质的租房环境。</Text>
                            <Text style={styles.text}>如果您在本平台登录房屋包括申请审核上线，则等同于您默认以上公约，双方签订了具有法律责任的合同。
                                若您在出租房屋的过程中违反以上公约，我们将有权对您追究违约责任。</Text>
                            <View style={{flexDirection: 'row',justifyContent:'center',marginTop:20}}>
                                <Checkbox
                                    checked={this.state.checkedEmpty}
                                    onChange={value => this.setState({checkedEmpty: value})}
                                />
                                <Text style={{fontSize:13.5,color:'#999'}}>我已知悉并同意以上条款</Text>
                            </View>
                        </View>
                        <View  style={{alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(this.state.checkedEmpty);
                                    if(this.state.checkedEmpty===true){
                                        this.props.navigation.navigate('AddHousePage');
                                    }else{
                                        Alert.alert('请确认租房条约');
                                    }
                                }}
                                activeOpacity={0.7}
                                style={styles.button1} >
                                <Text style={{ textAlign:'center',color:'#F5F5F5',fontSize:15,}}> 继续发布房屋信息 </Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f1f1f1',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    concontainer:{
        backgroundColor: 'white',
        borderColor:'#f1f1f1',
        justifyContent:'center',
        width:'98%',
        flex:1
    },
    text:{
        fontSize:15,
        marginTop:10,
        marginLeft:10,
        marginRight:10
    },
    button1: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#B0C4DE',
        borderRadius:7,
        marginTop: 14,
        marginBottom:15,
        elevation: 1
    },

});