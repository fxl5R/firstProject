/**
 * 评论
 */
'use strict';
import React, {Component} from 'react';
import{ 
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    ListView,
    ToastAndroid,
    InteractionManager,
} from 'react-native';
interface Props {
    onSubmitClick:() => void,
}
class Comment extends Component<Props> {
  constructor(props) {
      super(props);
      this.state={

      }

  }
  
  componentDidMount() {

  }

  //返回
/*  buttonBackAction(){
      const {navigator} = this.props.navigator;
      return NaviGoBack(navigator);
  }
 */
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <View style={{height:48,backgroundColor:'#B0C4DE',flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                       <Image 
                          style={{width:13,height:20}}
                          source={require('../res/images/ic_center_back.png')}
                       />
                    </TouchableOpacity>  
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>评论</Text>   
                    </View>  
                    <TouchableOpacity onPress={()=>this.props.onSubmitClick()}
                        style={{width:45,height:45,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:14}}>提交</Text>
                    </TouchableOpacity>
                </View>
                
             </View>
        );
    }
}
const styles=StyleSheet.create({
    
});

export default Comment;