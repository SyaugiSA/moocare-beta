import * as React from "react";
import Sidebar from "../../components/sidebar";
import {
  Table,
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  Toolbar,
  Box,
  ListItemIcon,
  Divider,
  ListItemText,
  styled,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import Image from "next/image";
import { Add, ArrowForwardIos, BorderColor, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { server } from "./../../lib/server";
import { ClickAction } from "../../lib/click";

const fontFamily = "Poppins";

export default function PermanentDrawerLeft() {
  const router = useRouter();
  const [data, setData] = React.useState({});
  const [jenisKelamin, setJenisKelamin] = React.useState("");
  const onJenisKelamin = (e) => setJenisKelamin(e.target.value);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [nama, setNama] = React.useState("");

  const [tipe, setTipe] = React.useState("");
  const onTipe = (e) => setTipe(e.target.value);

  const [kabupaten, setKabupaten] = React.useState("");

  const [time, setTime] = React.useState(0);
  const [show, setShow] = React.useState({
    nama: "",
    heartRate: { hr: 10, status: "" },
    id: 0,
    user: "",
  });
  const [deviceList, setDeviceList] = React.useState([]);

  const handleClick = (button) => {
    ClickAction(button, time, window.localStorage.getItem("username"));
    setTime(0);
  };

  const getDevice = () =>
    axios
      .get(`${server}/device`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setDeviceList(res.data.devices);
      });

  React.useEffect(() => {
    const email = localStorage.getItem("mailLogin");
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    axios
      .get(`${server}/user/${email}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.user);

        axios
          .get(
            `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${res.data.user.provinsi}`
          )
          .then((resp) => {
            var kot = resp.data.kota_kabupaten.filter(
              (val) => val.id === res.data.user.kota
            );
            setKabupaten(kot[0].nama);
          });
      });

    getDevice();

    let interval = setInterval(() => {
      setTime((time) => (time += 1));
    }, 1000);
    () => clearInterval(interval);
  }, []);

  const SubjectField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      background: "rgba(0, 0, 0, 0.05)",
      height: 40,
      width: 200,
      fontFamily,
    },
  });

  const Field = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      height: 40,
      width: 200,
      fontFamily,
    },
  });

  const addDevice = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/device`,
        { nama },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        getDevice();
        handleClick("tombol save");
        return setModalAdd(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>MooCare-Dashboard</title>
      </Head>

      <Modal open={modalAdd} onClose={() => setModalAdd(false)}>
        <Box
          width={400}
          height={240}
          sx={{ background: "white", mx: "auto", p: 3 }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontFamily, fontWeight: 500, color: "black", mb: 3 }}
          >
            Add Device
          </Typography>

          <form onSubmit={(e) => addDevice(e)}>
            <TextField
              name="nama"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <br />
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      <IconButton
        onClick={() => {
          setModalAdd(true);
          handleClick("ikon tambah");
        }}
        sx={{ position: "fixed", background: "#040c1f", bottom: 30, right: 30 }}
      >
        <Add fontSize="large" />
      </IconButton>

      <Sidebar
        click={handleClick}
        nama={`${data.nama_depan} ${data.nama_belakang}`}
        kota={kabupaten}
      />

      <Box component="main" sx={{ flexGrow: 1, background: "#FFFFFF", p: 5 }}>
        <Toolbar />

        <Box>
          <Typography
            component="span"
            variant="h5"
            sx={{ fontFamily, color: "black", mb: 2 }}
          >
            Dashboard
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  mb: 8,
                  mt: 4,
                  border: "3px solid rgba(0, 49, 165, 0.2)",
                  p: 3,
                }}
                width={600}
              >
                <Box>
                  <Image
                    width={150}
                    height={150}
                    src="/sapi.png"
                    style={{ borderRadius: 100 }}
                  />
                </Box>

                <Box>
                  <form>
                    <Table>
                      <TableRow sx={{ border: 3, borderColor: "white" }}>
                        <TableCell>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ color: "black", fontFamily, mb: 1 }}
                          >
                            Subject
                          </Typography>

                          <SubjectField disabled />
                        </TableCell>

                        <TableCell>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ color: "black", fontFamily, mb: 1 }}
                          >
                            Kode Device
                          </Typography>

                          <Field />
                        </TableCell>
                      </TableRow>

                      <TableRow sx={{ border: 3, borderColor: "white" }}>
                        <TableCell>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ color: "black", fontFamily, mb: 1 }}
                          >
                            Jenis Kelamin
                          </Typography>

                          <Select
                            onChange={onJenisKelamin}
                            value={jenisKelamin}
                            sx={{
                              fontFamily,
                              width: 200,
                              height: 40,
                            }}
                          >
                            <MenuItem
                              value="jantan"
                              sx={{
                                fontFamily,
                                color: "black",
                                height: 40,
                                width: 200,
                              }}
                            >
                              Jantan
                            </MenuItem>
                            <MenuItem
                              value="betina"
                              sx={{
                                fontFamily,
                                color: "black",
                                height: 40,
                                width: 200,
                              }}
                            >
                              Betina
                            </MenuItem>
                          </Select>
                        </TableCell>

                        <TableCell>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ color: "black", fontFamily, mb: 1 }}
                          >
                            Tipe
                          </Typography>

                          <Select
                            onChange={onTipe}
                            value={tipe}
                            sx={{
                              fontFamily,
                              width: 200,
                              height: 40,
                            }}
                          >
                            <MenuItem
                              value="pedaging"
                              sx={{
                                fontFamily,
                                color: "black",
                                height: 40,
                                width: 200,
                              }}
                            >
                              Pedaging
                            </MenuItem>
                            <MenuItem
                              value="perah"
                              sx={{
                                fontFamily,
                                color: "black",
                                height: 40,
                                width: 200,
                              }}
                            >
                              Perah
                            </MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2}>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              onClick={() => handleClick("tombol update")}
                              variant="contained"
                              sx={{
                                background: "#040C1F",
                                width: 159,
                                height: 30,
                                "&:hover": { background: "#5b5b5d" },
                              }}
                            >
                              Update
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </Table>
                  </form>
                </Box>
              </Box>

              <Box
                width={600}
                sx={{ border: "3px solid rgba(0, 49, 165, 0.2)", p: 2 }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontFamily, color: "black", mb: 2 }}
                >
                  Daftar Device
                </Typography>

                {deviceList.map((val, i) => (
                  <Box
                    width={560}
                    display="flex"
                    justifyContent="space-between"
                    key={i}
                  >
                    <Box width={390}>
                      <List>
                        <ListItem
                          sx={{
                            background: "rgba(0, 0, 0, 0.05)",
                            borderRadius: 3,
                            mb: 3,
                          }}
                        >
                          <ListItemIcon>
                            <Image src="/miband.png" height={30} width={30} />
                          </ListItemIcon>

                          <ListItemText sx={{ height: "100%" }}>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                py: 2,
                                width: 0,
                              }}
                            />
                          </ListItemText>

                          <ListItemText>
                            <Typography
                              sx={{ color: "black", fontFamily, mr: 5, ml: 2 }}
                            >
                              {val.nama}
                            </Typography>
                          </ListItemText>

                          <ListItemText sx={{ height: "100%" }}>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                py: 2,
                                width: 0,
                              }}
                            />
                          </ListItemText>

                          <ListItemText
                            onClick={() =>
                              axios
                                .get(`${server}/device/${val.id}`, {
                                  headers: {
                                    authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                })
                                .then((res) => setShow(res.data.device))
                            }
                          >
                            <Typography
                              sx={{
                                color: "black",
                                fontFamily,
                                "&:hover": { cursor: "pointer" },
                              }}
                            >
                              Cek Status
                            </Typography>
                          </ListItemText>

                          <ListItemIcon
                            onClick={() =>
                              axios
                                .get(`${server}/device/${val.id}`, {
                                  headers: {
                                    authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                })
                                .then((res) => setShow(res.data.device))
                            }
                          >
                            <ArrowForwardIos
                              sx={{
                                fill: "black",
                                "&:hover": { cursor: "pointer" },
                              }}
                            />
                          </ListItemIcon>
                        </ListItem>
                      </List>
                    </Box>

                    <Box>
                      <List>
                        <ListItem
                          sx={{
                            background: "rgba(0, 0, 0, 0.05)",
                            borderRadius: 3,
                            mb: 3,
                          }}
                        >
                          <ListItemIcon>
                            <BorderColor
                              sx={{
                                fill: "black",
                                "&:hover": { cursor: "pointer" },
                                mx: "auto",
                              }}
                            />
                          </ListItemIcon>

                          <ListItemText sx={{ height: "100%" }}>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                py: 2,
                                width: 0,
                              }}
                            />
                          </ListItemText>

                          <ListItemIcon>
                            <Delete
                              onClick={() =>
                                axios
                                  .delete(`${server}/device/${val.id}`, {
                                    headers: {
                                      authorization: `Bearer ${localStorage.getItem(
                                        "token"
                                      )}`,
                                    },
                                  })
                                  .then((res) =>
                                    axios
                                      .get(`${server}/device`, {
                                        headers: {
                                          authorization: `Bearer ${token}`,
                                        },
                                      })
                                      .then((res) => {
                                        setDeviceList(res.data.devices);
                                      })
                                  )
                              }
                              sx={{
                                fill: "black",
                                "&:hover": { cursor: "pointer" },
                                mx: "auto",
                              }}
                            />
                          </ListItemIcon>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              width={300}
              height={400}
              sx={{ border: "3px solid rgba(0, 49, 165, 0.2)", mt: 4, p: 3 }}
              display={show.id !== 0 ? "flex" : "none"}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box sx={{ mx: "auto" }}>
                <Image
                  width={100}
                  height={100}
                  src="/sapi.png"
                  style={{ borderRadius: 100 }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{ color: "black", fontFamily, mx: "auto" }}
              >
                {show.nama}
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontFamily, color: "rgba(0, 49, 165, 0.2)", mx: "auto" }}
              >
                {show.heartRate.hr.toFixed()}
              </Typography>

              <Box
                sx={{
                  background:
                    show.heartRate.status === "sehat" ? "green" : "red",
                  mx: "auto",
                  px: 2,
                  py: 1,
                  borderRadius: 5,
                }}
              >
                <Typography sx={{ fontFamily }}>
                  {show.heartRate.status}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
