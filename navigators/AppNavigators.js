
import {createAppContainer,createStackNavigator} from 'react-navigation';

import login from '../pages/login';
import ValidRegister from '../pages/ValidRegister';

import register from '../pages/register';
import HomePage from '../pages/HomePage';
import TabPage from '../pages/TabPage';
import guidePage from '../pages/GuidePage';
import ProtocolPage from '../pages/ProtocolPage';
import AddHousePage from '../pages/AddHousePage';
import EditHouse from '../pages/EditHouse';
import PublishResult from '../pages/PublishResult';
import LandLordPage from '../pages/LandLordPage';

import HouseDetail from '../component/HouseDetail';
import HouseCell from '../component/HouseCell';
import navigatorExpo from '../navigators/navigatorExpo';
import MapLocation from '../util/MapLocation';
import ActionSheetExample from '../util/ActionSheetExample';
import WeiboUtil from '../util/WeiBoUtil';

import PersonalProfile from '../pages/Mine/PersonalProfile';
import CommentManager from '../pages/Mine/CommentManager';
import HouseManager from "../pages/Mine/HouseManager";
import CommentDisplay from '../pages/Mine/CommentDisplay';
import CommentApp from '../pages/Mine/CommentApp';
import RealConfirm from '../pages/Mine/RealConfirm';

import MDropDown from '../component/ActionMenu/MDropDown';
import ImageBrowers from '../component/ImageBrowers';

import AddHouseButton from '../component/Collecthouse';
const AppStackNavigator = createStackNavigator({

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
    AddHouseButton:{
        screen:AddHouseButton,

    },
    WeiboUtil:{
        screen:WeiboUtil,
        navigationOptions:{header: null}
    },
/*
    TabPage:{
        screen:TabPage,
        navigationOptions:{
            header:null
        }
    },*/

    ActionSheetExample:{
        screen:ActionSheetExample,
        navigationOptions:{
            header:null
        }
    },

    ValidRegister:{
        screen:ValidRegister,
        navigationOptions:{header: null}
    },

    register:{
        screen:register,
        navigationOptions:{header:null}
    },

    MDropDown:{
        screen:MDropDown,
        navigationOptions:{
            header:null
        }
    },

    navigatorExpo:{
        screen:navigatorExpo
    },

    HouseDetail:{
        screen:HouseDetail,
        navigationOptions:{
            header:null
        }
    },

    ImageBrowers:{
        screen:ImageBrowers,
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
    /*    UserInfo:{
            screen:UserInfo,
            navigationOptions:{
                header:null
            }

        },*/
    CommentManager:{
        screen:CommentManager,
        navigationOptions:{
            header:null
        }
    },
    HouseManager:{
        screen:HouseManager,
        navigationOptions:{
            header:null
        }
    },
    CommentDisplay:{
        screen:CommentDisplay,
        navigationOptions:{
            header:null
        }
    },

    CommentApp:{
        screen:CommentApp,
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

    HouseCell: {
        screen: HouseCell,
        navigationOptions:{
            header:null
        }
    },

    ProtocolPage:{
        screen:ProtocolPage,
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

    EditHouse:{
        screen:EditHouse,
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

