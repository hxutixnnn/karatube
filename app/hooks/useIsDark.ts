import { useComputedColorScheme } from "@mantine/core";

export default function useIsDark() {
  return useComputedColorScheme("light", { getInitialValueInEffect: true }) === 'dark';
}
