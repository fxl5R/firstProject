
import React, { Component } from 'react';
import { View, Alert} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class MDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typee: '',
            door: '',
            decorate: '',
            sort: '',
        };
    }
    //传递选择的下拉值到父组件（TabPage）中,
    // handleChange2、3、4分别传递door、decorate、sort的值
    handleChange1 = (typee) => {
        this.setState({typee});
        this.props.setValue1(this.state.typee)
    };
    handleChange2 = (door) => {
        this.setState({door});
        this.props.setValue2(this.state.door)
    };
    handleChange3 = (decorate) => {
        this.setState({decorate});
        this.props.setValue3(this.state.decorate)
    };
    handleChange4 = (sort) => {
        this.setState({sort});
        this.props.setValue4(this.state.sort)
    };

    render() {
        let dataType = [{
            value: '整租',
        }, {
            value: '合租',
        }, {
            value: '不限',
        }];
        let dataDoor = [{
            value: '一室',
        }, {
            value: '二室',
        }, {
            value: '三室',
        }, {
            value: '不限',
        }];
        let dataDecorate = [{
            value: '毛坯',
        }, {
            value: '简装',
        }, {
            value: '精装',
        }, {
            value: '不限',
        }];
        let dataSort = [{
            value: '面积由大到小',
        }, {
            value: '面积由小到大',
        }, {
            value: '租金由高到低',
        }, {
            value: '租金由低到高',
        }, {
            value: '不限',
        }];
        let {typee,door,decorate,sort}=this.state;

        return (
            <View>
            <View style={{ flexDirection: 'row',marginEnd:-5 }}>

                {/*过程①*/}
                <View style={{ flex: 1 }}>
                    <Dropdown
                        label='出租类型'
                        data={dataType}
                        value={typee}
                        onChangeText={this.handleChange1}
                        />
                </View>

                <View style={{ flex: 1.2 }}>
                    <Dropdown
                        label='房源户型'
                        data={dataDoor}
                        value={door}
                        onChangeText={this.handleChange2}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Dropdown
                        label='装修情况'
                        data={dataDecorate}
                        value={decorate}
                        onChangeText={this.handleChange3}
                    />
                </View>
                <View style={{ flex: 1.4 }}>
                    <Dropdown
                        label='推荐排序'
                        data={dataSort}
                        value={sort}
                        onChangeText={this.handleChange4}
                    />
                </View>
            </View>
            </View>
        );
    }
}
