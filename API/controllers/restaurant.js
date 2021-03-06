const Restaurant = require('../models/restaurant')


// Get a list of restaurants.
const getRestaurants = async (req, res) => {
    try {
        let restaurant = await Restaurant.find()
        return res.json({ data: restaurant })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
// Get a single restaurant.
const getRestaurant = async (req, res) => {
    let restaurantId = parseInt(req.params.id)

        // Check if a parameter is missing.
    if (!restaurantId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let restaurant = await Restaurant.findOne({ _id: req.params.id }).populate('comment')
        if (restaurant === null) {
            return res.status(404).json({ message: `the restaurant does not exist ` })
        }
        return res.json({ data: restaurant })
    } catch (err) {
        return res.status(500).json({ message: `Erreur database`, error: err })
    }
}
// Get a restaurant by name.
const getRestaurantfindByName = async (req, res) => {
    try {
        let restaurant = await Restaurant.find({name: req.params.name})
        .populate('comment')
        .populate('adress')
        .populate('menu')
        if (restaurant === [] ) {
            return res.status(404).json({ message: `the restaurant does not exist ` })
        }
        return res.json({ data: restaurant })
    } catch (err) {
        return res.status(500).json({ message: `Erreur database`, error: err })
    }
}
// Create a new restaurant
const createRestaurant = async (req, res) => {
    try {
        const { franchise, name, adress, photo, menu, comment } = req.body

        // Validation des données reçues
        if (!franchise || !name || !adress || !photo || !menu || !comment) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let restaurant = await Restaurant.findOne({ franchise: franchise, name: name, adress: adress, photo: photo, menu: menu, comment: comment })
        if (restaurant !== null) {
            return res.status(400).json({ message: `Restaurant existed` })
        }
        restaurant = await Restaurant.create(req.body)
        return res.json({ message: `Restaurant created`, data: restaurant })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
// Update a restaurant
const updateRestaurant = async (req, res) => {
    let restaurantId = parseInt(req.params.id)
    // Vérification du param
    if (!restaurantId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let restaurant = await Restaurant.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        if (restaurant === null) {
            return res.status(404).json({ message: `the restaurant does not exist ` })
        }
        return res.json({ data: restaurant, message: "restaurant removed" })
    } catch (err) {
        return res.status(500).json({ message: `Restaurant not found`, error: err })
    }
}
// Delete a restaurant
const deleteRestaurant = async (req, res) => {
    let restaurantId = parseInt(req.params.id)
    // Vérification du param
    if (!restaurantId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let restaurant = await Restaurant.findOneAndDelete({ _id: req.params.id })
        if (restaurant === null) {
            return res.status(404).json({ message: `the restaurant does not exist ` })
        }
        return res.json({ data: restaurant, message: "Restaurant removed" })
    } catch (err) {
        return res.status(500).json({ message: `Restaurant not found`, error: err })
    }
}
module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantfindByName
}
