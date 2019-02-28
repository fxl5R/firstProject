
import React, {Component} from 'react';
import {StyleSheet, Text, View,Button,SectionList,RefreshControl,ActivityIndicator} from 'react-native';
//import AppContainer from "../navigators/AppNavigators";

type Props = {};

const HOUSE_NAMES=[{
    data:['HOUSE_1','HOUSE_2','HOUSE_3'],
    title:"校区房"},{
    data:['HOUSE_4','HOUSE_5','HOUSE_6'],
    title:"商品房"},{
    data:['HOUSE_7','HOUSE_8','HOUSE_9'],
    title:"xxx房"}];
export default class HomePage extends Component<> {
    /*_renderItem(data){
        return(
        <View style={styles.item}>
            <Text>{data.item}</Text>
        </View>)
    };*/
/*    _keyExtractor(item,index) {
        return "index" + index + item;
    }*/
    constructor(props){
        super(props);
        this.state={
            isLoading:false,//初始化加载状态为不加载
            dataArray:HOUSE_NAMES//初始化数据
        }
    }
    loadData(refreshing){
        if(refreshing){
        this.setState({
            isLoading:true//设置state为正在加载
        });}
        setTimeout(()=> {
            let dataArray = [];
            if (refreshing) {    //如果下拉将数据顺序翻转
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
        }else{                //上拉，添加数据
                dataArray=this.state.dataArray.concat("底部添加新数据");
            }
            this.setState({
                dataArray:dataArray, //将数据重置为最新
                isLoading:false//将加载状态设置为不加载（即加载结束
            })
        },20000);
    };

    getIndicator=()=>{
        return (
            <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                color={'#6495ED'}
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>)
    };
    render() {
        return (
            <View style={styles.container}>
                {/*<Text style={styles.welcome}>Welcome toHomePage</Text>
                <Button
                    title={'gotoMsgBox'}
                    onPress={()=>{
                        this.props.navigation.navigate('MsgBox');
                    }}
                />
                <Button
                    title={'gotoTabPage'}
                    onPress={()=>{
                        this.props.navigation.navigate('TabPage');
                    }}
                />*/}
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={()=><View style={styles.separator}/>}

                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['#6495ED']}//Android的刷新图标颜色
                            tintColor={'blue'}//iOS刷新图标颜色
                            titleColor={'#708090'}//标题颜色
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            onRefresh={()=>{ //触发刷新方法
                                this.loadData(true);
                            }}
                        />
                    }
                    //自定义上拉加载数据
                    ListFooterComponent={()=>this.getIndicator()}//上拉加载更多时，调用自定义的加载图标（loading圈圈）
                    /*onEndReached={()=>{//当所有数据都已经渲染过，并且列表被滚动到最底部时调用
                        this.loadData()
                    }}*/
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        backgroundColor: '#c5ecff',
        height: 150,
        width:150,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        justifyContent: 'center',
        elevation:5,//漂浮的效果
        borderRadius:5,//圆角
    },
    separator:{
        height:0.5,
        margin:10,
        backgroundColor:'gray',
        flex:1
    },
    indicator:{
        color:'red',
        margin: 10
    },
    indicatorContainer: {
        alignItems: 'center'
    },
});
