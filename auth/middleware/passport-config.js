const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                return done(null, false, { message: 'Email or password is incorrect' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Email or password is incorrect' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;