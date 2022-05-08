const headerLinks = [
    { link: "/catalog", label: "Catalog" },
    {
        link: "/listing", label: "Create Listing"
    }, {
        link: "/register", label: "Register"
    },
]

const archiveBaseUrl = process.env.REACT_APP_ARCHIVE_BASE_URL;
const listingApiBaseUrl = process.env.REACT_APP_LISTING_API_BASE_URL;

// contains pdf pages + more links
const getIssueUrl = (lccn, issued, edition) => `${archiveBaseUrl}/lccn/${lccn}/${issued}/ed-${edition}.json`

export { headerLinks, archiveBaseUrl, listingApiBaseUrl, getIssueUrl };