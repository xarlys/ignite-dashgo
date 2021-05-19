import { Text } from "@chakra-ui/react";

export function Logo(){
  return(
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      width="64"
    >
      Ton<Text as="span" color="pink.500">yB</Text>rand
      <Text as="span" marginLeft="1" color="pink.500">.</Text>
    </Text>
  );
}