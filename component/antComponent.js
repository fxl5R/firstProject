

import React, { Component } from 'react';
import {Text, TouchableHighlight, View,Alert} from 'react-native';
import { Card, WhiteSpace, WingBlank,SearchBar } from '@ant-design/react-native';
import PropTypes from 'prop-types';

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
