export const allFeatuers = {
    create:"create",
    read:"read",
    update:"update",
    delete:"delete",    
}

const RoleBasedPermissions = [];
RoleBasedPermissions['admin'] = ["all"];
RoleBasedPermissions['viewer'] = ["read"];
RoleBasedPermissions['contributor'] = ["read", "update"];

export class Auth {

    static hasAccess(role, feature) {
        let access = false;
        if (RoleBasedPermissions[role] !== undefined) {
            if (RoleBasedPermissions[role].indexOf("all") > -1) {
                return true; // admin has all the access
            } else if (RoleBasedPermissions[role].indexOf(feature) > -1) {
                return true;
            }
        }
        return access;
    }
}