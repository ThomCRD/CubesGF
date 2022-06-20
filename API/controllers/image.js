const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Image = require('../models/image')


// Get all images.
const getAllImages = async (req, res, next) => {
  try {
    const image = await Image.find({}).lean().exec();
    return res.send(image);
  } catch (err) {
    return res.status(500).json({ message: `Database error`, error: err })
  }
}
// Get an image from the database
const getImage = async (req, res, next) => {
  const { id: _id } = req.params;
  // Vérification du param
  if (!req.params.id) {
    return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let image = await await Image.findOne({ _id }).lean().exec();
    console.log(image)
    if (image === null) {
      return res.status(404).json({ message: `the image does not exist ` })
    }
    return res.json({ data: image })
  } catch (err) {
    return res.status(500).json({ message: `Erreur database`, error: err })
  }
}
// Delete an image
const deleteImage = async (req, res) => {
  let ImageId = parseInt(req.params.id)
  // Vérification du param
  if (!ImageId) {
    return res.status(400).json({ message: `Parameter missing` })
  }
  try {
    let image = await Image.findOneAndDelete({ _id: req.params.id })
    if (image === null) {
      return res.status(404).json({ message: `Image does not exist ` })
    }
    return res.json({ data: image, message: "Image removed" })
  } catch (err) {
    return res.status(500).json({ message: `Image not found`, error: err })
  }
}
// If you dont use lean(), you wont decode image as base6;

module.exports = { getImage, getAllImages, deleteImage };
