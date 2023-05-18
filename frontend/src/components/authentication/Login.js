import React from 'react'
import { FormControl,useToast, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [Loading, setLoading] = useState(false);
    const Navigate = useNavigate()
    const toast = useToast()

    const submitHandler = async() => {

        setLoading(true)

        if(!email || !password){

            toast({
                title: 'please enter email and password',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
            })

            setLoading(false)

            return
        }

        try {
            const config = {
                header: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.post("/api/user/login", { email,password }, config)
            

            toast({
                title: "login successfull",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data))

            setLoading(false)
            Navigate('/chats')

        } catch (error) {

            toast({
                title: "error",
                status: "warning",
                description: error.response.data.message,
                duration: 3000,
                isClosable: true,
                position: "bottom"

            })
            setLoading(false)

        }

    }

    return (
        <VStack spacing='5px'>

            <FormControl id='email' >
                <FormLabel>Email</FormLabel>
                <Input placeholder='enter your email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}

                />
            </FormControl>

            <FormControl id='password' >
                <FormLabel>Password</FormLabel>

                <InputGroup>

                    <Input
                        type={show ? "Show" : "password"}
                        placeholder='enter your password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                    <InputRightElement width="4.5rem">

                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>

                    </InputRightElement>
                </InputGroup>
            </FormControl>


            <Button
                colorScheme="green"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={Loading}
            >
                Sign in
            </Button>

            <Button
                colorScheme="orange"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("guestUser")
                }}
            >
                Continue with guest account
            </Button>


        </VStack>
    )

}

export default Login