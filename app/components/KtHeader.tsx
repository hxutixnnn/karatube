"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconBellFilled, IconUserFilled } from "@tabler/icons-react";
import { KtLogo } from "./logo/KtLogo";

export const KtHeader = () => {
  return (
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
  );
};
