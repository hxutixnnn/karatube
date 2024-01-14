import {
  Box,
  Group,
  GroupProps,
  Paper,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";

export const KtLogo = (props: GroupProps) => (
  <Link href="/" passHref>
    <UnstyledButton>
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
    </UnstyledButton>
  </Link>
);
