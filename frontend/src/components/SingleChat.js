import React from 'react'
import { ChatState } from '../context/ChatProvider';
import { Text, Box, Spinner, IconButton, FormControl, Input } from '@chakra-ui/react';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModel';
import ProfileModal from './miscellaneous/profileModal';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from '../config/chatLogics';

const SingleChat = ({fetchAgain,setFetchAgain}) => {

    const {user,selectedChat,setSelectedChat} = ChatState()
      

    return (
    
    <>
        
        {selectedChat?(
            
            
            <>

              
              <Text 
              
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
              >

                <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat('')}
            
                />

                {selectedChat.isGroupChat ? (<>{selectedChat.chatName.toUpperCase()}
                
                <UpdateGroupChatModal
                    // fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />

                </>):(<>
                
                {
                    getSender(user,selectedChat.users).name
                }

                <ProfileModal user={getSender(user,selectedChat.users)} />
                
                </>)}

              </Text>



              <Box 
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                >
                Messages here
              </Box>


            </>

            )
        
        :
        
        (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a chat to start chatting
            </Text>

      </Box>)
      }

    </>

    )

}

export default SingleChat