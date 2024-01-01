import { GroupProps, StackProps, Stack, Group } from "@mantine/core";
import useIsMobile from "../../hooks/useIsMobile";

export const GroupMobileStack = (props: GroupProps | StackProps) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Stack {...(props as StackProps)} />
  ) : (
    <Group {...(props as GroupProps)} />
  );
};

export const StackMobileGroup = (props: GroupProps | StackProps) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Group {...(props as GroupProps)} />
  ) : (
    <Stack {...(props as StackProps)} />
  );
};