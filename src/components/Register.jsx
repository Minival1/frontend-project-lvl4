import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import routes from '../routes';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../helpers/auth-helper';
import { useHistory } from 'react-router';

const Register = () => {

    const auth = useAuth();
    const history = useHistory();

    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ username: '', password: '', confirmPassword: '' }}
                        onSubmit={async (values) => {
                            if (values.password !== values.confirmPassword) {
                                alert("Пароли должны совпадать");
                                return;
                            }

                            try {
                                const res = await axios.post(routes.registerPath(), { username: values.username, password: values.password });
                                const { token, username } = res.data;
                                auth.signIn(token, username);

                                history.push(routes.channelsPagePath());
                            } catch (e) {
                                if (e.response.status === 409) {
                                    alert("Такой пользователь уже существует");
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
                                <Form.Group>
                                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                                    <Form.Control onChange={handleChange} id="confirmPassword" type="password" name="confirmPassword" required/>
                                </Form.Group>
                                <Button type="submit" className="mt-3 mb-3" variant="outline-primary">Зарегистрироваться</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register
