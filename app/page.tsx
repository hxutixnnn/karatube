import {
  AppShell,
  AppShellAside,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AspectRatio,
  Box,
  Badge,
  Container,
  Group,
  Image,
  Input,
  Overlay,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  Button,
  Space,
} from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Client } from "youtubei";
import { HeaderCarousel } from "./components/HeaderCarousel";

const youtube = new Client();

const KaraTubeLogo = () => (
  <Group gap={0} align="center">
    <Paper
      px="sm"
      py="xs"
      bg="red.8"
      mr="xs"
      radius="md"
      c="white"
      display="flex"
    >
      <IconPlayerPlayFilled />
    </Paper>
    <Title c="blue">Kara</Title>
    <Title c="red">Tube</Title>
  </Group>
);

export default async function HomePage() {
  const videos = await youtube.search("karaoke", {
    type: "video",
    ql: "vi",
    regionCode: "VN",
  });

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: false } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: true },
      }}
      // p="md"
    >
      <AppShellHeader p="xs">
        <Input
          variant="filled"
          placeholder="Chỉ là không cùng nhau, Ai chung tình được mãi,..."
          w="100%"
        />
      </AppShellHeader>
      <AppShellNavbar p="md">
        <KaraTubeLogo />
      </AppShellNavbar>
      <AppShellMain>
        <Box bg="gray.8" p="md">
          <Paper
            radius="lg"
            withBorder={false}
            maw={800}
            mx="auto"
            style={{ overflow: "hidden" }}
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                src="https://i.ytimg.com/vi/OeBVIsGkcrA/hq720.jpg"
                alt="Demo"
              />
              <Overlay
                gradient="linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"
                // opacity={0.85}
                zIndex={0}
              />
              <Box p="xl">
                <Stack align="flex-start" justify="flex-end" w="100%" h="100%">
                  <Badge color="red.8">MỚI</Badge>
                  <Box>
                    <Title c="white">
                      Karaoke | Cơn Mơ Băng Giá (Bằng Kiều)
                    </Title>
                    <Text c="white">Thuy Nga TV</Text>
                  </Box>
                  <Button color="red.8">Hát Ngay</Button>
                </Stack>
              </Box>
            </AspectRatio>
          </Paper>
        </Box>
        <Space h="md" />
        <Box p="md">
          <HeaderCarousel
            data={videos.items.map((item) => ({
              title: item.title,
              category: item.channel?.name ?? "Unknown",
              image: item.thumbnails[0].url,
            }))}
          />
        </Box>
        {/* </Container> */}
      </AppShellMain>
      <AppShellAside p="md">Aside</AppShellAside>
      <AppShellFooter p="md">Footer</AppShellFooter>
    </AppShell>
  );
}
