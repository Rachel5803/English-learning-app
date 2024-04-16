import apiSlice from "../../app/apiSlice";
const classesApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) =>({
        getAllClasses:build.query({
            query:()=>({
                url: "/api/classes"
            }),
            providesTags:["Classes"]
        }),
        addClass:build.mutation({
            query:(singleClass)=>({
                url: "/api/classes",
                method: "POST",
                body: singleClass
            }),
            invalidatesTags: ["Classes"]
        }),
        updateClass:build.mutation({
            query:(singleClass)=>({
                url: "/api/classes",
                method: "PUT",
                body: singleClass
            }),
            invalidatesTags: ["Classes"]
        }),
        deleteClass:build.mutation({
            query:(_id)=>({
                url: "/api/classes",
                method: "Delete",
                body: {_id}
            }),
            invalidatesTags: ["Classes"]
        })
        
    })
})
export const { useGetAllClassesQuery, useAddClassMutation, useUpdateClassMutation, useDeleteClassMutation}  = classesApiSlice