import React, { useReducer, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Typography from "../../../components/Typography/Typography";
import colors from "../../../config/colors";
import { serverURL } from "../../../config/Server";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authUser } from "../../../services/modules/User/userSlice";

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const registerButtonHandler = async () => {
        if (password === repassword) {
            const response = await fetch(serverURL + "/api/user/add", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: "",
                    lastName: "",
                    email,
                    password,
                    hub: "ffxiv",
                }),
            })
            const responseData = await response.json();
            if (!response.ok) {
                alert(responseData.error);
            } else {
                dispatch(authUser({ email, password }));
                alert("Welcome " + responseData.email);
                router.push("/" + responseData.hub[0]);
            }
        } else {
            alert("Passwords not the same");
        }
    };

    return (
        <div className=" flex flex-col justify-center items-center w-screen h-screen bg-black">
            <div className="flex flex-col justify-center items-center" style={{ width: 900 }}>
                <Typography>Register</Typography>
                <div className="mb-4 mt-4" style={{ width: "30%" }}>
                    <TextField
                        // error={credErr}
                        variant="standard"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="mb-4 mt-4" style={{ width: "30%" }}>
                    <TextField
                        // error={credErr}
                        variant="standard"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="mb-12 mt-4" style={{ width: "30%" }}>
                    <TextField
                        // error={credErr}
                        variant="standard"
                        label="Confirm password"
                        type="password"
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        fullWidth
                    />
                </div>
                <Button onClick={registerButtonHandler} variant="contained" color="primary" size="large" style={{ backgroundColor: colors.primary, height: 50, width: 180, borderRadius: 50, marginBottom: 10 }}>Register</Button>        
            </div>
        </div>
    );
};

export default Index;