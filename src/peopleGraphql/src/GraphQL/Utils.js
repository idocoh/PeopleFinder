/**
 * Created by niramsellem on 27.2.2017.
 */
var mongoUtils = require('../DB/MongoClientUtils.js');

function getPersonByName(peoples, name) {
    findByValueOfField(peoples, "Name", name)
};

function getCityByName(cities, name){
    findByValueOfField(cities, "Name", name);
};

function findByValueOfField(entities, field, value){
    var result = [];
    var entity;

    for (var x in entities){
        entity = entities[x];

        if (entity[field] === value){
            result.push(entity);
        }
    }
    return result;
};

function findByValueOfFields(entities, jsonFilters){
    var result = [];
    var entity;

    for (var x in entities) {
        var flag = true;
        entity = entities[x];

        for (var field in jsonFilters) {
            if (entity[field] !== jsonFilters[field]) {
                flag = false;
            }
        }
        if (flag) {
            result.push(entity);
        }
    }
    return result;
};

function findByValueOfFields2(entities, jsonFilters){
    for ({key, value} in jsonFilters) {
        console.log("key: " + key + " value: " + value);
        entities = findByValueOfField(entities, key, value);
    }
    return entities;
};

function getPersonFromMongoByName(name) {
    console.log("before getPersonFromMongoByName");
    return mongoUtils.findInCollection('persons', name);
}

function getFieldValue (entity, field) {
    for (let i in entity.params){
        if(entity.params[i].field == field){
            return entity.params[f].value;
        }
    }
    return null;

}
module.exports =
{
    getPersonByName,
    getCityByName,
    findByValueOfFields,
    findByValueOfFields2,
    getPersonFromMongoByName,
    getFieldValue
};