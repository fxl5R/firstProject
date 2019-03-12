/**
 * 设置界面Item布局
 */

import React from 'react';
//import PropTypes from 'prop-types';
import{ 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const ShortLine = () => (
    <View style={{backgroundColor:'white'}}>
        <Image source={require('../res/images/ic_short_bar.png')}
               style={styles.short_line}/>           
    </View>
);
const styles=StyleSheet.create({
    short_line:{
        marginLeft:10,
    },
});
export default ShortLine;