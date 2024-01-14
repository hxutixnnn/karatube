import {
  Box,
  Group,
  GroupProps,
  Paper,
  Text,
  UnstyledButton
} from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";

export const KtLogo = (props: GroupProps) => (
  <Link href="/" passHref>
    <UnstyledButton>
      <Group gap="xs" align="center" {...props}>
        <Paper px="8" py="4" bg="blue.7" radius="md" c="white" display="flex">
          <IconPlayerPlayFilled size={16} />
        </Paper>
        <Box>
          <Text component="span" c="blue.7" fz="xl" fw="bold">
            Kara
          </Text>
          <Text component="span" c="red.7" fz="xl" fw="bold">
            Tube
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  </Link>
);
