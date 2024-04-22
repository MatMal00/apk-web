import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components/common";
import { ROUTE } from "src/constants";

export const Register: FC = () => {
    return (
        <section className="flex justify-center">
            <div className="w-full max-w-sm space-y-4">
                <div>
                    <h1 className="text-center font-bold uppercase">apk web</h1>
                    <p className="text-center text-gray-600">Sign up to your account</p>
                </div>
                <Formik initialValues={{ email: "", password: "" }} onSubmit={() => console.log("SEND")}>
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Input name="email" label="Email" placeholder="e@example.com" />
                            <Input name="password" label="Password" />
                            <Input name="confirm-password" label="Confirm password" />
                        </div>
                        <Button text="Sign up" />
                        <Button text="Sign up with Google" variant="secondary" />
                    </Form>
                </Formik>
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
