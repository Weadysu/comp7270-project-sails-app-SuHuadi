/**
 * RentalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == 'GET')
            return res.view('rental/create');

        if (!req.body.Rental)
            return res.badRequest('Form-data not received.');
        var d = new Date().toLocaleDateString('en-US');

        req.body.Rental.date = d;
        await Rental.create(req.body.Rental);
        // console.log(req.body.Rental)
        return res.ok("Successfully created!");
    },

    // json function
    json: async function (req, res) {

        var rentals = await Rental.find();

        return res.json(rentals);
    },

    // update function
    update: async function (req, res) {
        if (req.method == "GET") {

            var model = await Rental.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('rental/update', { rental: model });

        } else {

            if (!req.body.Rental)
                return res.badRequest("Form-data not received.");

            var models = await Rental.update(req.params.id).set({
                propertyTitle: req.body.Rental.propertyTitle,
                imageURL: req.body.Rental.imageURL,
                estate: req.body.Rental.estate,
                bedrooms: req.body.Rental.bedrooms,
                grossArea: req.body.Rental.grossArea,
                expectedTenants: req.body.Rental.expectedTenants,
                rent: req.body.Rental.rent,
                box: req.body.Rental.box,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },


    // action - index
    index: async function (req, res) {

        var models = await Rental.find({
            where: { 'box': { '!=': 'dummy' } },
            limit: 4,
            sort: 'id DESC'
        })

        return res.view('rental/index', { rentals: models });

    },

    // details function
    details: async function (req, res) {
        var model = await Rental.findOne({ 'id': req.params.id });

        if (!model) return res.notFound();

        return res.view('rental/details', { rental: model });

    },

    // action - delete 
    delete: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Rental.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Person Deleted.");

    },

    // admin function
    admin: async function (req, res) {

        var models = await Rental.find().limit(4);

        return res.view('rental/admin', { rentals: models });

    },

    // action - paginate
    search: async function (req, res) {
        if (req.method == 'GET') {
            const qPage = Math.max(req.query.page - 1, 0) || 0;

            const numOfItemsPerPage = 2;

            var models = await Rental.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

            var numOfPage = Math.ceil(await Rental.count() / numOfItemsPerPage);

            return res.view('rental/search', { rentals: models, count: numOfPage });
        };

        if (req.method == 'POST') {
            const qPage = Math.max(req.query.page - 1, 0) || 0;
            const numOfItemsPerPage = 2;
            var count = Rental.count({
                where: {
                    estate: req.body.estate,
                    bedrooms: req.body.bedrooms,
                    grossArea: { '>=': 100 , '<=': 300 },
                    rent: { '>=': 10000, '<=': 20000 },
                },
            });

            var models = Rental.find({
                where: {
                    estate: req.body.estate,
                    bedrooms: req.body.bedrooms,
                    grossArea: { '>=': 100 , '<=': 300 },
                    rent: { '>=': 10000, '<=': 20000 },
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });


            var numOfPage = Math.ceil(await count / numOfItemsPerPage);

            return res.view('rental/search', { rentals: models, count: numOfPage });
        };

    },
};

