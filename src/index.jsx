import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import Home from './components/Home';
// import About from './components/About';

const Home = lazy(() => import(/* webpackChunkName: 'Home1' */ './components/Home'));
const About = React.lazy(() => import(/* webpackChunkName: 'About1' */ './components/About'));

import 'antd/dist/antd.less';

import './styles/index.css';
import './styles/scss.scss';
import './styles/less.less';

const num = 1;


console.log(11);
console.log(num);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
	<>
		<h1>Hello, world!</h1>
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<ul>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/home">Home</Link></li>
				</ul>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="about" element={<About />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	</>
);

setTimeout(() => {
	import('./utils/index').then(({ add }) => {
		console.log(add(2, 61));
	});
}, 1000);

