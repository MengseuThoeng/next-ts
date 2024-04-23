import { useCreateProductMutation } from '@/redux/service/ecommerce';
import React from 'react'

const page = () => {
    const [createProduct, { data, isLoading, error }] = useCreateProductMutation();
    type product = {
        name: string;
        price: number;
        description: string;
    };

    const productBody: product = {
        name: "product name",
        price: 100,
        description: "product description",
    };

        const accessToken = ""; // Declare the accessToken variable

        const handleCreateProductWithRTK = async () => {
            // ==| Inline error handling |==
            try {
                const res = await createProduct({ newProduct: productBody, accessToken }).unwrap();
                console.log(res);
            } catch (error) {
                console.log(error);
            }

            // ==| Error handling with the useCreateProductMutation hook |==
            createProduct({
                newProduct: productBody,
                accessToken: accessToken, // Use the accessToken variable
            });
        };

  return (
    <div>
      <button
          className="my-4 p-4 bg-red-500 rounded-xl text-3xl text-gray-200 hover:bg-red-800"
          onClick={handleCreateProductWithRTK}
        >
          Create
        </button>
    </div>
  )
}

export default page
