'use client';

import Comments from '@/components/Detail/Comments';
import Location from '@/components/Detail/Location';
import ProductCard, { Product } from '@/components/Detail/ProductCard';
import ProductIntro from '@/components/Detail/ProductIntro';
import { supabase } from '@/contexts/supabase.context';
import { useEffect, useState } from 'react';

function DetailPage({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string[] }>({});
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // Fetch product data
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id);

      if (productError) {
        console.error('Product data fetching error:', productError);
        return;
      }

      // Fetch image data for products
      const productIds = productData.map((product) => product.id);
      const { data: imageData, error: imageError } = await supabase
        .from('product_images')
        .select('product_id, image_url')
        .in('product_id', productIds);

      if (imageError) {
        console.error('Image data fetching error:', imageError);
        return;
      }

      // Group images by product_id
      const groupedImages: { [key: string]: string[] } = {};
      imageData.forEach((image) => {
        if (!groupedImages[image.product_id]) {
          groupedImages[image.product_id] = [];
        }
        groupedImages[image.product_id].push(image.image_url);
      });

      setProducts(productData || []);
      setProductImages(groupedImages);

      // Fetch user data (if needed)
      const { data: userData, error: userError } = await supabase.from('users').select('*');

      if (userError) {
        console.error('User data fetching error:', userError);
        return;
      }

      setUserData(userData || []);
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="flex justify-center">
      <div className="container mx-auto w-11/12 lg:w-[1440px] flex flex-col items-center">
        <ProductCard products={products} productImages={productImages} userData={userData} />
        <ProductIntro productId={params.id} />
        <Location />
        <div className="w-full lg:w-[1000px] py-8">
          <h6 className="text-2xl font-bold mb-2">최근 도서</h6>
          <div>카드</div>
        </div>
        <Comments />
      </div>
    </div>
  );
}

export default DetailPage;
