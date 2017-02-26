/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//require('typescript-require');
const express = __webpack_require__(0);
const graphqlHTTP = __webpack_require__(1);

let graphql = __webpack_require__(2);
//const Resolver = require('./resolver.ts');

// Retrieve
const MongoClient = __webpack_require__(3).MongoClient;
let db1;
let setDb = (db)=> {
    db1 = db;
};
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/bd1", function (err, db) {
    if (!err) {
        console.log("We are connected");
        setDb(db);

        /*let peoples = db.collection("peoples");
         peoples.find({id:1}, (err, pp) => {
         if (err) {
         }
         else {
         console.log(pp.toArray());
         pp.toArray().then((err, arr)=> {
         console.log(arr);
         });
         }
         })*/

    }
});


let schema = graphql.buildSchema(`
    type Query {
        people(number:Int!): [Person],
    }
    type Person {
      MisparIshi: String
      WorkPhone: String
      GivenName: String
 JobTitle: String,
 Location: String
 LongWorkTitle: String
 AlternateName: String
 Department: String
 Company: String
 Mobile: String
 Mail: String
 #Picture:
 Surname: String
 Darga: String
 Sex: String
 BirthdayDisplayString: String
 JobTitleSearchable: String
 LongWorkTitleSearchable: String
 AlternateNameSearchable: String
 DepartmentSearchable: String
 CompanySearchable: String
 Tags: Int
 OtherTelephone: String
 Fax: String
 HomeTelephone: String
 WhatIDo: String
    }
`);

/*
 ,
 WorkPhone: String,
 GivenName: String,
 JobTitle: String,
 Location: String
 LongWorkTitle: String
 AlternateName: String
 Department: String
 Company: String
 Mobile: String
 Mail: String
 #Picture:
 Surname: String
 Darga: String
 Sex: String
 BirthdayDisplayString: String
 JobTitleSearchable: String
 LongWorkTitleSearchable: String
 AlternateNameSearchable: String
 DepartmentSearchable: String
 CompanySearchable: String
 Tags: Int
 OtherTelephone: String
 Fax: String
 HomeTelephone: String
 WhatIDo: String
 */

let people = [
        {
            MisparIshi: '112233',
            WorkPhone: '054-545-4545',
            GivenName: 'gn',
            JobTitle: 'jt',
            Location: 'l',
            LongWorkTitle: 'lwt',
            AlternateName: 'an',
            Department: 'd',
            Company: 'c',
            Mobile: 'm',
            Mail: 'm',
//#Picture:
            Surname: 's',
            Darga: 'd',
            Sex: 's',
            BirthdayDisplayString: 'bds',
            JobTitleSearchable: 'jts',
            LongWorkTitleSearchable: 'lwts',
            AlternateNameSearchable: 'ans',
            DepartmentSearchable: 'ds',
            CompanySearchable: 'cs',
            Tags: 123,
            OtherTelephone: 'ot',
            Fax: 'f',
            HomeTelephone: 'ht',
            WhatIDo: 'wid',
        }
    ]
    ;

let resolvers = {
    people: ({number}) => {
        return [people[number]];
    },
    Person: {
        MisparIshi: (obj, args, context) => {
            return obj.MisparIshi;
        },
        WorkPhone: (obj, args, context) => {
            return obj.WorkPhone;
        },
        Company: (obj, args, context) => {
            return obj.Company;
        },
        Mobile: (obj, args, context) => {
            return obj.Mobile;
        },
        GivenName: (obj, args, context) => {
            return obj.GivenName;
        },
        JobTitle: (obj, args, context) => {
            return obj.JobTitle;
        },
        Location: (obj, args, context) => {
            return obj.Location;
        },
        LongWorkTitle: (obj, args, context) => {
            return obj.LongWorkTitle;
        },
        AlternateName: (obj, args, context) => {
            return obj.AlternateName;
        },
        Department: (obj, args, context) => {
            return obj.Department;
        },
        Mail: (obj, args, context) => {
            return obj.Mail;
        },
        Surname: (obj, args, context) => {
            return obj.Surname;
        },
        Darga: (obj, args, context) => {
            return obj.Darga;
        },
        Sex: (obj, args, context) => {
            return obj.Sex;
        },
        BirthdayDisplayString: (obj, args, context) => {
            return obj.BirthdayDisplayString;
        },
        JobTitleSearchable: (obj, args, context) => {
            return obj.JobTitleSearchable;
        },
        LongWorkTitleSearchable:(obj, args, context) => {
            return obj.LongWorkTitleSearchable;
        },
        AlternateNameSearchable: (obj, args, context) => {
            return obj.AlternateNameSearchable;
        },
        DepartmentSearchable: (obj, args, context) => {
            return obj.DepartmentSearchable;
        },
        CompanySearchable: (obj, args, context) => {
            return obj.CompanySearchable;
        },
        Tags: (obj, args, context) => {
            return obj.Tags;
        },
        OtherTelephone: (obj, args, context) => {
            return obj.OtherTelephone;
        },
        Fax: (obj, args, context) => {
            return obj.Fax;
        },
        HomeTelephone: (obj, args, context) => {
            return obj.HomeTelephone;
        },
        WhatIDo: (obj, args, context) => {
            return obj.WhatIDo;
        },
    }
};

const app = express();
const port = 5000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port);
console.log('Running a GraphQL API server at localhost: ' + port + '/graphql');


/***/ })
/******/ ]);