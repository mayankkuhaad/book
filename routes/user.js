const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/users");

router.use(bodyParser.json());
//  Read the data --- READ OPERATION
router.get("/", async (req, res) => {
    try {
        // write the code to fetch all the users
        const users = await User.find();
        res.status(200).json({
            status: "Sucess",
            data: users
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

//  Read the data for a specific user -- READ OPERTAION
router.get("/:id", async (req, res) => {
    try {
        // write the code to fetch all the users
        const users = await User.find({_id: req.params.id});
        res.status(200).json({
            status: "Sucess",
            data: users
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

// create the data -- CREATE OPERATION
router.post("/", async (req, res) => {
    try {
        const users = await User.create(req.body);

        res.status(200).json({
            status: "Success",
            users
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});
//  Update the data  -- UPDATE OPERATION
router.put("/:id", async (req, res) => {
    try {
        // Code to update the document
        console.log(req.params);
        const users = await User.updateOne({_id: req.params.id}, req.body);

        res.status(200).json({
            status: "Sucess",
            users
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});
//  Delete the data  -- DELETE OPERATION
router.delete("/:id", async (req, res) => {
    try {
        // Code to update the document
        const users = await User.deleteOne({_id : req.params.id});

        res.status(200).json({
            status: "Sucess",
            users
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

router.get("*", (req, res) => {
    res.status(404).json({
        status: "failed",
        message: "Invalid request"
    })
});

module.exports = router;