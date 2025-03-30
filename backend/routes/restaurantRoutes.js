import express from "express";

import authMiddleware from "../middleware/auth.js";
import {
    listRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
} from "../controllers/restaurantController.js";


const restaurantRouter = express.Router();
// All routes require authentication
restaurantRouter.use(authMiddleware);

// List all restaurants
restaurantRouter.get("/list", listRestaurants);

// Get single restaurant
restaurantRouter.get("/:id", getRestaurant);

// Add new restaurant
restaurantRouter.post("/add", addRestaurant);

// Update restaurant
restaurantRouter.put("/:id", updateRestaurant);

// Delete restaurant
restaurantRouter.delete("/:id", deleteRestaurant);

export default restaurantRouter;