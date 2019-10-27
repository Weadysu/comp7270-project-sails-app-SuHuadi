/**
 * RentalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // create function
    create: async function (req, res) {

        if (req.method == 'GET')
            return res.view('rental/create');

        if (!req.body.Rental)
            return res.badRequest('Form-data not received.');
        var d = new Date().toLocaleDateString('en-US');

        req.body.Rental.createDate = d;
        await Rental.create(req.body.Rental);
        
        return res.ok("Successfully created!");
    },

    // index function
    index: async function (req, res) {

        var models = await Rental.find({
            where: { box: 'highLighted', },
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

            var d = new Date().toLocaleDateString('en-US');
            req.body.Rental.updateDate = d;
            var models = await Rental.update(req.params.id).set({
                propertyTitle: req.body.Rental.propertyTitle,
                imageURL: req.body.Rental.imageURL,
                estate: req.body.Rental.estate,
                bedrooms: req.body.Rental.bedrooms,
                grossArea: req.body.Rental.grossArea,
                expectedTenants: req.body.Rental.expectedTenants,
                rent: req.body.Rental.rent,
                box: req.body.Rental.box,
                updateDate: req.body.Rental.updateDate
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },

    // delete function 
    delete: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await Rental.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Person Deleted.");

    },

    // admin function
    admin: async function (req, res) {
        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 4;

        var models = await Rental.find({
            limit: numOfItemsPerPage,
            skip: numOfItemsPerPage * qPage
        });

        var numOfPage = Math.ceil(await Rental.count() / numOfItemsPerPage);

        return res.view('rental/admin', { rentals: models, count: numOfPage, numOfItemsPerPage: numOfItemsPerPage });
    },

    // search function
    search: async function (req, res) {

        // initial showing, no search
        if (Object.keys(req.query).length === 0 || req.query.initFlag == 1) {
            const qPage = Math.max(req.query.page - 1, 0) || 0;

            const numOfItemsPerPage = 2;

            var models = await Rental.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

            var numOfPage = Math.min(Math.ceil(await Rental.count() / numOfItemsPerPage), 6);
     
            return res.view('rental/search', { rentals: models, count: numOfPage });
        } else {
            //  specific search
            const qPage = Math.max(req.query.page - 1, 0) || 0
            const numOfItemsPerPage = 2;

            if (isNaN(parseInt(req.query.bedrooms))) {

                var models = await Rental.find({
                    where: {
                        estate: { contains: req.query.estate },
                        grossArea: { '>=': (parseInt(req.query.minArea) || 0), '<=': (parseInt(req.query.maxArea) || 1000) },
                        rent: { '>=': (parseInt(req.query.minRent) || 0), '<=': (parseInt(req.query.maxRent) || 1000000) },
                    },
                });
            } else {
                var models = await Rental.find({
                    where: {
                        estate: { contains: req.query.estate },
                        bedrooms: parseInt(req.query.bedrooms),
                        grossArea: { '>=': (parseInt(req.query.minArea) || 0), '<=': (parseInt(req.query.maxArea) || 1000) },
                        rent: { '>=': (parseInt(req.query.minRent) || 0), '<=': (parseInt(req.query.maxRent) || 1000000) },
                    },
                });
            };

            var numOfPage = Math.min(Math.ceil(models.length / numOfItemsPerPage), 6);
            var start = numOfItemsPerPage * qPage;

            return res.view('rental/search', { rentals: models.slice(start, start + 2), count: numOfPage });

        };
    },
};


