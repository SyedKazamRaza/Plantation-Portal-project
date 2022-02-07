import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import Axios from "axios";
import "./showProducts.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

export default function ShowProducts(props) {
  const [productsArray, setproductsArray] = useState();
  const classes = useStyles();

  useEffect(() => {
    const category = props.category;
    console.log("I am empty");
    console.log(category);
    Axios.get("http://localhost:5000/products/allproduct/" + category)
      .then((response) => {
        if (response.data.length > 0) {
          setproductsArray(
            response.data.map((prod) => {
              return prod;
            })
          );
        } else {
          setproductsArray([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const category = props.category;
    console.log("called");
    console.log(category);
    Axios.get("http://localhost:5000/products/allproduct/" + category)
      .then((response) => {
        if (response.data.length > 0) {
          setproductsArray(
            response.data.map((prod) => {
              return prod;
            })
          );
        } else {
          setproductsArray([]);
        }
      })
      .catch((err) => console.log(err));
  }, [props.category]);

  const navigate = useNavigate();
  const routeChange = (data) => {
    var productId = data.id;
    navigate(`/products/${productId}`, { state: data });
  };

  return (
    <Box sx={{ backgroundColor: "#D4D5D3" }}>
      <Grid container spacing={1} px={1}>
        {productsArray?.map((singleProd) => {
          return (
            <Grid
              item
              md={3}
              sm="12"
              mt={3}
              key={singleProd.id}
              sx={{ maxHeight: 900 }}
            >
              <Card
                sx={{
                  display: "block",
                  transitionDuration: "0.3s",
                  height: "35vw",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ maxwidth: 365, bgcolor: red[500] }}
                      aria-label="recipe"
                    >
                      {singleProd.productName[0]}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={singleProd.productName}
                  subheader={"Store: " + singleProd.storename}
                  sx={{ height: "63px", overflow: "hidden" }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={singleProd.imageurl}
                  alt="product photo"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      height: "82px",
                      overflow: "hidden",
                      textAlign: "justify",
                    }}
                    color="text.secondary"
                  >
                    {singleProd.details}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "black",
                      fontSize: "14px",
                      height: "25px",
                      overflow: "hidden",
                    }}
                  >
                    Posted On: {singleProd.postedDate}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "red",
                      paddingLeft: "20%",
                      fontSize: "18px",
                      height: "28px",
                      overflow: "hidden",
                    }}
                  >
                    Price: Rs {singleProd.price}/-
                  </Typography>
                </CardContent>

                <Box className={classes.actions} md="12">
                  <ColorButton
                    mb="12"
                    md="12"
                    variant="contained"
                    onClick={
                      () => {
                        routeChange(singleProd) 
                      }
                    }
                  >
                    View Details
                  </ColorButton>
                </Box>
               
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
