import './Header.css';
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Header() {
	return (
		<React.Fragment>
			<AppBar id="appBar" position="sticky" color="primary">
				<Toolbar>
					<Typography variant="h5" color="inherit">Recipe Book</Typography>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
