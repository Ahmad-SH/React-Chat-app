import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";


const initialState ={
    PasswordError:'',
    formError:'',
    emailInput:'',
    passwordInput:'',
    passwordConfInput:''
}
const  ReducerFun =(state,action)=>{
    if(action.type === 'email'){
        return {
            PasswordError:false,
            formError:false,
            emailInput:action.payload,
            passwordInput:state.passwordInput,
            passwordConfInput:state.passwordConfInput
        }
    }
    if(action.type === 'password'){
        return {
            PasswordError:false,
            formError:false,
            emailInput:state.emailInput,
            passwordInput:action.payload,
            passwordConfInput:state.passwordConfInput
        }
    }
    if(action.type === 'passwordConf'){
        return {
            PasswordError:false,
            formError:false,
            emailInput:state.emailInput,
            passwordInput:state.passwordInput,
            passwordConfInput:action.payload
        }
    }
    if(action.type === 'error'){
        return {
            PasswordError:true,
            formError:false,
            emailInput:"",
            passwordInput:"",
            passwordConfInput:""
        }
    }
    if(action.type === 'formError'){
        return {
            PasswordError:false,
            formError:true,
            emailInput:"",
            passwordInput:"",
            passwordConfInput:""
        }
    }
    return initialState
}
const Signup = () => {
  const classes = styles();
  const {signup,currentUser} = useAuth()
   const [state,dispatchFun]= useReducer(ReducerFun,initialState)
const history =useHistory()
   const emailChangeHandler =(e)=>{
       dispatchFun({type:'email',payload:e.target.value})
   }
   const passwordInputHandler =(e)=>{
       dispatchFun({type:'password',payload:e.target.value})
   }
   const passwordConfInputHandler =(e)=>{
       dispatchFun({type:'passwordConf',payload:e.target.value})
   }

   const submitFormHandler=async(e)=>{
       e.preventDefault()
      if(state.passwordInput !== state.passwordConfInput){
          dispatchFun({type:'error'})
          return;
      }
      try {
        await signup(state.emailInput,state.passwordInput)
        history.push('/chat')
      }catch{
          dispatchFun({type:'formError'})
      }

   }
// console.log(currentUser);
  return (
    <div className={classes.form}>
      <form className={classes.formInput} onSubmit={submitFormHandler}>
        <p className={classes.formMain}>Sign up</p>
        {state.PasswordError &&<p>passwords do not match</p>}
        {state.formError &&<p>SignUp Failed!</p>}    
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password Confirmation"
            variant="outlined"
            margin="dense"
            required
            onChange={passwordConfInputHandler}
            value={state.passwordConfInput}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
          style={{ width: "30%" }}
        >
          Sign Up
        </Button>
      </form>
      <Typography className={classes.text} variant="h6">
        Already have an account? <Link to="/signin"> Signin</Link>
      </Typography>
    </div>
  );
};

export default Signup;
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
