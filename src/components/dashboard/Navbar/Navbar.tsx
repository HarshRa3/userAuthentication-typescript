"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RiAdminFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import {
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
interface pages {
  pages: React.ReactNode;
  token: string;
}
interface CustomJwtPayload extends JwtPayload {
  email: string;
  role: string;
}
export default function Navbar({ pages, token }: pages) {
  const tokenDa: CustomJwtPayload = jwtDecode(token);


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: "#130f40" }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ bgcolor: "#130f40", height: "100vh", color: "white" }}>
          <DrawerHeader>
            <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ bgcolor: "white" }} />
          <List>
            {[
              {
                text: "My Profile",
                icon: <FaUser size={"1.5rem"} />,
                link: "/dashboard/myProfile",
              },
              {
                text: "Add Users",
                icon: <RiUserAddFill size={"1.5rem"} />,
                link: `/dashboard/${tokenDa.id}/addUser`,
              },
              {
                text: "Users Data",
                icon: <FaUsers size={"1.5rem"} />,
                link: `/dashboard/${tokenDa.id}/userData`,
                // sdata:tokenDa
              },
              {
                text: "Admins Data",
                icon: <RiAdminFill size={"1.5rem"} />,
                link: "/",
                // handleClick:handleClick
              },
            ].map((item, index) => (
              <Link
                href={{pathname:item.link}}
                key={index}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Stack
        component="main"
        sx={{
          flexGrow: 1,
          minWidth:'10%',
          bgcolor: "#130f40d1",
          height: "100vh" ,
          overflow:"auto",
          p:3
        }}
      >
        <DrawerHeader />
        {pages}
      </Stack>
    </Box>
  );
}
