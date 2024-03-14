import { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [passCodeError, setPassCodeError] = useState(false);

  const passCode = "abc123";

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Reset passCode error when input changes
    setPassCodeError(false);
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const styles = {
    loginContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Password:", password);

    // Check passCode
    if (password !== passCode) {
      setPassCodeError(true);
      return;
    }

    // If passCode is correct, continue with login logic
    // For example, submit the form or navigate to a new page
  };

  return (
    <Container style={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h1" align="center" gutterBottom>
          Ingresa tu nombre y el código de acceso
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Nombre"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Código de Ingreso"
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={passCodeError}
              helperText={passCodeError ? "Código incorrecto" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mensaje para los novios"
              multiline
              variant="outlined"
              fullWidth
              value={message}
              onChange={handleChangeMessage}
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
