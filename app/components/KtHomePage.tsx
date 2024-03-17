"use client";

import {
  AppShell,
  AspectRatio,
  Box,
  Card,
  Center,
  Container,
  Group,
  Image,
  Input,
  Loader,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  FormStatus as TFormStatus,
  useFormState,
  useFormStatus,
} from "react-dom";
import { youtubeSearch, youtubeSearchAction } from "../actions/search.action";
import { KtBottomNavigation } from "./KtBottomNavigation";
import { KtHeader } from "./KtHeader";
import { KtVideoPlayer } from "./KtVideoPlayer";
import classes from "./home.module.css";
import { useQuery } from "@tanstack/react-query";

const INIT_QUERY = "official beat chuẩn";

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

function FormStatus({
  children,
}: {
  children: (props: TFormStatus) => React.ReactNode;
}) {
  const props = useFormStatus();
  return children(props);
}

interface YtSearchData {
  id: string;
  title: string;
  thumbnail: string;
}

export function KtHomePage() {
  // { initialData }: { initialData: YtSearchData[] }
  const [videoId, setVideoId] = useState("");
  // const [initData, setInitData] = useState<YtSearchData[]>([]);

  // useEffect(() => {
  //   async function getInitData() {
  //     const res = await youtubeSearch('mới');
  //     if (res) setInitData(res);
  //   }

  //   if (!data) getInitData();
  // }, [data]);

  const { data: initialData, isFetching } = useQuery<YtSearchData[]>({
    queryKey: ["videos"],
    queryFn: () => youtubeSearch(INIT_QUERY),
  });

  const [{ data = initialData, error }, formAction] = useFormState<
    { data?: YtSearchData[] | null; error: any },
    FormData
  >(youtubeSearchAction, {
    // TODO: init data on first load
    data: undefined,
    error: undefined,
  });

  return (
    <Container
      p={{ base: "xs" }}
      mah="100vh"
      //styles={{ root: { position: "relative", overflow: "hidden" } }}
    >
      <Stack gap="xs" h="100%"
      // styles={{ root: { overflow: "hidden" } }}
      >
        <KtHeader />
        <Group
          wrap="nowrap"
          align="start"
          // cols={{ base: 1, md: 2 }}
          // style={{ border: "1px solid red" }}
        >
          <Box flex={2}>
            <Card withBorder p={0}>
              <AspectRatio ratio={16 / 9}>
                {videoId ? (
                  <KtVideoPlayer videoId={videoId} />
                ) : (
                  <Center c="dimmed">Select video to start</Center>
                  // <Image
                  //   src="https://placehold.co/160x90?text=Select+video+to+start+->"
                  //   alt="Video Player Here"
                  // />
                )}
              </AspectRatio>
            </Card>
          </Box>
          {/* <Box
            pos="relative"
            h="calc(100vh - var(--mantine-spacing-xs) * 4 - 52px)"
          > */}
          <Stack flex={1} h="720" styles={{ root: { overflow: "hidden" } }}>
            <form action={formAction}>
              <FormStatus>
                {({ pending }) => (
                  <Input
                    name="query"
                    required
                    autoFocus
                    variant="default"
                    w="100%"
                    placeholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..."
                    leftSection={<IconSearch size={16} />}
                    rightSection={pending && <Loader size="sm" />}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="search"
                    onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
                    // mb="md"
                  />
                )}
              </FormStatus>
            </form>
            <Card withBorder p="0" h="100%">
              <ScrollArea h="100%" scrollbarSize="8">
                <Box p="8">
                {isFetching && (
                  <Center p="md">
                    <Loader />
                  </Center>
                )}
                {data?.map((item) => (
                  <Group
                    p="xs"
                    wrap="nowrap"
                    key={item.id}
                    onClick={() => setVideoId(item.id)}
                    align="start"
                    classNames={classes}
                    data-active={videoId === item.id}
                  >
                    <Image
                      radius="md"
                      src={item.thumbnail}
                      alt={item.title}
                      h="52"
                    />
                    <Text lineClamp={3} size="xs">
                      {item.title}
                    </Text>
                  </Group>
                ))}
                </Box>
              </ScrollArea>
            </Card>
            {/* </Box> */}
          </Stack>
        </Group>
      </Stack>
    </Container>
  );
}

// export function KtHomePageDeprecated() {
//   const [query, setQuery] = useState("");
//   const [{ data, error }, formAction] = useFormState(searchAction, {
//     // TODO: init data on first load
//     data: [],
//     error: null,
//   });
//   const theme = useMantineTheme();
//   const mobileBreakpoint = theme.breakpoints.xs;
//   const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint})`);
//   const [videoId] = useVideoId();

//   useEffect(() => {
//     console.log({ videoId });
//   }, [videoId]);

//   if (error) return <Title c="red">{JSON.stringify(error)}</Title>;

//   const videoPlayer = videoId && <KtVideoPlayer videoId={videoId} />;
//   const searchHeader = (
//     <KtSearchableHeader value={query} onChangeText={setQuery} />
//   );
//   const searchResults = <KtGridResults videos={data} />;

//   if (isMobile) {
//     return (
//       <MobileLayout
//         VideoPlayerComponent={videoPlayer}
//         SearchComponent={
//           <form action={formAction}>
//             {searchHeader}
//             <Title order={3}>Karaoke Youtube Mới Nhất</Title>
//             {searchResults}
//           </form>
//         }
//       />
//     );
//   }

//   return (
//     <AppShell
//       navbar={{
//         width: 400,
//         breakpoint: mobileBreakpoint,
//       }}
//     >
//       <AppShell.Main>{videoPlayer}</AppShell.Main>

//       <form action={formAction}>
//         <AppShell.Navbar withBorder={false} p="xs" visibleFrom="xs">
//           <AppShell.Section>{searchHeader}</AppShell.Section>

//           <AppShell.Section grow my="xs" component={ScrollArea} scrollbars="y">
//             <Stack>
//               {/* <Box p="0">
//                 <FeaturedVideosCarousel
//                   data={data.map((item) => ({
//                     title: item.title,
//                     image: item.thumbnails[0].url,
//                     category: item.channelName ?? "Unknown",
//                     badge: "MỚI",
//                   }))}
//                 />
//               </Box> */}
//               <Title order={3}>Karaoke Youtube Mới Nhất</Title>
//               {searchResults}
//             </Stack>
//           </AppShell.Section>

//           <AppShell.Section my="-16">
//             <KtBottomNavigation />
//           </AppShell.Section>
//         </AppShell.Navbar>
//       </form>
//     </AppShell>
//   );
// }
