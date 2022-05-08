import axios from 'axios';
import { Spinner } from 'baseui/spinner';
import {
    HeadingXSmall, LabelLarge, LabelXSmall, ParagraphLarge,
    ParagraphMedium
} from 'baseui/typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { getIssueUrl, listingApiBaseUrl } from '../../constants';
import ListingsAccordion from '../listing/ListingAccordion';
const IssueView = () => {

    const { lccn, date, edition } = useParams();
    const [css, theme] = useStyletron();

    const [error, setError] = useState('')
    const [data, setData] = useState()
    const [page, setPage] = useState(null)
    const [listingsData, setListingsData] = useState([])
    const [listingsAccOpen, setListingsModalOpen] = useState(false)

    useEffect(() => {
        // initially load the details about this paper + number of listings, bookmarks
        const issueUrl = getIssueUrl(lccn, date, edition)
        const issuePagesPromise = axios.get(issueUrl);
        const listingsPromise = axios.get(`${listingApiBaseUrl}/${lccn}/${date}/${edition}`)

        Promise.allSettled([issuePagesPromise, listingsPromise])
            .then(([pagesResponse, listingsResponse]) => {
                if (listingsResponse.status === 'rejected') {
                    // console.error('error on listing')

                }
                if (pagesResponse.status === 'rejected') {
                    // console.error('error on status')
                }
                const listingsValue = listingsResponse.value?.data;

                if (listingsValue) {
                    setListingsData(listingsValue)
                    console.log('listing data ', listingsValue)
                }

                const pagesValue = pagesResponse.value?.data;
                console.log(pagesValue)
                setData(pagesValue);
                if (pagesValue?.pages.length > 0) {
                    return axios.get(pagesValue.pages[0].url)
                } else {
                    return Promise.resolve(null);
                }
            }, (err) => {
                // setError("Can't visualize this edition !")
            })
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
        <ListingsAccordion
            title={(listingsData.length || 'No') + ' listings for this paper'}
            listings={listingsData}>

        </ListingsAccordion>
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
            </div> :
            <HeadingXSmall>
                This issue has no available digitized pages; Not digitized, published.
            </HeadingXSmall>
        }
    </div >

}

export default IssueView;