const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
const User = require('../../models/User')

const collectionRoutes = require("./collections");
router.use("/collections", collectionRoutes);

router.route("/minifigs")
    .get(async function(req, res){
        let rebrickableMinifigsURL = "https://rebrickable.com/api/v3/lego/minifigs/"

        if(req.query){
            console.log(req._parsedOriginalUrl.search);
            //console.log(req.query);
            rebrickableMinifigsURL += req._parsedOriginalUrl.search;
        }

        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }
        console.log(rebrickableMinifigsURL);
        const { data: minifigData } = await axios.get(rebrickableMinifigsURL, config);

        if(!minifigData){
            res.status(404).send();
        } else {
            res.json(minifigData);
        }

    })

router.route("/minifigs/:userId")
    .get(async function(req, res){
        
        const user = await User.findOne({_id: req.params.userId});
        console.log(user);
        
        let rebrickableMinifigsURL = `https://rebrickable.com/api/v3/users/${user.user_token}/minifigs/`

        if(req.query && req._parsedOriginalUrl.search){
            console.log(req._parsedOriginalUrl.search);
            console.log(req.query);
            rebrickableMinifigsURL += req._parsedOriginalUrl.search;
        }

        console.log(`Getting minifigs for ${req.params.userId}`)

        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }
        const { data: minifigData } = await axios.get(rebrickableMinifigsURL, config);
        if(minifigData){
            res.json(minifigData);
        } else {
            res.status(404).send();
        }
    })

router.route("/sets/:setNum")
    .get(async function(req, res){
        console.log(req.params.setNum);
        let rebrickableBaseURL = "https://rebrickable.com/api/v3/lego/sets/"
        if(req.params.setNum.indexOf('fig') > -1){
            console.log("This is a minifig...");
            rebrickableBaseURL = "https://rebrickable.com/api/v3/lego/minifigs/"
        }

        const rebrickableURL = `${rebrickableBaseURL}${req.params.setNum}/`;
        const key = process.env.REBRICKABLE_API_KEY
        const config = {
            headers: { Authorization : `key ${key}`}
        }
        try {
            const { data: setData } = await axios.get(rebrickableURL, config);

            if(!setData){
                res.status(404).send();
            } else {
                const rebrickableURLSubsets = `${rebrickableBaseURL}${req.params.setNum}/sets/`;
                const { data: subsetsData } = await axios.get(rebrickableURLSubsets, config);
                if(subsetsData && subsetsData.count){
                    setData.sets = subsetsData.results;
                } 
                res.json(setData);
                //const cmfSets = require("../../data/cmf-sets.json")
                //const set = cmfSets.find(set => set.set_num == req.params.setNum)
            }

        } catch(error){
            console.log(error.response.status);
            if(error.response.status == 404){
                res.status(404).send();
            } else {
                res.status(error.response.status).send();
            }
            
        }
        
     })

module.exports = router;