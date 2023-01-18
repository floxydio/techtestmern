import React, { useState, useEffect } from "react";

export default function Header() {
  const [username, setUsername] = useState("");
  const getUsername = localStorage.getItem("username");
  const getId = localStorage.getItem("id_login");
  useEffect(() => {
    setUsername(getUsername);
  }, []);

  async function logoutAccount() {
    await fetch("http://192.168.43.110:9000/api/logout", {
      method: "POST",
      body: JSON.stringify({
        username: getUsername,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        localStorage.clear();
        window.location.replace("/sign-in");
      });
  }

  return (
    <>
      <div className="row__title">
        <span
          style={{
            marginRight: 20,
            fontSize: 18,
          }}
        >
          Hai,{username}
        </span>
        <button
          onClick={() => {
            logoutAccount();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
