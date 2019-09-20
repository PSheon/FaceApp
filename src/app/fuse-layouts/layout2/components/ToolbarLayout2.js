import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { FuseSearch, FuseShortcuts } from '@fuse';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
// import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
}));

function ToolbarLayout2(props) {
    const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
    const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

    const classes = useStyles(props);

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="container p-0 lg:px-24">

                    {config.navbar.display && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0" />
                            <div className={classes.separator} />
                            <Link to="/">
                                {/* <Avatar className="mx-5" alt="logo" src="assets/images/logos/brand-logo.svg" /> */}
                                <img className="mx-5 h-40" alt="logo" src="assets/images/logos/logo.png" />
                            </Link>
                            {/* <Typography className="text-16 font-light font-extrabold" color="textPrimary">青年職涯發展中心</Typography> */}
                        </Hidden>
                    )}

                    <div className="flex flex-1">
                        <Hidden xsDown>
                            <FuseShortcuts />
                        </Hidden>
                    </div>

                    <div className="flex">

                        <Hidden xsDown>
                            <FuseSearch />

                            <div className={classes.separator} />
                        </Hidden>

                        <UserMenu />

                        {/* <Hidden lgUp>

                            <div className={classes.separator} />

                        </Hidden>

                        <div className={classes.separator} />

                        <QuickPanelToggleButton /> */}
                    </div>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default ToolbarLayout2;
