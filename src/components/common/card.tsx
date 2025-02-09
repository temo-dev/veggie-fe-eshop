import Link from "@components/ui/link";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { Image } from '@mantine/core';

interface Props {
	item: any;
	variant?: "rounded" | "circle";
	size?: "small" | "medium";
	effectActive?: boolean;
	href: LinkProps["href"];
}

const Card: React.FC<Props> = ({
	item,
	variant = "circle",
	effectActive = false,
	href,
}) => {
	const { name } = item ?? {};
	return (
		<Link
			href={href}
			className="group flex justify-center text-center flex-col"
		>
			<div
				className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto ${
					variant === "rounded" ? "rounded-md" : "rounded-full"
				}`}
			>
				<div className="flex drop-shadow-xl">
					<Image maw={240} mx="auto" radius="md" src={item.image_url} alt="Random image" caption={item.category_name_vn.toUpperCase()}/>
				</div>
				{effectActive === true && (
					<>
						<div
							className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
								variant === "rounded" ? "rounded-md" : "rounded-full"
							}`}
						/>
						<div className="absolute top left h-full w-full flex items-center justify-center">
							<FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
						</div>
					</>
				)}
			</div>
			<Text variant="heading" className="capitalize">
				{name}
			</Text>
		</Link>
	);
};

export default Card;
