// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
// Components
import DashboardRoutes from './Routes';
// Styles (Tailwind)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DashboardRoutes />
	</React.StrictMode>
);
