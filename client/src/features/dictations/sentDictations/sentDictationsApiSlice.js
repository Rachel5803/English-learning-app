import apiSlice from "../../../app/apiSlice"
const sentDictaionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) =>({
        getAllSentDictations:build.query({
            query:()=>({
                url: "/api/dictations/sent"
            }),
            providesTags:["Dictations"]
        }),
       addNewDictationsFU:build.mutation({
            query:(dictation)=>({
                url: "/api/dictationForStudent",
                method: "POST",
                body: dictation
            }),
            invalidatesTags: ["Dictations","Drafts"]
        }),
        updateDictationEndDateForAllUsers:build.mutation({
            query:(dictation)=>({
                url: "/api/dictationForStudent",
                method: "PUT",
                body: dictation
            }),
            invalidatesTags: ["Dictations"]
        }),
        
     })
})
export const { useGetAllSentDictationsQuery, useAddNewDictationsFUMutation,useUpdateDictationEndDateForAllUsersMutation}  = sentDictaionsApiSlice