import { Router } from 'express';

const router = Router();

router.get ('/new-password/', (req, res) => {

  res.render('newPass', { title: 'New Password', token: req.params.token})
})

export default router