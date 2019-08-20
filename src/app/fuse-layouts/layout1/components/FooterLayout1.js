import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Icon } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import moment from 'moment';

function FooterLayout1(props) {
	const theme = useTheme();
	const [timestamp, setTimestamp] = useState(null);
	const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

	const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimestamp(moment().format('YYYY-MM-DD HH:mm:ss'))
		}, 1000);

		return () => clearInterval(interval);
	}, [timestamp])

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar id="fuse-footer" className="relative z-10" color="default">
				<Toolbar className="px-16 py-0 flex items-center justify-between">
					<div>
						<Typography>
							在線客服 | 聯繫我們
						</Typography>
					</div>
					<div className="flex">
						<Typography className="flex items-center pr-12">
							{!isMobileView && <Icon>access_time</Icon>}
							<span className="ml-6 font-semibold">
								{timestamp}
							</span>
						</Typography>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default FooterLayout1;
