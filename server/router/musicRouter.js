const musicRouter               = require("express").Router();
const { verifyToken }           = require("../middlewares/verifyToken");
const db                        = require("../db/db");
const { getCurrentDateTime }    = require("../utils/currentDate");
const acceptedGenres            = require("../utils/acceptedGenres");

musicRouter.get("/all", verifyToken, (req, res) => {  
    console.log("in the /all route");  
    // verify the token and get the data back
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        const query = "SELECT music.*, artist.name FROM music JOIN artist ON music.artist_id = artist.id";
        con.query(query, (err, result) => {
            con.release();
            if (err) {
                return res.status(500).json({status: "error", message: "Unable to prepare query"});
            }

            return res.json(result);
        });
    })
})

musicRouter.post("/create", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const { artist_id, title, album_name, genre } = req.body;

    if (!artist_id) return res.status(400).json({status: "error", message: "No artist selected"});

    console.log(req.body);
    if(!acceptedGenres.includes(genre)) return res.status(400).json({status: "error", message: "Unknown Genre"});

    // get connection to database
    console.log(req.body.genre);
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        // check to see if title and album name exists in the db.
        query = "SELECT title, album_name FROM music WHERE music.title = ? AND music.album_name = ?";
        con.query(query, [title, album_name], (err, result) => {
            if (result.length !== 0) return res.status(403).json({status: "error", message:"Title and album_name already exist"});

            query = "INSERT INTO music (`artist_id`, `title`, `album_name`, `genre`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?)";
            
            con.query(query, [artist_id, title, album_name, genre, getCurrentDateTime(), getCurrentDateTime()], (err, result) => {
                con.release();
                console.log(result);
                if (err) return res.status(500).json({status: "error", message: "Database error"});
                
                return res.status(201).json({status: "success", message: "created"}); // res.status(200).end();
            })
        })
    })
})

musicRouter.put("/update/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id                 = req.params.id;
    const { album_name }     = req.body;
    
    if(Object.keys(req.body).length > 1) return res.status(400).json({status: "error", message: "Can only updated Album Name"});
    if (!album_name) return res.status(400).json({status: "error", message: "Can only updated Album Name"});

    console.log(album_name)
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
        
        const query = "UPDATE music set `album_name` = ?, `updated_at` = ? WHERE id = " + id ; // change updated at
        con.query(query, [album_name, getCurrentDateTime()], (err, result) => {
            con.release();

            if (err) return res.status(500).json({status: "error", message: "Database error"});

            console.log(result);
            return res.status(200).json({ status: "success", message: "Album Name updated successfully" });
        })
    })
})

musicRouter.delete("/delete/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id = req.params.id;

    console.log(id);
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});
        
        const query = "DELETE FROM music WHERE id = " + id ;
        con.query(query, (err, result) => {
            con.release();
            if (err) return res.status(500).json({status: "error", message: "Database error"});

            console.log("deleted");
            return res.status(200).json({status: "success", message: "Music deleted successfully"});
        })
    })
})

musicRouter.get("/:id", verifyToken, (req, res) => {
    if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});

    const id = req.params.id;
    
    const query = "SELECT * FROM music WHERE artist.id = ?";
    db.getConnection((err, con) => {
        if (err) return res.status(500).json({status: "error", message: "Can't connect to database"});

        con.query(query, [id], (err, result) => {
            con.release();
            console.log(err)
            if (err) return res.status(500).json({status: "error", message: "Database error"});

            let toSend = result[0];

            toSend.dob = toSend.dob !== "0000-00-00 00:00:00" 
                ? new Date(toSend.dob).toISOString().split('T')[0] 
                : ""
            return res.json(toSend);
        })
    })
})

module.exports = musicRouter;