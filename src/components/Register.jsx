import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import routes from '../routes';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../helpers/auth-helper';
import { useHistory } from 'react-router';
import * as Yup from 'yup';

const Register = () => {

    const auth = useAuth();
    const history = useHistory();

    const [registerError, setRegisterError] = useState("")

    const clearRegisterError = () => setTimeout(() => setRegisterError(""), 2000)

    const registerScheme = Yup.object().shape({
        username: Yup.string()
            .min(3, "Короткое имя!")
            .max(20, "Длинное имя!")
            .required("Поле обязательно!"),
        password: Yup.string()
            .min(6, "Слишком короткий пароль")
            .required("Поле обязательно!"),
        confirmPassword: Yup.string()
            .required("Поле обязательно!")
            .oneOf([Yup.ref("password")], "Пароли должны совпадать!")
    })

    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ username: '', password: '', confirmPassword: '' }}
                        validationSchema={registerScheme}
                        onSubmit={async (values, actions) => {
                            try {
                                const res = await axios.post(routes.registerPath(), { username: values.username, password: values.password });
                                const { token, username } = res.data;
                                auth.signIn(token, username);

                                history.push(routes.channelsPagePath());
                            } catch (e) {
                                if (e.response.status === 409) {
                                    setRegisterError("Такой пользователь уже существует!");
                                    clearRegisterError();
                                    actions.resetForm();
                                }
                            }
                        }}
                    >
                        {({ errors, values, handleSubmit, handleChange, isSubmitting}) => (
                            <Form className="p-3" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                    <Form.Control onChange={handleChange} value={values.username} isInvalid={!!errors.username || registerError.length} id="username" type="text" name="username"/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username || registerError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Ваш пароль</Form.Label>
                                    <Form.Control onChange={handleChange} value={values.password} isInvalid={!!errors.password} id="password" type="password" name="password"/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                                    <Form.Control onChange={handleChange} value={values.confirmPassword} isInvalid={!!errors.confirmPassword} id="confirmPassword" type="password" name="confirmPassword"/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" disabled={isSubmitting} className="mt-3 mb-3" variant="outline-primary">Зарегистрироваться</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register
