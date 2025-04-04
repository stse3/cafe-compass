const cafeService = require('../services/cafe-service.js');

//
const getNearbyCafes= async (req,res) => {
    try{
        const {latitude, longitude, radius=1000, limit=10} = req.query;
        //basic validation --> 
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }
        if(limit>20){
            limit=20
        }
        //2. call the service function
        const cafes = await cafeService.findCafesNearLocation(
            parseFloat(latitude),
            parseFloat(longitude),
            parseInt(radius),
            parseInt(limit));
        //3. format and send response back 
        res.json({
            count:cafes.length,
            cafes:cafes
        })

    }catch (error){
        console.error('Error getting nearby cafes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//getCafeFilter function to filter cafes based on user input
const getCafeFilter = async ( req,res) => {
    
}


const cafeController = {
    getNearbyCafes
}
module.exports = cafeController
