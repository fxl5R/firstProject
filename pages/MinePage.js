import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import FormArrowToDetail from '../component/Form/FormArrowToDetail';
import FormWithPicture from '../component/Form/FormWithPicture';
import FormWithPairText from '../component/Form/FormWithPairText';
import Button from '../component/Button';

export default class MinePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.logout=this.logout.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height:48,backgroundColor:'#B0C4DE',flexDirection:'row',alignItems:'center'}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>个人中心</Text>
                    </View>
                    <View style={{height:48,width:48}}/>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.partContainer}>
                        <FormWithPicture
                            nickName={'用户234'}
                            contactText={'134****6810'}
                            pictureUri={'../res/images/logo_peo.png'}
                            onFormClick={() => this.personalProfile()}
                        />
                        <FormWithPairText
                            leftText="实名认证"

                            onFormClick={() => {}}
                            cutOffLine={false}
                        />
                    </View>
                    <View style={styles.partContainer}>
                        <FormArrowToDetail
                            leftText={'我的收藏'}
                            onFormClick={() => this.mySupportTeam()}
                            cutOffLine={false}
                        />
                    </View>
                    <View style={styles.partContainer}>
                        <FormArrowToDetail
                            leftText={'我的评论'}
                            onFormClick={() => this.helpAndFeedback()}
                        />
                        <FormArrowToDetail
                            leftText={'意见与反馈'}
                            onFormClick={() => this.evaluateApp()}
                        />
                        <FormArrowToDetail
                            leftText={'关于App'}
                            onFormClick={() => this.aboutTheApp()}
                            cutOffLine={false}
                        />
                    </View>
                    <Button
                        style={{ marginTop: 15,paddingTop:20}}
                        text="退出登录"
                        onButtonClick={() => this.logout()}
                    />
                </ScrollView>
            </View>
        )
    }

    /**
     * 跳转至 ‘个人资料页面’
     */
    personalProfile = () => {
        console.log('点击了个人资料');
        this.props.navigation.navigate('PersonalProfile');
    }

    /**
     * 跳转至 ‘我的收藏页面’
     */
    mySupportTeam = () => {
        this.props.navigation.navigate('MineStarTeam');
    }

    /**
     * 跳转至 ‘帮助与反馈’
     */
    helpAndFeedback = () => {
        console.log('点击了意见与反馈');
        this.props.navigation.navigate('HelpAndFeedback');
    }

    /**
     * 跳转至 ‘评价App页面’
     */
    evaluateApp = () => {
        console.log('点击了评价App页面');
        this.props.navigation.navigate('EvaluateApp');
    }

    /**
     * 跳转至 ‘关于页面’
     */
    aboutTheApp = () => {
        console.log('点击了关于');
        this.props.navigation.navigate('AboutApp');
    }

    /**
     * 跳转至 ‘登录页面’
     */
    logout = () => {
        console.log('点击了退出登录');
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        });
        this.props.logout();
        this.props.navigation.dispatch(resetAction);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    partContainer: {
        marginTop: 10,
        borderTopColor:'#D3D3D3',
        borderTopWidth: 0.5,
        borderBottomColor:'#D3D3D3',
        borderBottomWidth: 0.5,
        paddingVertical: 5
    }
});

