const db = require("../db/connection");

const createUser = (req,res) =>{
    const {name , email,age} = req.body;

    if(!name || name.trim() === ""){
       return res.status(400).json({
        message: "Name is required"
       });
    }

    if(!email || email.trim()===""){
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if(age !== undefined && ! Number.isInteger(Number(age)) || (Number(age) <= 0)){
       return res.status(400).json({
        message:"Age must be a positive number"
       });
    }

    const sql = `INSERT INTO users(name,email,age) VALUES(?,?,?)`;

    db.query(sql,[name.trim() , email.trim(),age || null] ,(err , result)=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                return  res.status(409).json({
                    message:"Email already exists"
                });
            }
            console.error(err);

            return res.status(500).json({
                message:"Database error"
            })
        }

       res.status(201).json({
        message:"User created successfully",
        userId: result.insertId
       });

    } );

}

const getUsers = (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(200).json(results);
    });
};


const getUserById = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

const updateUser = (req, res) => {

    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!email || email.trim() === "") {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (age !== undefined && (!Number.isInteger(Number(age)) || Number(age) <= 0)) {
        return res.status(400).json({
            message: "Age must be a positive number"
        });
    }

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name.trim(), email.trim(), age || null, id],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }

                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "User updated successfully"
            });
        }
    );
};


const deleteUser = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    });
};
module.exports={createUser,getUsers,getUserById,updateUser,deleteUser};