import classNames from "classnames";
import { Button, Center, Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

interface MenuProps {
	data: any;
	className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
	const items = data?.map((categories:any) => {
		const menuItems = categories.sub_categories?.map((item:any) => (
		  <Menu.Item key={item.sub_category_id}>
			<Link href={`#`}>
				{item.sub_category_name_vn.toUpperCase()}
			</Link>
		  </Menu.Item>
		));
		if (menuItems) {
		  return (
			<Menu key={categories.sub_category_name_vn} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
			  <Menu.Target>
				  <Center>
				  	<Button variant="unstyled" rightIcon={<IconChevronDown size={20} />}>
					{categories.category_name_vn.toUpperCase()}
					</Button>
				  </Center>
			  </Menu.Target>
			  <Menu.Dropdown>{menuItems}</Menu.Dropdown>
			</Menu>
		  );
		}
		return (
			<Button variant="unstyled" key={categories.category_id}>
				{categories.category_name_vn.toUpperCase()}
			</Button>
		);
	  });
	return (
		<nav className={classNames(`headerMenu flex w-full relative`, className)}>
			<Group >
            {items}
          </Group>
		</nav>
	);
};

export default HeaderMenu;
