const superAdminOrAdmin = role => {
    return role === "super_admin" || role === "admin";
}

const managerOrAdmin = role => {
    return role === "manager" || role === "admin";
}

const artistOrAdmin = role => {
    return role === "artist" || role === "admin";
}

const superAdminOrManager = role => {
    return role === "super_admin" || role === "manager";
}

export { superAdminOrAdmin, managerOrAdmin, artistOrAdmin, superAdminOrManager }