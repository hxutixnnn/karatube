import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function useIsMobile() {
  const theme = useMantineTheme();
  return useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
}