import axios from 'axios';
import { Card, StyledBody } from 'baseui/card';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { archiveBaseUrl } from '../../constants';
import PaginatedTable from '../PaginatedTable';
import SuperLink from '../SuperLink';
import { useNavigate } from "react-router-dom";
import { Button } from 'baseui/button';

const PaperIssuesList = () => {
    const params = useParams();

    const [tableData, setTableData] = useState([])

    const postprocessIssue = (issue) => {
        if (!issue)
            return [];

        // edition, issued
        const issuedDate = issue.date_issued;
        const edition = issue.url
            .split('/').slice(-1)[0] // ed-1.json
            .split('.')[0]; // ed-1

        console.log(issuedDate, edition)
        return [
            <SuperLink
                to={`issue/${issuedDate}/edition/${edition}`}>
                {edition}
            </SuperLink>,
            issuedDate
        ]
    }

    useEffect(() => {
        axios.get(`${archiveBaseUrl}/lccn/${params.lccn}.json`)
            .then((response) => {
                if (!response) {
                    return Promise.resolve()
                }
                const mapped = (response.data.issues.map(i => postprocessIssue(i)));
                setTableData(mapped)

                // return response?.data.issues.length > 0 ?
                //     axios.get(response.data.issues[0].url) :
                //     Promise.resolve();
            })
        // .then((response) => {
        //     return response?.data.pages.length > 0 ?
        //         axios.get(response.data.pages[0].url) :
        //         Promise.resolve();
        // }).then((response) => {
        //     if (!response?.data) {
        //         return;
        //     }
        //     console.log('pages ', response.data)
        //     setImageUrl(response.data.pdf)
        //     console.log(imageUrl)
        // })
    }, []);

    const columns = ['edition', 'issued'];

    return (tableData ?
        <PaginatedTable columns={columns} data={tableData} />
        : null)
}

export default PaperIssuesList;