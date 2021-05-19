import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
  showProfileData?: boolean;
}

export function Profile({showProfileData}: ProfileProps){
  return(
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Xarlys Souza</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            xarlysouza@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Xarlys Souza" src="https://github.com/xarlys.png" />          
    </Flex>
  );
}