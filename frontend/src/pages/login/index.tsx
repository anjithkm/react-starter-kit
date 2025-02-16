import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Layout from "@/layout/auth";
import * as Yup from "yup";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

import { 
	LoginFormContainer,
	FormControl,
	ErrorText,
	SubmitButton,
	} from "./style";

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
		console.log("Form data", values);
		await postLogin(values);
	};

	return (
		<Layout>
			<LoginFormContainer>
				<h2>Login</h2>
				<ErrorText>
					{loginError ? "Invalid credential. Try again!" : ""}
				</ErrorText>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form>
						<FormControl>
							<label htmlFor="user_name">User Name:</label>
							<Field type="text" id="user_name" name="user_name" />
							<ErrorMessage name="user_name" component={ErrorText} />
						</FormControl>

						<FormControl>
							<label htmlFor="password">Password:</label>
							<Field type="password" id="password" name="password" />
							<ErrorMessage name="password" component={ErrorText} />
						</FormControl>

						<SubmitButton type="submit">
							{loginLoading ? "Loading..." : "Login"}
						</SubmitButton>
					</Form>
				</Formik>
			</LoginFormContainer>
		</Layout>
	);
};

export default Login;
