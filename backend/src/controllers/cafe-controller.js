import {getDistance} from "../utils/utils.js";

const cafes = [  // Dummy data (we'll connect a DB later)
    { id: 1, name: "Cozy Bean", wifi: 2, outlets: 2, capacity: 3, foodBev:3, tags: ['cozy-chairs', 'quiet', 'awesome-service'] },
    { id: 2, name: "Java Haven", wifi: 3, outlets: 4, capacity: 4, foodBev:4, tags:['focused-mode-on', 'bustling', 'industrial']},
];


// cafeRoutes.get('/search',searchCafes); //get cafes based on search and filter criteria
// cafeRoutes.get('/:id',getCafeDetails);//get cafe by specific id
// cafeRoutes.get('/featured', getFeaturedCafes); //get featured cafes 
// cafeRoutes.post('/:id/rate',addRatings); 
// cafeRoutes.post('/:id/tags',addTags);
// cafeRoutes.get("/:id/ratings",getRatings);
// cafeRoutes.get("/:id/tags",getTags);
// cafeRoutes.get("/map",getMap); //map integration


//search cafes - by location, name, amenities (ADD BY TAGS LATER)
exports.searchCafes = (req,res) => {
    let results = cafes;
    //search by name
    if (req.query.name) {
        const searchName = req.query.name.toLowerCase();
        results = results.filter(cafe=> cafe.name.toLowerCase.includes(searchName));

    }
    //search by location (lat + long + radius)
    if (req.query.latitude && req.query.longitude) {
        const userLat  = req.query.latitude;
        const userLong = req.query.long;
        const radius = req.query.radius || 5000; //default wil be 5km
        results = cafes.filter(cafe =>{
            const distance = getDistance(userLat, userLong, cafe.latitude.longitude);
            return distance<=radius;
        })
    }
    //search by amenities
    //wifi
    if (req.query.wifi){
        results = cafes.filter(cafe => cafe.wifi>=Number(req.query.wifi));
    }
    //outlets
    if (req.query.outlets){
        results = cafes.filter(cafe => cafe.outlets >= Number(req.query.outlets));
    }
    //capacity
    if (req.query.capacity){
        results = cafes.filter(cafe => cafe.capacity >= Number(req.query.capacity));
    }
    //
    if (req.query.foodBev){
        results = cafes.filter(cafe => cafe.foodBev >= Number(req.query.foodBev));
    }
    
    res.json(results); //return results in json 


}

exports.getCafeDetails = (req, res) => {
    const cafe = cafes.find(c => c.id === Number(req.params.id));
    if (!cafe) return res.status(404).json({ message: "Cafe not found!" });

    res.json(cafe); // Includes all info: name, wifi, outlets, tags, etc.
};


exports.addRatings = (req,res) => {
    const cafe = cafes.find(c=> c.id ===Number(req.params.id));
    if (!cafe) return res.status(404).json ({message: "Cafe not found!"});
    
    const {rating} = req.body; // get teh rating from the request body 
}
