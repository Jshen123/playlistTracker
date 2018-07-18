import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Grid container alignItems='center' direction='row' justify='flex-end'>
              <Button color="inherit">Login</Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ButtonAppBar);