import styled from "styled-components";
import device from "@/config/breaking-point";

export const LoginFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  text-align: center;
  @media ${device.mobileS} {
    background-color: #e07575;
  }
  @media ${device.mobileM} {
    background-color: lightgreen;
  }
  @media ${device.tablet} {
    background-color: #7fcae4;
  }
  @media ${device.laptop} {
    background-color: #e4e47a;
  }
`;

export const FormControl = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const ErrorText = styled.div`
  color: #ff0000;
  font-size: 0.9em;
  margin: 10px 0px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;