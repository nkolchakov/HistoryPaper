import { Button } from "baseui/button";
import { FormControl } from 'baseui/form-control';
import { Input } from "baseui/input";
import { KIND, Notification } from 'baseui/notification';
import { Spinner } from "baseui/spinner";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Centered } from "../../styles";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const { loginUser, loadingLogging } = useContext(AuthContext)

    const onLogin = async (event) => {
        const hasErrors = validateFields();
        if (hasErrors) {
            return;
        }
        try {
            await loginUser(event)
        } catch (error) {
            setErrors(error)
        }
    }

    const validateFields = () => {
        const inputErrors = [];
        if (username.trim() === '') {
            inputErrors.push("username is required !")
        }
        if (password.trim() === '') {
            inputErrors.push("password is required !")
        }
        setErrors(inputErrors);
        return errors.length > 0;
    }

    return <form onSubmit={onLogin}>
        {errors.length > 0 ? <Notification kind={KIND.negative}>
            {errors.join('\n')}
        </Notification> : null}
        {loadingLogging ?
            <Centered>
                <Spinner />
            </Centered> : <>
                <FormControl label="Username">
                    <Input
                        onChange={(e) => setUsername(e.target.value.trim())}
                        value={username}
                        required
                        size="compact"
                        name='username'
                        placeholder="Unique username"
                        type='text'></Input>
                </FormControl>
                <FormControl label="Password">
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        size="compact"
                        name='password'
                        placeholder="Password"
                        type='password'>
                    </Input>
                </FormControl>
                <Button
                    type='submit'
                    size='compact'>
                    Sign in
                </Button>
            </>}
    </form>
}

export default Login;