import { FC } from "react";
import { SWRConfig } from "swr";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, DefaultLayout, Login, ProtectedRoute, Register, Board } from "./components";
import { ROUTE } from "./constants";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./store";

const App: FC = () => {
    return (
        <>
            <Toaster containerClassName="toaster" />
            <SWRConfig>
                <AuthContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<DefaultLayout />}>
                                <Route element={<Login />} path={ROUTE.LOGIN} />
                                <Route element={<Register />} path={ROUTE.REGISTER} />
                                <Route element={<ProtectedRoute />}>
                                    <Route element={<Home />} path={ROUTE.HOME} />
                                    <Route element={<Board />} path={`${ROUTE.BOARD}/:projectUid`} />
                                </Route>
                                <Route path="*" element={<h2>Not Found</h2>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthContextProvider>
            </SWRConfig>
        </>
    );
};

export default App;
