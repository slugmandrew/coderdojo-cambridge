import React from "react";
import {
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Link,
  Box,
  Image,
} from "@chakra-ui/react";
import data from "./Data";
import logo from "./coderdojo-cambridge-logo.png";

function App() {
  return (
    <Container maxW={"container.xl"} bgColor={"gray.50"} h={"100vh"}>
      <Flex w={"full"} h={"full"} padding={10}>
        <VStack spacing={10} ali w={"full"} h={"full"}>
          <Image src={logo} w={200} />

          <Heading size={"2xl"}>CoderDojo Cambridge</Heading>
          <Heading size={"lg"} paddingY={3}>
            <Link
              href={"https://coderdojo-cambridge.herokuapp.com/"}
              target={"_blank"}
            >
              coderdojo-cambridge.herokuapp.com
            </Link>
          </Heading>

          <VStack spacing={2} ali w={"full"} h={"full"}>
            {data.map((proj) => (
              <Box w={"xl"} key={proj.title}>
                <Heading size={"md"} paddingY={3}>
                  {proj.title}
                </Heading>
                <Text>{proj.language}</Text>
                <Link href={proj.url} target={"_blank"}>
                  {proj.url}
                </Link>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;
