/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,     //返回按钮可单击
    Button
    } from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from "./NavigationBar";
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
// type Props = {};

// export default AppStackNavigator;

export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_home',
        };
    }
    renderButton(image){
        return(
            // 响应触发
        <TouchableOpacity  onPress={this.props.navigator.pop()}>
            <Image style={styles.button} source={image}/>
        </TouchableOpacity>
        );
    }
      render() {
        const {navigation}=this.props;
    return (
      <View style={styles.container}>
          <TabNavigator>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_home'}
                  selectedTitleStyle={{color:'#2680F0'}}               //选中后text的颜色
                  title="首页"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_hindex.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('./res/images/ic_hindex.png')} />}
                  badgeText="1"
                  onPress={() => this.setState({ selectedTab: 'tb_home' })}>
                  <View styles={styles.page1}><Text style={styles.text}>首页1111111</Text></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_star'}
                  selectedTitleStyle={{color:'#2680F0'}}
                  title="收藏"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_hstar.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('./res/images/ic_hstar.png')} />}
                  onPress={() => this.setState({ selectedTab: 'tb_star' })}>
                  <View styles={styles.page2}><Text style={styles.text}>收藏22222</Text></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_msg'}
                  selectedTitleStyle={{color:'#2680F0'}}               //选中后text的颜色
                  title="消息"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_hmsg1.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('./res/images/ic_hmsg1.png')} />}
                  badgeText="1"
                  onPress={() => this.setState({ selectedTab: 'tb_msg' })}>
                  <View styles={styles.page3}>
                      <NavigationBar
                          title={'Message'}
                          style={{
                              backgroundColor:'green'
                          }}
                          leftButton={
                              this.renderButton(require('./res/images/ic_back.png'))
                          }
                          rightButton={
                              this.renderButton(require('./res/images/ic_star.png'))
                          }
                      />
                      <Text style={styles.text}>消息33333</Text>
                      <Text style={styles.text} onPress={()=>{
                                this.props.onCallback('Bbback');
                                this.props.navigator.pop();
                            }}>
                          TTTestBBBack
                      </Text>
                      <Button title="go to MsgBox" onPress={()=>{
                          navigation.navigate('MsgBox')
                      }}/>
                  </View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_profile'}
                  selectedTitleStyle={{color:'#2680F0'}}
                  title="我"
                  renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_hprofile.png')} />}
                  renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2680F0'}]} source={require('./res/images/ic_hprofile.png')} />}
                  onPress={() => this.setState({ selectedTab: 'tb_profile' })}>
                  <View styles={styles.page4}><Text style={styles.text}>我4444444</Text></View>
              </TabNavigator.Item>
          </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  },
   page1:{
      flex:1,
       backgroundColor: '#AFEEEE',
       justifyContent: 'center',
       alignItems:'center'
   },
    page2:{
        flex:1,
        backgroundColor: '#AFEEEE',
    },
    page3:{
        flex:1,
        backgroundColor: 'blue',
    },
    page4:{
        flex:1,
        backgroundColor: '#AFEEEE',
    },
   image:{
        height: 24,
        width:24
   },
   text:{
      fontSize:26
   },
   button:{
       width:22,
       height:22,
       margin:5
   }
});
