

import React, { Component } from 'react';
import {Text, TouchableHighlight, View, Alert, StyleSheet} from 'react-native';

import { Card, WhiteSpace, WingBlank,SearchBar,ImagePicker, TextareaItem } from '@ant-design/react-native';

import PropTypes from 'prop-types';


//消息窗口
interface Props {
    msgtitle: string,
    msgbrief:string,
    imgUri:string,
    extra:string,
    footercontent:string,
    footerextracontent:string
}
export class MsgCard extends Component<Props> {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}>
                {this._renderContent()}
            </TouchableHighlight>
        );
    }
    _renderContent(){
        return(
            <View>
                <WhiteSpace size="md" />
                <Card full={false}>
                    <Card.Header
                        title={this.props.msgtitle}
                        thumbStyle={{ width: 35, height: 35 }}
                        thumb={this.props.imgUri}
                        extra={this.props.extra}/>
                    <Card.Body>
                        <View style={{ height: 42 }}>
                            <Text style={{ marginLeft: 16 }}>{this.props.msgbrief}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer content={this.props.footercontent} extra={this.props.footerextracontent} />
                </Card>
            </View>
        )
    }
}

//自定义搜索栏
export class SearchBarD extends Component {
    constructor(props) {
        super(props);
        super(...arguments);
        this.state = {
            value: '',
        },
        this.onChange = value => {
            this.setState({ value });
        };
        this.clear = () => {
            this.setState({ value: '' });
        };
    }
    render() {
        return (
            <View>
                <SearchBar
                    styles={{search_bar_height:'45',
                        search_bar_input_height:'30',
                        search_bar_font_size:'20',
                        icon_size_sm:'20',
                        input_color_icon:'../res/image/ic_search.png'}}
                    value={this.state.value}
                    placeholder="输入小区名或地址"
                    onSubmit={value => Alert.alert(value)}
                    onCancel={this.clear}
                    onChange={this.onChange}
                    showCancelButton
                />
            </View>
        );
    }
}
/*
let styles = StyleSheet.create({
    sBar:{
        search_bar_height:'35',
        search_bar_input_height:'30',
        search_bar_font_size:'20',
        icon_size_sm:'20',
        input_color_icon:'../res/image/ic_search.png'
},
});

class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <View style={styles.searchInput}>
                    <Kohana
                        style={[styles.textInput]}
                        label={'输入小区名或地址'}
                        iconClass={MaterialsIcon}
                        iconName={'search'}
                        iconColor={'#B0C4DE'}
                        iconSize={18}
                        labelStyle={{color:'#B0C4DE'}}
                        inputPadding={10}
                        useNativeDriver
                        onChangeText={(searchString)=>this.setState({searchString})}
                    />
                </View>
            </View>
        );
    }
}*/
const imagesdata = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

 export default class ImagePickerExample extends Component {
    state = {
        files: imagesdata,
    }
    onChange = (files, type, index) => {
        console.log('图片选择onononChange'+files, type, index);
        this.setState({
            files,
        });
    }

    render() {
        const { files } = this.state;
        return (
            <View>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log('图片点击click'+index, fs)}
                    selectable={files.length < 5}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </View>
        );
    }
}
