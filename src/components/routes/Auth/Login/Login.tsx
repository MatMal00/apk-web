import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components/common";
import { ROUTE } from "src/constants";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "src/firebase/auth";
import { loginSchema } from "src/helpers";
import { useAuth, useNavigateOnLoggedIn } from "src/hooks";

export const Login: FC = () => {
    const { isLoggedIn } = useAuth();
    useNavigateOnLoggedIn(isLoggedIn);

    const loginWithGoogle = () => doSignInWithGoogle();

    return (
        <section className="flex justify-center">
            <div className="w-full max-w-sm space-y-4">
                <div>
                    <h1 className="text-center font-bold uppercase">apk web</h1>
                    <p className="text-center text-gray-600">Sign in to your account</p>
                </div>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={({ email, password }) => doSignInWithEmailAndPassword(email, password)}
                >
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input name="email" label="Email" placeholder="e@example.com" />
                            <Input type="password" name="password" label="Password" />
                        </div>
                        <Button text="Sign in" />
                    </Form>
                </Formik>
                <Button text="Sign in with Google" variant="secondary" onClick={loginWithGoogle} />
                <div className="mt-4 text-center text-sm" data-id="19">
                    {"Don't have an account? "}
                    <Link className="underline" to={ROUTE.REGISTER}>
                        Sign up
                    </Link>
                </div>
            </div>
        </section>
    );
};
