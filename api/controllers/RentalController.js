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
            return res.view('rental/admin/create');

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

        if (req.wantsJSON) {
            // console.log('wantJson');
            return res.json(models);    // for ajax request

        };
        // console.log('Do not wantJson');
        return res.view('rental/index', { rentals: models });

    },

    // details function
    details: async function (req, res) {
        var model = await Rental.findOne({ 'id': req.params.id });

        if (!model) return res.notFound();

        if (!req.session.username || req.session.username == 'admin') {

            var thatRental = await Rental.findOne({ 'id': req.params.id }).populate('rentedBy');

            var numOfClients = thatRental.rentedBy.length;

            return res.view('rental/details', { rental: model, numOfClients: numOfClients });

        } else {
            // console.log(req.params.id)
            var thatRental = await Rental.findOne({ 'id': req.params.id }).populate('rentedBy');
            var thisUser = await User.findOne({ username: req.session.username }).populate('rentHouseOf', {id: req.params.id});

            var numOfClients = thatRental.rentedBy.length;
            var thisUserId = thisUser.id;
            var isRented = thisUser.rentHouseOf.length;
            // console.log(isRented)
            if (req.wantsJSON) {
                return res.json({

                    rental: model,
                    thisUserId: thisUserId,
                    isRented : isRented,
                    numOfClients: numOfClients
    
                });
            }
            return res.view('rental/details', {

                rental: model,
                thisUserId: thisUserId,
                isRented : isRented,
                numOfClients: numOfClients

            });

        };

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

            return res.view('rental/admin/update', { rental: model });

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

        return res.ok("Rental Deleted.");

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

        return res.view('rental/admin/admin', { rentals: models, count: numOfPage, numOfItemsPerPage: numOfItemsPerPage });
    },

    // searchForApp function
    searchForApp: async function (req, res) {

        const qEstate = req.query.estate || '';
        const qBedrooms = parseInt(req.query.bedrooms);

        // for ajax request
        if (req.wantsJSON) {
            if (isNaN(qBedrooms)) {
    
                var models = await Rental.find({
                    estate: qEstate,
                });
    
            } else {
                if (qBedrooms == 2) {
                    var where = {
                        bedrooms: {'<=': 2}
                    };
                } else {
                    var where = {
                        bedrooms: {'>': 2}
                    };
                }
    
                var models = await Rental.find({
                    where: where,
                });
            };
            
            return res.json(models); // return json

        };

        return res.ok();

    },

    // search function
    search: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0
        const numOfItemsPerPage = 2;
        const qEstate = req.query.estate || '';
        const qBedrooms = parseInt(req.query.bedrooms);
        const qMinArea = parseInt(req.query.minArea) || 0;
        const qMaxArea = parseInt(req.query.maxArea) || 1000;
        const qMinRent = parseInt(req.query.minRent) || 0;
        const qMaxRent = parseInt(req.query.maxRent) || 100000;

        // for normal request
        if (isNaN(qBedrooms)) {
            var where = {
                estate: { contains: qEstate },
                grossArea: { '>=': qMinArea, '<=': qMaxArea },
                rent: { '>=': qMinRent, '<=': qMaxRent },
            };

            var numOfItems = await Rental.count({
                where: where,
            });

            var models = await Rental.find({
                where: where,
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

        } else {
            var where = {
                estate: { contains: qEstate },
                grossArea: { '>=': qMinArea, '<=': qMaxArea },
                rent: { '>=': qMinRent, '<=': qMaxRent },
                bedrooms: qBedrooms,
            };

            var numOfItems = await Rental.count({
                where: where,
            });

            var models = await Rental.find({
                where: where,
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
        };

        var numOfPage = Math.min(Math.ceil(numOfItems / numOfItemsPerPage), 6);

        return res.view('rental/search', { rentals: models, count: numOfPage });

    },

    // occupants: function
    occupants: async function (req, res) {

        var models = await Rental.findOne(req.params.id).populate('rentedBy');

        if (!models) return res.notFound();
        // console.log(models.rentedBy)
        // return res.json(models.rentedBy);
        return res.view('rental/admin/occupants', { rentals: models.rentedBy });
    }


};



