import React, { useState, useEffect } from "react";
import Typography from "../components/Typography/Typography";
import LineInput from "../components/LineInput/LineInput";
import { Button } from "@material-ui/core";
import colors from "../config/colors";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  const clickHandler = () => {
    if (text === "sleepingforest") {
      router.push("/ffxiv");
    } else {
      alert("Not today bud");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-screen bg-black flex justify-center	items-center">
        <div className="flex flex-col justify-center items-center" style={{ width: 900 }}>
          <Typography type="t1" bold>Login</Typography>
            <div className="mb-4 mt-4" style={{ width: "30%" }}>
                <TextField
                  variant="standard"
                  label="Username"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  fullWidth
                />
            </div>
            <div className="mb-4" style={{ width: "30%" }}>
                <TextField
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
            <Button onClick={() => router.push("/ffxiv")} size="large" style={{  height: 50, width: 180, borderRadius: 50, color: "#fff" }}>SKIP</Button>     
          </div>   
        </div>
      </div>
    </ThemeProvider>
  )
}