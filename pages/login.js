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
const color1 = "#ffffff";
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

        <Box width={260} sx={{ mx: "auto" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              component="span"
              sx={{ fontFamily: "Poppins" }}
            >
              <b>Saatnya</b>
            </Typography>

            <svg
              style={{ position: "relative", top: 18, width: 140 }}
              width="154"
              height="3"
              viewBox="0 0 154 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.99829"
                y1="1.5"
                x2="152.002"
                y2="1.5"
                stroke="url(#paint0_linear_211_3692)"
                strokeWidth="2"
                strokeLinecap="square"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_211_3692"
                  x1="76.9999"
                  y1="2.50042"
                  x2="192.5"
                  y2="3.00042"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#CCDB23" />
                  <stop offset="1" stopColor="#CCDB23" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              component="span"
              sx={{ fontFamily, color: color1 }}
            >
              <b>beralih</b>
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{
                fontFamily,
                color: "black",
                backgroundColor: color2,
                borderRadius: 1,
                px: 1,
              }}
            >
              ke teknologi
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          component="div"
          sx={{
            textAlign: "center",
            fontFamily,
            width: { md: 700, xs: 380 },
            mx: "auto",
            my: 3,
            opacity: 0.7,
          }}
        >
          MooCare adalah platform monitor kesehatan sapi untuk semua peternak
          sapi di Indonesia. Kami adalah solusi digital untuk anda
        </Typography>

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

            <Divider flexItem sx={{ color: color1, opacity: 0.7 }}>
              Atau
            </Divider>

            <Button
              disabled
              type="button"
              href="/login/google"
              startIcon={<GoogleIcon sx={{ fill: color2 }} />}
              sx={{
                border: 1,
                borderColor: color2,
                borderRadius: 1,
                fontFamily,
                width: "100%",
                my: 2,
                mb: 4,
                color: color2,
              }}
            >
              Masuk dengan Google
            </Button>

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

        <Box
          sx={{
            display: { md: "block", xs: "none" },
            position: "absolute",
            top: 75,
            right: 100,
          }}
        >
          <svg
            width="190"
            height="223"
            viewBox="0 0 223 223"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="214.978"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 214.978 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 185.326 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="7.41305"
              r="7.41304"
              transform="rotate(-180 214.978 7.41305)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="7.41305"
              r="7.41304"
              transform="rotate(-180 185.326 7.41305)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="214.978"
              r="7.41304"
              transform="rotate(-180 214.978 214.978)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="214.978"
              r="7.41304"
              transform="rotate(-180 185.326 214.978)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="185.326"
              r="7.41304"
              transform="rotate(-180 214.978 185.326)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="185.326"
              r="7.41304"
              transform="rotate(-180 185.326 185.326)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="155.674"
              r="7.41304"
              transform="rotate(-180 214.978 155.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="155.674"
              r="7.41304"
              transform="rotate(-180 185.326 155.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="126.022"
              r="7.41304"
              transform="rotate(-180 214.978 126.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="126.022"
              r="7.41304"
              transform="rotate(-180 185.326 126.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="96.3696"
              r="7.41304"
              transform="rotate(-180 214.978 96.3696)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="96.3696"
              r="7.41304"
              transform="rotate(-180 185.326 96.3696)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="214.978"
              cy="66.7174"
              r="7.41304"
              transform="rotate(-180 214.978 66.7174)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="185.326"
              cy="66.7174"
              r="7.41304"
              transform="rotate(-180 185.326 66.7174)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="155.674"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 155.674 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="126.022"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 126.022 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="96.3694"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 96.3694 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="66.7173"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 66.7173 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.0652"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 37.0652 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.41288"
              cy="37.0652"
              r="7.41304"
              transform="rotate(-180 7.41288 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="155.674"
              cy="7.41307"
              r="7.41304"
              transform="rotate(-180 155.674 7.41307)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="126.022"
              cy="7.41306"
              r="7.41304"
              transform="rotate(-180 126.022 7.41306)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="96.3694"
              cy="7.41306"
              r="7.41304"
              transform="rotate(-180 96.3694 7.41306)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="66.7173"
              cy="7.41306"
              r="7.41304"
              transform="rotate(-180 66.7173 7.41306)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.0652"
              cy="7.41306"
              r="7.41304"
              transform="rotate(-180 37.0652 7.41306)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.41288"
              cy="7.41306"
              r="7.41304"
              transform="rotate(-180 7.41288 7.41306)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
          </svg>
        </Box>

        <Box
          sx={{
            display: { md: "block", xs: "none" },
            position: "absolute",
            top: 190,
          }}
        >
          <svg
            width="35"
            height="401"
            viewBox="0 0 45 401"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 185.326)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 185.326)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 214.978)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 214.978)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 7.41304)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 7.41304)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 37.0652)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 66.7174)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 66.7174)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 96.3696)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 96.3696)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 126.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 126.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 37.0651 155.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              r="7.41304"
              transform="matrix(-1 0 0 1 7.41288 155.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="392.674"
              r="7.41304"
              transform="rotate(-90 7.49996 392.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="363.022"
              r="7.41304"
              transform="rotate(-90 7.49996 363.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="333.37"
              r="7.41304"
              transform="rotate(-90 7.49996 333.37)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="303.717"
              r="7.41304"
              transform="rotate(-90 7.49996 303.717)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="274.065"
              r="7.41304"
              transform="rotate(-90 7.49996 274.065)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="7.49996"
              cy="244.413"
              r="7.41304"
              transform="rotate(-90 7.49996 244.413)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="392.674"
              r="7.41304"
              transform="rotate(-90 37.1521 392.674)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="363.022"
              r="7.41304"
              transform="rotate(-90 37.1521 363.022)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="333.37"
              r="7.41304"
              transform="rotate(-90 37.1521 333.37)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="303.717"
              r="7.41304"
              transform="rotate(-90 37.1521 303.717)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="274.065"
              r="7.41304"
              transform="rotate(-90 37.1521 274.065)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
            <circle
              cx="37.1521"
              cy="244.413"
              r="7.41304"
              transform="rotate(-90 37.1521 244.413)"
              fill="#FAFF00"
              fillOpacity="0.2"
            />
          </svg>
        </Box>
      </Container>
    </>
  );
}
