import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../api/userApi";
import jwt_decode from "jwt-decode";
import { createUser } from "../store/user";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

const Register = ({createUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [register, { data }] = useMutation(REGISTER_USER)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({
                variables: {
                    userRegisterInput: {
                        email,
                        name,
                        password
                    }
                }
            })
            const token = res?.data?.createUser.token;
            const user = jwt_decode(token)
            setCookie("token", token)
            createUser(user)
            navigate("/")
        } catch(e) {
            alert(e)
        }
    }

    return (
        <div className='login'>
            <h2
                className='login__title'
            >
                Register
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

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter email" 
                        value={name}
                        onChange={e => setName(e.target.value)} 
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
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapDispatchToPtops = dispatch => ({
    createUser: bindActionCreators(createUser, dispatch)
})

export default connect(null, mapDispatchToPtops)(Register);