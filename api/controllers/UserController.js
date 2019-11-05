/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
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

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            sails.log("[Session] ", req.session);

            if (req.wantsJSON){
                return res.json({message: "Login successfully.", url: '/'});    // for ajax request
            };

            return res.ok("Login successfully.");

        });

    },

    // action - logout
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");

        });
    },

    // action - populate
    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("supervises", { id: 9999 });

        // console.log("length", model.supervises.length);

        if (!model) return res.notFound();

        return res.json(model);

    },

    // action - add
    add: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatPerson = await Person.findOne(req.params.fk).populate("worksFor", { id: req.params.id });

        if (!thatPerson) return res.notFound();

        if (thatPerson.worksFor.length)
            return res.status(409).send("Already added.");   // conflict

        await User.addToCollection(req.params.id, "supervises").members(req.params.fk);

        return res.ok('Operation completed.');

    },

    // action - remove
    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatPerson = await Person.findOne(req.params.fk).populate("worksFor", { id: req.params.id });

        if (!thatPerson) return res.notFound();

        if (!thatPerson.worksFor.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.params.id, "supervises").members(req.params.fk);

        return res.ok('Operation completed.');

    },

};

