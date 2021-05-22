import React from 'react'
import { Formik } from "formik";
import { Link } from "react-router-dom"; 
import axios from "axios";
import routes from "../routes";

import { Form, Button } from 'react-bootstrap';

const Login = (props) => {
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={async (values) => {
                            console.log(values);
                            const res = await axios.post(routes.loginPath(), values);
                            localStorage.setItem("token", res.data.token);
                            console.log(res.data);
                        }}
                    >
                        {({ isSubmitting, handleSubmit, handleChange }) => (
                            <Form className="p-3" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                    <Form.Control onChange={handleChange} id="username" type="text" name="username"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                                    <Form.Control onChange={handleChange} id="password" type="password" name="password"/>
                                </Form.Group>
                                <Button type="submit" className="mb-3" variant="outline-primary">Войти</Button>
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
