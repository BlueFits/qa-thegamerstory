import React, { useState, useEffect } from "react";
import Typography from "../../../components/Typography/Typography";
import { Button } from "@material-ui/core";
import colors from "../../../config/colors";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../services/modules/User/userSlice";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [credErr, setCredErr] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (attempts > 0) {
      if (!user.token) {
        setCredErr(true);
      } else {
        window.location.href="/ffxiv";
      }
    }
  }, [user, attempts]);

  const clickHandler = async () => {
    await dispatch(authUser({ email, password }));
    setAttempts(attempts + 1);
  };

  return (
    <div>
      {credErr && 
          <div className="fixed right-0 top-8">
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCredErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Invalid credentials
              </Alert>
            </Collapse>
          </div>
      }
      <div className="h-screen w-screen bg-black flex justify-center	items-center">
        <div className="flex flex-col justify-center items-center" style={{ width: 900 }}>
          <Typography type="t1" bold>Login</Typography>
            <div className="mb-4 mt-4" style={{ width: "30%" }}>
                <TextField
                  error={credErr}
                  variant="standard"
                  label="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
            </div>
            <div className="mb-4" style={{ width: "30%" }}>
                <TextField
                  error={credErr ? true : false}
                  variant="standard"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  fullWidth
                />
            </div>
          <div className="flex flex-col items-center" style={{ marginTop: 50 }}>
            <Button onClick={clickHandler} variant="contained" color="primary" size="large" style={{ backgroundColor: colors.primary, height: 50, width: 180, borderRadius: 50, marginBottom: 10 }}>Enter</Button>        
            <Button onClick={() => router.push("/auth/register")} variant="contained" color="primary" size="large" style={{ backgroundColor: colors.primary, height: 50, width: 180, borderRadius: 50, marginBottom: 10 }}>Register</Button>        
            <Button onClick={() => router.push("/ffxiv")} size="large" style={{  height: 50, width: 180, borderRadius: 50, color: "#fff" }}>SKIP</Button>     
          </div>   
        </div>
      </div>
    </div>
  )
}