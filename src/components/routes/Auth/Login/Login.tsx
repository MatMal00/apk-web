import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components/common";
import { ROUTE } from "src/constants";

export const Login: FC = () => {
    return (
        <section className="flex justify-center">
            <div className="w-full max-w-sm space-y-4">
                <div>
                    <h1 className="text-center font-bold uppercase">apk web</h1>
                    <p className="text-center text-gray-600">Sign in to your account</p>
                </div>
                <Formik initialValues={{ email: "", password: "" }} onSubmit={() => console.log("SEND")}>
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input name="email" label="Email" placeholder="e@example.com" />
                            <Input name="password" label="Password" />
                        </div>
                        <Button text="Sign in" />
                        <Button text="Sign in with Google" variant="secondary" />
                    </Form>
                </Formik>
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
