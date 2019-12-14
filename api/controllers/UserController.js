/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - signup
    signup: async function (req, res) {
        console.log(0);
        if (req.method == "GET") return res.view('user/signup');
        console.log(1);
        if (!req.body.username || !req.body.password) return res.badRequest();

        const hash = await sails.bcrypt.hash(req.body.password, 10);

        await User.create({
            username: req.body.username,
            password: hash
        });

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            sails.log("[Session] ", req.session);

            if (req.wantsJSON) {
                return res.json({ message: "Signup successfully.", url: '/' });    // for ajax request
            };

            return res.ok("Login successfully.");

        });

    },

    // action - login
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        // if (user.password != req.body.password)
        //     return res.status(401).send("Wrong Password");
        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        var thisUser = await User.findOne({ username: req.body.username })
        
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            sails.log("[Session] ", req.session);

            if (req.wantsJSON) {
                return res.json({ message: "Login successfully.", url: '/', userId: thisUser.id });    // for ajax request
            };

            return res.ok("Login successfully.");

        });

    },

    // action - logout
    logout: async function (req, res) {
        
        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            if (req.wantsJSON) {

                return res.ok();    // for ajax request
    
            };

            return res.redirect('/user/login');

        });
    },

    // action - populate
    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("supervises", { id: 9999 });

        if (!model) return res.notFound();

        return res.json(model);

    },

    // action - add
    add: async function (req, res) {
    
        if (!await User.findOne(req.params.fk)) return res.notFound();

        const thatRental = await Rental.findOne(req.params.id).populate("rentedBy", { id: req.params.fk });

        if (!thatRental) return res.notFound();

        if (thatRental.rentedBy.length) {
            return res.status(409).send("Already added.");   // conflict
        };

        const anotherThatRental = await Rental.findOne(req.params.id).populate("rentedBy");
        var isFull = (anotherThatRental.expectedTenants == anotherThatRental.rentedBy.length);
        // console.log(isFull);
        if (!isFull) {

            await User.addToCollection(req.params.fk, "rentHouseOf").members(req.params.id);

        };

        if (req.wantsJSON) {

            var newUrl = '/user/' + req.params.id + '/rentedBy/remove/' + req.params.fk;
            return res.json({ message: "Co-Rented successfully.", url: newUrl, isFull: isFull });    // for ajax request

        };

        return res.ok('Co-Rented successfully.');

    },

    // action - remove
    remove: async function (req, res) {
     
        if (!await User.findOne(req.params.fk)) return res.notFound();

        const thatRental = await Rental.findOne(req.params.id).populate("rentedBy", { id: req.params.fk });

        if (!thatRental) return res.notFound();

        if (!thatRental.rentedBy.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.params.fk, "rentHouseOf").members(req.params.id);

        if (req.wantsJSON) {
            var newUrl = '/user/' + req.params.id + '/rentedBy/add/' + req.params.fk;
         
            return res.json({ message: "Canceled successfully.", url: newUrl });    // for ajax request
        };

        return res.ok('Canceled successfully.');

    },

    // myRental function
    myRental: async function (req, res) {

        var models = await User.findOne({ username: req.session.username }).populate('rentHouseOf');;

        if (!models) return res.notFound();

        if (req.wantsJSON) {
            console.log(models.rentHouseOf);
            return res.json(models.rentHouseOf);    // for ajax request
        };
    
        return res.view('rental/client/myRental', { rentals: models.rentHouseOf });

    },

};

