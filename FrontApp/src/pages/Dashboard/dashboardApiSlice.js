import { apislice } from "../../app/apislice";

export const dashboardApiSlice = apislice.injectEndpoints({
    endpoints: builder => ({

        getFiles: builder.query({
            query: () =>'/Files/file-privileges/',
            providesTags: ["files"] 
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
        putUser: builder.mutation({
            query:(id,body) => ({
                url:`/Users/${id}`,
                method:"PUT",
                body
            })
        }),
        postCreateUserLoged : builder.mutation({
            query : (body) =>({
                url:"/Users/",
                method:"POST",
                body
            }),
            invalidatesTags:["users"]
        }),
        deleteFile: builder.mutation({
            query:(key) => ({
                url:`/Files/`,
                method:"DELETE",
                body:{key}
            }),
            invalidatesTags:["files"]
        }),
        putFile: builder.mutation({
            query: (body) => ({
                url:"/Files/",
                method:"PUT",
                body
            }),
            invalidatesTags:["files"]
        })
        
    })
});

export const { 
    useGetFilesQuery,
    useGetUsersQuery,
    useDeleteUserMutation,
    usePostCreateUserLogedMutation,
    useDeleteFileMutation,
    usePutFileMutation,
    usePutUserMutation
} = dashboardApiSlice;