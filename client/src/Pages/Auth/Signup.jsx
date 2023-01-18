import React, { useState } from "react";
import { Button, Input, Container, Grid } from "semantic-ui-react";

export default function Signup() {
  const [name, setName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit() {
    await fetch("http://192.168.43.110:9000/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: name,
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

        window.location.replace("/sign-in");
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
            <h2>Register Your Account</h2>
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
              placeholder="Input Your Name..."
              onChange={(e) => setName(e.target.value)}
            />
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
                marginBottom: 30,
              }}
              type="password"
              placeholder="Input Your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
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
            Sign Up
          </button>
        </Grid.Column>
      </Grid>
    </>
  );
}
