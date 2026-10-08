import { Item } from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get items",
      error: error.message
    });
  }
};

export const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      user: req.user.userId
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create item",
      error: error.message
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item",
      error: error.message
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json({
      message: "Item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete item",
      error: error.message
    });
  }
};