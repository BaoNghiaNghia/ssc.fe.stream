/* eslint-disable */
import React from 'react';
import { Box, useStyleConfig } from "@chakra-ui/react";

function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest} borderRadius={7}>
      {children}
    </Box>
  );
}

export default Card;
