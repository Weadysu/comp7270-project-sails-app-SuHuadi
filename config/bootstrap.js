/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await Rental.count() > 0) {
    return;
  }

  await Rental.createEach([
    { "createDate": "10/9/2019", "updateDate": "10/27/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Hmlet_Foo_Ming_1.jpg", "estate": "Festival City", "bedrooms": "2", "grossArea": 800, "expectedTenants": "2", "rent": 15000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/27/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/drive/68bb2a740af71ee7b4588c5b8416f63295c620d8.jpeg", "estate": "City One Shatin", "bedrooms": "2", "grossArea": 250, "expectedTenants": "2", "rent": 28000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/27/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/drive/f84d452a9f142fb0f644c188337e6ca6465849e6.jpeg", "estate": "Festival City", "bedrooms": "2", "grossArea": 150, "expectedTenants": "2", "rent": 12000, "box": "highLighted", },
    { "createDate": "10/9/2019", "updateDate": "10/27/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Thumbnail_1_4T79eYs.jpg", "estate": "Tin Ma Court", "bedrooms": "2", "grossArea": 150, "expectedTenants": "2", "rent": 13000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/15/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/proxy/01_a.jpg", "estate": "Festival City", "bedrooms": "3", "grossArea": 600, "expectedTenants": "2", "rent": 25000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/15/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Thumbnail_1_3CjRdrh.jpg", "estate": "Tin Ma Court", "bedrooms": "4", "grossArea": 900, "expectedTenants": "2", "rent": 23000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/15/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Hmlet_33_Centre_Street_1.jpg", "estate": "Festival City", "bedrooms": "3", "grossArea": 550, "expectedTenants": "2", "rent": 24000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/15/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Thumbnail_1_Zu1YAxb.jpg", "estate": "Tin Ma Court", "bedrooms": "2", "grossArea": 600, "expectedTenants": "3", "rent": 24000, "box": "highLighted" },
    { "createDate": "10/9/2019", "updateDate": "10/15/2019", "propertyTitle": "Description", "imageURL": "https://cdn-hmlet.s3-ap-southeast-1.amazonaws.com/buildings/Thumbnail-_1_uMIU89E.jpg", "estate": "City One Shatin", "bedrooms": "2", "grossArea": 800, "expectedTenants": "2", "rent": 24000, "box": "highLighted" },
  ]);
  
};
