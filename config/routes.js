/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'RentalController.index',
  'GET /rental/index': 'RentalController.index',
  'GET /rental/create': 'RentalController.create',
  'POST /rental/create': 'RentalController.create',
  'GET /rental/details/:id': 'RentalController.details',
  'POST /rental/details/:id': 'RentalController.details',
  'GET /rental/update/:id': 'RentalController.update',
  'POST /rental/update/:id': 'RentalController.update',
  'POST /rental/delete/:id': 'RentalController.delete',
  'GET /rental/search': 'RentalController.search',
  'GET /rental/admin': 'RentalController.admin',
  'GET /rental/json': 'RentalController.json',
  'GET /rental/myRental': 'UserController.myRental',
  'GET /rental/occupants/:id': 'RentalController.occupants',

  'POST /rental/': 'RentalController.create',
  'GET /rental/:id': 'RentalController.details',
  'PUT /rental/:id': 'RentalController.update',
  'DELETE /rental/:id': 'RentalController.delete',

  'GET /user/signup': 'UserController.signup',
  'POST /user/signup': 'UserController.signup',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /person/:id/worksFor': 'PersonController.populate',
  'GET /user/:id/supervises': 'UserController.populate',
  'POST /user/:id/supervises/add/:fk': 'UserController.add',
  'POST /user/:id/supervises/remove/:fk': 'UserController.remove',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
