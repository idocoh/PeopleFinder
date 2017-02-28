/**
 * Created by niramsellem on 27.2.2017.
 */

let graphql = require('graphql');
const utils = require('./Utils.js');
const converter = require('./Entities/Converter.js');

let schema = graphql.buildSchema(`
    input Person2{
        PersonMisparIshi: String
        Name: String
        NickName: String
        Job: String
        Mobile: String
        Mail: String
    },
    
    type Query {
        getPersonByNum(number:Int!): Person,
        getPersonByName(name:String!): [Person],
        findByValueOfFields(jsonFilters:Person2!): [Person],
        findByValueOfFields2(jsonFilters:String!): [Person]
        
        getCityByName(name:String!): City
    },
    type Person {
        PersonMisparIshi: String
        Name: String
        NickName: String
        Job: String
        Location: City
        Mobile: String
        Mail: String
    },
    type City{
        Name: String
        State: String
        Population: Int
    }
`);


let cities = [
        {
            Name: "MAAD",
            State: "Israel",
            Population: 50000
        },
        {
            Name: "Bet-El",
            State: "Israel",
            Population: 7000
        }
    ]
    ;
let peoples = [
        {
            MisparIshi: "030878654",
            Name: "Yohai",
            NickName: "yoske",
            Job: "Programer",
            Location: "MAAD",
            Mobile: "0546123456",
            Mail: "a@gmail.com"
        },
        {
            MisparIshi: "123456789",
            Name: "Roi",
            NickName: "Roeeki",
            Job: "Programer",
            Location: "Bet-El",
            Mobile: "0545987654",
            Mail: "r@gmail.com"
        }
    ]
    ;


let resolvers = {
    getPersonByNum: ({number}) => {
        var person = peoples[number];
        person.Location = utils.getCityByName("MAAD");
        return person;
    },
    getPersonByName: ({name}) => {
        let graphqlPeople = [];

        var promise = new Promise(function(resolve, reject){
            console.log("before promise" + utils);
            var peoplePromise = utils.getPersonFromMongoByName(name);

            console.log("before peoplePromise");

            peoplePromise.then((peopleResult)=>{
                graphqlPeople = converter.convertPersons(peopleResult)

                console.log(graphqlPeople);
                resolve(graphqlPeople);
            });
        });

        /*console.log("before promise2" + utils);
        var peoplePromise = utils.getPersonFromMongoByName(name);

        console.log("before promise");
        let graphqlPeople = [];

        peoplePromise.then((peopleResult)=>{
            for( let index in peopleResult) {
                let people = peopleResult[index];
                let graphPerson = {};
                for(let paramsIndex in people.params) {
                    let value = people.params[paramsIndex]["value"];
                    let filed = people.params[paramsIndex]["filed"];
                    console.log("filed: " + filed + ": " + value);
                    if (filed === "name") {
                        graphPerson["Name"] = value;
                    }
                    if (filed === "nickName") {
                        graphPerson["NickName"] = value;
                    }
                }
                console.log("person: " + graphPerson.NickName + " name: " + graphPerson.Name);
                graphqlPeople.push(graphPerson);
            }
        });
        console.log(graphqlPeople);*/
        return promise;
    },
/*        var people = utils.getPersonFromMongoByName(name);
        var city = utils.getCityByName(cities, people.Location);
        
        return {
            MisparIshi: people.MisparIshi,
            Name: people.then((result)=>{ return utils.getFieldValue(result,"Name");),
            NickName:  people.NickName,
            Job: people.Job,
            Mobile: people.Mobile,
            Mail: people.Mail,
            Location: {
                Name: city.Name,
                State: city.State,
                Population: city.Population
            }
        }
    },*/
    getCityByName: ({name}) => {
        return utils.getCityByName(cities, name);
    },
    findByValueOfFields: ({jsonFilters}) => {
        return utils.findByValueOfFields(peoples, jsonFilters)
    },
    findByValueOfFields2: ({jsonFilters}) => {
        return utils.findByValueOfFields2(peoples, jsonFilters)
    }
};

exports.resolvers = resolvers;
exports.schema = schema;