"use client";
import {
  AppShell,
  Container,
  Group,
  MantineTheme,
  NavLink,
  Stack
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFlame,
  IconHeart,
  IconHome,
  IconList
} from "@tabler/icons-react";
import React from "react";
import { KaraTubeLogo } from "../components/logo/karatube";
import useIsMobile from "../hooks/useIsMobile";
import { MainHeader } from "./header";

const BottomNavigation = ({ vertical }: { vertical?: boolean }) => {
  const isMobile = useIsMobile();
  const Wrapper = vertical ? Stack : Group;
  const navLinkStyle = (theme: MantineTheme) =>
    isMobile
      ? {
          flexDirection: "column",
        }
      : {
          borderTopRightRadius: theme.radius.xl,
          borderBottomRightRadius: theme.radius.xl,
        };
  const styles = (theme: MantineTheme) =>
    isMobile
      ? {
          root: { paddingLeft: 0, paddingRight: 0 },
          label: { fontSize: theme.fontSizes.xs },
          section: { marginRight: 0 },
        }
      : {};
  return (
    <Wrapper align="center" justify="center" wrap="nowrap" gap={0}>
      <NavLink
        href="#required-for-focus"
        label="Trang chủ"
        leftSection={<IconHome />}
        active
        style={navLinkStyle}
        styles={styles}
      />
      <NavLink
        href="#required-for-focus"
        label="Phổ biến"
        leftSection={<IconFlame />}
        c="dimmed"
        style={navLinkStyle}
        styles={styles}
        // active
      />
      <NavLink
        href="#required-for-focus"
        label="Danh mục"
        leftSection={<IconList />}
        c="dimmed"
        style={navLinkStyle}
        styles={styles}
        // active
      />
      <NavLink
        href="#required-for-focus"
        label="Yêu thích"
        leftSection={<IconHeart />}
        c="dimmed"
        style={navLinkStyle}
        styles={styles}
        // active
      />
      {/* {isMobile && (
        <NavLink
          href="#required-for-focus"
          label="Tài khoản"
          leftSection={<IconUser />}
          c="dimmed"
          style={navLinkStyle}
          styles={styles}
          // active
        />
      )} */}
    </Wrapper>
  );
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useIsMobile();
  const showNav = isMobile;
  const bottomNavSize = 52;
  return (
    <AppShell
      layout="alt"
      header={{ height: isMobile ? 106 : 56, collapsed: false }}
      footer={{ height: 65, collapsed: !isMobile }}
      navbar={{
        width: 160,
        breakpoint: "xs",
        collapsed: { mobile: true /*!opened*/ },
      }}
      aside={{
        width: 300,
        breakpoint: "xs",
        collapsed: { desktop: true, mobile: true },
      }}
    >
      <AppShell.Header py="xs" px={{ base: '0', md: 'xs'}} withBorder={false}>
        <Container>
          <MainHeader searchPlaceholder="Ngày mai người ta lấy chồng, Ai chung tình được mãi,..." />
        </Container>
      </AppShell.Header>
      <AppShell.Navbar withBorder={false}>
        <Stack>
          <KaraTubeLogo p="xs" />
          <BottomNavigation vertical />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <MainHeader searchPlaceholder="Search..." /> */}
        <Container p={{ base: 'xs', md: 'md'}}>{children}</Container>
      </AppShell.Main>
      <AppShell.Aside p="xs">Aside</AppShell.Aside>
      <AppShell.Footer>
        <BottomNavigation />
      </AppShell.Footer>
    </AppShell>
  );
}

export default HomeLayout;
