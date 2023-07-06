import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { server } from "./../lib/server";
import SlideTransition from "../components/SlideTransition";
import { ClickAction } from "../lib/click";

const fontFamily = "Poppins";
const color1 = "#fffff";
const color2 = "#EBFF00";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [snack, setSnack] = useState(false);
  const [time, setTime] = useState(0);

  const handleClose = () => setSnack(false);

  const handleClick = (button) => {
    ClickAction(button, time, window.localStorage.getItem("username"));
    setTime(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${server}/auth/login`, { email, password })
      .then((res) => {
        if (checked) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("emailLogin", res.data.email);

        setMessage(res.data.message);
        setSnack(true);

        router.push("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        var msg = err.response?.data.message;
        setMessage(msg);
        setSnack(true);
      });
  };

  useEffect(() => {
    const mail = localStorage.getItem("email");
    if (mail) {
      setEmail(mail);
      setChecked(!checked);
    }

    let interval = setInterval(() => {
      setTime((time) => (time += 1));
    }, 1000);
    () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>MooCare-Login</title>
      </Head>

      <Container>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h3"
            component="span"
            sx={{ fontFamily: "Poppins", color: "#ffffff" }}
          >
            Moo
          </Typography>
          <Typography
            variant="h3"
            component="span"
            sx={{ fontFamily: "Poppins", color: "#EBFF00" }}
          >
            Care
          </Typography>
        </Box>

        <Box sx={{ mx: "auto", width: "max-content" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              component="span"
              sx={{ fontFamily: "Poppins" }}
            >
              <b>Saatnya beralih ke teknologi</b>
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box>
            {message != "" ? (
              <Snackbar
                open={snack}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
              >
                <Alert
                  severity={message == "Login Berhasil" ? "success" : "error"}
                  variant="filled"
                  sx={{ mb: 2 }}
                >
                  <Typography sx={{ fontFamily, fontWeight: 600 }}>
                    {message}
                  </Typography>
                </Alert>
              </Snackbar>
            ) : (
              ""
            )}

            <form onSubmit={handleSubmit}>
              <Typography
                component="div"
                sx={{ opacity: 0.7, fontFamily, width: "auto" }}
              >
                Email
              </Typography>
              <TextField
                required
                type="email"
                autoFocus={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  borderColor: color2,
                  border: 1,
                  width: { md: 500, xs: 300 },
                  fontFamily,
                  borderRadius: 1,
                  input: { color: color1 },
                }}
              />
              <br />
              <br />
              <Typography
                component="div"
                sx={{ opacity: 0.7, fontFamily, width: "auto" }}
              >
                Password
              </Typography>
              <TextField
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  borderColor: color2,
                  border: 1,
                  width: { md: 500, xs: 300 },
                  fontFamily,
                  borderRadius: 1,
                  input: { color: color1 },
                }}
              />
              <br />

              <Box display="flex" justifyContent="space-between">
                <FormControlLabel
                  label={
                    <Typography sx={{ fontFamily }}>ingat saya</Typography>
                  }
                  control={
                    <Checkbox
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                  }
                  sx={{ opacity: 0.7, fontFamily }}
                />

                <Link href="/lupa-password">
                  <Typography
                    sx={{ fontFamily, opacity: 0.7, mt: 1, cursor: "pointer" }}
                  >
                    Lupa password
                  </Typography>
                </Link>
              </Box>
              <br />
              <Button
                onClick={() =>
                  setTimeout(() => handleClick("tombol masuk"), 100)
                }
                type="submit"
                sx={{
                  backgroundColor: color2,
                  borderRadius: 1,
                  fontFamily,
                  color: "black",
                  width: "100%",
                  mb: 2,
                  "&:hover": { background: "#E2FFA0" },
                }}
              >
                Masuk
              </Button>
            </form>

            <Box display="flex" justifyContent="center">
              <Typography component="span" variant="body1">
                {"Belum punya akun?"}
              </Typography>
              <Link
                href="/register/info-pribadi"
                onClick={() => handleClick("tombol register")}
              >
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ cursor: "pointer", ml: 1 }}
                >
                  <b>Daftar Sekarang</b>
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Typography
            component="span"
            sx={{
              opacity: 0.7,
              alignContent: "center",
              fontSize: { md: "12px", xs: "10px" },
              mt: 10,
              mb: 4,
              fontFamily: "Poppins",
            }}
          >
            Copyright@2022 Politeknik Negeri Jember
          </Typography>
        </Box>
      </Container>
    </>
  );
}
