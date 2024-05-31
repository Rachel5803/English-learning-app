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
        getAllDictationsForSpecificUser:build.mutation({
            query:(user)=>({
                url: "/api/dictationForStudent/user",
                method: "POST",
                body: user
            }),
            providesTags: ["StudentDictations"]
        }),
        getNotCompletedDictationsForSpecificUser:build.mutation({
            query:(user)=>({
                url: "/api/dictationForStudent/user/not/complete",
                method: "POST",
                body: user
            }),
            providesTags: ["StudentDictations","StudentNotCompleteDictations"]
        }),
        getCompletedDictationsForSpecificUser:build.mutation({
            query:(user)=>({
                url: "/api/dictationForStudent/user/complete",
                method: "POST",
                body: user
            }),
            providesTags: ["StudentCompleteDictations"]
        }),
        getDictationFromAllUsersInClass:build.mutation({
            query:(dictation)=>({
                url: "/api/dictationForStudent/class",
                method: "POST",
                body: dictation
            }),
            providesTags: ["Dictations"]
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
            invalidatesTags: ["Dictations","StudentNotCompleteDictations","StudentCompleteDictations","StudentDictations"]
        }),
        
     })
})
export const { useGetAllSentDictationsQuery,
    useGetDictationFromAllUsersInClassMutation,
    useGetAllDictationsForSpecificUserMutation
    ,useGetNotCompletedDictationsForSpecificUserMutation
    ,useGetCompletedDictationsForSpecificUserMutation
    ,useGetAllSentDictationsFromAllUsersQuery 
    ,useAddNewDictationsFUMutation
    ,useUpdateDictationEndDateForAllUsersMutation
    ,useUpdateDictationForSpecificUserMutation}  = sentDictaionsApiSlice