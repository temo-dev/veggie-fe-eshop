import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import SliceProduct from "@components/product/slice-product";

interface PagePros {
	category_id: string
}

export default function Category(props:PagePros) {
	const {category_id} = props
	console.log('category_id',category_id)
	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<CategoryBanner />
				<SliceProduct/>
			</Container>
		</div>
	);
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
	const category_id = params?.category_id as string;
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
			category_id
		},
	};
};
