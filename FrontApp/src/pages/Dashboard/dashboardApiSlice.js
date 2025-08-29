import { apislice } from "../../app/apislice";

export const dashboardApiSlice = apislice.injectEndpoints({
    endpoints: builder => ({

        getFiles: builder.query({
            query: () =>'/Files/file-privileges/',
            providesTags: [] 
        }),

        getUsers: builder.query({
            query: () => '/Users/',
            providesTags:["users"]
        }),

        deleteUser: builder.mutation({
            query : (id) =>({
                url:`/Users/${id}`,
                method:"DELETE",
                body:{id}
            }),
        invalidatesTags:["users"]

        }),
        postCreateUserLoged : builder.mutation({
            query : (body) =>({
                url:"/Users/",
                method:"POST",
                body
            }),
            invalidatesTags:["users"]
        }),
        
    })
});

export const { 
    useGetFilesQuery,
    useGetUsersQuery,
    useDeleteUserMutation,
    usePostCreateUserLogedMutation
} = dashboardApiSlice;