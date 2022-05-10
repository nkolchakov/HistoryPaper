import axios from 'axios';
import { Button } from 'baseui/button';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { listingApiBaseUrl } from '../../constants';
import NewspaperView from '../issue/NewspaperView';
import ListingsAccordion from '../listing/ListingAccordion';
const IssueView = () => {
    const navigate = useNavigate();

    const { lccn, date, edition } = useParams();
    const [css, theme] = useStyletron();

    const [error, setError] = useState('')
    const [dataAvaiable, setDataAvailable] = useState(false)
    const [listingsData, setListingsData] = useState([])

    useEffect(() => {
        axios.get(`${listingApiBaseUrl}/${lccn}/${date}/${edition}`)
            .then((listingsResponse) => {
                const listingsValue = listingsResponse?.data;

                if (listingsValue) {
                    setListingsData(listingsValue)
                    console.log('listing data ', listingsValue)
                }
            }, (err) => {
                setError("Can't visualize this edition !")
            })
    }, [])

    return <div>
        <h3>
            {error ?? error}
        </h3>
        {dataAvaiable ? <>
            <ListingsAccordion
                title={(listingsData.length || 'No') + ' available listings for this paper'}
                listings={listingsData}
            ></ListingsAccordion>

            <Button size={'compact'}
                onClick={() => navigate(`/lccn/${lccn}/issue/${date}/${edition}/new`)}
                className={css({
                    margin: '10px 0 10px 0'
                })}>
                Create Listing
            </Button>
        </> : null}
        <NewspaperView onDataAvailable={(hasData) => setDataAvailable(hasData)}>
        </NewspaperView>
    </div >

}

export default IssueView;