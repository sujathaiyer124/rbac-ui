import React from "react";
export default function User({currentUser,logout}) {
    return (
        <>
         <link rel="stylesheet" href="/Userstyle.css" />
        <div className="user-dashboard">
            <header className="user-header">
                <h1>Welcome, {currentUser.username}</h1>
                <p>
                    Role: <strong>{currentUser.role}</strong> | Status:{""}
                    <span
                    style={{
                        color: currentUser.status === "Active" ? "white" : "red",
                        fontWeight: "bold",
                    }}
                >
                   { currentUser.status}
                    </span>
                </p>
               
            </header>

            <div className="user-details">
                <h2>Your Details</h2>
                <div className="user-info">
                    <p>
                        <strong>Username:</strong> {currentUser.username}
                    </p>
                    <p>
                        <strong>Role:</strong> {currentUser.role}
                    </p>
                    <p>
                        <strong>Status:</strong> {currentUser.status}
                    </p>
                </div>
            </div>

            <div className="user-permissions">
                <h2>Your Permissions</h2>
                {currentUser.permissions && currentUser.permissions?.length >0 ? (
                    <ul>
                        {currentUser.permissions.map((perm, index) => (
                            <li key={index}>{perm}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No permissions assigned.</p>
                )}
            </div>

           
            <button onClick={logout} className="logout-btn">
                    Logout
                </button>
        </div>
        </>
    );
}