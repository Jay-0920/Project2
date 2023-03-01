const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const User = require('../../models/user');

dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET;

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwtPayload.id } });
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

module.exports = passport;