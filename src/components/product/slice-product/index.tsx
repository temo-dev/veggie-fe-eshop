
import { Carousel } from '@mantine/carousel'
import { Divider, Group, Stack,Image, Button, Title,Text } from '@mantine/core'
import { IconShoppingCart, IconSeedingFilled } from '@tabler/icons-react'

import React from 'react'

interface inputProps {
    subCate : any
}

const SliceProduct = (props: inputProps) => {
    const {subCate} = props
    //render
    if (subCate?.products?.length > 0) {
        return (
            <div className='my-20'>
                <Group position="apart" className='mb-4'>
                    <Title order={5}>{subCate.sub_category_name_vn.toUpperCase()}</Title>
                    <Button variant='unstyled' rightIcon={<IconSeedingFilled size={20} color='green'/>}>See All</Button>
                </Group>
                <Divider/>
                <Carousel
                    slideSize="12%"
                    slideGap="md"
                    loop
                    align="start"
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '50%' },
                        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    >
                        {
                            subCate?.products.map((item:any) => 
                                <Carousel.Slide key={item.product_id}>
                                    <ProductItem item={item}/>
                                </Carousel.Slide>
                            )
                        }
                </Carousel>
            </div>
      )
    }
    return null
}

export default SliceProduct

interface ProductItemProps {
    item: any
}
const ProductItem = (props:ProductItemProps) => {
    const {item} = props
    return (
        <Stack className='border border-gray-100 rounded-md p-4'>
            <Image maw={100} mx="auto" radius="md" src={item?.image_url ? item?.image_url  :`/assets/logo/VEGGIE 128X128.webp`}/>
            <Divider/>
            <Title order={5}>{item.product_name_vn}</Title>
            <Button color='green' leftIcon={<IconShoppingCart size={20}/>}>Đặt Hàng</Button>
        </Stack>
    )
}