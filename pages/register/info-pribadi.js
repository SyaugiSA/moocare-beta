import {
  ArrowBackIos,
  CheckBox,
  CheckBoxOutlineBlank,
  Google,
} from "@mui/icons-material";
import {
  Container,
  Typography,
  Box,
  Divider,
  Table,
  TableRow,
  TableCell,
  TextField,
  FormControlLabel,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SlideTransition from "../../components/SlideTransition";
import { server } from "../../lib/server";
import { ClickAction } from "../../lib/click";

const fontFamily = "Poppins";
const color1 = "#ffffff";
const color2 = "#EBFF00";

export default function InfoPribadi() {
  const [checked, setChecked] = useState(false);
  const handleChecked = () => setChecked(!checked);

  const [namaDepan, setNamaDepan] = useState(false);
  const [namaBelakang, setNamaBelakang] = useState(false);
  const [email, setEmail] = useState(false);
  const [check, setCheck] = useState(true);
  const [password, setPassword] = useState(false);
  const [rePassword, setRePassword] = useState(false);
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [time, setTime] = useState(0);

  const handleClick = (button) => {
    ClickAction(button, time, window.localStorage.getItem("username"));
    setTime(0);
  };

  const CheckedIcon = () => {
    const check = <CheckBox sx={{ fill: "black" }} />;
    const unCheck = <CheckBoxOutlineBlank sx={{ fill: "black" }} />;

    return checked ? check : unCheck;
  };

  const handleClose = () => setSnack(false);

  const formik = useFormik({
    initialValues: {
      nama_depan: "",
      nama_belakang: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate: (val) => {
      const err = {};
      !val.nama_depan ? setNamaDepan(true) : setNamaDepan(false);
      !val.nama_belakang ? setNamaBelakang(true) : setNamaBelakang(false);
      !val.email ? setEmail(true) : setEmail(false);
      !val.password ? setPassword(true) : setPassword(false);
      !val.rePassword ? setRePassword(true) : setRePassword(false);
      val.rePassword !== val.password
        ? setRePassword(true)
        : setRePassword(false);
      return err;
    },
    onSubmit: (val) => {
      localStorage.setItem("register", JSON.stringify(val));
      router.push("domisili");
    },
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setTime((time) => (time += 1));
    }, 1000);
    () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>MooCare-Register</title>
      </Head>

      <Box sx={{ background: "white" }}>
        <Box sx={{ display: { md: "block", xs: "none" } }}>
          <Image src="/register.png" alt="Sapi" width={650} height={975} />
        </Box>

        <Container>
          <Box
            sx={{
              position: { md: "absolute", xs: "relative" },
              top: 0,
              width: { md: "83%", xs: "100%" },
              mb: 6,
              background: { xs: "white", md: "none" },
            }}
          >
            <Box sx={{ background: { xs: "#040c1f", md: "none" } }}>
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

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ float: "right", width: { md: "50%", xs: "100%" }, mb: 10 }}
            >
              <Box sx={{ opacity: 0.5 }}>
                <ArrowBackIos fontSize="10" sx={{ fill: "black" }} />
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontFamily, color: "black" }}
                >
                  Kembali
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontFamily, color: "black" }}
                >
                  Langkah 1/2
                </Typography>

                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontFamily, color: "black" }}
                >
                  Info Pribadi
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                background: "linear-gradient(#000000, rgba(0,0,0,0))",
                width: "100%",
                position: "relative",
                top: 70,
                my: 2,
              }}
            />

            <Box display="flex" width="100%">
              <Box
                width="50%"
                sx={{ display: { md: "block", xs: "none" } }}
              ></Box>
              <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ color: "black", fontFamily, mb: 2 }}
                >
                  Daftarkan akun Anda
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "black", fontFamily, mb: 5 }}
                >
                  Untuk regulasi kami, harap isi data dibawah
                </Typography>

                {message != "" ? (
                  <Snackbar
                    open={snack}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    TransitionComponent={SlideTransition}
                  >
                    <Alert
                      severity={!check ? "error" : "success"}
                      variant="filled"
                    >
                      <Typography sx={{ fontFamily, fontWeight: 600 }}>
                        {message}
                      </Typography>
                    </Alert>
                  </Snackbar>
                ) : (
                  ""
                )}

                <form onSubmit={formik.handleSubmit}>
                  <Table>
                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ color: "black", fontFamily }}
                        >
                          Nama Depan*
                        </Typography>

                        <TextField
                          onChange={formik.handleChange}
                          value={formik.values.nama_depan}
                          autoFocus
                          name="nama_depan"
                          required
                          error={namaDepan}
                          sx={{
                            width: "100%",
                            input: { background: "rgba(0,0,0,0.05)" },
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ color: "black", fontFamily }}
                        >
                          Nama Belakang*
                        </Typography>

                        <TextField
                          onChange={formik.handleChange}
                          value={formik.values.nama_belakang}
                          name="nama_belakang"
                          required
                          error={namaBelakang}
                          sx={{
                            width: "100%",
                            input: { background: "rgba(0,0,0,0.05)" },
                          }}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell colSpan={2}>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ color: "black", fontFamily }}
                        >
                          Email*
                        </Typography>

                        <TextField
                          required
                          error={email}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          type="email"
                          name="email"
                          onBlur={() =>
                            axios
                              .post(`${server}/auth/email-check`, {
                                email: formik.values.email,
                              })
                              .then((res) => {
                                setMessage(res.data.message);
                                setCheck(true);
                                setSnack(true);
                              })
                              .catch((err) => {
                                var msg = err.response?.data.message;
                                setMessage(msg);
                                setCheck(false);
                                setSnack(true);
                              })
                          }
                          sx={{
                            width: "100%",
                            input: { background: "rgba(0,0,0,0.05)" },
                          }}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ color: "black", fontFamily }}
                        >
                          Password*
                        </Typography>
                        <TextField
                          required
                          type="password"
                          error={password}
                          sx={{
                            width: "100%",
                            input: { background: "rgba(0,0,0,0.05)" },
                          }}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          name="password"
                        />
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ color: "black", fontFamily }}
                        >
                          Re-type Password*
                        </Typography>
                        <TextField
                          required
                          type="password"
                          error={rePassword}
                          name="rePassword"
                          sx={{
                            width: "100%",
                            input: { background: "rgba(0,0,0,0.05)" },
                          }}
                          onChange={formik.handleChange}
                          value={formik.values.rePassword}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell colSpan={2}>
                        <FormControlLabel
                          xs={{ background: "black" }}
                          label={
                            <Typography sx={{ color: "black", fontFamily }}>
                              Saya setuju dengan syarat dan ketentuan
                            </Typography>
                          }
                          control={<CheckedIcon />}
                          onClick={() => {
                            handleChecked();
                            handleClick("checkbox");
                          }}
                          sx={{
                            opacity: 0.7,
                            fontFamily,
                          }}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell colSpan={2}>
                        <Button
                          disabled={
                            namaDepan ||
                            namaBelakang ||
                            email ||
                            password ||
                            rePassword ||
                            !checked ||
                            !check
                              ? true
                              : false
                          }
                          type="submit"
                          sx={{
                            background:
                              namaDepan ||
                              namaBelakang ||
                              email ||
                              password ||
                              rePassword ||
                              !checked ||
                              !check
                                ? "rgba(0, 0, 0, 0.15)"
                                : "#040C1F",
                            color: "white",
                            fontFamily,
                            width: "100%",
                            "&:hover": { background: "#040C1F" },
                          }}
                          onClick={() => handleClick("tombol daftar")}
                        >
                          Daftar Akun
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell colSpan={2}>
                        <Divider flexItem sx={{ opacity: 0.7 }}>
                          <Typography sx={{ fontFamily, color: "black" }}>
                            Atau
                          </Typography>
                        </Divider>
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ border: 3, borderColor: "none" }}>
                      <TableCell colSpan={2}>
                        <Button
                          disabled
                          startIcon={<Google sx={{ fill: "black" }} />}
                          sx={{ width: "100%", fontFamily, color: "black" }}
                          variant="outlined"
                        >
                          Daftar dengan Google
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Table>
                </form>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
