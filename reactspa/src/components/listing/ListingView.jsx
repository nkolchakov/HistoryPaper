import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listingApiBaseUrl } from "../../constants";

const ListingView = () => {
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${listingApiBaseUrl}/${id}`)
            .then((listingResponse) => {
                if (listingResponse?.data) {
                    console.log(listingResponse.data)
                }
            })
    }, [id])

    return <h1>view</h1>
}

export default ListingView;