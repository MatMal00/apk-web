import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components/common";
import { ROUTE } from "src/constants";
import { doCreateUserWithEmailAndPassword, doSignUpWithGoogle } from "src/firebase/auth";
import { registerSchema } from "src/helpers";
import { useAuth, useNavigateOnLoggedIn } from "src/hooks";

export const Register: FC = () => {
    const { isLoggedIn } = useAuth();
    useNavigateOnLoggedIn(isLoggedIn);

    const registerWithGoogle = () => doSignUpWithGoogle();

    return (
        <section className="flex justify-center">
            <div className="w-full max-w-sm space-y-4">
                <div>
                    <h1 className="text-center font-bold uppercase">apk web</h1>
                    <p className="text-center text-gray-600">Sign up to your account</p>
                </div>
                <Formik
                    validationSchema={registerSchema}
                    initialValues={{ email: "", password: "", confirmPassword: "" }}
                    onSubmit={({ email, password }) => doCreateUserWithEmailAndPassword(email, password)}
                >
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input name="email" label="Email" placeholder="e@example.com" />
                            <Input type="password" name="password" label="Password" />
                            <Input type="password" name="confirmPassword" label="Confirm password" />
                        </div>
                        <Button type="submit" text="Sign up" />
                    </Form>
                </Formik>
                <Button text="Sign up with Google" variant="secondary" onClick={registerWithGoogle} />
                <div className="mt-4 text-center text-sm" data-id="19">
                    {"Already have an account? "}
                    <Link className="underline" to={ROUTE.LOGIN}>
                        Sign in
                    </Link>
                </div>
            </div>
        </section>
    );
};
