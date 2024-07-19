const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const collectionRoutes = require("./collections");
router.use("/collections", collectionRoutes);

router.route("/minifigs")
    .get(async function(req, res){
        let rebrickableMinifigsURL = "https://rebrickable.com/api/v3/lego/minifigs/"
        
        if(req.query && req.query.user_token){
            rebrickableMinifigsURL = `https://rebrickable.com/api/v3/users/${req.query.user_token}/minifigs/`
            if(req.query.search){
                rebrickableMinifigsURL += `search=${req.query.search}`
            }
        }

        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }

        

        const { data: minifigData } = await axios.get(rebrickableMinifigsURL, config);

        if(!minifigData){
            res.status(404).send();
        } else {
            res.json(minifigData);
        }

    })

router.route("/sets/:setNum")
    .get(async function(req, res){
        console.log(req.params.setNum);
        const rebrickableURL = `https://rebrickable.com/api/v3/lego/sets/${req.params.setNum}/`;
        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }
        const { data: setData } = await axios.get(rebrickableURL, config);
        if(!setData){
            res.status(404).send();
        } else {
            const rebrickableURLSubsets = `https://rebrickable.com/api/v3/lego/sets/${req.params.setNum}/sets/`;
            const { data: subsetsData } = await axios.get(rebrickableURLSubsets, config);
            if(subsetsData && subsetsData.count){
                setData.sets = subsetsData.results;
            } 
            res.json(setData);
            //const cmfSets = require("../../data/cmf-sets.json")
            //const set = cmfSets.find(set => set.set_num == req.params.setNum)
        }
     })

module.exports = router;