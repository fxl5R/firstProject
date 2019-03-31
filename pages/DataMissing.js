
import React,{Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

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
                    <Image style={{height:height/2.5,width:'80%',}} source={require('../res/images/tip_nodata.png')}/>
                </View>
                <View style={{flex:4}}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
  container:{
      backgroundColor:'#f1f1f1',
      flex:1,
      justifyContent: 'center',
      flexDirection:'column'
      //alignItems:'center'
  },
  concontainer:{
      backgroundColor: 'white',
      borderColor:'#f1f1f1',
      justifyContent:'center',
      //alignItems:'center',
      flex:4
  }
});