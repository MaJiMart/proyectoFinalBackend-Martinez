import { Router } from 'express';

const router = Router();

router.get ('/register', (req, res) => {
    if (req.user) {
        res.redirect ('/')
    }
    res.render('register', { title: 'Register'})
})


export default router