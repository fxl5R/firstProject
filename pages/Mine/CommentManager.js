import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Tabs,Modal, } from '@ant-design/react-native';
import BackHeader from '../../component/BackHeader';
const renderContent = (tab, index) => {
    const style = {
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    };
    this.TabContentClick = () => {
        Modal.operation([
            { text: '标为已读', onPress: () => console.log('标为已读被点击了') },
            { text: '删除聊天', onPress: () => console.log('删除聊天被点击了') },
        ]);
    };
    const content = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        return (
            <TouchableOpacity onPress={()=>this.TabContentClick} key={`${index}_${i}`}>
            <View key={`${index}_${i}`} style={style}>
                <Text>
                    {tab.title} - {i}
                </Text>
            </View>
            </TouchableOpacity>
        );
    });
    return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};
export default class CommentManager extends React.Component {
    constructor(props) {
        super(props);
        this.TabContentClick = () => {
            Modal.operation([
                { text: '标为已读', onPress: () => console.log('标为已读被点击了') },
                { text: '删除聊天', onPress: () => console.log('删除聊天被点击了') },
            ]);
        };
    }

    render() {
        const tabs = [
            { title: '我发出的' },
            { title: '我收到的' },
        ];
        /*const style = {
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            backgroundColor: '#fff',
        };*/
        return (

            <View style={{ flex: 1 }}>
                <BackHeader navigation={this.props.navigation} title={'评论管理'}/>
                {/*<Tabs tabs={tabs}>
                    <View style={style}>
                        <Text>Content of First Tab</Text>
                    </View>
                    <View style={style}>
                        <Text>Content of Second Tab</Text>
                    </View>
                    <View style={style}>
                        <Text>Content of Third Tab</Text>
                    </View>
                </Tabs>*/}
                <View style={{ flex: 2 }}>
                    <Tabs tabs={tabs} initialPage={1} tabBarPosition="top">
                        {renderContent}
                    </Tabs>
                </View>
            </View>
        );
    }
}

/*
export const title = 'Tabs';
export const description = 'Tabs example';*/
