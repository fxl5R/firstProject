
import {createStackNavigator} from 'react-navigation'
import App from '../App'
import HomePage from '../pages/HomePage'
import MsgBox from '../pages/MsgBox'

export const AppStackNavigator = createStackNavigator({
    //HomePage:HomePage,
    //MsgBox:MsgBox
    IndexHome:{
        screen:App
    },
    HomePage:{
        screen:HomePage,
        /*navigationOptions: ({navigation})=>({
            title:'HomePage',
            headerButtonImage:'true',
        })*/
    },
    MsgBox:{
         screen: MsgBox
     },
});
