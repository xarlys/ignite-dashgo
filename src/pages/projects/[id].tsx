import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export default function ProjectId(){
  //const { data, isLoading, isFetching } = useProject('20');
  //console.log(data);
  
  return(
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <h1>Hello</h1>
      </Flex>
    </Box>
  )
}

