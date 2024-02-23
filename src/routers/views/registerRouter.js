import { Router } from 'express';

const router = Router();

router.get ('/auth/register', (req, res) => {
    if (user) {
        res.redirect ('/')
    }
    res.render('register', { title: 'Register'})
})

export default router