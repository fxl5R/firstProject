
import React,{Component} from "react";
import realm from "../util/realm";
import Gallery from 'react-native-image-gallery';


export default class  ImageBrowers extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    render(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        console.log('itemId'+itemId);
        let houses=realm.objects('House_Info').filtered('house_id==$0',itemId);//取出从HouseCell传递的对应id的房屋信息
        let house=houses[0];
        return (
            <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                    { source: { uri: house.house_pic  }, dimensions: { width: 150, height: 150 } },
                    { source: { uri: house.house_pic2 } },
                    { source: { uri: house.house_pic3 } },
                    { source: { uri: house.house_pic4 } },
                    { source: { uri: house.house_pic5 } },
                    { source: { uri: house.house_pic6 } }
                ]}
            />
        );
    }
}