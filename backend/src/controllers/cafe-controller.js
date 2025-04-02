import {getDistance, calculateAverage} from "../utils/utils.js";


const cafeTags = require('../data/cafeTags.json')
const cafes = [  // Dummy data (we'll connect a DB later)
    { id: 1, name: "Cozy Bean", wifi: [2], outlets:[ 2], capacity: [3], foodBev:[3], tags: ['cozy-chairs', 'quiet', 'awesome-service'] },
    { id: 2, name: "Java Haven", wifi: [3], outlets: [4], capacity: [4], foodBev:[4], tags:['focused-mode-on', 'bustling', 'industrial']},
];




// done cafeRoutes.get('/search',searchCafes); //get cafes based on search and filter criteria
//done  cafeRoutes.get('/:id',getCafeDetails);//get cafe by specific id
    // cafeRoutes.get('/featured', getFeaturedCafes); //get featured cafes 
// done cafeRoutes.post('/:id/rate',addRatings); 
// done cafeRoutes.post('/:id/tags',addTags);
// cafeRoutes.get("/:id/ratings",getCafeRatings);
// cafeRoutes.get("/:id/tags",getCafeTags);
// cafeRoutes.get("/map",getMap); //map integration


//search cafes - by location, name, amenities 
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
            const distance = getDistance(userLat, userLong, cafe.latitude, cafe.longitude);
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
    //food bev
    if (req.query.foodBev){
        results = cafes.filter(cafe => cafe.foodBev >= Number(req.query.foodBev));
    }
    //search by tags
    if (req.query.tags) {
        const tags = req.query.tags.split(',');  // Support multiple tags search
        results = results.filter(cafe => 
            tags.every(tag => cafe.tags.includes(tag))  // Ensure all tags are present
        );
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
    
    const {userWifi, userOutlet,userFoodBev ,userCap} = req.body; // get the rating from the request body 
    
    if (!cafe.wifi) cafe.wifi = []; //initalize arrays if they don't exist
    if (!cafe.outlets) cafe.outlets = [];
    if (!cafe.capacity) cafe.capacity =[];
    if (!cafe.foodBev) cafe.foodBev = [];

     // Validate ratings (should be between 1-5)
     if (
        (userWifi && (userWifi < 1 || userWifi > 5)) ||
        (userOutlet && (userOutlet < 1 || userOutlet > 5)) ||
        (userFoodBev && (userFoodBev < 1 || userFoodBev > 5)) ||
        (userCap && (userCap < 1 || userCap > 5))
    ) {
        return res.status(400).json({ message: "Ratings must be between 1 and 5." });
    }

    //push new ratings into arrays
    
    if (userWifi) cafe.wifi.push(userWifi);
    if (userOutlet) cafe.outlets.push(userOutlet);
    if (userFoodBev) cafe.foodBev.push(userFoodBev);
    if (userCap) cafe.capacity.push(userCap);

    //calculate average ratings
    cafe.avgWifi = calculateAverage(cafe.wifi);
    cafe.avgOutlets = calculateAverage(cafe.outlets);
    cafe.avgFoodBev = calculateAverage(cafe.foodBev);
    cafe.avgCapacity = calculateAverage(cafe.capacity);

    res.json({ message: "Rating added!", cafe });


}

//POST tags 
exports.addTags = (req,res) => {


    const cafe = cafes.find(c=> c.id ===Number(req.params.id));
    if (!cafe) return res.status(404).json({message:"Cafe not found!"});
    const userTags = req.body.tags;
    if (!userTags || !Array.isArray(userTags)) {
        return res.status(400).json({ message: "Tags should be provided as an array." });
    }
    //if valid tag, then add to cafe
    userTags.forEach(tag => {
        //only accept allowed tags 
        if (cafeTags.includes(tag)){
            cafe.tags.push(tag);
        }
    })
    res.json({ message: "Tags added!", cafe });

}

exports.getCafeRatings = (req, res) => {
    // Find the cafe
    const cafe = cafes.find(c => c.id === Number(req.params.id));
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });

    // Return the ratings
    res.json({
        wifi: cafe.wifi || [],
        outlets: cafe.outlets || [],
        capacity: cafe.capacity || [],
        foodBev: cafe.foodBev || [],
        avgWifi: cafe.avgWifi || null,
        avgOutlets: cafe.avgOutlets || null,
        avgCapacity: cafe.avgCapacity || null,
        avgFoodBev: cafe.avgFoodBev || null,
    });
};

