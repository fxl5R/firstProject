import React,{Component} from 'react';

import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

export default class HouseCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let {houseData} = this.props;
        return (
            <TouchableHighlight
                onPress={this.props.onSelect}
                underlayColor='#F5FCFF'>
                <View style={{backgroundColor: '#FFF'}}>
                    <View style={{padding: 10, flexDirection: 'row'}}>
                        <Image style={styles.thumb} source={{uri: houseData.logo}}/>
                        <View style={{flex: 2, paddingLeft: 10}}>
                            <Text style={{fontSize: 16}}>{houseData.title}</Text>
                            <Text style={{marginTop: 8, marginBottom: 8}}>{houseData.company}</Text>
                            <Text style={{color: '#999'}}>{houseData.info}</Text>
                        </View>
                        <View style={{flex: 1, paddingLeft: 10}}>
                            <Text style={{color: '#999', textAlign: 'right'}}>{houseData.date}</Text>
                            <Text style={{marginTop: 8, color: 'red', textAlign: 'right'}}>{houseData.salary}</Text>
                        </View>
                    </View>
                    <View style={{padding: 10, flexDirection: 'row'}}>
                        <Text style={styles.companyTag}>{houseData.companyPosition}</Text>
                        <Text style={styles.companyTag}>{houseData.companyPerson}</Text>
                        <Text style={styles.companyTag}>{houseData.companyService}</Text>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}
// 样式
const styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    thumb: {
        width: 64,
        height: 64,
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    companyTag: {
        color: '#999',
        fontSize: 12,
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#E8E8E8'
    },
});
//module.exports = SearchResults;