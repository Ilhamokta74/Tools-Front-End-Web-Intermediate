import { Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      h="4rem"
      bg="teal.900"
      w="100%"
      position="fixed"
      top={0}
      zIndex={200}
    >
      <Heading as="h1" fontSize="3xl">
        <Link as={RouterLink} to="/" color="white">
          Dicoding Forum App
        </Link>
      </Heading>
    </Flex>
  );
}
