import express from 'express';

const router = express.Router();

router.get('/api', (req, res) => {
    res.send('Rouse Hello World!');
});

export default router;