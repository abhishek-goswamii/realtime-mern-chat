import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ChatProvider, { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import useContext from 'react'


const Chatpage = () => {
  
    const {user} = ChatState()
    
  return (
      
      <div style={{width:"100%"}}>
           
           {user&&<SideDrawer/>}

           <Box
            
            display='flex'
            justifyContent='space-between'
            w='100%'
            h='91.5vh'

           >
              
              {user&&<MyChats/>}
              {user&&<ChatBox/>}

           </Box>

      </div>
  )
}

export default Chatpage