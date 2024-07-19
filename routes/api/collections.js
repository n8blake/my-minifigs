const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

router.route("/cmf")
    .get(function(req, res){
        console.log("hit cmf");
        const cmfSets = require("../../data/cmf-sets.json")
        const collection = {
            name: "Collectible Minigures Series",
            sets: cmfSets
        }
        res.json(collection);
    })

router.route("/cmf/:setNum")
    .get(async function(req, res){
        console.log(req.params.setNum);
        const rebrickableMinifigsURL = `https://rebrickable.com/api/v3/lego/sets/${req.params.setNum}/sets/`;
        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }
        const { data: minifigData } = await axios.get(rebrickableMinifigsURL, config);
        if(!minifigData || !minifigData.results){
            res.status(404).send();
        } else {
            const cmfSets = require("../../data/cmf-sets.json")
            const set = cmfSets.find(set => set.set_num == req.params.setNum)
            res.json(minifigData);
        }
    })

module.exports = router;