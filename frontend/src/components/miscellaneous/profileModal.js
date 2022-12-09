import { ViewIcon } from '@chakra-ui/icons'
import {Text,Image, IconButton, Modal, Button, ModalBody , ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

import React from 'react'


const ProfileModal = ({user,children}) => { 
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        {
            children?(<span onClick={onOpen}>{children}</span>)
            :(
              <IconButton
                display="flex"
                icon= {<ViewIcon/>}
                onClick={onOpen} 
              />
            )
        }
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        
        <ModalContent>
          
          <ModalHeader
          fontSize='3rem'
          display='flex'
          justifyContent='center'
          >{user.name}
          
          </ModalHeader>
          
          <ModalCloseButton />
          
          <ModalBody>
            
            <Image
            display='flex'
            m='auto'
            borderRadius='fill'

            boxSize='12rem'
            src={user.pic}
            alt={user.name}

            >

            </Image>

            <Text
              
              m='auto'
              fontSize='1.5rem' 
              display='flex'
              justifyContent='center'

              >
              {user.email}

            </Text>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>

        </ModalContent>

      </Modal>
    </>
  )
}

export default ProfileModal