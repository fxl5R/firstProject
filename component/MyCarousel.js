import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window');


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class extends Component {
    render () {
        return (
            <View>
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}>
                <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                    <Image style={styles.image} source={require('../res/images/bathroom.jpeg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                    <Image style={styles.image} source={require('../res/images/dining.jpg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                    <Image style={styles.image} source={require('../res/images/room2.jpeg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
                    <Image style={styles.image} source={require('../res/images/room.jpeg')} />
                </View>
            </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
        width:width,
        height:240
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    paginationText: {
        alignItems:'flex-end',
        marginRight:10,
        color: '#B0C4DE',
        fontSize: 20
    }
};