import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Avatar, Box, Text } from '@chakra-ui/react';

function UserListItem({user, handleFunction }) {


  return (
    <>

      <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#E8E8E8'
      _hover={{
        background:'#38B2AC',
        color:'white'
      }}
      w='100%'
      display='flex'
      alignItem='center'
      color='black'
      py='3'
      px='2'
      mb='2'
      borderRadius='1g'
      >

      <Avatar
      mr='2'
      size='sm'
      cursor='pointer'
      name={user.name}
      src={user.pic}
      />

      <Box>
        <Text> Name: {user.name}</Text>
        <Text fontSize='xs'>
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
      </Box>


    </>
  )
}

export default UserListItem