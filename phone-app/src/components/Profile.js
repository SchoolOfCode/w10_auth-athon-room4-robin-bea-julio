import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LoginButton from "./Login";
import LogoutButton from "./LogOut";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  function callApi() {
    axios
      .get("http://localhost:4000/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      // console.log(token);
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user);
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

            {/* this give me the object of the user  */}
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
          <button onClick={callApi}>Call API</button>
          <button onClick={callProtectedApi}>Call Protected API</button>
        </>
      )}
    </div>
  );
};

export default Profile;
