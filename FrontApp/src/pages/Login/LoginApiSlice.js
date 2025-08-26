import { apislice } from "../../app/apislice";

export const authApiSlice = apislice.injectEndpoints({
    endpoints: builder => ({

        Login: builder.mutation({
            query:(body) => ({
                url: '/Login/',
                method: 'POST',
                body
            }),
        }),
        getData: builder.query({
            query: () =>'/',
            providesTags: [] 
        }),
        postCreateUser : builder.mutation({
            query : (body) =>({
                url:"/Users/create",
                method:"POST",
                body
            })
        }),
        postValidateCode: builder.mutation({
            query : (body) =>({
                url:"",
                method:"DELETE",
                body
            })

        }),
        postLogout: builder.mutation({
            query: (body) => ({
                url:"",
                method:"POST",
                body
            })
        })
        
    })
});

export const { 
    useLoginMutation,
    useGetDataQuery,
    usePostCreateUserMutation,
    usePostValidateCodeMutation,
    usePostLogoutMutation
} = authApiSlice;