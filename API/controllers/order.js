const Order = require('../models/order')



const getAllOrders = async (req, res) => {
    try {
        let order = await Order.find() 
        return res.json({ data: order })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const getOrder = async (req, res) => {
    let orderId = parseInt(req.params.id)
    // Vérification du param
    if (!orderId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let order = await Order.findOne({ _id: req.params.id })
        if (order === null) {
            return res.status(404).json({ message: `Order does not exist` })
        }

        return res.json({ data: order })
    } catch (err) {
        return res.status(500).json({ message: `Database Error`, error: err })
    }

}
const createOrder = async (req, res) => {
    try {
        const { customer, restaurant, promotion, menus, delivery_time,total } = req.body
        // Validation des données reçues
        if ( !restaurant || !customer || !promotion || !menus || !delivery_time || !total) {
            return res.status(400).json({ message: `Data Missing` })
        }
        let order = await Order.findOne({  customer:customer, delivery_time:delivery_time })
        if (order !== null) {
            return res.status(400).json({ message: `Order existed` })
        }
        order = await Order.create(req.body)
        return res.json({ message: `Order created`, data: order })
    } catch (err) {
        return res.status(500).json({ message: `Database error`, error: err })
    }
}
const deleteOrder = async (req, res) => {
    let orderId = parseInt(req.params.id)
    // Vérification du param
    if (!orderId) {
        return res.status(400).json({ message: `Parameter missing` })
    }
    try {
        let order = await Order.findOneAndDelete({ _id: req.params.id })
        if (order === null) {
            return res.status(404).json({ message: `Order does not exist` })
        }
        return res.json({ data: order, message: "Order removed" })
    } catch (err) {
        return res.status(500).json({ message: `Order not found`, error: err })
    }
}

module.exports = { getAllOrders, getOrder, createOrder, deleteOrder }