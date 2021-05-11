import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 400,
    width: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CustomizedInputBase =({ placeholder, handleSearch, handleNew })=> {
  const classes = useStyles();
  const [ value, setValue ] = useState("")

  const handleSubmit =( e )=> {
      e.preventDefault()
      handleSearch( value )
  }

  const handleChange =( e )=> {
    setValue(e.target.value)
    handleSearch(e.target.value)
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={ handleSubmit }>
      <InputBase
        className={classes.input}
        placeholder={ placeholder }
        value={ value }
        onChange={ handleChange }
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={ handleNew }>
        <AddToPhotosIcon />
      </IconButton>
    </Paper> 
  );
}

export { CustomizedInputBase }