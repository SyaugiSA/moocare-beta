import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useState, useEffect } from "react";

const fontFamily = "Poppins";
const color1 = "#ffffff";
const color2 = "#EBFF00";

export default function LupaPassword() {
  const [click, setClick] = useState(1);
  const handleClick = (event) => {
    axios
      .post(`${server}/click`, {
        x: event.pageX,
        y: event.pageY,
        width: innerWidth,
        height: innerHeight,
        click,
        location: window.location.pathname,
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.response?.data));
    return setClick(click + 1);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
  }, []);

  return (
    <Container>
      <Head>
        <title>MooCare-Lupa Password</title>
      </Head>

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
      <Typography
        variant="h5"
        component="div"
        sx={{ fontFamily: "Poppins", textAlign: "center", fontSize: 40 }}
      >
        <b>Lupa password?</b>
      </Typography>
      <Typography
        variant="body2"
        component="div"
        sx={{
          textAlign: "center",
          fontFamily,
          mx: "auto",
          mb: 3,
          opacity: 0.7,
        }}
      >
        Isi email akun anda dibawah
      </Typography>
      <Box sx={{ width: { md: 500, xs: 300 }, mx: "auto", py: 9 }}>
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
          sx={{
            borderColor: color2,
            border: 1,
            width: "100%",
            fontFamily,
            borderRadius: 1,
            input: { color: color1 },
            mb: 2,
          }}
        />

        <Button
          type="submit"
          sx={{
            backgroundColor: color2,
            borderRadius: 1,
            fontFamily,
            color: "black",
            width: "100%",
            my: 2,
            "&:hover": { background: color2 },
          }}
        >
          Masuk
        </Button>
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
  );
}
