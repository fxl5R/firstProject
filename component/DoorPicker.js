
import React, { Component } from 'react';

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';

import BaseDialog from 'react-native-pickers/view/BaseDialog.js';

import PickerView from 'react-native-pickers/view/PickerView';

export default class DoorPicker extends BaseDialog {

    static defaultProps = {
        room:'',
        living:'',
        bath:'',
        kitchen:'',
        balcony:'',
        selectedValue: [this.room, this.living,this.bath,this.kitchen,this.balcony],
        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',
        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',
        onPickerCancel: null,
        onPickerConfirm: null,
        listroom: ['一室', '二室', '三室', '其他'],
        listliving: ['一厅', '二厅', '三厅', '其他'],
        listbath: ['一卫', '二卫', '三卫', '其他'],
        listkitchen: ['一厨', '二厨', '三厨', '其他'],
        listbalcony: ['一阳台', '二阳台', '三阳台', '其他'],

    };

    constructor(props) {
        super(props);
        this.state={
            room:'',
            living:'',
            bath:'',
            kitchen:'',
            balcony:'',
            //...this.formatPickerData(props.selectedValue)
        }
    }
    formatPickerData(){
        /*this.props.selectedValue[0]=this.state.room;
        this.props.selectedValue[1]=this.state.living;
        this.props.selectedValue[2]=this.state.bath;
        this.props.selectedValue[3]=this.state.kitchen;
        this.props.selectedValue[4]=this.state.balcony;*/
        let room=this.state.room;
        let living=this.state.living;
        let bath=this.state.bath;
        let kitchen=this.state.kitchen;
        let balcony=this.state.balcony;
        return { pickerData:[room, living, bath, kitchen, balcony],visible:true};
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }
    renderContent() {
        return <View>
            <View >
                {this.renderPicker()}
            </View>
            <View style={{
                width: this.mScreenWidth,backgroundColor: '#ffffff', flexDirection: 'row',
                justifyContent: 'space-between', position: 'absolute',top:0
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => {
                            this.props.onPickerCancel && this.props.onPickerCancel();
                        });
                    }}
                    style={{ width:this.getSize(60), height: this.getSize(40), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>
                        {this.props.cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => {
                            this.props.onPickerConfirm && this.props.onPickerConfirm([
                                this.state.room?this.state.room:'一室',
                                this.state.living?this.state.living:'一厅',
                                this.state.bath?this.state.bath:'一卫',
                                this.state.kitchen?this.state.kitchen:'一厨',
                                this.state.balcony?this.state.balcony:'一阳台']);
                        });
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(40), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>
                        {this.props.confirmText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }


    renderPicker() {
        /*return this.state.pickerData.map((item, pickerId) => {
            let selectedIndex = 0;
            let length = item.length;
            for (let i = 0; i < length; i++) {
                if (item[i] === this.props.selectedValue[pickerId]) {
                    selectedIndex = i;
                    break;
                }
            }
            if (item && length > 0) {*/
                return (
                    <View style={{width: this.mScreenWidth,backgroundColor: '#ffffff', flexDirection: 'row'}}>
                        <PickerView
                            list={this.props.listroom}
                            onPickerSelected={(toValue) => {
                                // console.warn(toValue)
                                //this.props.selectedValue = toValue;
                                //this.setState(this.props.selectedValue);
                                this.setState({ room:toValue });
                                this.props.room=toValue
                            }}
                            //selectedIndex={0}
                            fontSize={this.getSize(14)}
                            itemWidth={this.mScreenWidth / 5}
                            itemHeight={this.getSize(40)} />
                        <PickerView
                            list={this.props.listliving}
                            onPickerSelected={(toValue) => {
                                this.setState({living:toValue})
                                this.props.living=toValue
                            }}
                            //selectedIndex={0}
                            fontSize={this.getSize(14)}
                            itemWidth={this.mScreenWidth / 5}
                            itemHeight={this.getSize(40)} />
                        <PickerView
                            list={this.props.listbath}
                            onPickerSelected={(toValue) => {
                                this.setState({bath:toValue})
                                this.props.bath=toValue
                            }}
                            //selectedIndex={0}
                            fontSize={this.getSize(14)}
                            itemWidth={this.mScreenWidth / 5}
                            itemHeight={this.getSize(40)} />
                        <PickerView
                            list={this.props.listkitchen}
                            onPickerSelected={(toValue) => {
                                this.setState({kitchen:toValue})
                                this.props.kitchen=toValue
                            }}
                            //selectedIndex={0}
                            fontSize={this.getSize(14)}
                            itemWidth={this.mScreenWidth / 5}
                            itemHeight={this.getSize(40)} />
                        <PickerView
                            list={this.props.listbalcony}
                            onPickerSelected={(toValue) => {
                                this.setState({balcony:toValue})
                                this.props.balcony=toValue
                            }}
                            //selectedIndex={0}
                            fontSize={this.getSize(14)}
                            itemWidth={this.mScreenWidth / 5}
                            itemHeight={this.getSize(40)} />
                    </View>
                )
            /*} else {
                return null;
            }
        });*/
    }


}
