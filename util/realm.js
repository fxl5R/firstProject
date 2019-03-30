
import Realm from 'realm';

class House_Info extends Realm.Object {}
House_Info.schema = {
    name: 'House_Info',
    primaryKey: 'house_id',
    properties:
        {
            house_id:'int',
            publisher_id:'int',                       //发布人ID（用户表外键，提交时自动记录）
            house_publisher: 'string',                //发布人
            publish_time: 'string',                   //发布时间 toLocaleDateString()
            lease_type:{type:'string',default:'不限'} ,    //出租类型：整租/合租/不限
            area_name: 'string',                      //小区名
            unit_build:'string',                      //楼栋（单元）
            total_area:'string',                      //总面积
            door_model:{type:'string',default:'不限'},      //户型（室房厅厕）
            toward_direct:'string',                   //朝向
            house_floor:'string',                     //楼层
            house_decorate:{type:'string',default:'不限'},  //装修（毛坯/简单/中等/精装）
            rent_fee:'string',                        //租金
            fee_period:'string',                      //交租周期
            default_fine:'string',                    //违约金
            rent_limit:'string',                      //最短租期
            pay_type:'string',                        //付款类型（一付一/押一付三/半年付/年付）
            house_pic:'string',                       //房屋封面图(客厅图)
            house_pic2:'string',                      //房间图片
            house_pic3:'string',                      //厨房图片
            house_pic4:'string',                      //卫生间图
            house_pic5:'string',                      //图片补充1
            house_pic6:'string',                      //图片补充2
            support_set:'string',                     //配套设施
            house_description:'string',               //房屋描述
            house_location:'string',                  //房产地址
            owner_tel:'string',                       //房主联系电话
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
        userSex: {type:'string',optional: true},// 用户性别
        portrait:{type:'string',optional: true,default:'https://dwz.cn/WchJqy0C'},// 头像 {type:'string',default:'../res/images/logo_peo.png'}
        nickName:'string',                      // 昵称
        online: {type: 'int', optional: true }, //判断用户在线1:在线 0:离线
        userLocation:{type:'string',optional:true},         // 用户所在地
        //userEmail:{type:'string',optional:true},            //用户邮件地址
        userTel:{type:'string',optional:true},              // 用户联系电话
        sinaID:{type:'string',optional:true},               //认证新浪微博后保存新浪账号ID
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
        from_portrait:'string',                // 评论用户头像地址
        from_nickName:'string',                // 评论用户昵称
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