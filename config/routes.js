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

  // routes for Rental api
  '/': 'RentalController.index',
  'GET /rental/index': 'RentalController.index',
  'GET /rental/search': 'RentalController.search',
  'GET /rental/searchForApp': 'RentalController.searchForApp',
  'GET /rental/admin': 'RentalController.admin',
  'GET /rental/json': 'RentalController.json',
  'GET /rental/occupants/:id': 'RentalController.occupants',
  'GET /rental/create': 'RentalController.create',
  'POST /rental/': 'RentalController.create',
  'GET /rental/:id': 'RentalController.details',
  'GET /rental/update/:id': 'RentalController.update',
  'PUT /rental/:id': 'RentalController.update',
  'DELETE /rental/:id': 'RentalController.delete',

  // routes for User api
  'GET /user/signup': 'UserController.signup',
  'POST /user/signup': 'UserController.signup',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'GET /user/myRental': 'UserController.myRental',
  'GET /user/:id': 'UserController.populate',
  'POST /user/:id/rentedBy/add/:fk': 'UserController.add',
  'DELETE /user/:id/rentedBy/remove/:fk': 'UserController.remove',

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
