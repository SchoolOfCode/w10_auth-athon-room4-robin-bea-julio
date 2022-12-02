import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Form from "./Form";
import Contacts from "./Contacts";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            
            {/* this give me the object of the user <pre>{JSON.stringify(user, null, 2)}</pre> */}
             
          </div>
          <button>Call API</button>
          <button>Call Protect API Route</button>
          <Form />
          <Contacts />
        </>
      )}
    </div>
  );
};

export default Profile;
