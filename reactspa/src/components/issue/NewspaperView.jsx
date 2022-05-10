import axios from 'axios';
import { Spinner } from 'baseui/spinner';
import {
    HeadingXSmall, LabelLarge, LabelXSmall, ParagraphLarge,
    ParagraphMedium
} from 'baseui/typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { getIssueUrl } from '../../constants';

const NewspaperView = ({ onDataAvailable }) => {
    const [css, theme] = useStyletron();
    const [data, setData] = useState()
    const [page, setPage] = useState(null)

    const { lccn, date, edition } = useParams();

    useEffect(() => {
        const issueUrl = getIssueUrl(lccn, date, edition)
        axios.get(issueUrl)
            .then((pagesResponse) => {
                if (!pagesResponse?.data) {
                    if (onDataAvailable) {
                        onDataAvailable(false)
                    }
                    return;
                }
                if (onDataAvailable) {
                    onDataAvailable(true);
                }

                const pagesValue = pagesResponse.data;
                console.log(pagesValue)
                setData(pagesValue);
                if (pagesValue?.pages.length > 0) {
                    return axios.get(pagesValue.pages[0].url)
                } else {
                    return Promise.resolve(null);
                }
            }).then((pageLinkData) => {
                if (pageLinkData?.data?.pdf) {
                    setPage(pageLinkData.data.pdf);
                }
            });
    }, [])

    return data ?
        <div className={css({
            display: 'flex',
            marginBottom: '10px',
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
        </div> :
        <HeadingXSmall>
            This issue has no available digitized pages; Not digitized, published.
        </HeadingXSmall>

}

export default NewspaperView;