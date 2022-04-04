import React from "react";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    minWidth: 250,
    marginTop: 90,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  store: {
    fontSize: 18,
    color: "red",
    marginTop: 7,
    textAlign: "center",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

function SingleProduct(props) {
  const { state } = useLocation();
  console.log(state);

  const classes = useStyles();
  
  const navigate = useNavigate();
  const moveBack = (category) => {
    if (category === "plants") {
      navigate("/plants");
    } else if (category === "fertilizers") {
      navigate("/fertilizers");
    } else if (category === "seeds") {
      navigate("/seeds");
    } else if (category === "tools") {
      navigate("/tools");
    }
  };

  return (
    <Box sx={{ height: "640px", backgroundColor: "#D4D5D3" }}>
      <Grid container spacing={1}>
        <Grid item md="2">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ marginLeft: "30px" }}
            onClick={() => {
              moveBack(state.category);
            }}
          >
            back
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Grid container spacing={1} pt={3}>
          <Grid item md={1}></Grid>
          <Grid item md={5}>
            <img src={state.imageurl} alt="Product" height={500} width={500} />
          </Grid>
          <Grid item md={5}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title}>
                  {state.productName}
                </Typography>
                <Typography
                  className={classes.date}
                  color="textSecondary"
                  gutterBottom
                >
                  Posted on {state.postedDate}
                </Typography>
                <Typography
                  className={classes.date}
                  color="textSecondary"
                  gutterBottom
                >
                  Category: {state.category}
                </Typography>
                <Typography className={classes.store}>
                  Store Name: '{state.storename}'
                </Typography>

                <Typography className={classes.descriptionTitle}>
                  Description:
                </Typography>
                <Typography variant="body2" component="p">
                  {state.details}
                </Typography>
              </CardContent>

              <Box className={classes.actions} md="12">
                <Button mb="12" md="12" variant="contained" color="success">
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SingleProduct;
