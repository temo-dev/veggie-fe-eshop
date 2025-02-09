import Image from "next/image";
interface CategoryBannerProps {
	className?: string;
	image?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
	className = "mb-7",
	image,
}) => {
	return (
		<div
			className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
		>
			<div className="hidden md:flex">
				<Image
					src={`${image ? image : `/assets/logo/VEGGIE 512.webp`}`}
					alt="Category Banner"
					width={1800}
					height={570}
					className="rounded-md"
				/>
			</div>
			{/* <div className="relative md:absolute top-0 start-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
				<h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full">
					#{categoryTitle}
				</h2>
			</div> */}
		</div>
	);
};

export default CategoryBanner;
