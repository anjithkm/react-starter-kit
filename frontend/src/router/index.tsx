import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import AuthLayout from "@/layout/auth";
import AppLayout from "@/layout/app";

import Login from "@/pages/login";
import SignUp from "@/pages/sign-up";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Login />} />

				{/* Auth routes */}
				<Route path="/" element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="sign-up" element={<SignUp />} />
				</Route>

				{/* public routes */}
				<Route path="/:user" element={<AppLayout privatized={false} />}>
					<Route path="home" element={<Home />} />
				</Route>

				{/* private routes */}
				<Route path="/:user" element={<AppLayout />}>
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
