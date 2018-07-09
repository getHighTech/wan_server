import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MovieCard from '../components/MovieCard';
import  { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMoviesByTag } from '../actions/movies';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 2,
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class HomePage extends React.Component {


  componentDidMount(){

      if(!this.props.open){
        this.loadMoives("热门");
  
      }
      
  }


  loadMoives=(tag)=>{
    const { dispatch } = this.props;
    
    dispatch(getMoviesByTag(tag))
  }
  handlePushToMovie = (id)=> {
    this.props.history.push('/movies/'+id+'/play');
  }
  render(){
    const { classes, movies, tag, loading } = this.props;
    let moviesComponent =null
    if(movies){
      moviesComponent  = movies.map(movie=>{
        return <Grid key={movie._id} item xs>
                <MovieCard movie={movie}  />
            </Grid>
      })
    }
    return (
        <div className={classes.root}>
         <Typography variant="headline" gutterBottom>{tag? tag : "热门"}视频</Typography>
            <Divider light />
              <Grid container spacing={24} 
              alignItems="center"
              direction="row"
              justify="center"
              >
                { 
                  loading &&
                  <CircularProgress className={classes.progress} />
                }
                
                {!loading && moviesComponent}

                { 
                  movies && movies.length === 0 && !loading &&
                  <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
                  
                }
          
        </Grid>
        <Divider light />
        <Typography variant="headline" gutterBottom>诱人美图</Typography>
            <Divider light />
              <Grid container spacing={24} 
              alignItems="center"
              direction="row"
              justify="center"
              >
                { 
                  loading &&
                  <CircularProgress className={classes.progress} />
                }
                
                {!loading && moviesComponent}

                { 
                  movies && movies.length === 0 && !loading &&
                  <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
                  
                }
          
        </Grid>
        <Divider light />

        <Typography variant="headline" gutterBottom>可以很丧</Typography>
            <Divider light />
              <Grid container spacing={24} 
              alignItems="center"
              direction="row"
              justify="center"
              >
                { 
                  loading &&
                  <CircularProgress className={classes.progress} />
                }
                
                {!loading && moviesComponent}

                { 
                  movies && movies.length === 0 && !loading &&
                  <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
                  
                }
          
        </Grid>
        <Typography variant="headline" gutterBottom>文学 | 或情色阅读</Typography>
            <Divider light />
              <Grid container spacing={24} 
              alignItems="center"
              direction="row"
              justify="center"
              >
                { 
                  loading &&
                  <CircularProgress className={classes.progress} />
                }
                
                {!loading && moviesComponent}

                { 
                  movies && movies.length === 0 && !loading &&
                  <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
                  
                }
          
        </Grid>
        <Typography variant="headline" gutterBottom>漫画</Typography>
            <Divider light />
              <Grid container spacing={24} 
              alignItems="center"
              direction="row"
              justify="center"
              >
                { 
                  loading &&
                  <CircularProgress className={classes.progress} />
                }
                
                {!loading && moviesComponent}

                { 
                  movies && movies.length === 0 && !loading &&
                  <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
                  
                }
          
        </Grid>
        </div>
      );

  }

  
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
       movies: state.MoviesReducer.movies[state.MoviesReducer.tag],
        loading: state.MoviesReducer.loading,
        err: state.MoviesReducer.failedReason,
        open: state.AppReducer.sideBarOpen,
        onLoadTimes: state.MoviesReducer.onLoadTimes,
        tag: state.MoviesReducer.tag
      }
}

export default connect(mapToState)(withStyles(styles)(HomePage));
