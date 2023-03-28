
class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){ 
        let keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{};
        this.query.find({...keyword});
        return this;
    }
    filter(){
        const copyQueryStr={...this.queryStr};
        
        const removeField=['keyword','limit','page'];
        removeField.forEach(field=>delete copyQueryStr[field]);
        
        let queryStr=JSON.stringify(copyQueryStr);

        queryStr=queryStr.replace(/\b(gt|lt|gte|lte)/g,match=>`$${match}`)
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    paginate(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*currentPage-1;
        this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports=APIFeatures;