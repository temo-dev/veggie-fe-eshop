import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import SliceProduct from "@components/product/slice-product";
import { useEffect } from "react";
import { useGetProductByCategoryMutation } from "@framework/category/get-product-by-category-id";
import { Divider } from "@mantine/core";

interface PagePros {
	category_id: string
}

export default function Category(props:PagePros) {
	const {category_id} = props
	const {mutate: getData, data: category} = useGetProductByCategoryMutation()
    useEffect(() => {
        if (category_id) {
			getData(category_id)
		}
    }, [category_id])
	// render
	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<CategoryBanner image={category?.image_url}/>
				<Divider/>
				{
					category?.sub_categories.map((item:any) => (
						<SliceProduct subCate={item} key={item.sub_category_id}/>
					))
				}
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
