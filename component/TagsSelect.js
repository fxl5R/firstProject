import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    Alert,
    Text,
} from 'react-native';

import { TagSelect } from 'react-native-tag-select';

export default class TagsSelect extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Support_Set:[],
        };
    }
    /*父组件中的接收
        setValue = Support_Set => {
            this.setState({Support_Set});
            //alert('测试state'+this.state.Support_Set);
            Alert.alert('Selected items:'+ JSON.stringify(this.state.Support_Set));
            console.log('selecteditems'+ JSON.stringify(this.state.Support_Set));
        };*/
    render() {
        const data = [
            { id: 1, label: '热水淋浴' },//shower
            { id: 2, label: '洗衣机' },//washer
            { id: 3, label: '浴缸' },//bathtub
            { id: 4, label: '有线网络' },//line-wifi
            { id: 5, label: '电视' },//TV
            { id: 6, label: '无线网络' },//wifi
            { id: 7, label: '冰箱'},//freezer
            { id: 8, label: '空调'},//aircon
            { id: 9, label: '暖气'},//warm
            { id:10, label: '门禁系统'},//safed
            { id:11, label: '电梯'},//lift
            { id:12, label: '停车位'},//park
            { id:13, label: '饮水设备'},//water

        ];

        return (
            <View style={styles.container}>
                <Text style={styles.labelText}>配套设施：</Text>
                <TagSelect
                data={data}
                itemStyle={styles.item}
                itemLabelStyle={styles.label}
                itemStyleSelected={styles.itemSelected}
                itemLabelStyleSelected={styles.labelSelected}
                ref={(tag) => {
                    this.tag = tag;
                }}
/*                onItemPress={()=>{
                    //this.handleSelect();
                    this.setState({Support_Set:JSON.stringify(this.tag.itemsSelected)});
                    this.props.setValue(this.state.Support_Set);
                    console.log('Selected items-state:', JSON.stringify(this.state.Support_Set))
                }}*/
                onItemPress={(Support_Set) => {
                    this.setState({Support_Set});
                    console.log('had selected:'+JSON.stringify(this.state.Support_Set));
                }
                }
            />
                {/*<View style={styles.buttonContainer}>
                    <View>
                        <Button
                            title="Get selected"
                            //onPress={()=>this.handleSelect()}
                            onPress={()=>
                                {this.setState({Support_Set:JSON.stringify(this.tag.itemsSelected)});
                                console.log('Support_Set:'+this.state.Support_Set);
                                Alert.alert('Selected items:', JSON.stringify(this.tag.itemsSelected));
                                }
                            }

                        />
                    </View>
                </View>
               <Text style={styles.labelText}>With custom style:</Text>
                <TagSelect
                    data={data}
                    max={13}
                    ref={(tag) => {
                        this.tag = tag;
                    }}
                    onMaxError={() => {
                        Alert.alert('Ops', 'Max reached');
                    }}
                />
                       <View style={styles.buttonInner}>
                        <Button
                            title="Get selected count"
                            style={styles.button}
                            onPress={() => {
                                Alert.alert('Selected count', `Total: ${this.tag.totalSelected}`);
                            }}
                        />
                    </View>
                */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 50,
        marginLeft: 15,
    },
    buttonContainer: {
        padding: 15,
    },
    buttonInner: {
        marginBottom: 15,
    },
    labelText: {
        color: '#B0C4DE',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 15,
    },
    item: {
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#FFF',
    },
    label: {
        color: '#333'
    },
    itemSelected: {
        backgroundColor: '#B0C4DE',//#333
    },
    labelSelected: {
        color: '#FFF',
    },
});