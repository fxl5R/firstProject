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
/*import {
    NaviBar,
    GOBACK_BUTTON,
    GOBACK_IMAGE,
    }from 'react-native-pure-navigation-bar';*/
//import Navigator from '@react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from "./NavigationBar";
import { NavigationActions,createStackNavigator } from 'react-navigation';
//import {AppStackNavigator} from "./navigators/AppNavigators";

//export default AppStackNavigator;
export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_home'
        };
    }
/*    _leftButtonPress=()=>{
        const {navigation}=this.props;
        navigation.goBack();
    }*/
    onPress=()=>{
        const {onPress} =this.props;
        onPress();
    };
    static navigationOptions={
        title:'title-'
    }
/*    renderButton(image){
        return(
            // 响应触发  press:this.props.navigator.pop()
        <TouchableOpacity  onPress={alert('!!')}>
            <Image style={styles.button} source={image}/>
        </TouchableOpacity>
        );
    }*/
      render() {
/*          const navigateAction=NavigationActions.navigate({
              routeName:'./pages/MsgBox',
          });
          this.props.navigation.dispatch('navigateAction');*/

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

                  <View styles={styles.page1}>
                      <Text style={styles.text}>首页1111111.1</Text>
                  </View>
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
                              backgroundColor:'#C0C0C0'
                          }}
                          leftButton={
                              <View title={'收藏'}>
                                    <TouchableOpacity
                                        onPress={function () {
                                            alert('----返回上页----');
                                        }}>
                                        <Image style={styles.button} source={require('./res/images/ic_left-circle.png')}/>
                                    </TouchableOpacity>
                              </View>

                          }
                          rightButton={
                              <View title={'收藏'}>
                                  <TouchableOpacity
                                      onPress={function () {
                                          alert('----打开收藏----');
                                      }}>
                                        <Image style={styles.button} source={require('./res/images/ic_star.png')}/>
                                    </TouchableOpacity>
                              </View>
                          }

                      />
                      <Text style={styles.text}>消息33333</Text>
                      <Text style={styles.text}
                            onPress={()=>{
                                alert('test success');
                            }}>
                          TTTestBBBack
                      </Text>
                      <Button title="go to MsgBox" onPress={()=>{

                          NavigationActions.navigate({routeName:'./pages/MsgBox'})
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
       width:26,
       height:26,
       margin:5,
       padding:8
   }
});
