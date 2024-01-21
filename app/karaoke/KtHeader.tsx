"use client";

import { ActionIcon, Group, GroupProps, Input } from "@mantine/core";
import {
  IconBellFilled,
  IconSearch,
  IconUserFilled,
} from "@tabler/icons-react";
import { KtLogo } from "../components/logo/KtLogo";
import useIsMobile from "../hooks/useIsMobile";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";

function useSearchQuery(queryParamKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useDebouncedState(searchParams.get(queryParamKey) ?? "", 500);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(`${pathname}?${createQueryString(queryParamKey, query)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {
    query,
    setQuery,
  };
}

export const KtHeader = ({
  searchPlaceholder,
  ...props
}: {
  searchPlaceholder?: string;
} & GroupProps) => {
  const isMobile = useIsMobile();
  const { query, setQuery } = useSearchQuery('q');

  return (
    <Group
      justify="space-between"
      wrap={isMobile ? "wrap" : "nowrap"}
      {...props}
    >
      <KtLogo />
      <Input
        style={{ order: isMobile ? 2 : 1 }}
        variant="filled"
        placeholder={searchPlaceholder}
        w={isMobile ? "100%" : "50%"}
        radius="xl"
        rightSection={<IconSearch size={16} />}
        defaultValue={query}
        onChange={({ target: { value } }) => setQuery(value)}
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
