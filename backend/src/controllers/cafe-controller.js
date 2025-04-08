const cafeService = require('../services/cafe-service.js');

//
const getNearbyCafes = async (req,res) => {
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

//getCafeDetails --> parse by row and send the response back to the client from cafeId
const getCafeDetails = async (req,res) => {
    try {
        const { cafeId } = req.params;
        // Validate cafeId
        if (!cafeId) {
            return res.status(400).json({ message: 'Cafe ID is required' });
        }
        // Call the service function to get cafe details
        const cafeDetails = await cafeService.findCafeDetails(cafeId);
        // Check if cafe details were found
        if (!cafeDetails){
            return res.status(404).json({ message: 'Cafe not found' });
        }
        // Send the cafe details as the response
        res.json(cafeDetails);
    }catch (error){
        console.error('Error getting cafe details:', error);
        res.status(500).json({ message: 'Server error' }); //can't connect to the database
    }
}


const cafeController = {
    getNearbyCafes, 
    getCafeDetails
}
module.exports = cafeController
 //can't connect to the database