import { createTheme } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
	palette: {
		primary: {
			main: '#7356BF',
			 
		},
		secondary: {
			main: '#292e37'
		},
		grey: {
			'900': '#141414',
			'800': '#1f1f1f',
			'700': '#414043',
			'600': '#545454',
			'500': '#a19e9e',
			'400': '#afafaf',
			'300': '#cbcbcb',
			'200': '#e2e2e2',
			'100': '#f1f1f1',
			'50': '#f6f6f6'
		},
		text: {
			primary: '#000',
			secondary: '#dedede'
		}
	},
	components: {
		MuiDataGrid: {
			styleOverrides: {
				root: {
				},
				columnHeaders: {
					position: 'sticky',
					top: 0,
					zIndex: 1,
					backgroundColor: 'inherit'
				},
				virtualScroller: {
					marginTop: '0 !important'
				}
			},
		},
	}
})

export default theme;