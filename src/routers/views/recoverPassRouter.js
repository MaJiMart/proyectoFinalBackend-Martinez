import { Router } from 'express';

const router = Router();

router.get ('/recoverPass', (req, res) => {
    if (req.user) {
        res.redirect ('/')
    }
    res.render('recoverPass', { title: 'Recover Password'})
})

export default router