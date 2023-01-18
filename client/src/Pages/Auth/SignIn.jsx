import React, { useState, useEffect } from "react";
import { Button, Input, Container, Grid } from "semantic-ui-react";
export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    await fetch("http://192.168.43.110:9000/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          localStorage.setItem("id_login", data.data._id);
          localStorage.setItem("username", data.data.username);
          window.location.replace("/");
        } else {
          alert("Username or password Incorrect");
        }
      });
  }

  return (
    <>
      <Grid
        style={{
          height: "100vh",
        }}
        padded
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Column>
          <Container
            style={{
              marginBottom: 40,
            }}
          >
            <h2>Sign In Account</h2>
          </Container>
          <Container
            style={{
              marginBottom: 10,
            }}
          >
            <Input
              style={{
                width: "50%",
              }}
              placeholder="Input Your Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </Container>
          <Container>
            <Input
              style={{
                width: "50%",
                marginBottom: 10,
              }}
              type="password"
              placeholder="Input Your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
          <p>
            Dont Have an Account?{" "}
            <span
              onClick={() => {
                window.location.replace("/sign-up");
              }}
              style={{
                cursor: "pointer",
                color: "red",
              }}
            >
              Sign Up
            </span>
          </p>
          <button
            onClick={handleSubmit}
            style={{
              width: "30%",
              height: 40,
              backgroundColor: "red",
              color: "whitesmoke",
              fontSize: 20,
            }}
            color="red"
          >
            Sign In
          </button>
        </Grid.Column>
      </Grid>
    </>
  );
}
