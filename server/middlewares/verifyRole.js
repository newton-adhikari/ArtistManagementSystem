const verifyRole = (allowedRoles) => (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) next();

    return res.status(400).json({status: "error", message: "Not sufficient permission"});
}

module.exports = verifyRole;