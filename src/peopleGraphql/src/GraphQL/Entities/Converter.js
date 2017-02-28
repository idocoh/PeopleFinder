/**
 * Created by niramsellem on 28.2.2017.
 */


function convertPerson(person, field, value){
    console.log(field + ": " + value);
    
    if (field === "name") {
        person["Name"] = value;
    }
    if (field === "nickName") {
        person["NickName"] = value;
    }
    if (field === "mail") {
        person["Mail"] = value;
    }
    if (field === "job") {
        person["Job"] = value;
    }
    if (field === "mobile") {
        person["Mobile"] = value;
    }
    if (field === "location") {
        person["Location"] = new City();
    }
};

function convertPersons(persons){
    let graphqlPeople = [];
    
    for( let index in persons) {
        console.log("{");
        let people = persons[index];
        let graphPerson = {};

        for(let paramsIndex in people.params) {
            let value = people.params[paramsIndex]["value"];
            let field = people.params[paramsIndex]["filed"];

            convertPerson(graphPerson, field, value);
        }
        console.log("}" +
            "\nPerson number: " + index +
            "\nname: " + graphPerson.Name);

        graphqlPeople.push(graphPerson);
    }
    
    return graphqlPeople;
};


export {
    convertPerson,
    convertPersons
}