const cafeService = require('../services/cafe-service.js');

//
const getNearbyCafes = async (req, res) => {
    try {
        const { lat, lng, radius = 1000, limit = 10, offset = 0 } = req.query;
        // Basic validation
        if (!lat || !lng) {
            return res.status(400).json({
                status: 'error',
                message: 'Latitude and longitude are required query parameters'
            });
        }
        // Convert to numbers and validate
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const searchRadius = parseInt(radius);
        const resultLimit = parseInt(limit);
        const resultOffset = parseInt(offset);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid latitude or longitude values'
            });
        }
        if (isNaN(resultLimit) || isNaN(resultOffset)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid limit or offset values'
            });
        }

        const nearbyCafes = await cafeService.findCafesNearLocation(latitude, longitude, searchRadius, resultLimit, resultOffset);
        res.json(nearbyCafes);

    } catch (error) {
        console.error('Error getting cafe details:', error);
        switch (error.message) {
            default:
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
        }
    }
}

//getCafeDetails --> parse by row and send the response back to the client from cafeId
const getCafeDetailsById = async (req, res) => {
    try {
        const cafeId = req.params.id;
        console.log(cafeId);
        // Validate cafeId
        if (!cafeId) {
            return res.status(400).json({ message: 'Cafe ID is required' });
        }
        // Call the service function to get cafe details
        const cafeDetails = await cafeService.findCafeDetails(cafeId);
        // Check if cafe details were found
        if (!cafeDetails) {
            return res.status(404).json({ message: 'Cafe not found' });
        }
        // Send the cafe details as the response
        res.json(cafeDetails);

    } catch (error) {
        console.error('Error getting cafe details:', error);

        // Handle specific error cases
        switch (error.message) {
            case 'INVALID_ID':
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cafe ID provided'
                });
            default:
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
        }
    }
}

const getSearchedCafes = async (req, res) => {
    try {

        const {name, address, sort, limit = 10, lat, lng} = req.query;
        // Validate query parameters
        if (!name && !address) {
            return res.status(400).json({ message: 'Name or address is required' });
        }
        if (sort && !['name_asc', 'name_desc', 'address_asc', 'address_desc', 'distance_asc', 'distance_desc'].includes(sort)) {
            return res.status(400).json({ message: 'Invalid sort parameter' });
        }
        if (sort?.includes('distance') && (!lat || !lng)) {
            return res.status(400).json({ message: 'Latitude and longitude are required for distance sorting' });
        }
        const searchedCafes = await cafeService.findSearchedCafes(name, address, sort, limit, lat, lng);
        // Check if cafes were found
        if (searchedCafes.length === 0) {
            return res.status(404).json({ message: 'No cafes found' });
        }
        // Send the cafes as the response
        res.json(searchedCafes);
        console.log(searchedCafes)

    }
    catch (error){
        console.error('Error getting searched cafes:', error);
        // Handle specific error cases
        switch (error.message) {
            case 'INVALID_SEARCH':
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid search parameters provided'
                });
            case 'COORDINATES_REQUIRED_FOR_DISTANCE':
                return res.status(400).json({
                    status: 'error',
                    message: 'Coordinates are required for distance sorting'
                });
            default:
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error'
                });
        }
    }
}


const cafeController = {
    getNearbyCafes, 
    getCafeDetailsById,
    getSearchedCafes
}
module.exports = cafeController
 //can't connect to the database