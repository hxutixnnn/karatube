import { Group, Paper, Title } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export const KaraTubeLogo = () => (
  <Group gap={0} align="center">
    <Paper
      px="sm"
      py="xs"
      bg="red.8"
      mr="xs"
      radius="md"
      c="white"
      display="flex"
    >
      <IconPlayerPlayFilled />
    </Paper>
    <Title c="blue.8">Kara</Title>
    <Title c="red.8">Tube</Title>
  </Group>
);
