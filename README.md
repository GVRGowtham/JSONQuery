# JSON_Query
A library for front-end JSON based data table querying. Supports all simple CRUD operations.
---
## JSONQuery - Object declared by passing a json array

```javascript

let json = new JSONQuery(jsonData);

```

## Functions Available

### Insert

Inserts a new data into the json array

insert(data)

```javascript

json.insert({id:1,name:"name"});

```

### Update

Updates the value of a particular key based on a condition

update(query_field,condition,value,update_field,new_value)

```javascript

json.update("id","eq",1,"name","new name");

```

List of available operators:
1. eq - Equal to
2. neq - Not Equal to
3. gt - Greater than
4. lt - Lesser than
5. eqgt - Equal to or greater than
6. eqlt - Equal to or lesser than
7. like - Like operator for string
8. ilike - Non-case sensitive like operator for string

### Replace

Replaces the entire object based on a condition

replace(query_field,value,data)

```javascript

json.replace("id",1,{id:1,name:"replace name"});

```

Note that replace only supports eq operator

### Remove

Removes the entire object based on a condition

remove(query_field,value)

```javascript

json.remove("id",1);

```

Note that remove only supports eq operator

### Select

Outputs only specific keys outside of the function

select(fields[])

```javascript

json.select([]);
json.select(["id"]);
json.select(["id","name"]);

```

Note that giving empty array implies select *

### Filter

Filters the data based on a condition. Operators are the same as the ones in update

filter(query_field,condition,value)

```javascript

json.filter("id","eq",1);

```

### Sort

Sorts the data based on a key either ascending or descending

sort(query_field,isAscending)

```javascript

json.sort("id",true);

```

### Union

Performs union on the two data available

union(object:JSONQuery)

```javascript

json.union(anotherJson);

```

The Union operator helps in achieving the *or* condition.

```sql

select * from json where id = 1 or id = 2;

```

This query can be written as

```javascript

json.filter("id","eq",1).union(json.filter("id","eq",2));

```

The filter operator can be nested to achieve *and* condition

```sql

select * from json where id > 1 and name like "name";

```

This query can be written as

```javascript

json.filter("id","gt",1).filter("name","like","name");

```

### Get Results

Get Results function gives you the json array as output whereas the other functions return the object.

Note that the json array is a private member of the class.

getResults()

```javascript

json.getResults();

```