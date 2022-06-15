const { MongoClient } = require ('mongodb');
require ("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
};

const sendMessage = (res, status, data, message="no message provided") => {
    return res.status(status).json({ status:status, data:data, message:message})
};

const saveSynth = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db("groovinator");
        const newSynth = await db.collection("synths").insertOne(req.body);
        newSynth.acknowledged === true 
            ?sendMessage(res, 200, null, "new synth successfully saved")
            :sendMessage(res, 400, null, "synth could not be saved")
    } catch (err) {
        console.log(err);
    }
    client.close();
}

const saveSequence = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db("groovinator");
        const newSynth = await db.collection("sequences").insertOne(req.body);
        newSynth.acknowledged === true 
            ?sendMessage(res, 200, null, "new sequence successfully saved")
            :sendMessage(res, 400, null, "synth could not be saved")
    } catch (err) {
        console.log(err);
    }
    client.close();
}

const getSynths = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db("groovinator");
        const synthPresets = await db.collection("synths").find().toArray();
        // console.log(synthPresets);
        synthPresets.length !== 0
            ? sendMessage(res, 200, synthPresets, "get-synths load success")
            : sendMessage(res, 400, null, "synths could not be loaded")
    } catch (err) {
        console.log(err);
    }

    client.close();
}

const getSequences = async (req, res) => {
    console.log("imin")
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db("groovinator");
        const sequencePresets = await db.collection("sequences").find().toArray();
        console.log(sequencePresets);
        sequencePresets.length !== 0
            ? sendMessage(res, 200, sequencePresets, "get-sequences load success")
            : sendMessage(res, 400, null, "synths could not be loaded")
    } catch (err) {
        console.log(err);
    }

    client.close();
}

module.exports={ saveSynth, saveSequence, getSynths, getSequences}