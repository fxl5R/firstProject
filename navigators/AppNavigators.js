
import {createAppContainer,createStackNavigator} from 'react-navigation';

import HomePage from '../pages/HomePage';
import MsgBox from '../pages/MsgBox';
import TabPage from '../pages/TabPage';
import guidePage from '../pages/GuidePage';
import login from '../pages/login';
//import firstRealm from '../pages/firstRealm';
import register from '../pages/register';
//import HouseDetail from "../component/HouseDetail";
//import SearchResults from '../component/SearchResults';
import MapLocation from '../util/MapLocation';


const AppStackNavigator = createStackNavigator({
    //HomePage:HomePage,
    //MsgBox:MsgBox

   TabPage:{
        screen:TabPage,
        navigationOptions:{
            header:null
        }
    },
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
/*    SearchResults:{
        screen:SearchResults,
        navigationOptions:{
            title:'Result',
            headerStyle: {
                backgroundColor: '#ADD8E6',
            },
            headerTitleStyle:{
                flex:1,
                textAlign: 'center'
            }
        }
    },
    houseDetail:{
        screen:'houseDetail',
        navigationOptions:{
            title:'房屋信息',
            headerStyle: {
                backgroundColor: '#ADD8E6',
            },
            headerTitleStyle:{
                flex:1,
                textAlign: 'center'
            }
        }
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
    MapLocation:{
        screen:MapLocation,
        navigationOptions:{
            header:null
        }
    },


});
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;

