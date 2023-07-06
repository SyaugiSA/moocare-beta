import React, { useEffect } from "react";
import { ArrowBackIos, ArrowForwardIos, WhatsApp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Head from "next/head";
import axios from "axios";
import { server } from "./../lib/server";
import { ClickAction } from "../lib/click";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const pengembang = [
  {
    image: "/pengembang1.jpg",
    alt: "Pengembang 1",
    nama: "Syaugi Salim Amar",
    posisi: "Full Stack Developer",
    deskripsi:
      "Syaugi merupakan Lead Full Stack Developer yang mengerjakan urusan Front-End dan Back-End aplikasi web ini. Kuliah di Politeknik Negeri Jember dan sedang mengerjakan skripsinya.",
  },
  {
    image: "/pp2.png",
    alt: "Pengembang 2",
    nama: "Ezra Alannathaniel",
    posisi: "UI/UX Designer, Junior Front-End",
    deskripsi:
      "Ezra adalah UI/UX Designer yang mengerjakan desain, dan sebagian Front-End tampilan web ini. Ia sekarang sedang berkuliah di Politeknik Negeri Jember. Sedang mengerjakan skripsinya. Mahasiswa semester akhir, tabah sampai akhir.",
  },
];

export default function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = pengembang.length;
  const [time, setTime] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleClick = (button) => {
    ClickAction(button, time, window.localStorage.getItem("username"));
    setTime(0);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTime((time) => (time += 1));
    }, 1000);
    () => clearInterval(interval);
    // const username = prompt("Masukkan nama anda");
    // window.localStorage.setItem("username", username);
  }, []);

  return (
    <>
      <Head>
        <title>MooCare</title>
      </Head>

      <Navbar action={handleClick} />
      {/* {time} */}
      <Container maxWidth="lg" sx={{ mt: { md: 18, xs: 9 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mx: 4, flexDirection: { md: "row", xs: "column" }, mb: 10 }}
        >
          <Box
            maxWidth={550}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            sx={{ my: 3 }}
          >
            <Box sx={{ my: 3 }}>
              <Typography
                variant="h4"
                component="span"
                sx={{
                  color: "#EBFF00",
                  fontFamily: "Poppins",
                  fontWeight: "Bold",
                  paddingBottom: "50px",
                }}
              >
                Membantu
              </Typography>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontFamily: "Poppins", fontWeight: "Bold" }}
              >
                {" peternak"} monitoring kesehatan sapi
              </Typography>
            </Box>

            <Typography
              component="p"
              variant="caption"
              sx={{
                fontFamily: "Poppins",
                fontSize: { md: 20, xs: 15 },
                color: "rgba(255, 255, 255, 0.8)",
                mb: 3,
              }}
            >
              MooCare memiliki tekad untuk dapat membantu peternak sapi agar
              dapat memahami kondisi peternakan mereka dengan bantuan teknologi.
              Sehingga mereka dapat mengelolanya dengan lebih baik lagi,
              terhidar dari berbagai macam resiko kegagalan beternak serta
              meningkatkan produktivitasnya.
            </Typography>

            <Button
              onClick={() => handleClick("selengkapnya 1")}
              variant="contained"
              endIcon={<ArrowForwardIos sx={{ fill: "black" }} />}
              sx={{
                backgroundColor: "#EAFF00",
                color: "black",
                height: 50,
                width: "max-content",
                fontFamily: "Poppins",
                mb: 3,
                zIndex: 1,
              }}
            >
              Selengkapnya
            </Button>
          </Box>
        </Box>
      </Container>
      <Divider />

      <Divider />
      <Box sx={{ backgroundColor: "white" }}>
        <Container>
          <Box
            display="flex"
            justifyContent="space-around"
            sx={{ flexDirection: { md: "row", xs: "column-reverse" }, py: 6 }}
          >
            <Box
              maxWidth={550}
              display="flex"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Typography
                variant="h4"
                component="span"
                sx={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontWeight: "Bold",
                }}
              >
                Mengapa harus kami?
              </Typography>

              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontFamily: "Poppins",
                  color: "rgba(4, 12, 31, 0.8)",
                  my: 3,
                  fontSize: { md: 20, xs: 15 },
                }}
              >
                Kami peduli dengan keberlangsungan dan kesejahteraan peternak
                sapi di Indonesia. Potensi daging dan susu sapi sangat tinggi di
                Indonesia sehingga dengan bantuan teknologi, kami harap produksi
                dan kualitas daging dan susu sapi meningkat dan menambah daya
                saing peternak sapi Indonesia dalam skala global.
              </Typography>

              <Button
                onClick={() => handleClick("selengkapnya 2")}
                endIcon={<ArrowForwardIos />}
                variant="contained"
                sx={{
                  fontFamily: "Poppins",
                  width: "max-content",
                  backgroundColor: "#0025A9",
                  height: 50,
                }}
              >
                Selengkapnya
              </Button>
            </Box>

            <Image src="/img2.png" alt="computer" width={400} height={400} />
          </Box>
        </Container>
      </Box>

      <Container>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: "Poppins", my: 3, paddingBottom: "20px" }}
          >
            Tim Pengembang
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" justifyContent="center" flexDirection="column">
            <IconButton
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                border: 1,
                borderRadius: "100%",
                height: 50,
                width: 50,
                borderColor: "white",
              }}
            >
              <ArrowBackIos />
            </IconButton>
          </Box>

          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {pengembang.map((step, index) =>
              Math.abs(activeStep - index) <= 2 ? (
                <Box display="flex" justifyContent="center">
                  <Box
                    key={step.nama}
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                      flexDirection: { md: "row", xs: "column" },
                      width: { md: 550, xs: 200 },
                    }}
                  >
                    <Box xs={{ height: "100%" }}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        sx={{
                          border: 2,
                          borderRadius: "100%",
                          bprderColor: "white",
                          height: 200,
                          width: 200,
                        }}
                      >
                        <Image
                          src={step.image}
                          alt={step.nama}
                          width={300}
                          height={300}
                          style={{
                            borderRadius: "100%",
                            border: "solid",
                            padding: "2px",
                          }}
                        />
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-evenly"
                      maxWidth={300}
                      sx={{ height: { md: 300, xs: 400 } }}
                    >
                      <Typography
                        variant="h6"
                        component="span"
                        sx={{ fontFamily: "Poppins", color: "#EBFF00" }}
                      >
                        {step.nama}
                      </Typography>

                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {step.posisi}
                      </Typography>

                      <Typography
                        variant="body1"
                        component="p"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {step.deskripsi}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null
            )}
          </AutoPlaySwipeableViews>

          <Box display="flex" justifyContent="center" flexDirection="column">
            <IconButton
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                border: 1,
                borderRadius: "100%",
                height: 50,
                width: 50,
                borderColor: "white",
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mt: 10, mb: -5 }}>
          <Box display="flex" justifyContent="center">
            <Typography
              variant="h4"
              component="div"
              sx={{ fontFamily: "Poppins", my: 3 }}
            >
              Tertarik?
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => handleClick("hubungi kami")}
              variant="contained"
              startIcon={<WhatsApp sx={{ fill: "black" }} />}
              sx={{
                color: "black",
                fontFamily: "Poppins",
                height: 50,
                backgroundColor: "#EAFF00",
                mb: 4,
              }}
            >
              Hubungi Kami
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
