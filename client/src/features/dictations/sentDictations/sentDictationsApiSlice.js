import apiSlice from "../../../app/apiSlice"
const sentDictaionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) =>({
        getAllSentDictations:build.query({
            query:()=>({
                url: "/api/dictationForStudent"
            }),
            providesTags:["Dictations"]
        }),
       addNewDictationsFU:build.mutation({
            query:(singleClass)=>({
                url: "/api/classes",
                method: "POST",
                body: singleClass
            }),
            invalidatesTags: ["Dictations"]
        }),
        updateSentDictations:build.mutation({
            query:(singleClass)=>({
                url: "/api/classes",
                method: "PUT",
                body: singleClass
            }),
            invalidatesTags: ["Dictations"]
        }),
     })
})
export const { useGetAllSentDictationsQuery, useAddNewDictationsFUMutation , useupdateSentDictationsMutation}  = sentDictaionsApiSlice