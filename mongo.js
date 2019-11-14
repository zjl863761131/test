const  mongoose = require('mongoose')
const model = require('./models')
let Book = mongoose.model("book", model.BookSchema);
let User = mongoose.model("user", model.UserSchema);
let UsrFile = mongoose.model('userfile', model.UserFileSchema);
//let UsrFileTmp = mongoose.model('userfiletmp', model.UserFileTmpSchema);