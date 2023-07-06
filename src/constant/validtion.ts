/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { ILogin,ISignUp} from "./types"

export const loginDefaultValue: ILogin = {
    email: "",
    password: ""
}

const loginSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(10).required("Password is required")
})

export const loginResolver = yupResolver(loginSchema)




export const signUpDefaultValue: ISignUp = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    userName: ""
}

const signUpSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    firstName: yup.string().required("firstName is required"),
    userName:yup.string().required("userName is required"),
    lastName: yup.string().required("LastName is required"),
    password: yup.string()
        .min(6, 'password must be atleast 6 characters ')
        .max(10, 'password must not exceed 10 characters')
        .required("Password is required"),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Please confirm your pssword")
})

export const signUpResolver = yupResolver(signUpSchema);


