import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast, PinInputDescendantsProvider } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [confirmPassword, setConfirmPassword] = useState();
        const [password, setPassword] = useState();
        const [pic, setPic] = useState();
        const [show, setShow]=useState(false);
        const [show2, setShow2]=useState(false);
        const [Loading, setLoading] = useState(false);
        const history = useNavigate()
        const toast = useToast()

    const postDetails = (pic)=>{

            setLoading(true)

            if(pic === undefined){
                toast({
                    title: 'please select an image',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-left',
                })
                setLoading(false)
                return
            }

            if(pic.type === "image/jpeg" || pic.type === "image/png"){
                
                const d = new FormData()
                d.append("file",pic)
                d.append("upload_preset","chat-app")
                d.append("cloud_name","dovsnvkrs")
                
                fetch("https://api.cloudinary.com/v1_1/dovsnvkrs/image/upload",{
                    method: "post",
                    body: d,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setPic(data.url.toString());
                        console.log(data.url.toString());
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });

            }else{
                toast({
                    title: 'please select an image',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-left',
                })
            }

    }

    const submitHandler = async()=>{
        
        setLoading(true)

        if(!name || !email || !password || !confirmPassword){

            toast({
                title:"please fill all the fields",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"bottom"

            })
            setLoading(false)
            return
        }

        if(password !== confirmPassword){
            toast({
                title: "password do not match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom"

            })
            return
        }

        try {
            
            const config = {
                header:{
                    "Content-type":"application/json"
                }
            }

            const {data} = await axios.post("/api/user",{name,email,password,pic} , config)

            toast({
                title: "registration is successfull",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom"

            })    

            localStorage.setItem("userInfo" , JSON.stringify(data))
            
            setLoading(false)

            history.push('/chats')

        } catch (error) {
            
            setLoading(false)

            toast({
                title: "error",
                status: "warning",
                description:error.response.data.message,
                duration: 3000,
                isClosable: true,
                position: "bottom"

            })    

        }


    }
        
  return (
    <VStack spacing='5px'>
         
         <FormControl id='name' isRequired>
             <FormLabel>Name</FormLabel>
             <Input placeholder='enter your name'
             onChange={ (e)=>{
                setName(e.target.value) 
             } } 
             />
         </FormControl>

         <FormControl id='email' isRequired>
             <FormLabel>Email</FormLabel>
              <Input placeholder='enter your email'
             onChange={ (e)=>{
                setEmail(e.target.value) 
             } }
             />
         </FormControl>

         <FormControl id='password' isRequired>
             <FormLabel>Password</FormLabel>

             <InputGroup>
             
              <Input 
             type={ show?"Show":"password"}
             placeholder='enter your password'
             onChange={ (e)=>{
                setPassword(e.target.value) 
             } }
             />
             <InputRightElement width="4.5rem">

                <Button h="1.75rem" size="sm" onClick={()=>setShow(!show)}>
                    {show?"Hide":"Show"}
                </Button>

             </InputRightElement>
             </InputGroup>
         </FormControl>

         <FormControl id='confirmPassword' isRequired>
             <FormLabel>Confirm password</FormLabel>

             <InputGroup>
             
              <Input 
             type={ show2?"Show":"password"}
             placeholder='confirm your password'
             onChange={ (e)=>{
                setConfirmPassword(e.target.value) 
             } }
             />
             <InputRightElement width="4.5rem">

                <Button h="1.75rem" size="sm" onClick={()=>setShow2(!show2)}>
                    {show2?"Hide":"Show"}
                </Button>

             </InputRightElement>
             </InputGroup>
         </FormControl>

          <FormControl id='pic'>
              <FormLabel>Upload your picture</FormLabel>
              <Input type='file'
              p={1.5}
              accept="image/*"
                  onChange={(e) => {
                      postDetails(e.target.files[0])
                  }}
              />
          </FormControl>

          <Button 
          colorScheme="blue"
          width="100%"
          style={{marginTop:15}}
          onClick={submitHandler}
          isLoading={Loading}
          >
            Sign up
          </Button>


    </VStack>
  )
}

export default Signup