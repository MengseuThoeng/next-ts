import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi", // The name of the slice of state that will be managed by this api
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL }),
    endpoints: (builder) => ({
        // get all products
        //                        <result type,         args type>
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `api/products/?page=${page}&page_size=${pageSize}`,
        }),
        // get single product
        getProductById: builder.query<any, number>({
            query: (id) => `api/products/${id}/`,
        }),
        createProduct: builder.mutation<any, { newProduct: object, accessToken: string }>({
            query: ({ newProduct, accessToken }) => ({
                url: "/api/products/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: newProduct,
            }),
        }),
        updateProduct: builder.mutation<any, { id: number, updatedProduct: object, accessToken: string }>({
            query: ({ id, updatedProduct, accessToken }) => ({
                url: `/api/products/${id}/`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: updatedProduct,
            }),
        }),
        deleteProduct: builder.mutation<any, { id: number, accessToken: string }>({
            query: ({ id, accessToken }) => ({
                url: `/api/products/${id}/`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
    })
});
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = ecommerceApi;
