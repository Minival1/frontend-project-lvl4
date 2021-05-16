import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom"; 

const Login = (props) => {
    
    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-sm-4">
                    <Formik
                        initialValues={{ nickname: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form className="p-3">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="username">Ваш ник</label>
                                    <Field className="form-control" id="username" type="text" name="nickname" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">Ваш пароль</label>
                                    <Field className="form-control" id="password" type="password" name="password" />
                                </div>
                                <button type="submit" className="btn btn-outline-primary mb-3" disabled={isSubmitting}>
                                    Войти
                                </button>
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
