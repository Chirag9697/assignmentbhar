import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useEffect } from "react";
import { db } from "./firebase";
import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
export default function Tabledata() {
  const [alluser, setAllUser] = useState([]);
  const { isOpen:iseditopen, onOpen:oneditopen, onClose:oneditclose } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isdeleteopen, onOpen:ondeleteopen, onClose:ondeleteclose } = useDisclosure()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const cancelRef = React.useRef()
  const [alluserdetails,setAlluserdetails]=useState({name:"",email:"",age:0,city:""});
  const[gender,setGender]=useState("");
  const[updatedetails,setUpdateDetails]=useState({});
  const collectionref = collection(db, "users");
  const toast = useToast()
  const[deleteid,setDeleteid]=useState("");
  const handlechange=(e)=>{
    setAlluserdetails({
      ...alluserdetails
    ,

      [e.target.name]:
         e.target.value,
    });
  }
  const getallusers = async () => {
    try {
      const data = await getDocs(collectionref);
      const alldata = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      console.log(alldata);
      setAllUser(alldata);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteuser = async (id) => {
    try {
      console.log(id);
      const user = doc(db, "users", id);
      const data = await deleteDoc(user);
      console.log(data);
      getallusers();
      ondeleteclose()
      toast({
        title: 'user details deleted',
        description: "We've deleted user data",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err);
    }
  };
  const handleadduserdetails=async(e)=>{
    e.preventDefault();
    try{
      const data=await addDoc(collectionref,{...alluserdetails,gender:gender});
      console.log(data);
      onClose();
      getallusers();
      toast({
        title: 'new user',
        description: "We have added new user details",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }catch(err){
      console.log(err);
    }

  }
  const handlingdelete=(id)=>{
    setDeleteid(id);
    ondeleteopen();
   
  }
  const handlingedit=(alluser)=>{
    setUpdateDetails(alluser);
    setAlluserdetails(alluser);
    setGender(alluser.gender);
    oneditopen(); 
  }
  const handleupdateuserdetails=async(e)=>{
    e.preventDefault();
    try{
      
      const user=doc(db,"users",alluserdetails.id);
      const data=await updateDoc(user,{...alluserdetails,gender:gender});
      oneditclose();
      toast({
        title: 'user updated',
        description: "We've updated user data",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      getallusers();
      // console.log(data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getallusers();
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th style={{ textAlign: "center" }}>Name</Th>
              <Th style={{ textAlign: "center" }}>Age</Th>
              <Th style={{ textAlign: "center" }}>Email</Th>
              <Th style={{ textAlign: "center" }}>Gender</Th>
              <Th style={{ textAlign: "center" }}>City</Th>
              <Th style={{ textAlign: "center" }}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alluser.map((alluser) => {
              return (
                <Tr key={alluser.id}>
                  <Td style={{ textAlign: "center" }}>{alluser.name}</Td>
                  <Td style={{ textAlign: "center" }}>{alluser.age}</Td>
                  <Td style={{ textAlign: "center" }}>{alluser.email}</Td>
                  <Td style={{ textAlign: "center" }}>{alluser.gender}</Td>
                  <Td style={{ textAlign: "center" }}>{alluser.city}</Td>
                  <Td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        colorScheme="red"
                        style={{ marginRight: "20px" }}
                        onClick={()=>handlingdelete(alluser.id)}
                      >
                        Delete
                      </Button>
                      <Button colorScheme="blue" onClick={()=>handlingedit(alluser)}>Edit</Button>
                    </div>
                  </Td>
                
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button colorScheme="blue" onClick={onOpen}>
          ADD USERS
        </Button>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleadduserdetails}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter name</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  onChange={handlechange}
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>enter your email</FormLabel>
                <Input name="email" onChange={handlechange} placeholder="enter your email" type="email" required />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>enter your age</FormLabel>
                <Input name="age" min="1" onChange={handlechange} placeholder="enter your age" type="number" required />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>enter your city</FormLabel>
                <Input name="city" onChange={handlechange} placeholder="enter your city" type="text" required />
              </FormControl>
              <RadioGroup name="gender" style={{marginTop:"20px"}} onChange={(e)=>setGender(e)}>
                <Stack direction="row">
                  <Radio value="female">male</Radio>
                  <Radio value="male">female</Radio>
                </Stack>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={iseditopen}
        onClose={oneditclose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleupdateuserdetails}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter name</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  onChange={handlechange}
                  defaultValue={updatedetails.name}
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>enter your email</FormLabel>
                <Input name="email" onChange={handlechange} defaultValue={updatedetails.email} placeholder="enter your email" type="email" required />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>enter your age</FormLabel>
                <Input name="age" min="1" onChange={handlechange} defaultValue={updatedetails.age} placeholder="enter your age" type="number" required />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>enter your city</FormLabel>
                <Input name="city" onChange={handlechange} defaultValue={updatedetails.city} placeholder="enter your city" type="text" required />
              </FormControl>
              <RadioGroup name="gender" style={{marginTop:"20px"}} defaultValue={updatedetails.gender} onChange={(e)=>setGender(e)}>
                <Stack direction="row">
                  <Radio value="male">male</Radio>
                  <Radio value="female">female</Radio>
                </Stack>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} >
                Update
              </Button>
              <Button onClick={oneditclose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isdeleteopen}
        leastDestructiveRef={cancelRef}
        onClose={ondeleteclose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete user details
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={ondeleteclose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>deleteuser(deleteid)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      
    </>
  );
}
