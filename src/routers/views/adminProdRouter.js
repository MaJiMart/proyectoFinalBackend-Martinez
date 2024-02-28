import { Router } from "express";
import passport from 'passport';

const router = Router();

router.get('/adminproducts', passport.authenticate('adminproducts', { successRedirect: '/adminproducts', failureRedirect: '/products' }), (req, res) =>{
    const userData = req.user;
    if (userData && userData.role === 'admin') {
      res.render('adminProducts', { title: 'Admin Products', user: userData });
    } else {
      console.log('Sorry, you do not have permission to access');
      res.redirect('/products');
    }
  });

export default router;