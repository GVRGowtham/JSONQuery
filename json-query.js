"use strict";
exports.__esModule = true;
/*

An ORM for JSON datatables

Created By Venkat

Supports all basic CRUD operations

*/
var JSONQuery = /** @class */ (function () {
    function JSONQuery(jsonData) {
        this.json = [];
        this.json = jsonData;
    }
    //Insert a new row in the table
    JSONQuery.prototype.insert = function (data) {
        this.json.push(data);
    };
    //Update a particular column with a new value based on a condition
    /*Currently supports greater than, lesser than, equal to, not equal to,
    lesser than or equal to,greter than or equal to,
    like and ilike operators*/
    JSONQuery.prototype.update = function (field, condition, value, updateField, data) {
        if (condition === "eq") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] === value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "neq") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] !== value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "gt") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] > value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "lt") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] < value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "eqgt") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] >= value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "eqlt") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field] <= value) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "like") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field].indexOf(value) > -1) {
                    this.json[i][updateField] = data;
                }
            }
        }
        else if (condition === "ilike") {
            for (var i = 0; i < this.json.length; i++) {
                if (this.json[i][field].toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                    this.json[i][updateField] = data;
                }
            }
        }
    };
    //Replace the entire data based on a condition
    JSONQuery.prototype.replace = function (field, value, data) {
        for (var i = 0; i < this.json.length; i++) {
            if (this.json[i][field] === value) {
                this.json[i] = data;
            }
        }
    };
    //Delete a row based on a condition
    JSONQuery.prototype.remove = function (field, value) {
        for (var i = 0; i < this.json.length; i++) {
            if (this.json[i][field] === value) {
                this.json.splice(i, 1);
            }
        }
    };
    //Select only few columns to be shown
    JSONQuery.prototype.select = function (fields) {
        var selectedJson = [];
        if (fields.length === 0) {
            for (var i = 0; i < this.json.length; i++) {
                var data = this.json[i];
                selectedJson.push(data);
            }
        }
        else {
            for (var i = 0; i < this.json.length; i++) {
                var data = {};
                for (var j = 0; j < fields.length; j++) {
                    data[fields[j]] = this.json[i][fields[j]];
                }
                selectedJson.push(data);
            }
        }
        return new JSONQuery(selectedJson);
    };
    //Filter the data based on a query
    /*Currently supports greater than, lesser than, equal to, not equal to,
    lesser than or equal to, greter than or equal to,
    like and ilike operators*/
    JSONQuery.prototype.filter = function (field, condition, value) {
        if (condition === "eq") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] === value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "neq") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] !== value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "gt") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] > value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "lt") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] < value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "eqgt") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] >= value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "eqlt") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field] <= value;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "like") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field].indexOf(value) > -1;
            });
            return new JSONQuery(filteredJson);
        }
        else if (condition === "ilike") {
            var filteredJson = this.json.filter(function (entry) {
                return entry[field].toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1;
            });
            return new JSONQuery(filteredJson);
        }
    };
    //Sort the output ascending or descending based on a column
    //Currently supports string, number, float data types only
    JSONQuery.prototype.sort = function (field, ascending) {
        var tempjson = JSON.parse(JSON.stringify(this.json));
        if (ascending) {
            return new JSONQuery(tempjson.sort(function (a, b) {
                return ((a[field] < b[field]) ? -1 : ((a[field] > b[field]) ? 1 : 0));
            }));
        }
        else {
            return new JSONQuery(tempjson.sort(function (a, b) {
                return ((b[field] < a[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0));
            }));
        }
    };
    JSONQuery.prototype.union = function (result) {
        var new_json = result.getResults();
        while (new_json.length > 0) {
            var insert_data = new_json.pop();
            var i = void 0;
            for (i = 0; i < this.json.length; i++) {
                if (this.json[i] === insert_data) {
                    break;
                }
            }
            if (i === this.json.length) {
                this.json.push(insert_data);
            }
        }
        return new JSONQuery(this.json);
    };
    //Get the results as JSON array
    JSONQuery.prototype.getResults = function () {
        return this.json;
    };
    return JSONQuery;
}());
exports.JSONQuery = JSONQuery;
