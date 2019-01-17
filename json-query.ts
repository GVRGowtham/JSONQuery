/*

An ORM for JSON datatables

Created By Venkat

Supports all basic CRUD operations

*/
export class JSONQuery{
    private json:any[]=[];

    constructor(jsonData:any[]){
        this.json=jsonData;
    }

    //Insert a new row in the table
    insert(data:any):void{
        this.json.push(data);
    }

    //Update a particular column with a new value based on a condition
    /*Currently supports greater than, lesser than, equal to, not equal to, 
    lesser than or equal to,greter than or equal to, 
    like and ilike operators*/
    update(field:string,condition:string,value:any,updateField:string,data:any):void{
        if(condition==="eq"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]===value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="neq"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]!==value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="gt"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]>value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="lt"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]<value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="eqgt"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]>=value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="eqlt"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field]<=value){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="like"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field].indexOf(value)>-1){
                    this.json[i][updateField]=data;
                }
            }
        }else if(condition==="ilike"){
            for(let i=0;i<this.json.length;i++){
                if(this.json[i][field].toLocaleLowerCase().indexOf(value.toLocaleLowerCase())>-1){
                    this.json[i][updateField]=data;
                }
            }
        }
    }

    //Replace the entire data based on a condition
    replace(field:string,value:any,data:any):void{
        for(let i=0;i<this.json.length;i++){
            if(this.json[i][field]===value){
                this.json[i]=data;
            }
        }
    }

    //Delete a row based on a condition
    remove(field:string,value:any):void{
        for(let i=0;i<this.json.length;i++){
            if(this.json[i][field]===value){
                this.json.splice(i,1);
            }
        }
    }

    //Select only few columns to be shown
    select(fields:string[]):JSONQuery{
        let selectedJson=[];
        if(fields.length===0){
            for(let i=0;i<this.json.length;i++){
                let data=this.json[i];
                selectedJson.push(data);
            }
        }else{
            for(let i=0;i<this.json.length;i++){
                let data={};
                for(let j=0;j<fields.length;j++){
                    data[fields[j]]=this.json[i][fields[j]];
                }
                selectedJson.push(data);
            }
        }
        return new JSONQuery(selectedJson);
    }

    //Filter the data based on a query
    /*Currently supports greater than, lesser than, equal to, not equal to, 
    lesser than or equal to, greter than or equal to, 
    like and ilike operators*/
    filter(field:string,condition:string,value:any):JSONQuery{
        if(condition==="eq"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]===value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="neq"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]!==value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="gt"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]>value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="lt"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]<value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="eqgt"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]>=value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="eqlt"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field]<=value;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="like"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field].indexOf(value)>-1;
            });
            return new JSONQuery(filteredJson);
        }else if(condition==="ilike"){
            let filteredJson = this.json.filter(entry=>{
                return entry[field].toLocaleLowerCase().indexOf(value.toLocaleLowerCase())>-1;
            });
            return new JSONQuery(filteredJson);
        }
    }

    //Sort the output ascending or descending based on a column
    //Currently supports string, number, float data types only
    sort(field:string,ascending:boolean):JSONQuery{
        let tempjson:any[]=JSON.parse(JSON.stringify(this.json));
        if(ascending){
            return new JSONQuery(tempjson.sort((a,b)=>{
                return ((a[field] < b[field]) ? -1 : ((a[field] > b[field]) ? 1 : 0));
            }));
        }else{
            return new JSONQuery(tempjson.sort((a,b)=>{
                return ((b[field] < a[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0));
            }));
        }
    }

    union(result:JSONQuery):JSONQuery{
        const new_json=result.getResults();
        while(new_json.length>0){
            const insert_data = new_json.pop();
            let i;
            for(i=0;i<this.json.length;i++){
                if(this.json[i]===insert_data){
                    break;
                }
            }
            if(i===this.json.length){
                this.json.push(insert_data);
            }
        }
        return new JSONQuery(this.json);
    }

    //Get the results as JSON array
    getResults():any[]{
        return this.json;
    }
}