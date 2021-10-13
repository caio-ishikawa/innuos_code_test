import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import albums from './albums.json';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';


document.body.style = 'background: #0B2027';


const useStyles = makeStyles({
    button: {
        marginTop: "5%",
        color: "white"
    },
    albumCover: {
        width: "15vh",
        borderRadius: "10px"
    },
    icon: {
        position: "absolute",
        bottom: "0",
        right: "0",
        margin: "1vh",
        width: "2vh"
    },
    imgGroup: {
        position: "relative",
    },
    albumContainer: {
      width: "15vh",
      margin: "auto"
    },
    albumTitle: {
      textAlign: "left",
      color: "#E5EAFA",
      fontFamily: "'Oxygen', 'sans-serif'",
      width: "15vh",
      overflow: "hidden",
      overflowY: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    albumYear: {
      textAlign: "left",
      color: "#E5EAFA",
      width: "10vh",
      overflow: "hidden",
      overflowY: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    filterButton: {
      backgroundColor: "#59CD90",
      marginTop: "10%"
    },
    masterDiv: {
      marginTop: "5%"
    },
    buttonGroupDiv: {
      marginBottom: "5%"
    }
});

function App() {
    const dispatch = useDispatch();
    const reduxList = useSelector( (state) => state);
    const classes = useStyles();
    const [showAlbum, setShowAlbum] = useState(false);
    const [filters, setFilters] = useState(10);

   
    const getAlbums = () => {
      if (showAlbum === true) {
        setShowAlbum(false);
      } else {
        setShowAlbum(true);
      }
    };


    const results = reduxList.map(function(album, idx) {
        var imgLink;
        var streamingService;

        if (album.cover !== null) {
            imgLink = 'http://localhost:3000/covers/' + album.cover;
        } else {
            imgLink = 'http://localhost:3000/images/undefined_album_cover.png';
        }

        if (album.source === "QOBUZ") {
            streamingService = "http://localhost:3000/images/qobuz.png";
        } else {
            streamingService = null;
        }

        return (
            <Grid item lg={2} md={3} sm={4} xs={6} >
              {showAlbum
              ? <div className={classes.albumContainer}>
                <div className={classes.imgGroup}>
                  <img id={idx} src={imgLink} alt={album.album} className={classes.albumCover}/>
                  <img src={streamingService} className={classes.icon}/>
                </div>
                <Typography className={classes.albumTitle} id={idx}>{album.album}</Typography>
                <Typography className={classes.albumYear} id={idx}>{album.artist}</Typography>
                <br/>
              </div>
              : <div></div>
              }
            </Grid>
        );
    });
   
    const filterLocal = () => {
      dispatch({ type: "LOCAL" });
    };

    const filterQobuz = () => {
      console.log('retunring qbuz')
      dispatch({ type: "QOBUZ" });
    };

    const filterAll = () => {
      dispatch({ type: "ALL" });
    }

    const handleChange = (event, newValue) => {
      setFilters(newValue);
      console.log(filters);
    };

  return (
    <div className="App">
  
      <Container maxWidth="lg">
        <div className={classes.button}>
          <Button variant="outlined" className={classes.button} onClick={getAlbums}>GET ALBUMS</Button>
        </div>
        <div className={classes.masterDiv}>
          <div className={classes.buttonGroupDiv}>
            {showAlbum
            ? <ButtonGroup variant="contained" aria-label="outlined primary button group" className={classes.filterButtons}>
              <Button onClick={filterAll}>All</Button>
              <Button onClick={filterQobuz}>Qobuz</Button>
              <Button onClick={filterLocal}>Local</Button>
            </ButtonGroup>
            :
            <div></div>
            }
          </div>
          <Grid container spacing={0}>
            {results}
          </Grid>
        </div>
      </Container>
      
    </div>
  );
}

export default App;
