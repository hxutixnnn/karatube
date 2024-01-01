import { Box, Group, GroupProps, Paper, Text } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export const KaraTubeLogo = (props: GroupProps) => (
  <Group gap="xs" align="center" {...props}>
    <Paper px="8" py="4" bg="red" radius="md" c="white" display="flex">
      <IconPlayerPlayFilled size={16} />
    </Paper>
    <Box>
      <Text component="span" c="blue" fz="xl" fw="bold">
        Kara
      </Text>
      <Text component="span" c="red" fz="xl" fw="bold">
        Tube
      </Text>
    </Box>
  </Group>
);
