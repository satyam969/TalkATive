import { ViewIcon } from "@chakra-ui/icons"
import { Image,Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from "@chakra-ui/react"




const ProfileModel = ({user,children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  

  return (
    <>
      {children?<span onClick={onOpen}>{children}</span>:
      (
        // to display eye model
        <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
      )
      }

<Modal
size="lg"
 isCentered

isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
          fontSize="40px" 
          d="flex"
          justifyContent="centre"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex"
          flexDir="column"
          alignItems="centre"
          justifyContent="space-between"
          >
<Image 
borderRadius="full"
boxSize="150px"
src={user.profile_pic}
alt={user.name}  />
<Text
fontSize={{base:"28px",md:"30px"}}
fontFamily="Work sans"
>
    Email:{user.email}
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

export default ProfileModel
