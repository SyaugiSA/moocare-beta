import { Search } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { TextField } from "@mui/material";
import { alpha } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { styled } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItem } from "@mui/material";
import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import { AppBar } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { DashboardIcon, ProductIcon, ProfileIcon, SettingsIcon } from "./icon";

const data = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Profil",
    icon: <ProfileIcon />,
    link: "/dashboard/profil",
  },
];
const fontFamily = "Poppins";
const drawerWidth = 268;

const deviceList = [
  { id: 1, tittle: "abc" },
  { id: 2, tittle: "def" },
];

const SearchBar = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <Search sx={{ fill: "black" }} />
        </InputAdornment>
      ),
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: 331,
    height: 44,
    fontFamily,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

export default function Sidebar({ nama, kota, click }) {
  const router = useRouter();

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          borderBottom: "1px solid #EEEEEE",
        }}
      >
        <Toolbar>
          <Autocomplete
            freeSolo
            options={deviceList.map((val) => val.tittle)}
            renderInput={(params) => (
              <SearchBar label="Cari Device" variant="filled" {...params} />
            )}
            sx={{ "& .MuiAutocomplete-option": { color: "black" } }}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "#040C1F",
            background: "#040C1F",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Typography
              variant="h3"
              component="span"
              sx={{ fontFamily: "Poppins", color: "#ffffff", fontWeight: 800 }}
            >
              Moo
            </Typography>
            <Typography
              variant="h3"
              component="span"
              sx={{ fontFamily: "Poppins", color: "#EBFF00", fontWeight: 800 }}
            >
              Care
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        <Toolbar
          sx={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              height={"65px"}
              width={"65px"}
              src="/foto.png"
              style={{
                borderRadius: "65px",
                border: "solid 1px #FFFFFF",
                padding: "2px",
              }}
            />

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ marginTop: "8px" }}
            >
              {nama}
            </Typography>
            <Typography
              noWrap
              component="span"
              sx={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              {kota}
            </Typography>
          </Box>
        </Toolbar>
        <Divider />

        <List sx={{ paddingLeft: "50px", paddingTop: "50px" }}>
          {data.map((item, i) => (
            <ListItem key={i} disablePadding>
              <Link href={item.link}>
                <ListItemButton
                  sx={{ color: "#81858F" }}
                  onClick={() => click(`halaman ${item.title}`)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontFamily }}>{item.title}</Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List sx={{ paddingLeft: "50px", paddingTop: "70px" }}>
          <ListItem
            disablePadding
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("emailLogin");
              router.push("/login");
            }}
          >
            <ListItemButton
              sx={{ color: "#81858F" }}
              onClick={() => click("tombol keluar")}
            >
              <ListItemIcon>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  fillOpacity="0.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 1.5H14.25C14.4489 1.5 14.6397 1.57902 14.7803 1.71967C14.921 1.86032 15 2.05109 15 2.25V15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H3.75C3.55109 16.5 3.36032 16.421 3.21967 16.2803C3.07902 16.1397 3 15.9489 3 15.75V2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5ZM6.75 8.25V6L3 9L6.75 12V9.75H11.25V8.25H6.75Z"
                    fill="white"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontFamily }}>Keluar</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
