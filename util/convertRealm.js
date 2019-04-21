// Copy local realm to ROS
import React,{Component} from 'react';
import {View,Button} from 'react-native';

const Realm = require('realm');

// UPDATE THESE
const realm_server = 'comfirstproject.us1.cloud.realm.io';//  localhost:9080
const username     = 'fxl5r@sina.com'; // this is the user doing the copy  realm-admin
const password     = '575599878';
const source_realm_path = './data/data/com.firstProject/files/default.realm'; // path on disk
const target_realm_path = '/~/userRealm'; // path on server

const copyObject = function(obj, objSchema, targetRealm) {
    const copy = {};
    for (let key in objSchema.properties) {
        const prop = objSchema.properties[key];
        if (!prop.hasOwnProperty('objectType')) {
            copy[key] = obj[key];
        }
        else if (prop['type'] === "list") {
            copy[key] = [];
        }
        else {
            copy[key] = null;
        }
    }

    // Add this object to the target realm
    targetRealm.create(objSchema.name, copy);
};

const getMatchingObjectInOtherRealm = function(sourceObj, source_realm, target_realm, class_name) {
    const allObjects = source_realm.objects(class_name);
    const ndx = allObjects.indexOf(sourceObj);

    // Get object on same position in target realm
    return target_realm.objects(class_name)[ndx];
};

const addLinksToObject = function(sourceObj, targetObj, objSchema, source_realm, target_realm) {
    for (let key in objSchema.properties) {
        const prop = objSchema.properties[key];
        if (prop.hasOwnProperty('objectType')) {
            if (prop['type'] === "list") {
                let targetList = targetObj[key];
                sourceObj[key].forEach((linkedObj) => {
                    const obj = getMatchingObjectInOtherRealm(linkedObj, source_realm, target_realm, prop.objectType);
                    targetList.push(obj);
                });
            }
            else {
                // Find the position of the linked object
                const linkedObj = sourceObj[key];
                if (linkedObj === null) {
                    continue;
                }

                // Set link to object on same position in target realm
                targetObj[key] = getMatchingObjectInOtherRealm(linkedObj, source_realm, target_realm, prop.objectType);
            }
        }
    }
};

const copyRealm = function(user, local_realm_path, remote_realm_url) {
    // Open the local realm
    const source_realm =  new Realm({path: local_realm_path});
    const source_realm_schema = source_realm.schema;

    // Create the new realm (with same schema as the source)
    const target_realm = new Realm({
        sync: {
            user: user,
            url:  remote_realm_url,
        },
        schema: source_realm_schema
    });

    target_realm.write(() => {
        // Copy all objects but ignore links for now
        source_realm_schema.forEach((objSchema) => {
            console.log("copying objects:", objSchema['name']);
            const allObjects = source_realm.objects(objSchema['name']);

            allObjects.forEach((obj) => {
                copyObject(obj, objSchema, target_realm)
            });
        });

        // Do a second pass to add links
        source_realm_schema.forEach((objSchema) => {
            console.log("updating links in:", objSchema['name']);
            const allSourceObjects = source_realm.objects(objSchema['name']);
            const allTargetObjects = target_realm.objects(objSchema['name']);

            for (let i = 0; i < allSourceObjects.length; ++i) {
                const sourceObject = allSourceObjects[i];
                const targetObject = allTargetObjects[i];
                console.log('convert-last长度：'+allSourceObjects.length);
                addLinksToObject(sourceObject, targetObject, objSchema, source_realm, target_realm);
            }
        });
    });
};


export default class convertRealm extends Component{

    render(){
        return(
            <View>
                <Button
                    title={'convert'}
                    onPress={()=>{
                        // Login to server //`https://${realm_server}`
                        Realm.Sync.User.login("https://comfirstproject.us1.cloud.realm.io",username,password, (error, user) => {
                            if (error) {
                                console.log("Login failed", error);
                                return;
                            }

                            const remote_realm_url = "realm://" + realm_server + target_realm_path;

                            copyRealm(user, source_realm_path, remote_realm_url);

                            console.log("done");
                        });
                        /*const remote_realm_url = "realm://" + realm_server + target_realm_path;
                        copyRealm(Realm.Sync.User.adminUser("ADMIN_TOKEN"),
                            source_realm_path, remote_realm_url);
                        console.log("done");*/
                    }}
                />
            </View>
        )
    }
}
/*
const remote_realm_url = "realm://" + realm_server + target_realm_path;
copyRealm(Realm.Sync.User.adminUser("ADMIN_TOKEN"),
    source_realm_path, remote_realm_url);
console.log("done");*/
