"use client";

import {
  ActionIcon,
  Group,
  Stack,
  StackProps
} from "@mantine/core";
import {
  IconBellFilled,
  IconUserFilled
} from "@tabler/icons-react";
import { PropsWithChildren } from "react";
import { KtLogo } from "./logo/KtLogo";

export const KtHeader = ({
  children,
  ...props
}: PropsWithChildren<StackProps>) => {
  return (
    <Stack gap="xs" {...props}>
      <Group justify="space-between" wrap="wrap">
        <KtLogo />
        <Group gap="xs">
          <ActionIcon variant="light" size="lg" color="gray.6" radius="xl">
            <IconBellFilled />
          </ActionIcon>
          <ActionIcon variant="light" size="lg" color="gray.6" radius="xl">
            <IconUserFilled />
          </ActionIcon>
        </Group>
      </Group>

      {children}
    </Stack>
  );
};
