import { ActionIcon, Group, Input } from "@mantine/core";
import {
  IconBellFilled,
  IconSearch,
  IconUserFilled,
} from "@tabler/icons-react";
import { KaraTubeLogo } from "../components/logo/karatube";

export const MainHeader = ({
  searchPlaceholder,
}: {
  searchPlaceholder?: string;
}) => (
  <Group justify="space-between" wrap="nowrap">
    {/* <KaraTubeLogo /> */}
    <Input
      variant="filled"
      placeholder={searchPlaceholder}
      w="50%"
      radius="xl"
      rightSection={<IconSearch size={16} />}
    />
    <Group>
      <ActionIcon variant="light" size="lg" color="gray.6" radius="xl">
        <IconBellFilled />
      </ActionIcon>
      <ActionIcon variant="light" size="lg" color="gray.6" radius="xl">
        <IconUserFilled />
      </ActionIcon>
    </Group>
  </Group>
);
