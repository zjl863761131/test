let BookSchema = {name:{type:String}, price:{type:Number}, count:{type:Number}};
let UserSchema = {username:{type:String}, password:{type:String},createtime: {type:Date},salt:{type:String},img:{type:String}};
let UserFileSchema = {username:{type:String},filename:{type:String},filepath:{type:String},uploadtime:{type:Date},age:{type:String},score:{type:String}};
//let UserFileTmpSchema = {username:{type:String},filename:{type:String},uploadtime:{type:Date},age:{type:String},score:{type:String},img:{type:String}};
module.exports={BookSchema,UserSchema,UserFileSchema}
