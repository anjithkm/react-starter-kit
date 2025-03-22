import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { SignUpFormContainer } from "./style";

import api from "@/services/api";

const SignUp: React.FC = () => {
	const [postSignUp, { isError: signUpError, isLoading: signUpLoading }] =
		api.useSignUpMutation();

	const style: Object = { outline: "#6fb4fd" };

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
		try {
			const response = await postSignUp(values);
			console.log("SignUp successful", response);
		} catch (error) {
			console.error("SignUp failed", error);
		}
	};

	return (
		<SignUpFormContainer style={style}>
			<h2>Sign Up</h2>
			<div className="ErrorText">{signUpError ? "Error. Try again!" : ""}</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<div className="FormControl">
						<label htmlFor="email">Email:</label>
						<Field type="email" id="email" name="email" />
						<ErrorMessage name="email" component="div" className="error" />
					</div>

					<div className="FormControl">
						<label htmlFor="username">Username:</label>
						<Field type="text" id="username" name="user_name" />
						<ErrorMessage name="username" component="div" className="error" />
					</div>

					<div className="FormControl">
						<label htmlFor="password">Password:</label>
						<Field type="password" id="password" name="password" />
						<ErrorMessage name="password" component="div" className="error" />
					</div>

					<div className="FormControl">
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
					</div>

					<button className="SubmitButton" type="submit">
						{signUpLoading ? "Loading..." : "Sign up"}
					</button>
				</Form>
			</Formik>
		</SignUpFormContainer>
	);
};

export default SignUp;
