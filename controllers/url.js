//imports
const shortid = require("shortid");
const URL = require("../models/url");

//To create a new shortened url for a given URL
async function handleGenerateNewShortenedURL(req,res)
{
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortenURL = shortid();

    const existingUrl = await URL.findOne({ redirectURL: body.url });
    if(existingUrl)
    {
        return res.json
        (
            {
                message:"Shortened URL is already found in the database" ,
                shortenedURL: existingUrl.shortenedURL
            }
        );
    }
        
    else
    {
        await URL.create({
            shortenedURL: shortenURL,
            redirectURL: body.url,
            visitHistory: []
        });
    }
    return res.json({shortenedURL: shortenURL});
}

//to get analytics of the shortened URL
async function handleGetAnalytics(req, res)
{
    const shortenedURL = req.params.shortenedURL;
    const checkURLExists = await URL.findOne({ shortenedURL: shortenedURL });
    if(checkURLExists)
    {
        const result = await URL.findOne({shortenedURL});
        
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    }
    else
    {
        return res.json({"Error Message": `The analytics you are trying to access does not exist, or there is no such shortened URL for the requested : ${req.params.shortenedURL}`});
    }
}

//to redirect a shortened URL to their original website
async function handleGetShortenedURL(req, res) 
{
    const shortenedURL = req.params.shortenedURL;
    const checkURLExists = await URL.findOne({ shortenedURL: shortenedURL });
    if(checkURLExists)
    {
        const entry = await URL.findOneAndUpdate
        (
            { 
                shortenedURL 
            },
            { 
                $push: { 
                    visitHistory: { 
                        timestamp: Date.now(), 
                    }, 
                }
            }
        );
        return res.redirect('http://'+entry.redirectURL);
    }
    else
    {
        return res.json({"Error Message": `The URL you are trying to access does not exist, or there is no such shortened URL for the requested : ${req.params.shortenedURL}`});
    }
}


//exports
module.exports ={
    handleGenerateNewShortenedURL,
    handleGetShortenedURL,
    handleGetAnalytics,
}