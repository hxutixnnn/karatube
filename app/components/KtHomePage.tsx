"use client";

import {
  AppShell,
  Input,
  ScrollArea,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { searchAction } from "../actions/search.action";
import { KtBottomNavigation } from "./KtBottomNavigation";
import { KtGridResults } from "./KtGridResults";
import { KtHeader } from "./KtHeader";
import { KtVideoPlayer } from "./KtVideoPlayer";
import { useVideoId } from "../hooks/useVideoId";

function KtSearchableHeader({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <KtHeader>
      <Input
        name="query"
        required
        variant="filled"
        w="100%"
        radius="xl"
        placeholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..."
        rightSection={<IconSearch size={16} />}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        inputMode="search"
        onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
      />
    </KtHeader>
  );
}

function MobileLayout({
  VideoPlayerComponent,
  SearchComponent,
}: {
  VideoPlayerComponent: React.ReactNode;
  SearchComponent: React.ReactNode;
}) {
  const { width } = useViewportSize();
  return (
    <AppShell
      header={{ height: (width * 9) / 16, collapsed: false }}
      footer={{ height: 65, collapsed: false }}
      p="xs"
    >
      <AppShell.Header>{VideoPlayerComponent}</AppShell.Header>

      <AppShell.Main>{SearchComponent}</AppShell.Main>

      <AppShell.Footer>
        <KtBottomNavigation />
      </AppShell.Footer>
    </AppShell>
  );
}

export function KtHomePage() {
  const [query, setQuery] = useState("");
  const [{ data, error }, formAction] = useFormState(searchAction, {
    // TODO: init data on first load
    data: [],
    error: null,
  });
  const theme = useMantineTheme();
  const mobileBreakpoint = theme.breakpoints.xs;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint})`);
  const [videoId] = useVideoId();

  if (error) return <Title c="red">{JSON.stringify(error)}</Title>;

  const videoPlayer = videoId ? <KtVideoPlayer videoId={videoId} /> : null;
  const searchHeader = (
    <KtSearchableHeader value={query} onChangeText={setQuery} />
  );
  const searchResults = <KtGridResults videos={data} />;

  if (isMobile) {
    return (
      <MobileLayout
        VideoPlayerComponent={videoPlayer}
        SearchComponent={
          <form action={formAction}>
            {searchHeader}
            <Title order={3}>Karaoke Youtube Mới Nhất</Title>
            {searchResults}
          </form>
        }
      />
    );
  }

  return (
    <AppShell
      navbar={{
        width: 400,
        breakpoint: mobileBreakpoint,
      }}
    >
      <AppShell.Main>{videoPlayer}</AppShell.Main>

      <form action={formAction}>
        <AppShell.Navbar withBorder={false} p="xs" visibleFrom="xs">
          <AppShell.Section>{searchHeader}</AppShell.Section>

          <AppShell.Section grow my="xs" component={ScrollArea} scrollbars="y">
            <Stack>
              {/* <Box p="0">
                <FeaturedVideosCarousel
                  data={data.map((item) => ({
                    title: item.title,
                    image: item.thumbnails[0].url,
                    category: item.channelName ?? "Unknown",
                    badge: "MỚI",
                  }))}
                />
              </Box> */}
              <Title order={3}>Karaoke Youtube Mới Nhất</Title>
              {searchResults}
            </Stack>
          </AppShell.Section>

          <AppShell.Section my="-16">
            <KtBottomNavigation />
          </AppShell.Section>
        </AppShell.Navbar>
      </form>
    </AppShell>
  );
}
