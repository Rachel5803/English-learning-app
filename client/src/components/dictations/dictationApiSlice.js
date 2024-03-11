import apiSlice from "../../app/apiSlice";
const dictationApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getDictationForStudent:build.query({
            query:(details)=>({
                url:'/api/dictations',
                body:details
            }),
            providesTags:["Dictations"]
        }),
        addDictation:build.mutation({
            query:(details)=>({
                url:'/api/dictations',
                method:"POST",
                body:details
            }),
            invalidatesTags:["Dictations"]
        }),
        addDictationWords:build.mutation({
            query:(data)=>({
                url:'api/dictations',
                method:"PUT",
                body:data
            })
        })
    }),
})
export const{useGetDictationForStudentQuery, useAddDictationMutation, useAddDictationWordsMutation}=dictationApiSlice