
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
                <View style={styles.concontainer}>
                    <Image style={{height:height/2,width:'90%',}} source={require('../res/images/tip_nodata.png')}/>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
  container:{
      backgroundColor:'#f1f1f1',
      flex:1
  },
  concontainer:{
      backgroundColor: 'white',
      borderColor:'#f1f1f1',
      justifyContent:'center',
      flex:1
  }
});