import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/services/api";
import { useNavigate } from "react-router";

import { LoginFormContainer } from "./style";

export interface LoginFormValues {
	user_name: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();

	const [
		postLogin,
		{ data: loginData, isError: loginError, isLoading: loginLoading },
	] = api.useLoginMutation();

	const initialValues: LoginFormValues = {
		user_name: "",
		password: "",
	};

	const style: Object = { outline: "#6fb4fd" };

	const validationSchema = Yup.object({
		user_name: Yup.string().required("Required"),
		password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
	});

	useEffect(() => {
		if (loginData) {
			if (loginData?.success) {
				navigate("/home");
			}
		}
	}, [loginData]);

	const onSubmit = async (values: any) => {
		await postLogin(values);
	};

	return (
		<LoginFormContainer style={style}>
			<h2>Login</h2>
			<div className="ErrorText">
				{loginError ? "Invalid credential. Try again!" : ""}
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<div className="FormControl">
						<label htmlFor="user_name">User Name:</label>
						<Field type="text" id="user_name" name="user_name" />
						<ErrorMessage
							name="user_name"
							component="div"
							className="ErrorText"
						/>
					</div>

					<div className="FormControl">
						<label htmlFor="password">Password:</label>
						<Field type="password" id="password" name="password" />
						<ErrorMessage
							name="password"
							component="div"
							className="ErrorText"
						/>
					</div>

					<button className="SubmitButton" type="submit">
						{loginLoading ? "Loading..." : "Login"}
					</button>
				</Form>
			</Formik>
		</LoginFormContainer>
	);
};

export default Login;
