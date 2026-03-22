import express from 'express';
const router = express.Router();

// just to test the route
router.get('/login', (req,res) => {
    res.send('Login Page')
})

// default export
export default router;