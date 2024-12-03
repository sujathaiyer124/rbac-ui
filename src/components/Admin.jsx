import React from "react";
export default function Admin({ users, setUsers,logout }) {

    const [newUser, setNewUser] = React.useState({ username: "", role: "Admin", status: "Active" });
    const [editUserId, setEditUserId] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState("user-management"); // Track the active tab
    const [roles, setRoles] = React.useState([
        { name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { name: "User", permissions: ["Read"] },
    ]);
    const addOrEditUser = () => {
        if (editUserId) {
            // Edit user
            setUsers(users.map((user) => (user.id === editUserId ? { ...user, ...newUser } : user)));
            setEditUserId(null);
        } else {
            // Add user
            if (newUser.username && newUser.role) {
                setUsers([...users, { ...newUser, id: users.length + 1, isDefault: false }]);
            } else {
                alert("Please enter username and role.");
            }
        }
        setNewUser({ username: "", role: "Admin", status: "Active" });
    };


    const startEditing = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        if (userToEdit) {
            setNewUser({ username: userToEdit.username, role: userToEdit.role, status: userToEdit.status });
            setEditUserId(id);
        }
    };



    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id || user.isDefault))
    }
    const toggleStatus = (id) => {
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
            )
        );
    };
    const togglePermission = (roleName, permission) => {
        setRoles(
            roles.map((role) =>
                role.name === roleName
                    ? {
                        ...role,
                        permissions: role.permissions.includes(permission)
                            ? role.permissions.filter((perm) => perm !== permission)
                            : [...role.permissions, permission],
                    }
                    : role
            )
        );
    };


    return (
        <>
            <link rel="stylesheet" href="/Adminstyle.css" />

            <div className="navbar">
                <nav>
                    <ul className="menu">
                        <li
                            className={activeTab === "user-management" ? "active" : ""}
                            onClick={() => setActiveTab("user-management")}
                        >
                            User Management
                        </li>
                        <li
                            className={activeTab === "role-management" ? "active" : ""}
                            onClick={() => setActiveTab("role-management")}
                        >
                            Role Management
                        </li>
                        <li
                            className={activeTab === "dynamic-permissions" ? "active" : ""}
                            onClick={() => setActiveTab("dynamic-permissions")}
                        >
                            Dynamic Permissions
                        </li>
                         <li><button onClick={logout} className="logout-btn">
                    Logout
                </button></li>
                    </ul>
                </nav>
                <div className="container">
                    {activeTab === "user-management" && (
                        <div id="manage-users" className="manage-users">
                            <h2>Manage Users</h2>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Status</th>

                                </tr>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>

                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            {!user.isDefault && <button onClick={() => startEditing(user.id)} >Edit</button>}
                                            {!user.isDefault && <button onClick={() => deleteUser(user.id)}>Delete
                                            </button>}
                                        {!user.isDefault && <button onClick={() => toggleStatus(user.id)}
                                            className="btn btn-primary">
                                            {user.status === "Active" ? "Deactivate" : "Activate"}</button>}
                                            </td>
                                    </tr>
                                ))}
                            </table>
                            <div id="add-user" className="addedit-user">
                                <h3>{editUserId ? "Edit User" : "Add New User"}</h3>
                                <label htmlFor="userName">User Name</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    style={{ marginRight: "10px" }}
                                />
                                <label htmlFor="userName">Select Role</label>

                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} >
                                    {roles.map((role) => (
                                        <option key={role.name} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={addOrEditUser}>{editUserId ? "Save Changes" : "Add User"}</button>

                            </div>
                        </div>

                    )}
                    {activeTab === "role-management" && (
                        <div>
                            <h2>Role Management</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Permissions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => (
                                        <tr key={role.name}>
                                            <td>{role.name}</td>
                                            <td>{role.permissions.join(", ")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "dynamic-permissions" && (
                        <div>
                            <h2>Dynamic Permissions</h2>
                            {roles.map((role) => (
                                <div key={role.name}>
                                    <h3>{role.name}</h3>
                                    {["Read", "Write", "Delete"].map((perm) => (
                                        <label key={perm}>
                                            <input
                                                type="checkbox"
                                                checked={role.permissions.includes(perm)}
                                                onChange={() => togglePermission(role.name, perm)}
                                            />
                                            {perm}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
            </div>
        </>
    );
}
