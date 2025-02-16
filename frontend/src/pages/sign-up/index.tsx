import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./signup.css";

import {
	SignUpFormContainer,
	FormControl,
	ErrorText,
	SubmitButton,
} from "./style";

import api from "@/services/api";

const SignUp: React.FC = () => {
	const [postSignUp, { isError: signUpError, isLoading: signUpLoading }] =
		api.useSignUpMutation();

	const initialValues = {
		email: "",
		user_name: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email format").required("Required"),
		user_name: Yup.string().min(3, "Minimum 3 characters").required("Required"),
		password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), undefined], "Passwords must match")
			.required("Required"),
	});

	const onSubmit = async (values: any) => {
		console.log("Form data", values);
		try {
			const response = await postSignUp(values);
			console.log("SignUp successful", response);
		} catch (error) {
			console.error("SignUp failed", error);
		}
	};

	return (
		<SignUpFormContainer>
			<h2>Sign Up</h2>
			<ErrorText>{signUpError ? "Error. Try again!" : ""}</ErrorText>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<FormControl>
						<label htmlFor="email">Email:</label>
						<Field type="email" id="email" name="email" />
						<ErrorMessage name="email" component="div" className="error" />
					</FormControl>

					<FormControl>
						<label htmlFor="username">Username:</label>
						<Field type="text" id="username" name="user_name" />
						<ErrorMessage name="username" component="div" className="error" />
					</FormControl>

					<FormControl>
						<label htmlFor="password">Password:</label>
						<Field type="password" id="password" name="password" />
						<ErrorMessage name="password" component="div" className="error" />
					</FormControl>

					<FormControl>
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<Field
							type="password"
							id="confirmPassword"
							name="confirmPassword"
						/>
						<ErrorMessage
							name="confirmPassword"
							component="div"
							className="error"
						/>
					</FormControl>

					<SubmitButton type="submit">
						{signUpLoading ? "Loading..." : "Sign up"}
					</SubmitButton>
				</Form>
			</Formik>
		</SignUpFormContainer>
	);
};

export default SignUp;
