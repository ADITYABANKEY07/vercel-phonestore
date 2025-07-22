import Review from '../models/Review.js';

// @desc Get all reviews
// @route GET /reviews
// @access Public
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// @desc Get a single review by ID
// @route GET /reviews/:id
// @access Public
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving review', error: error.message });
    }
};

// @desc Create a new review
// @route POST /reviews
// @access Public (or protect with auth)
export const createReview = async (req, res) => {
    const { name, rating, comment } = req.body;

    try {
        const newReview = new Review({ name, rating, comment });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create review', error: error.message });
    }
};

// @desc Update a review
// @route PUT /reviews/:id
// @access Public (or protect with auth)
export const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update review', error: error.message });
    }
};

// @desc Delete a review
// @route DELETE /reviews/:id
// @access Public (or protect with auth)
export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};
