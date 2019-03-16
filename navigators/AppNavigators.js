
import {createAppContainer,createStackNavigator} from 'react-navigation';

import login from '../pages/login';
import register from '../pages/register';
import HomePage from '../pages/HomePage';
import TabPage from '../pages/TabPage';
import guidePage from '../pages/GuidePage';
import AddHousePage from '../pages/AddHousePage';
import PublishResult from '../pages/PublishResult';
import LandLordPage from '../pages/LandLordPage';
import CommentPage from '../pages/CommentPage';

import ImagePickerExample from '../component/antComponent';
import HouseDetail from '../component/HouseDetail';
import HouseCell from '../component/HouseCell';
import navigatorExpo from '../navigators/navigatorExpo';
//import SearchResults from '../component/SearchResults';
import MapLocation from '../util/MapLocation';


import PersonalProfile from '../pages/Mine/PersonalProfile';
import CommentManager from '../pages/Mine/CommentManager';
import RealConfirm from '../pages/Mine/RealConfirm';

import MDropDown from '../component/ActionMenu/MDropDown';

const AppStackNavigator = createStackNavigator({
    //HomePage:HomePage,
    //MsgBox:MsgBox
    TabPage:{
        screen:TabPage,
        navigationOptions:{
            header:null
        }
    },
    MDropDown:{
        screen:MDropDown,
        navigationOptions:{
            header:null
        }
    },
    register:{
        screen:register,
        navigationOptions:{header:null}
    },
    navigatorExpo:{
        screen:navigatorExpo
    },

    ImagePickerExample:{
       screen:ImagePickerExample,
        navigationOptions:{
            header:null
        }

    },
    HouseDetail:{
        screen:HouseDetail,
        navigationOptions:{
            header:null
        }
    },
    LandLordPage:{
       screen:LandLordPage,
        navigationOptions:{
           header:null
            }
    },
    PersonalProfile:{
      screen:PersonalProfile,
        navigationOptions:{
            header:null
        }
    },
    CommentManager:{
       screen:CommentManager,
        navigationOptions:{
            header:null
        }
    },
    CommentPage:{
       screen:CommentPage,
       navigationOptions:{
            header:null
        }
    },
    RealConfirm:{
        screen:RealConfirm,
        navigationOptions:{
            header:null
        }
    },
    Login:{
        screen:login,
        navigationOptions:{header: null}
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
    },*/

    HouseCell: {
        screen: HouseCell,
        navigationOptions:{
            header:null
        }
    },
    AddHousePage: {
        screen: AddHousePage,
        navigationOptions:{
            header:null
        }
    },
    PublishResult:{
        screen: PublishResult,
        navigationOptions:{
            header:null
        }
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

