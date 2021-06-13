import React from 'react'
import { Formik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import routes from "../routes";

import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../helpers/auth-helper';

const Login = (props) => {
    const auth = useAuth();
    const history = useHistory();

    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={async (values) => {
                            try {
                                const res = await axios.post(routes.loginPath(), values);

                                const { token, username } = res.data;
                                auth.signIn(token, username);

                                history.push(routes.channelsPagePath());
                            } catch (e) {
                                if (e.response.status === 401) {
                                    alert("Неправильный ник или пароль")
                                }
                            }
                        }}
                    >
                        {({ isSubmitting, handleSubmit, handleChange }) => (
                            <Form className="p-3" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                    <Form.Control onChange={handleChange} id="username" type="text" name="username" required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                                    <Form.Control onChange={handleChange} id="password" type="password" name="password" required/>
                                </Form.Group>
                                <Button type="submit" className="mt-3 mb-3" variant="outline-primary">Войти</Button>
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
