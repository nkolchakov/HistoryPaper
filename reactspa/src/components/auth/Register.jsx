import React, { useEffect, useState } from "react";
import { FormControl } from 'baseui/form-control';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import axios from "axios";
import { Notification, KIND } from 'baseui/notification';
import { authApiBaseUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPass, setRepeatedPass] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [formErrors, setFormErrors] = useState('')

    const onSignup = (e) => {
        e.preventDefault();
        const hasErrors = validateFields();
        if (hasErrors) {
            return;
        }

        const userData = {
            name: fullname.trim(),
            username: username,
            password: password.trim()
        };
        axios.post(`${authApiBaseUrl}/signup`, userData)
            .then((userResponse) => {
                if (userResponse?.data) {
                    // success, redirect to login
                    console.log(userResponse);
                    navigate("/signin")
                } else {

                }
            })
    }

    const validateFields = () => {
        const errors = []
        if (fullname.trim() === '') {
            errors.push('Fullname is required')
        }
        if (username === '') {
            errors.push("Username is required !")
        }
        if (password.trim() === '') {
            errors.push("Passwords is required !")
        }
        if (!passwordsMatch) {
            errors.push('Passwords does not match !')
        }
        setFormErrors(errors);
        return errors.length > 0;

    }


    return <div>
        <h4>Sign up</h4>
        <form>
            {formErrors.length > 0 ? <Notification kind={KIND.negative}>
                {formErrors.join('\n')}
            </Notification> : null}
            <FormControl label="Full Name">
                <Input
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    required
                    size="compact"
                    placeholder="Full name"
                    type='text'></Input>
            </FormControl>
            <FormControl label="Username">
                <Input
                    onChange={(e) => setUsername(e.target.value.trim())}
                    value={username}
                    required
                    size="compact"
                    placeholder="Unique username"
                    type='text'></Input>
            </FormControl>
            <FormControl label="Password">
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    size="compact"
                    placeholder="Password"
                    type='password'>
                </Input>
            </FormControl>
            <FormControl
                label="Repeat password">
                <Input
                    onBlur={() => setPasswordsMatch(password.trim() === repeatedPass.trim())}
                    onChange={e => setRepeatedPass(e.target.value)}
                    value={repeatedPass}
                    required
                    size="compact"
                    error={!passwordsMatch}
                    placeholder="Repeat password"
                    type='password'></Input>
            </FormControl>
            <Button
                onClick={onSignup}
                size='compact'>
                Sign up
            </Button>
        </form>
    </div>
}

export default Register;