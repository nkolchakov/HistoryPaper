import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { getIssueUrl } from '../../constants';
import { Spinner } from 'baseui/spinner';
import {
    ParagraphLarge,
    ParagraphMedium,
    ParagraphSmall,
    ParagraphXSmall,
    LabelLarge,
    LabelMedium,
    LabelSmall,
    LabelXSmall,
} from 'baseui/typography';
const IssueView = () => {

    const { lccn, date, edition } = useParams();
    const [css, theme] = useStyletron();

    const [error, setError] = useState('')
    const [data, setData] = useState()
    const [page, setPage] = useState(null)

    useEffect(() => {
        const issueUrl = getIssueUrl(lccn, date, edition)
        axios.get(issueUrl)
            .then((pagesResponse) => {
                if (!pagesResponse?.data)
                    return;

                console.log(pagesResponse.data)
                setData(pagesResponse.data);
                if (pagesResponse.data.pages.length > 0) {
                    return axios.get(pagesResponse.data.pages[0].url)
                } else {
                    return Promise.resolve(null);
                }
            }, (err) => setError("Can't visualize this edition !"))
            .then((pageLinkData) => {
                if (pageLinkData?.data?.pdf) {
                    setPage(pageLinkData.data.pdf);
                }
            })
    }, [])

    return <div>
        <h3>
            {error ?? error}
        </h3>
        {data ?
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                gap: '15px'
            })}>
                {
                    page ? <embed
                        type="application/pdf"
                        src={page}
                        height='800px'
                        width="640px" /> : <Spinner />
                }
                <span className={css({
                    display: 'flex',
                    flexDirection: "column",
                    textAlign: 'center'
                })}>

                    <LabelLarge>{data.title.name}</LabelLarge>
                    <ParagraphLarge> <LabelXSmall>issued</LabelXSmall>{data.date_issued}</ParagraphLarge>
                    <ParagraphMedium>
                        For details about this paper click <a href={data.title.url.split('.json')[0]} target='_blank'>
                            here
                        </a>
                        <br></br>
                        All PDF pages available <a href={data.url.split('.json')[0]} target='_blank'>
                            here
                        </a>
                    </ParagraphMedium>
                </span>
            </div>
            : null}
    </div >

}

export default IssueView;