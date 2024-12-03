import React from "react"
import Login from './components/Login';
import Admin from "./components/Admin";
import User from "./components/User";
import './App.css';


export default function App() {
  const[currentUser, setCurrentUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const handleLogin = (user,allUsers) => {
    setCurrentUser(user);
    setUsers(allUsers);
  };

  const handleLogout = () => {
    setCurrentUser(null);
};
const [roles, setRoles] = React.useState([
  { name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { name: "User", permissions: ["Read"] },
]);
  return (
    <div>
      {!currentUser ? (
        <Login onLogin={handleLogin} roles={roles} />
      ) : currentUser.role === "Admin" ? (
        <Admin users={users} setUsers={setUsers}  logout={handleLogout}/>
      ) : (
        <User currentUser={currentUser} logout={handleLogout} />
        
      )}
    </div>
  );
};


