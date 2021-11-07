const dbConfig = require("../config/db.config");
const db = require("../db/models");
const Role = db.role;

// module.exports.database_init = async (req, res) => {
//     db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log("Successfully connect to MongoDB.");
//         initial();
//     }).catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });

module.exports.initial = () =>{
        Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
            name: "user"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
            });
    
            new Role({
            name: "moderator"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
            });
    
            new Role({
            name: "admin"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
            });
        }
        });
    }
// }