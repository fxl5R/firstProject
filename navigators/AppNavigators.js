
import {createAppContainer,createStackNavigator} from 'react-navigation';
import HomePage from '../pages/HomePage';
import MsgBox from '../pages/MsgBox';
import TabPage from '../pages/TabPage';
import guidePage from '../pages/GuidePage';
import login from '../pages/login';
//import firstRealm from '../pages/firstRealm';
import register from '../pages/register';

const AppStackNavigator = createStackNavigator({
    //HomePage:HomePage,
    //MsgBox:MsgBox
    Login:{
        screen:login,
        navigationOptions:{header: null}
    },
    register:{
        screen:register,
        navigationOptions:{header:null}
    },
    /*firstRealm: {
        screen: firstRealm,
        navigationOptions: {
            title:'Realm实战',
        },
    },*/
    MsgBox: {
        screen: MsgBox,
        navigationOptions: {
            title: 'MessageBox',
        },
    },

    Guide:{
        screen:guidePage,
        navigationOptions:{
            header:null
        }
    },
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

});
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;

