"use client";
import {
  AppShell,
  Container,
  Group,
  Image,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconFlame, IconHeart, IconHome, IconList } from "@tabler/icons-react";
import React from "react";
import { KtHeader } from "./KtHeader";

const BottomNavigation = ({ vertical }: { vertical?: boolean }) => {
  const Wrapper = vertical ? Stack : Group;
  const navLinks = [
    {
      href: "/karaoke",
      label: "Trang chủ",
      leftSection: <IconHome />,
      active: true,
    },
    {
      href: "/popular",
      label: "Phổ biến",
      leftSection: <IconFlame />,
      active: false,
    },
    {
      href: "/categories",
      label: "Danh mục",
      leftSection: <IconList />,
      active: false,
    },
    {
      href: "/favorites",
      label: "Yêu thích",
      leftSection: <IconHeart />,
      active: false,
    },
  ];

  return (
    <Wrapper align="center" justify="center" wrap="nowrap" gap={0}>
      {navLinks.map((item) => (
        <NavLink
          key={item.href}
          variant="subtle"
          style={{
            flexDirection: "column",
          }}
          styles={(theme) => ({
            root: {
              paddingLeft: 0,
              paddingRight: 0,
              // borderRadius: theme.radius.md,
              width: 80,
            },
            label: { fontSize: theme.fontSizes.xs },
            section: { marginRight: 0 },
          })}
          {...item}
        />
      ))}
    </Wrapper>
  );
};

function HomeLayout({ children,  }: { children: React.ReactNode }) {
  // const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  // const showNav = isMobile;
  const bottomNavSize = 65;
  return (
    <AppShell
      layout="alt"
      header={{ height: isMobile ? 106 : 56, collapsed: false }}
      footer={{ height: bottomNavSize, collapsed: false }}
      // navbar={{
      //   width: { sm: 400, md: 500 },
      //   breakpoint: "sm",
      //   collapsed: { mobile: true },
      // }}
      // aside={{
      //   width: 300,
      //   breakpoint: "xs",
      //   collapsed: { desktop: false, mobile: true },
      // }}
    >
      <AppShell.Header
        py="xs"
        px={{ base: "0", md: "xs" }}
        withBorder={false}
        style={{ overflow: "hidden" }}
      >
        <Container>
          <KtHeader searchPlaceholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..." />
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container p="xs">{children}</Container>
      </AppShell.Main>
      {/* <AppShell.Navbar withBorder={false} p="xs">
        <Image src="https://placehold.co/600x400?text=[Video Player Here]" alt="Video Player Here" /> */}
        {/* <AppShell.Section>
          <MainHeader searchPlaceholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..." />
        </AppShell.Section>
        <AppShell.Section grow my="xs" component={ScrollArea} scrollbars="y">
          {children}
        </AppShell.Section>
        <AppShell.Section my="-16">
          <BottomNavigation />
        </AppShell.Section> */}
        {/* <BottomNavigation vertical /> */}
      {/* </AppShell.Navbar> */}
      {/* <AppShell.Aside p="xs">Aside</AppShell.Aside> */}
      <AppShell.Footer withBorder={false}>
        <Container p="0">
          <BottomNavigation />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}

export default HomeLayout;
