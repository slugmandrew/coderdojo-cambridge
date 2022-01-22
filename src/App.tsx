import React from 'react';
import { Container, Flex, Heading, VStack, Text, Link } from "@chakra-ui/react";
import data from "./Data"

function App() {


  return (
    <Container maxW={"container.xl"} bgColor={"gray.50"}>
      <Flex padding={10}>
        <VStack w={"full"} h={"full"}>
          <Heading size={"2xl"}>CoderDojo Cambridge</Heading>
          <Flex>
            <Heading size={"lg"} paddingY={3}>Projects List</Heading>
          </Flex>

          {data.map(proj => (
            <>
              <Heading size={"md"} paddingY={3}>{proj.title}</Heading>
              <Text>{proj.language}</Text>
              <Link href={proj.url} target={"_blank"}>{proj.url}</Link>
            </>

          ))}

        </VStack>
      </Flex>
    </Container>
  );
}

export default App;
