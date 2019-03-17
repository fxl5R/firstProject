
import Realm from 'realm';

class House_Info extends Realm.Object {}
House_Info.schema = {
    name: 'House_Info',
    primaryKey: 'house_id',
    properties:
        {
            house_id:'int',
            house_publisher: 'string',    //发布人
            publish_time: 'string',       //发布时间 toLocaleDateString()
            lease_type: 'string',         //出租类型：整租/合租
            area_name: 'string',          //小区名
            unit_build:'string',          //楼栋（单元）
            total_area:'string',          //总面积
            door_model:'string',          //户型（室房厅厕）
            toward_direct:'string',       //朝向
            house_floor:'string',         //楼层
            house_decorate:'string',      //装修（毛坯/简单/中等/精装）
            rent_fee:'string',            //租金
            pay_type:'string',            //付款类型（一付一/押一付三/半年付/年付）
            house_pic:'string',           //图片描述
            support_set:'string',         //配套设施
            house_description:'string',   //房屋描述
            house_location:'string',      //房产地址
            owner_tel:'string',           //房主联系电话
            certification:{type:'int',default: 0,optional: true}//是否后台认证
        }
};

class User extends Realm.Object {}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {                               // 属性
        id: { type:'int', indexed: true },      // 用户ID
        userName: 'string',                     // 用户名称
        userPassword: 'string',                 // 用户密码
        userSex: 'string',                      // 用户性别
        portrait: 'string',                     // 头像
        nickName:'string',                      // 昵称
        online: {type: 'int', optional: true }, //判断用户在线1:在线 0:离线
        userLocation:{type:'string',optional:true},         // 用户所在地
        userTel:{type:'string',optional:true},              // 用户联系电话
        isRealPeople:{type:'int',default: 0,optional:true}, // 是否实名认证1：实名0：未实名
        IDCardNO:{type:'string',optional:true},             // 身份证号
        realName:{type:'string',optional:true},             // 真实姓名
        cTime:   { type: 'string'}               // 创建时间  toLocaleTimeString
    }
};
class Comments extends Realm.Object {}
Comments.schema = {
    name: 'Comments',
    primaryKey: 'id',
    properties: {                              // 属性
        id: { type:'int', indexed: true },     // 评论ID，主键
        content:'string',                      // 评论内容
        from_uid:'int',                        // 评论用户id
        to_uid:  'int',                        // 评论的目标用户id
        commentTime: { type: 'string', optional: true } // 创建时间 toLocaleTimeString
    }
};
class Reply extends Realm.Object {}
Reply.schema = {
    name: 'Reply',
    primaryKey: 'id',
    properties: {                              // 属性
        id: { type:'int', indexed: true },     // 回复ID，主键
        comment_id:'int',                      // 回复的目标评论id
        to_uid:'int',                          // 回复的目标用户id
        from_uid:'int',                        // 回复用户id
        replyTime: { type: 'string', optional: true } // 创建时间 toLocaleTimeString
    }
};
class Collections extends Realm.Object {}
Collections.schema = {
    name: 'Collections',
    primaryKey: 'id',
    properties: {                               // 属性
        id: { type:'int', indexed: true },      // 收藏ID，主键
        collect_id:'int',                       // 收藏内容的id
        collect_type:'int',                     // 收藏类别1:房源0：用户
    }
};
export default new Realm({ schema: [House_Info,User,Comments,Collections] });