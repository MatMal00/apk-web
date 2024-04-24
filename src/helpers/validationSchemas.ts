import * as Yup from "yup";

export const loginSchema: Yup.Schema<{ email: string; password: string }> = Yup.object({
    email: Yup.string()
        .email("Invalid email address") // Validates the format of the email
        .required("Email is required"), // Makes the field mandatory
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long") // Minimum length
        .required("Password is required"), // Makes the field mandatory
}).defined();

export const registerSchema: Yup.Schema<{ email: string; password: string; confirmPassword: string }> = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
}).defined();

export const createProject = Yup.object().shape({
    logoUrl: Yup.string().required("Logo url is required"),
    name: Yup.string().required("Project name is required"),
    description: Yup.string().required("Project description is required"),
});
