import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';
import { createUser } from '../store/user';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../api/userApi";
import jwt_decode from 'jwt-decode';
import "../style/login.scss";

const Login = ({createUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [login, { data }] = useMutation(LOGIN_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login");
        try {
            const response = await login({
                variables: {
                    userLoginInput: {
                        email,
                        password
                    }
                }
            })  
            const {token} = await response?.data?.loginUser;
            if(token) {
                setCookie("token", token)
                const user = jwt_decode(token)
                createUser(user)
                navigate("/")
            } else {
                alert("Invalidate credentials")
            }
        } catch(e) {
            alert("Invalidate credentials")
        }
    }

    return (
        <div className='login'>
            <h2
                className='login__title'
            >
                Login
            </h2>
            <Form
                onSubmit={e => handleSubmit(e)}
                className="login-form"
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
            <Link to="/register">register</Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    createUser: bindActionCreators(createUser, dispatch)
}) 

export default connect(null, mapDispatchToProps)(Login);