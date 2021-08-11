import 'tailwindcss/tailwind.css';
import Typography from "../components/Typography/Typography";
import LineInput from "../components/LineInput/LineInput";
import { Button } from "@material-ui/core";
import colors from "../config/colors";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black flex justify-center	items-center">
      <div className="flex flex-col justify-center items-center" style={{ width: 900 }}>
        <Typography type="t1" bold>What is the secret password?</Typography>
        <LineInput />
        <div className="flex flex-col items-center" style={{ marginTop: 50 }}>
          <Button variant="contained" color="primary" size="large" style={{ backgroundColor: colors.primary, height: 50, width: 180, borderRadius: 50, marginBottom: 10 }}>Enter</Button>        
          <Button size="large" style={{  height: 50, width: 180, borderRadius: 50, color: "#fff" }}>I dont know</Button>     
        </div>   
      </div>
    </div>
  )
}