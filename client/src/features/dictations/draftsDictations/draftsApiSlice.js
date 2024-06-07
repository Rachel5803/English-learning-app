import apiSlice from "../../../app/apiSlice"
const draftsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDrafts: build.query({
            query: () => ({
                url: "/api/dictations"
            }),
            providesTags: ["Drafts"]
        }),
        getAllSentDictations:build.query({
            query:()=>({
                url: "/api/dictations/sent"
            }),
            providesTags:["SentDictations"]
        }),
        addDraft: build.mutation({
            query: (singleDraft) => ({
                url: "/api/dictations",
                method: "POST",
                body: singleDraft
            }),
            invalidatesTags: ["Drafts"]
        }),
        updateDraft:build.mutation({
            query:(singleDraft) =>({
                url: "/api/dictations",
                method: "PUT",
                body: singleDraft
            }),
            invalidatesTags: ["Drafts","SentDictations"]
        }),
        deleteDraft: build.mutation({
            query: (_id) => ({
                url: "/api/dictations",
                method: "Delete",
                body: { _id }
            }),
            invalidatesTags: ["SentDictations","Drafts"]
        })

    })
})
export const { useGetAllDraftsQuery,useGetAllSentDictationsQuery, useAddDraftMutation, useUpdateDraftMutation, useDeleteDraftMutation } = draftsApiSlice