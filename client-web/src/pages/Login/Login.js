// Base imports
import React from "react";

// Project imports
import {
  Container,
  Card,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import palette from "../../consts/palette";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: palette.primary,
    width: "100%",
    height: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    //Flex & placement
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30vh",

    //Size
    width: "30%",
    height: "20vh",

    //Color
    backgroundColor: palette.faded,
  },
  button: {
    backgroundColor: palette.primary,
    marginBottom: "10px",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <Button href="/auth/google" className={classes.button}>
            Login with Google
          </Button>
          <Typography align="center">
            Not yet signed up? Contact us at somethingnew.apps@gmail.com{" "}
          </Typography>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
