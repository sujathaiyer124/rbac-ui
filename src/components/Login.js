import React from "react";
export default function Login({ onLogin }) {

    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const [users,setUsers] = React.useState([
        { username: "admin", password: "admin123", role: "Admin",status: "Inactive" ,isDefault:true},
        { username: "user", password: "user123", role: "User" ,status: "Inactive",isDefault:true},
    ]);
    const [roles, setRoles] = React.useState([
        { name: "Admin", permissions: ["Read", "Write", "Delete"] },
        { name: "User", permissions: ["Read"] },
    ]);
    const handleLogin = () => {
        
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            const rolePermissions = roles.find((r) => r.name === user.role)?.permissions || [];
            const updatedUsers = users.map((u) => 
                u.username === user.username ? {...u,status:"Active" , permissions:rolePermissions} : u
        );
            setUsers(updatedUsers);
            const updatedUser = { ...user, status: "Active" ,permissions:rolePermissions};
            onLogin(updatedUser,updatedUsers);
        } else {
            setError("Invalid username or password.");
        }
    }

    return (
        <>
        <link rel="stylesheet" href="/Login.css" />
        <div className="outer-box">
            <div className="inner-box">
                <header className="login-header">
                    <h2>Login Page</h2>
                </header>
                <main className="login-body">
                    <p>
                        <label htmlFor="userName">User Name</label>
                        <input type="text" id="userName" placeholder="User name" value={username}
                            onChange={(e) => setUserName(e.target.value)} required />
                    </p>

                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholoder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </p>

                    <p>
                        <button type="submit" id= "btn" onClick={handleLogin}>Login</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </p>
                </main>
            </div>


            <div className="circle c1"></div>
            <div className="circle c2"></div>
        </div>
        </>
    );
};
