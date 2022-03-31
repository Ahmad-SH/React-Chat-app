import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const initialState = {
  formError: "",
  emailInput: "",
  passwordInput: "",
};
const ReducerFun = (state, action) => {
  if (action.type === "email") {
    return {
      formError: false,
      emailInput: action.payload,
      passwordInput: state.passwordInput,
    };
  }
  if (action.type === "password") {
    return {
      formError: false,
      emailInput: state.emailInput,
      passwordInput: action.payload,
    };
  }
  if (action.type === "passwordConf") {
    return {
      formError: false,
      emailInput: state.emailInput,
      passwordInput: state.passwordInput,
    };
  }
  if (action.type === "error") {
    return {
      formError: false,
      emailInput: "",
      passwordInput: "",
    };
  }
  if (action.type === "formError") {
    return {
      formError: true,
      emailInput: "",
      passwordInput: "",
    };
  }
  return initialState;
};
const Signin = (props) => {
  const classes = styles();
  const { googleSignIn,newUser,signin, currentUser } = useAuth();

  const history = useHistory()
  const [state, dispatchFun] = useReducer(ReducerFun, initialState);

  const emailChangeHandler = (e) => {
    dispatchFun({ type: "email", payload: e.target.value });
  };
  const passwordInputHandler = (e) => {
    dispatchFun({ type: "password", payload: e.target.value });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      await signin(state.emailInput, state.passwordInput);
      history.push('/chat')
    } catch {
      dispatchFun({ type: "formError" });
    }
  };

  const signinHandler= ()=>{
     googleSignIn()
    history.push('/chat')
  }


  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={submitFormHandler}>
        <p className={classes.formMain}>Sign in</p>
        {state.formError && <p>Signin Failed!</p>}
        <div className={classes.textInput}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="dense"
            required
            onChange={emailChangeHandler}
            value={state.emailInput}
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="dense"
            required
            onChange={passwordInputHandler}
            value={state.passwordInput}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
          style={{ width: "30%" }}
        >
          Sign In
        </Button><br/>
        
      </form>
      <Button
      onClick={signinHandler}
          type="submit"
          variant="outlined"
          className={classes.button}
          style={{ width: "30%" }}
        >
          Sign In with google
        </Button>
      <Typography className={classes.text} variant="h6">
        Doesn't have an account?<Link to="/signup"> Signup</Link>
      </Typography>
    </div>
  );
};

export default Signin;
const styles = makeStyles((theme) => ({
  form: {
    margin: "auto",
    width: "100%",
    textAlign: "center",
  },
  formMain: {
    textAlign: "center",
    color: "#2a57c9",
    fontWeight: "600",
    fontSize: "50px",
    [theme.breakpoints.down("md")]: {
      fontWeight: "600",
      fontSize: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontWeight: "600",
      fontSize: "20px",
    },
  },
  button: {
    ...theme.contactMe,
    marginTop: "2rem",
  },
  formInput: {
    display: "inline-block",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "60%",
    },
  },
  textError: {
    color: "#b80d1b",
    fontSize: "15px",
    textAlign: "left",
  },
  text: {
    marginTop: "2rem",
    fontSize: "15px",
  },
}));
