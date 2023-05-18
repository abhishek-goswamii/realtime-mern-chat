import React from 'react'
import { Container, Box, Text, TabList, Tab, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Homepage = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
      const user =  JSON.parse( localStorage.getItem('userInfo'))
      if(user){
        navigate('/chats')
      }
  }, [navigate])

  return (
    
    <Container maxW="xl" centerContent >

        <Box display="flex" p={3} bg={'white'} w='100%' justifyContent="center" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" >
          <Text fontSize={'4xl'} fontFamily="Work Sans">Full Stack Chat Web App</Text>
        </Box>

        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs size='md' variant='enclosed'>
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>

    </Container>

  )
}

export default Homepage