"use client";

import {
  AppShell,
  Group,
  Image,
  Input,
  NavLink,
  ScrollArea,
  Stack,
  Title
} from "@mantine/core";
import {
  IconFlame,
  IconHeart,
  IconHome,
  IconList,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { searchAction } from "../actions/search.action";
import { KtBottomNavigation } from "./KtBottomNavigation";
import { KtGridResults } from "./KtGridResults";
import { KtHeader } from "./KtHeader";
import { KtVideoPlayer } from "./KtVideoPlayer";

export function KtHomePage() {
  const [query, setQuery] = useState("");
  const [videoId, setVideoId] = useState("");
  const [{ data, error }, formAction] = useFormState(searchAction, {
    // TODO: init data on first load
    data: [],
    error: null,
  });

  if (error) return <Title c="red">{JSON.stringify(error)}</Title>;

  // const [opened, { toggle }] = useDisclosure();
  // const theme = useMantineTheme();
  // const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  // const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  // const showNav = isMobile;
  // const bottomNavSize = 65;
  return (
    <AppShell
      // layout="alt"
      // header={{ height: isMobile ? 106 : 56, collapsed: false }}
      // footer={{ height: bottomNavSize, collapsed: false }}
      navbar={{
        width: 320,
        breakpoint: "xs",
        // collapsed: { mobile: true },
      }}
      // aside={{
      //   width: 300,
      //   breakpoint: "xs",
      //   collapsed: { desktop: false, mobile: true },
      // }}
    >
      <AppShell.Main>
        {videoId ? (
          <KtVideoPlayer videoId={videoId} />
        ) : (
          <Image
            src="https://placehold.co/600x400?text=[Video Player Here]"
            alt="Video Player Here"
          />
        )}
      </AppShell.Main>
      <form action={formAction}>
        <AppShell.Navbar withBorder={false} p="xs">
          <AppShell.Section>
            <KtHeader>
              <Input
                name="query"
                required
                variant="filled"
                w="100%"
                radius="xl"
                placeholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..."
                rightSection={<IconSearch size={16} />}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </KtHeader>
          </AppShell.Section>
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
              <KtGridResults videos={data} onChange={setVideoId} />
            </Stack>
          </AppShell.Section>
          <AppShell.Section my="-16">
            <KtBottomNavigation />
          </AppShell.Section>
          {/* <BottomNavigation vertical /> */}
        </AppShell.Navbar>
      </form>
    </AppShell>
  );
}
