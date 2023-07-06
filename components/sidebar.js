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

export default function Sidebar() {
  const router = useRouter();

  return (
    <Box>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "#040C1F",
            background: "#0025a9",
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

        <List sx={{ paddingLeft: "50px", paddingTop: "50px" }}>
          {data.map((item, i) => (
            <ListItem key={i} disablePadding>
              <Link href={item.link}>
                <ListItemButton
                  sx={{ color: "#81858F" }}
                  onClick={() => click(`halaman ${item.title}`)}
                >
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
