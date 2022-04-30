import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { archiveBaseUrl } from '../../constants';
import PaginatedTable from '../PaginatedTable';
import SuperLink from '../SuperLink';

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

        return [
            <SuperLink
                to={`issue/${issuedDate}/${edition}`}>
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
            })
    }, []);

    const columns = ['edition', 'issued'];

    return (tableData ?
        <PaginatedTable columns={columns} data={tableData} />
        : null)
}

export default PaperIssuesList;