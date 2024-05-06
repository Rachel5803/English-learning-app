import apiSlice from "../../../app/apiSlice"
const draftsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDrafts: build.query({
            query: () => ({
                url: "/api/dictations"
            }),
            providesTags: ["Drafts"]
        }),
        addDraft: build.mutation({
            query: (singleDraft) => ({
                url: "/api/dictations",
                method: "POST",
                body: singleDraft
            }),
            invalidatesTags: ["Drafts"]
        }),
        updateDraft: build.mutation({
            query: (singleDraft) => ({
                url: "/api/dictations",
                method: "PUT",
                body: singleDraft
            }),
            invalidatesTags: ["Drafts"]
        }),
        deleteDraft: build.mutation({
            query: (_id) => ({
                url: "/api/dictations",
                method: "Delete",
                body: { _id }
            }),
            invalidatesTags: ["Drafts"]
        })

    })
})
export const { useGetAllDraftsQuery, useAddDraftMutation, useUpdateDraftMutation, useDeleteDraftMutation } = draftsApiSlice