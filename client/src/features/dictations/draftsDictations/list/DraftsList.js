import React from 'react'
import "./drafts-list.css"
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"
import Search from '../../../../components/search/Search';
import { useDeleteDraftMutation, useGetAllDraftsQuery } from '../draftsApiSlice';
import { useAddNewDictationsFUMutation } from '../../sentDictations/sentDictationsApiSlice';
import moment from 'moment';
const DraftsList = () => {
    const { data: draftsObject, isError, error, isLoading, isSuccess } = useGetAllDraftsQuery()
    const [sentDictationForUsers, { isSuccess: isSentSuccess, isError: isSentError, error: sentError }] = useAddNewDictationsFUMutation()
    const [deleteDraft, { isSuccess: isDeleteSuccess }] = useDeleteDraftMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    useEffect(() => {
        if (isSentError) {
            window.alert(sentError.data.massage)
        }
    }, [isSentError])
    const deleteClick = (singleDraft) => {
        if (window.confirm("Are you sure you want to delete the dictation?")) {
            deleteDraft({ _id: singleDraft._id })
        }


    }
    const sentClick = (singleDraft) => {
        console.log(singleDraft);
        if (window.confirm("Are you sure you want to send the dictation to all students?")) {
            sentDictationForUsers({
                dictationId: singleDraft._id, dictationWords: singleDraft.dictationWords
                , dictationClass: singleDraft.class._id, endDate: singleDraft.endDate, limitTime: singleDraft.limitTime
            })
        }

    }
    if (isLoading) return <div className="error-page"> Loading ...</div>
    if (isError) return <div className="error-drafts-list"><h1>{error.data.massage}</h1>
        <Link to="/dash/dictations/drafts/add" className="dictation-list-add-button">
           Create new dictation
        </Link></div>
    const filteredData = !q ? [...draftsObject.data] : draftsObject.data.filter(singleDraft => singleDraft.name.indexOf(q) > -1)
    return (
        <div className='drafts-dictations-list'>
            <div className="drafts-dictations-list-top">
                <Search placeholder="Search by draft name" />
                <Link to="/dash/dictations/drafts/add" className="dictation-list-add-button">
                    Create new draft
                </Link>
            </div>
            <table className="drafts-dictations-list-table">
                <thead>
                    <tr>
                        <td>name</td>
                        <td>class</td>
                        <td> created on</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(draft => (
                        <tr key={draft._id}>
                            <td>
                                {draft.name}
                            </td>
                            <td>
                                {draft.class?.school + " " + draft.class?.grade + " " + draft.class?.gradeNumber}
                            </td>
                            <td>
                                <td>{draft.createdAt ? moment(draft.createdAt).format('DD-MM-YYYY') : ""}</td>
                            </td>
                            <td>
                                <div className="drafts-list-buttons">

                                    <Link to={`/dash/dictations/drafts/${draft._id}`} className="drafts-list-button drafts-list-view">
                                        View
                                    </Link>
                                    <button onClick={() => { sentClick(draft) }} className="drafts-list-button drafts-list-sent">
                                        Send to students
                                    </button>
                                    <button onClick={() => { deleteClick(draft) }} className="drafts-list-button drafts-list-delete">
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DraftsList