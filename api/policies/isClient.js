// isAdmin.js
module.exports = async function (req, res, proceed) {

    // const isUserAdmin = true;

    var user = await User.findOne({ username: req.session.username });

    if (user) {
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};