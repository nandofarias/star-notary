import React from 'react';
import { Box, Button, Layer, Text } from 'grommet';
import { Close } from 'grommet-icons';

const Toast = ({ text, background, onClose, render }) =>
  render && (
    <Layer modal={false} full="horizontal" position="top">
      <Box
        background={background}
        pad="small"
        direction="row"
        justify="between"
        align="center"
      >
        <Text size="large">{text}</Text>
        <Button icon={<Close />} onClick={onClose} />
      </Box>
    </Layer>
  );

export default Toast;
