"use client";

import { Group, NavLink, Stack } from "@mantine/core";
import { IconFlame, IconHeart, IconHome, IconList } from "@tabler/icons-react";

export function KtBottomNavigation({ vertical }: { vertical?: boolean }) {
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
}
