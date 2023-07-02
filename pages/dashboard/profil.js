import { NativeSelect, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { TextField } from "@mui/material";
import { TableRow } from "@mui/material";
import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import NumberFormat from "react-number-format";
import Sidebar from "../../components/sidebar";
import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "@mui/material";
import { server } from "../../lib/server";
import { ClickAction } from "../../lib/click";

const fontFamily = "Poppins";
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      prefix="+62 "
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Profil() {
  const [lsitProvinsi, setListProvinsi] = React.useState([]);
  const [listKabupaten, setListKabupaten] = React.useState([]);
  const [Kabupaten, setKabupaten] = React.useState("");

  const [data, setData] = React.useState({});
  const [rePassword, setRepassword] = React.useState("");
  const [phone, setPhone] = React.useState({});

  const handlePhone = (event) => {
    setPhone({
      ...phone,
      [event.target.name]: event.target.value,
    });
  };

  const handleProvinsi = (event) => {
    setData({ provinsi: event.target.value });
    axios
      .get(
        `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${data.provinsi}`
      )
      .then((res) => setListKabupaten(res.data.kota_kabupaten));
  };

  const [time, setTime] = React.useState(0);

  const handleClick = (button) => {
    ClickAction(button, time, window.localStorage.getItem("username"));
    setTime(0);
  };

  React.useEffect(() => {
    window.addEventListener("click", handleClick);

    const email = localStorage.getItem("emailLogin");
    const token = localStorage.getItem("token");

    axios
      .get(`${server}/user/${email}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.user);
        setPhone({ ...phone, nohp: res.data.user.nohp });

        axios
          .get(
            `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${res.data.user.provinsi}`
          )
          .then((resp) => {
            setListKabupaten(resp.data.kota_kabupaten);

            var kot = resp.data.kota_kabupaten.filter(
              (val) => val.id === res.data.user.kota
            );
            setKabupaten(kot[0].nama);
          });
      });

    axios
      .get("http://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => setListProvinsi(res.data.provinsi));

    let interval = setInterval(() => {
      setTime((time) => (time += 1));
    }, 1000);
    () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>MooCare-Profil</title>
      </Head>

      <Sidebar
        click={handleClick}
        nama={`${data.nama_depan} ${data.nama_belakang}`}
        kota={Kabupaten}
      />

      <Box component="main" sx={{ flexGrow: 1, background: "#FFFFFF", p: 5 }}>
        <Toolbar />

        <Typography
          variant="h5"
          component="span"
          sx={{ fontFamily, color: "black", mb: 2 }}
        >
          Profil
        </Typography>

        <Box
          width={200}
          height={200}
          sx={{
            borderRadius: 100,
            border: "1px solid black",
            p: 1,
            mx: "auto",
            mb: 3,
          }}
        >
          <Image
            src="/foto.png"
            width={200}
            height={200}
            style={{ borderRadius: 100 }}
          />
        </Box>

        <form onSubmit={(e) => e.preventDefault()}>
          <Box display="flex" justifyContent="space-evenly">
            <Box>
              <Table sx={{ width: 450 }}>
                <TableRow sx={{ border: 2, borderColor: "white" }}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Nama Depan
                    </Typography>

                    <TextField
                      name="nama_depan"
                      value={data.nama_depan}
                      onChange={(event) =>
                        setData({ nama_depan: event.targe.value })
                      }
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Nama Belakang
                    </Typography>

                    <TextField
                      name="nama_belakang"
                      value={data.nama_belakang}
                      onChange={(event) =>
                        setData({ nama_belakang: event.targe.value })
                      }
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ border: 2, borderColor: "white" }}>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Email
                    </Typography>

                    <TextField
                      name="email"
                      value={data.email}
                      onChange={(event) =>
                        setData({ email: event.targe.value })
                      }
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ border: 2, borderColor: "white" }}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Password
                    </Typography>

                    <TextField
                      name="password"
                      value={data.password}
                      onChange={(event) =>
                        setData({ password: event.targe.value })
                      }
                      type="password"
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Retype Password
                    </Typography>

                    <TextField
                      name="rePassword"
                      value={rePassword}
                      onChange={(event) => setRepassword(event.targe.value)}
                      type="password"
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ border: 2, borderColor: "white" }}>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Alamat
                    </Typography>

                    <TextField
                      name="alamat"
                      value={data.alamat}
                      onChange={(event) =>
                        setData({ alamat: event.targe.value })
                      }
                      sx={{
                        input: {
                          background: "rgba(0, 0, 0, 0.05)",
                          fontFamily,
                          color: "black",
                        },
                        width: "100%",
                      }}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </Box>

            <Box>
              <Table sx={{ width: 450 }}>
                <TableRow sx={{ border: 2, borderColor: "white" }}>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Nomor Handphone
                    </Typography>

                    <TextField
                      value={phone.nohp}
                      onChange={handlePhone}
                      name="nohp"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      fullWidth
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
                      Provinsi
                    </Typography>

                    <NativeSelect
                      onChange={handleProvinsi}
                      required
                      defaultValue={data.provinsi}
                      value={data.provinsi}
                      sx={{ width: "100%", fontFamily }}
                    >
                      {lsitProvinsi.map((val) => (
                        <option
                          key={val.id}
                          value={val.id}
                          sx={{ fontFamily, color: "black" }}
                        >
                          {val.nama}
                        </option>
                      ))}
                    </NativeSelect>
                  </TableCell>
                </TableRow>

                <TableRow sx={{ border: 3, borderColor: "none" }}>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: "black", fontFamily }}
                    >
                      Kabupaten/Kota
                    </Typography>

                    <NativeSelect
                      required
                      onChange={(event) =>
                        setData({ kota: event.target.value })
                      }
                      defaultValue={data.kota}
                      value={data.kota}
                      sx={{ width: "100%", fontFamily }}
                    >
                      {listKabupaten.map((val) => (
                        <option
                          key={val.id}
                          value={val.id}
                          sx={{ fontFamily, color: "black" }}
                        >
                          {val.nama}
                        </option>
                      ))}
                    </NativeSelect>
                  </TableCell>
                </TableRow>
              </Table>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#040C1F",
                width: 350,
                height: 50,
                fontFamily,
                fontWeight: 600,
                "&:hover": { background: "#5b5b5d" },
              }}
            >
              Simpan Perubahan
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
