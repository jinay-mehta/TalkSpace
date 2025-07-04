import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {Spinner} from "@chakra-ui/spinner"
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import axios from "axios";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import { ChatState } from "../../Context/ChatProvider";
import { Toast, useToast } from "@chakra-ui/react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

const toast=useToast()
const {user,setSelectedChat,chats,setChats,notification,setNotification, setUser} = ChatState();
const history=useHistory();
const { isOpen ,onOpen,onClose} = useDisclosure();

    const logoutHandler=()=>{
        localStorage.removeItem("userInfo");
        setUser(null);
        history.push("/");
    }
    const handleSearch=async()=>{
        if(!search){
            toast({
              title: "Please Enter something in search",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom-right",
            });
            return;
        }
        try{
            setLoading(true);

            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        }catch(error){
            toast({
              title: "Error Occured!",
              description: "Failed to Load the Search Results",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId) => {
      console.log(userId);

      try {
        setLoadingChat(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
      } catch (error) {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // bg="#F5F5DC"
        bg="#6495ED"
        // bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <div>
          <Menu>
            <MenuButton
              bg="white"
              size="lg"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar size="sm" cursor="pointer" name={user.name} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1}>
              <BellIcon color="black" fontSize="2xl" m="3px" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <Text color="white" fontSize="5xl" fontFamily="Ubuntu">
          TalkSpace !
        </Text>
        <Tooltip
          label="Search People to connect"
          hasArrow
          placement="bottom-end"
        >
          <Button bg="white" variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text
              fontFamily="Ubuntu"
              display={{ base: "none", md: "flex" }}
              px={5}
            >
              Search Services
            </Text>
          </Button>
        </Tooltip>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Service</DrawerHeader>
            <DrawerBody>
              <Box display="flex" paddingBottom="2px">
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
