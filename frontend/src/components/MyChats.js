import React from 'react'
import { ChatState } from '../context/ChatProvider';
import { useState, useEffect } from 'react';
import { Text, useToast, Box, Button, Stack, Avatar } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/chatLogics';
import GroupChatModal from './miscellaneous/GroupChatModel';

const MyChats = () => {

  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()

  const toast = useToast()

  const groupChaticon = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fvector%2Fchat-icon-people-chat-icon-group-chat-icon-gm1277134944-376430976&psig=AOvVaw25aLR7UVUsvwK-jIjM_Q34&ust=1671371585411000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOC7o8HmgPwCFQAAAAAdAAAAABAL'


  function tempp() {
    console.log("grp")
  }

  const fetchChats = async () => {
    
  

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get('api/chat', config)
      setChats(data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats()
  }, []);

  return ( 


    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="1g"
      borderWidth="1px"
    >

      <Box
        pb={3}
        px={3}
        fontSize={{ base: "2rem", md: "1.5rem" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats

        <GroupChatModal>

          <Button
          display="flex"
          fontSize={{ base: '1rem', md: '1.5px', lg: '1rem' }}
          rightIcon={<AddIcon />}
          >
          Create group chat
          </Button>
        
        </GroupChatModal>

      </Box>

      <Box

      display="flex" 
      flexDir="column"
      p={3} 
      bg="#F8F8F8" 
      w="100%"
      h="100%"
      borderRadius="1g"
      overflowy="hidden"

      >

        
        {chats?(
        
        <Stack overflowY='scroll'>

          {chats.map((chat) => (
           
           <Box
           
           onClick={ () => setSelectedChat(chat) }
           cursor="pointer"
           bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} 
           color={selectedChat === chat ? "white" : "black"}
           px={3}
           display="flex"
           flex-dir='row'
           justifyContent='left'
           py={2}
           borderRadius="1g"
           key={chat._id} 
           
           >

            <Avatar size='sm' src={chat.isGroupChat?({tempp}):(getSender(loggedUser,chat.users).pic)} ml='1rem' mr='2rem'/>
            
            <Text> 
            
            {chat.isGroupChat?(chat.chatName):getSender(loggedUser,chat.users).name}

           </Text> 

          </Box>
          
          ) )}

        </Stack>

        ):(<ChatLoading/>)}


    </Box>


    </Box >

  )
}

export default MyChats