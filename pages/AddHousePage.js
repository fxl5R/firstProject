
import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    YellowBox,
    ScrollView,
    Dimensions
} from 'react-native';
import { TextareaItem} from '@ant-design/react-native';

//import { createStackNavigator } from 'react-navigation';
import BackHeader from "../component/BackHeader";

import DoorPicker from '../component/DoorPicker';
import {SimpleItemsDialog,AreaPicker } from 'react-native-pickers';


import realm from '../util/realm.js';
import AreaJson from "../res/data/Area";
import ImagePicker from "react-native-image-crop-picker";
import TagSelect from "react-native-tag-select/src/TagSelect";
import {toastShort} from "../util/ToastUtil";

const {height, width} = Dimensions.get('window');


export default class AddHousePage extends Component {

/*
    static navigationOptions =
        {
            title: 'AddHouseActivity',
            header: null
        };
    GoToSecondActivity = () => {
        this.props.navigation.navigate('Second');

    };
*/

    constructor() {

        super();

        this.state = {
            files:'',
            Publisher_Id:'',          //发布人Id
            House_Publisher: '',      //发布人
            Publish_Time: '',         //发布时间
            Lease_Type: '',           //出租类型：整租/合租
            Area_Name: '',            //出租类型：整租/合租
            Unit_Build: '',           //楼栋（单元）
            Total_Area: '',           //总面积
            Door_Model: '',           //户型（室房厅厕）
            Toward_Direct: '',        //朝向
            House_Floor: '',          //楼层
            House_Decorate: '',       //装修（毛坯/简单/中等/精装）
            Rent_Fee: '',             //租金
            Fee_Period:'',            //交租周期
            Default_Fine:'',          //违约金
            Rent_Limit:'',            //最短租期
            Pay_Type: '',             //付款类型（一付一/押一付三/半年付/年付）
            House_Pic: '',            //图片描述
            House_Pic2:'',            //房间图片
            House_Pic3:'',            //厨房图片
            House_Pic4:'',            //卫生间图
            House_Pic5:'',            //图片补充1
            House_Pic6:'',            //图片补充2
            Support_Set: [],          //配套设施
            House_Description: '',    //房屋描述
            House_Location: '',       //房产地址
            Owner_Tel: '',            //房主联系电话
            Certification: ''         //是否已认证
        };
    }


    add_House = () => {

        realm.write(() => {
            let Publisher=realm.objects('User').filtered("online == $0", 1);
            let thisPublisherID=Publisher[0].id;
            this.setState({Publisher_Id:thisPublisherID});
            let ID = realm.objects('House_Info').length + 1;
            realm.create('House_Info',
                {
                    house_id: ID,
                    publisher_id:thisPublisherID,
                    house_publisher: this.state.House_Publisher,
                    publish_time: new Date().toLocaleDateString(),
                    lease_type: this.state.Lease_Type,
                    area_name: this.state.Area_Name,
                    unit_build: this.state.Unit_Build,
                    total_area: this.state.Total_Area,
                    door_model: this.state.Door_Model,
                    toward_direct: this.state.Toward_Direct,
                    house_floor: this.state.House_Floor,
                    house_decorate: this.state.House_Decorate,
                    rent_fee: this.state.Rent_Fee,
                    fee_period:this.state.Fee_Period,
                    default_fine:this.state.Default_Fine,
                    rent_limit:this.state.Rent_Limit,
                    pay_type: this.state.Pay_Type,
                    house_pic: this.state.House_Pic,
                    house_pic2:this.state.House_Pic2,
                    house_pic3:this.state.House_Pic3,
                    house_pic4:this.state.House_Pic4,
                    house_pic5:this.state.House_Pic5,
                    house_pic6:this.state.House_Pic6,
                    support_set:JSON.stringify(this.tag.itemsSelected),
                    house_description: this.state.House_Description,
                    house_location: this.state.House_Location,
                    owner_tel: this.state.Owner_Tel,
                    certification: null
                });
        });
        Alert.alert("成功添加房屋信息");
        console.log('Selected items:', JSON.stringify(this.tag.itemsSelected));
        this.props.navigation.navigate('PublishResult');
    };



    renderSetting() {
        const data = [
            { id: 1, label: '热水淋浴' },//shower
            { id: 2, label: '洗衣机' },//washer
            { id: 3, label: '浴缸' },//bathtub
            { id: 4, label: '有线网络' },//line-wifi
            { id: 5, label: '电视' },//TV
            { id: 6, label: '无线网络' },//wifi
            { id: 7, label: '冰箱'},//freezer
            { id: 8, label: '空调'},//aircon
            { id: 9, label: '暖气'},//warm
            { id:10, label: '门禁系统'},//safed
            { id:11, label: '电梯'},//lift
            { id:12, label: '停车位'},//park
            { id:13, label: '饮水设备'},//water

        ];

        return (
            <View style={styles.container}>
                <Text style={styles.labelText}>配套设施：</Text>
                <TagSelect
                    data={data}
                    itemStyle={styles.item}
                    itemLabelStyle={styles.label}
                    itemStyleSelected={styles.itemSelected}
                    itemLabelStyleSelected={styles.labelSelected}
                    ref={(tag) => {
                        this.tag = tag;
                    }}
                />
            </View>
        );
    }

    render() {
        const {files}=this.state;
        return (
            <View>
                <BackHeader navigation={this.props.navigation} title={'填写房屋信息'}/>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[styles.MainContainer, {justifyContent: 'center'}]}>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                                placeholder="房屋地址"
                                style={[styles.TextInputStyle, {marginTop: 20, width: width * 0.75}]}
                                value={this.state.House_Location ? this.state.House_Location : ''}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => {
                                    this.setState({House_Location: text});
                                    toastShort('请继续添加门牌号信息');
                                }}
                            />
                            <TouchableOpacity onPress={() => {
                                this.AreaPicker.show()
                            }} activeOpacity={0.7}
                                              style={styles.selectloca}>
                                <Image source={require('../res/images/ic_hloca.png')} style={{width: 22, height: 22}}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="小区名"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Area_Name: text})
                            }}/>
                        <TextInput
                            placeholder="单元 如：1栋1单元201"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Unit_Build: text})
                            }}/>
                        <TextInput
                            placeholder="总面积"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Total_Area: text})
                            }}/>
                        <TextInput
                            placeholder="楼层 如：3层/共7层"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({House_Floor: text})
                            }}/>

                        <TouchableOpacity onPress={() => {
                            this.SimpleItemsDialog.show()
                        }} activeOpacity={0.7} style={styles.button}>
                            <Text
                                style={styles.TextStyle}>{this.state.Lease_Type ? this.state.Lease_Type : '出租类型'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.DoorPicker.show()
                        }} activeOpacity={0.7} style={styles.button}>
                            <Text
                                style={styles.TextStyle}>{this.state.Door_Model ? this.state.Door_Model : '选择户型'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.SimpleItemsDialog1.show()
                        }} activeOpacity={0.7} style={styles.button}>
                            <Text
                                style={styles.TextStyle}>{this.state.Toward_Direct ? this.state.Toward_Direct : '选择朝向'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.SimpleItemsDialog2.show()
                        }} activeOpacity={0.7} style={styles.button}>
                            <Text
                                style={styles.TextStyle}>{this.state.House_Decorate ? this.state.House_Decorate : '装修状况'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.SimpleItemsDialog3.show()
                        }} activeOpacity={0.7} style={styles.button}>
                            <Text style={styles.TextStyle}>{this.state.Pay_Type ? this.state.Pay_Type : '付款类型'}</Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="租金 元/月"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Rent_Fee: text})
                            }}/>
                        <TextInput
                            placeholder="交租周期"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Fee_Period: text})
                            }}/>
                        <TextInput
                            placeholder="违约金 元"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Default_Fine: text})
                            }}/>
                        <TextInput
                            placeholder="最短租期"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Rent_Limit: text})
                            }}/>
                            <Text style={{fontSize: 16,color:'#B0C4DE'}}>上传房屋图片</Text>
                        <View style={{flexDirection:'row',justifyContent: 'center',
                            alignItems:'center',marginLeft:45}}>
                            <View style={{flexDirection:'column',flex:1}} >
                            <TouchableOpacity onPress={() => { this.onHP1Click() }}
                                              style={[styles.button,{width:'40%',marginTop:20}]}>
                                <Text style={{alignItems: 'center'}}>客厅</Text>
                            </TouchableOpacity>
                            <Image source={this.state.House_Pic?{uri:this.state.House_Pic}:
                                require('../res/images/living.png')}
                                   style={{height:100,width:100}} />

                            <TouchableOpacity onPress={() => { this.onHP2Click() }}
                                              style={[styles.button,{width:'40%',marginTop:20}]}>
                                <Text style={{alignItems: 'center'}}>房间</Text>
                            </TouchableOpacity>
                            <Image source={this.state.House_Pic2?{uri:this.state.House_Pic2}:require('../res/images/room.png')}
                                   style={{height:100,width:100}} />

                            <TouchableOpacity onPress={() => { this.onHP5Click() }}
                                              style={[styles.button,{width:'40%',marginTop:20}]}>
                                <Text style={{alignItems: 'center'}}>补充1</Text>
                            </TouchableOpacity>
                            <Image source={this.state.House_Pic5?{uri:this.state.House_Pic5}:require('../res/images/house.png')}
                                   style={{height:100,width:100}} />
                            </View>

                            <View style={{flexDirection:'column',flex:1}} >
                                <TouchableOpacity onPress={() => { this.onHP3Click() }}
                                                  style={[styles.button,{width:'40%',marginTop:20}]}>
                                    <Text style={{alignItems: 'center'}}>厨房</Text>
                                </TouchableOpacity>
                                <Image source={this.state.House_Pic3?{uri:this.state.House_Pic3}:require('../res/images/kitchen.png')}
                                       style={{height:100,width:100}} />

                                <TouchableOpacity onPress={() => { this.onHP4Click() }}
                                                  style={[styles.button,{width:'45%',marginTop:20}]}>
                                    <Text style={{alignItems: 'center'}}>卫生间</Text>
                                </TouchableOpacity>
                                <Image source={this.state.House_Pic4?{uri:this.state.House_Pic4}:require('../res/images/bath.png')}
                                       style={{height:100,width:100}} />

                                <TouchableOpacity onPress={() => { this.onHP6Click() }}
                                                  style={[styles.button,{width:'40%',marginTop:20}]}>
                                    <Text style={{alignItems: 'center'}}>补充2</Text>
                                </TouchableOpacity>
                                <Image source={this.state.House_Pic6?{uri:this.state.House_Pic6}:require('../res/images/house.png')}
                                       style={{height:100,width:100}} />

                            </View>
                        </View>
                        {/*<ImagePicker
                            files={files}
                            onChange={this.onChange1}
                            onImageClick={(index, fs) => console.log('图片点击click'+index, fs)}
                            selectable={files.length < 7}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                        />
                        <TagsSelect setValue={this.setValue}  />*/}
                        {this.renderSetting()}
                        <TextareaItem
                            style={{
                                width: width * 0.85, borderRadius: 10, margin: 10,
                                borderWidth: 1, borderColor: '#6495ED'
                            }}
                            rows={4}
                            last={true}
                            placeholder="房屋描述"
                            count={150}
                            onChange={(text) => {
                                this.setState({House_Description: text})
                            }}
                        />

                    </View>
                    <View style={[styles.MainContainer, {justifyContent: 'center'}]}>
                        <TextInput
                            placeholder="房主姓名"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({House_Publisher: text})
                            }}/>
                        <TextInput
                            placeholder="联系方式"
                            style={styles.TextInputStyle}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({Owner_Tel: text})
                            }}/>
                        <TouchableOpacity onPress={this.add_House} activeOpacity={0.7}
                                          style={[styles.button, {marginBottom: 40}]}>
                            <Text style={styles.TextStyle}> 提交出租信息 </Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity onPress={this.GoToSecondActivity} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.TextStyle}> 查看所有房屋信息 </Text>onPress={this.GoToSecondActivity}
                </TouchableOpacity>*/}
                        <View style={{height: Platform.OS === 'ios' ? 0 : 30,}}/>
                    </View>
                </ScrollView>
                {/*弹出选择房屋地址*/}
                <AreaPicker
                    areaJson={AreaJson}
                    onPickerCancel={() => {
                    }}
                    onPickerConfirm={(value) => {

                        this.setState({House_Location: value.join("")});
                        console.log(JSON.stringify(value));
                        console.log(value.join(""));
                        {/*alert(value.join(""));*/}
                    }}
                    ref={ref => this.AreaPicker = ref}/>
                {/*弹出选择出租类型*/}
                <SimpleItemsDialog
                    items={['整租', '合租', '不限']}
                    ref={ref => this.SimpleItemsDialog = ref}
                    onPress={(items) => {
                        this.setState({Lease_Type: items === 0 ? '整租' : items === 1 ? '合租' : '不限'});
                        //alert(this.state.Lease_Type);
                    }}/>
                {/*弹出选择户型*/}
                <DoorPicker
                    onPickerCancel={() => {
                    }}
                    onPickerConfirm={(value) => {
                        this.setState({Door_Model: value.join("")});
                        //alert(value.join(""));
                        //alert(this.state.Door_Model)
                    }}
                    ref={ref => this.DoorPicker = ref}/>
                {/*弹出选择房屋朝向*/}
                <SimpleItemsDialog
                    items={['朝东', '朝南', '朝西', '朝北', '朝东南', '朝东北', '朝西南', '朝西北', '未知']}
                    ref={ref => this.SimpleItemsDialog1 = ref}
                    onPress={(items) => {
                        this.setState(
                            {
                                Toward_Direct: items === 0 ? '朝东' : items === 1 ? '朝南' : items === 2 ? '朝西'
                                    : items === 3 ? '朝北' : items === 4 ? '朝东南' : items === 5 ? '朝东北'
                                        : items === 6 ? '朝西南' : items === 7 ? '朝西北' : '未知'
                            });
                        //alert(this.state.Toward_Direct);
                    }}/>
                {/*弹出选择房屋装修*/}
                <SimpleItemsDialog
                    items={['毛坯', '简装', '精装']}
                    ref={ref => this.SimpleItemsDialog2 = ref}
                    onPress={(items) => {
                        this.setState(
                            {House_Decorate: items === 0 ? '毛坯' : items === 1 ? '简装' : '精装'});
                        //alert(this.state.House_Decorate);
                    }}/>
                {/*弹出选择付款类型*/}
                <SimpleItemsDialog
                    items={['一付一', '押一付三', '半年付', '年付']}
                    ref={ref => this.SimpleItemsDialog3 = ref}
                    onPress={(items) => {
                        this.setState(
                            {Pay_Type: items === 0 ? '一付一' : items === 1 ? '押一付三' : items === 2 ? '半年付' : '年付'});
                        //alert(this.state.Pay_Type);
                    }}/>
            </View>

        );
    }

    onHP1Click = () => {
        console.log('上传客厅图');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic);});
    };

    onHP2Click = () => {
        console.log('上传房间图');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic2:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic2);});
    };
    onHP3Click = () => {
        console.log('上传厨房图');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic3:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic3);});
    };
    onHP4Click = () => {
        console.log('上传卫生间图');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic4:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic4);});
    };
    onHP5Click = () => {
        console.log('上传补充图1');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic5:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic5);});
    };
    onHP6Click = () => {
        console.log('上传补充图2');
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({House_Pic6:image.path});
            console.log(' 图片路径：'+ this.state.House_Pic6);});
    };

}


/*class HDetail extends Component
{
    static navigationOptions =
        {
            title: 'ShowDataActivity',
            header:null
        };

    constructor() {

        super();

        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        let mydata = realm.objects('House_Info');

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(mydata),
        };

    }

    GetClickedItem (area_name) {
        Alert.alert(area_name);
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    render()
    {
        return(
            <View style = { styles.MainContainer }>

                <ListView

                    dataSource={this.state.dataSource}

                    renderSeparator= {this.ListViewItemSeparator}

                    renderRow={(rowData) => <View style={{flex:1, flexDirection: 'column'}} >

                        <TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.area_name)} >
                            <Text style={styles.textViewContainer} >{'房主 = ' + rowData.house_publisher}</Text>
                            <Text style={styles.textViewContainer} >{'楼层 = ' + rowData.house_floor}</Text>
                            <Text style={styles.textViewContainer} >{'房屋描述 = ' + rowData.house_description}</Text>
                            <Text style={styles.textViewContainer} >{'小区名 = ' + rowData.area_name}</Text>
                        </TouchableOpacity>

                    </View> }

                />

            </View>
        );
    }
}

export default AddHousePage = createStackNavigator(
    {
        First: { screen: AddHousePage },

        Second: { screen: HDetail }
    });
    */
const styles = StyleSheet.create({

    MainContainer :{
        alignItems:'center',
        flex:1,
        justifyContent: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        margin: 10
    },

    TextInputStyle:
        {

            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#6495ED',
            width: '80%',
            height: 40,
            marginBottom: 10,
            textAlign: 'center',
        },

    button: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#B0C4DE',//#F0F8FF
        borderRadius:7,
        margin: 10
    },
    buttonselect: {
        width: '80%',
        height: 40,
        padding: 10,
        backgroundColor: '#ADD8E6',
        borderRadius:7,
        margin: 10
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },

    textViewContainer: {
        textAlignVertical:'center',
        padding:10,
        fontSize: 20,
        color: '#000',

    },
    selectloca:{
        backgroundColor: '#B0C4DE',
        borderRadius:7,
        justifyContent:'center',
        width:22,
        height:40,
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 50,
        marginLeft: 15,
    },
    labelText: {
        color: '#B0C4DE',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 15,
    },
    item: {
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#FFF',
    },
    label: {
        color: '#333'
    },
    itemSelected: {
        backgroundColor: '#B0C4DE',//#333
    },
    labelSelected: {
        color: '#FFF',
    },

});