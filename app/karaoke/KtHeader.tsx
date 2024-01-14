import { ActionIcon, Group, GroupProps, Input } from "@mantine/core";
import {
  IconBellFilled,
  IconSearch,
  IconUserFilled,
} from "@tabler/icons-react";
import { KtLogo } from "../components/logo/KtLogo";
import useIsMobile from "../hooks/useIsMobile";

export const KtHeader = ({
  searchPlaceholder,
  ...props
}: {
  searchPlaceholder?: string;
} & GroupProps) => {
  const isMobile = useIsMobile();
  return (
    <Group justify="space-between" wrap={isMobile ? "wrap" : "nowrap"} {...props}>
      <KtLogo />
      <Input
        style={{ order: isMobile ? 2 : 1 }}
        variant="filled"
        placeholder={searchPlaceholder}
        w={isMobile ? "100%" : "50%"}
        radius="xl"
        rightSection={<IconSearch size={16} />}
      />
      <Group style={{ order: isMobile ? 1 : 2 }}>
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
