import React, { useState } from 'react';
import { Formik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import routes from "../routes";

import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../helpers/auth-helper';
import * as Yup from 'yup';

const Login = (props) => {
    const auth = useAuth();
    const history = useHistory();

    const [errorLogin, setErrorLogin] = useState("")

    const clearLoginError = () => setTimeout(() => setErrorLogin(""), 2000)

    const loginScheme = Yup.object().shape({
        username: Yup.string().required("Поле обязательно!"),
        password: Yup.string().required("Поле обязательно!"),
    })

    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={loginScheme}
                        onSubmit={async (values, actions) => {
                            try {
                                const res = await axios.post(routes.loginPath(), values);

                                const { token, username } = res.data;
                                auth.signIn(token, username);

                                history.push(routes.channelsPagePath());
                            } catch (e) {
                                if (e.response.status === 401) {
                                    setErrorLogin("Неправильный ник или пароль!")
                                    clearLoginError()
                                    actions.resetForm();
                                }
                            }
                        }}
                    >
                        {({ errors, values, handleSubmit, handleChange , isSubmitting}) => (
                            <Form className="p-3" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                    <Form.Control onChange={handleChange} value={values.username} isInvalid={!!errors.username || errorLogin.length} id="username" type="text" name="username"/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username || errorLogin}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                                    <Form.Control onChange={handleChange} value={values.password} isInvalid={!!errors.password} id="password" type="password" name="password"/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting} className="mt-3 mb-3" variant="outline-primary">Войти</Button>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="small mb-2">Нет аккаунта?</span>
                                    <Link to="/signup">Регистрация</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login;
