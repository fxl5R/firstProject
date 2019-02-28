
import {createAppContainer,createStackNavigator} from 'react-navigation';
import HomePage from '../pages/HomePage';
import MsgBox from '../pages/MsgBox';
import TabPage from '../pages/TabPage';



const AppStackNavigator = createStackNavigator({
    //HomePage:HomePage,
    //MsgBox:MsgBox
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            title:'HomePage',
            headerStyle: {
                backgroundColor: '#ADD8E6',
            },
            headerTitleStyle:{
                flex:1,
                textAlign: 'center'
            }
        }
    },

    TabPage:{
        screen:TabPage,
        navigationOptions:{
            title:'HomePage',
            headerButtonImage: 'true',
        },
    },

    MsgBox: {
        screen: MsgBox,
        navigationOptions: {
            title: 'MessageBox',
            headerButtonImage: 'true',
        },
    },



});
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;

