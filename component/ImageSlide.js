/*
import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, } from 'react-native';

class ImageSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:  ['http://--/xxx.jpg','http://--/xxx.jpg','http://--/xxx.jpg'],
        };
    }
    _renderImage() {
        let result = [];
        this.state.images.map((url, index) => {
            result.push(<Image key={index} source={ {uri: url} } style={styles.thumbnail_l}>);});
            return result;
    }
    _renderPaging(count) {
        let result = [], icon_color;
        for(var i = 0; i < count; i++ ) {
        icon_color = (this.state.image_position === i) ? {color: 'red'} : {color: 'gray'};
        result.push(
        <Text key={i} style={[{fontSize: 20}, icon_color]}>●</Text>
        );
    }
        return result;
    }
    _changeImage(event) {
        let offset_x = event.nativeEvent.contentOffset.x;
        let position = offset_x / 250;
        this.setState({image_position: position});
    }
    render() {
        return (
        <View style={styles.thumbnail_area}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        style={styles.thumbnail_scroll}
        onMomentumScrollEnd={this._changeImage.bind(this)}
        >
        {this._renderImage()}
        </ScrollView>
        <View style={styles.thumbnail_paging}>
        {this._renderPaging(this.state.images.length)}
        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    thumbnail_area: {
    justifyContent: 'center',
    alignItems: 'center',
},
    thumbnail_scroll: {
    flexDirection: 'row',
    width: 250,
    height: 150,
},
    thumbnail_l: {
    flex: 1,
    width: 250,
    resizeMode: 'contain',
},
    thumbnail_paging: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 250,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.0)'
},
});
export default ImageSlide;*/
