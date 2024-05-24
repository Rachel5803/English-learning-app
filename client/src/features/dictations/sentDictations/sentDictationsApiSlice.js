import apiSlice from "../../../app/apiSlice"
const sentDictaionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) =>({
        getAllSentDictations:build.query({
            query:()=>({
                url: "/api/dictations/sent"
            }),
            providesTags:["Dictations"]
        }),
        getAllSentDictationsFromAllUsers:build.query({
            query:()=>({
                url: "/api/dictationForStudent"
            }),
            providesTags:["Dictations"]
        }),
        getNotCompletedDictationsForSpecificUser:build.mutation({
            query:(user)=>({
                url: "/api/dictationForStudent/user/not/complete",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["StudentDictations","StudentNotCompleteDictations"]
        }),
        getCompletedDictationsForSpecificUser:build.mutation({
            query:(user)=>({
                url: "/api/dictationForStudent/user/complete",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["StudentCompleteDictations"]
        }),
        getDictationFromAllUsersInClass:build.mutation({
            query:(dictation)=>({
                url: "/api/dictationForStudent/class",
                method: "POST",
                body: dictation
            }),
            invalidatesTags: ["Dictations"]
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
        updateDictationForSpecificUser:build.mutation({
            query:(dictation)=>({
                url: "/api/dictationForStudent/user",
                method: "PUT",
                body: dictation
            }),
            invalidatesTags: ["Dictations","StudentNotCompleteDictations"]
        }),
        
     })
})
export const { useGetAllSentDictationsQuery
    ,useGetDictationFromAllUsersInClassMutation
    ,useGetNotCompletedDictationsForSpecificUserMutation
    ,useGetCompletedDictationsForSpecificUserMutation
    ,useGetAllSentDictationsFromAllUsersQuery 
    ,useAddNewDictationsFUMutation
    ,useUpdateDictationEndDateForAllUsersMutation
    ,useUpdateDictationForSpecificUserMutation}  = sentDictaionsApiSlice