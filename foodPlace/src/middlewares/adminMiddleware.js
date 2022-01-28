function adminMiddleware(req, res, next) {
	if (req.session.userLogged.Roles_id != 1) {
		return res.redirect('/');
	}
	next();
}

module.exports = adminMiddleware;