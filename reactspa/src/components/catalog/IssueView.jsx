import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueUrl } from '../../constants';

const IssueView = () => {

    const { lccn, date, edition } = useParams();
    const [error, setError] = useState('')

    useEffect(() => {
        const issueUrl = getIssueUrl(lccn, date, edition)
        axios.get(issueUrl)
            .then((pagesResponse) => {
                if (!pagesResponse)
                    return;

                console.log(pagesResponse.data)
            }, (err) => setError("Can't visualize this edition !"))
    }, [])

    return <div>

        <h3>
            {error ?? error}
        </h3>
    </div>

}

export default IssueView;