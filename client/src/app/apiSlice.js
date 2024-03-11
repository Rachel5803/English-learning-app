import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const apiSlice=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4001/'
    }),
    endpoints:()=>({}),
})
export default apiSlice