// NotFound.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
    >
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text mb={6}>The page you are looking for does not exist.</Text>
      <Button
        colorScheme="teal"
        onClick={() => history.push('/')} // Redirect to home
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
