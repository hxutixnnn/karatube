"use client";

import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function ThemeToggleIconButton(props: ActionIconProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon {...props} onClick={toggleColorScheme}>
      {computedColorScheme === "dark" ? <IconSunFilled /> : <IconMoonFilled />}
    </ActionIcon>
  );
}
