import { MenuDivider, Avatar, AvatarBadge, AvatarGroup, MenuItem, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Input, Menu, Text, Box, Tooltip, Button, MenuButton, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon, BellIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './profileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';

const SideDrawer = () => {

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = ChatState()
  const toast = useToast()

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('login')
  }

  const accessChat = (userId) => {
    
  }
  const handleSearch = async () => {


    if (!search) {
      toast({
        title: "please type name or email",
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "top-left"
      })
      return
    }

    try {

      setLoading(true)

      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(`/api/user?search=${search}`,config)
      console.log(searchResult)
      setSearchResult(data)
      setLoading(false)

    } catch (error) { 

      setLoading(false)

      toast({
        title: "error",
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      })

    }

  }


  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' bg='white' w='100%' p='0.5rem 1rem 0.5rem 1rem' borderWidth='5px'>

        <Tooltip label='Search users to chat' hasArrow placement='bottom-end'>

          <Button variant='ghost' onClick={onOpen}>

            <i class="fa-solid fa-magnifying-glass"></i>

            <Text d={{ base: "none", md: 'flex' }} px='.6rem'>
              Search Users
            </Text>

          </Button>

        </Tooltip>

        <Text fontSize='2xl'>
          Chat App
        </Text>

        <div>

          <Menu>

            <MenuButton p='1px'>

              <BellIcon fontSize='1.5rem' />

            </MenuButton>
            {/* <MenuList></MenuList> */}

          </Menu>

          <Menu>

            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}>
              </Avatar>
            </MenuButton>

            <MenuList>

              <ProfileModal user={user} >
                {/* <MenuItem>My Profile</MenuItem> */}
              </ProfileModal>

              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>

            </MenuList>

          </Menu>

        </div>

      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>

        <DrawerOverlay />

        <DrawerContent>

          <DrawerHeader borderBottomWidth='1px'>
            Search Users
          </DrawerHeader>

          <DrawerBody>

            <Box display='flex'>

              <Input placeholder='Search by name or email'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button onClick={handleSearch}>go</Button>

            </Box>

            {loading?(<ChatLoading/>):(

              searchResult?.map(user => 
                
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
                />

                )

            )
            
            }

          </DrawerBody>

        </DrawerContent>

      </Drawer>


    </>
  )
}

export default SideDrawer