
import {createStackNavigator} from 'react-navigation'
import App from './App'
import MsgBox from '../pages/MsgBox'

export const AppStackNavigator = createStackNavigator({
    HomePage:App,
    MsgBox:MsgBox
    // MsgBox:{
    //     screen: MsgBox
    // }
});