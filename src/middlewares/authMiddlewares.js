import passport from 'passport';

export const authenticationMidd = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, function (error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message ? info.message : info.toString() });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authorizationMidd = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { role: userRole } = req.user;
  if (!role.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
