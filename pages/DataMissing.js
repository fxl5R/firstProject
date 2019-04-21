
import React,{Component} from 'react';
import {StyleSheet, View, Image, Dimensions,Text} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class DataMissing extends Component{

    constructor(props) {
        super(props);

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:4}}/>
                <View style={styles.concontainer}>
                    <Image style={{height:150,width:150,marginTop:20}} source={require('../res/images/ic_nodata_box.png')}/>
                    <Text>暂无数据</Text>
                </View>
                <View style={{flex:4}}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
  container:{
      //backgroundColor:'#f1f1f1',
      flex:1,
      justifyContent: 'center',
      flexDirection:'row',
      alignItems:'center'
  },
  concontainer:{
      backgroundColor: 'white',
      borderColor:'#f1f1f1',
      justifyContent:'center',
      alignItems:'center',
  },
});