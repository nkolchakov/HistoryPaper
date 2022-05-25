const tokenKey = 'jwtTokens';

const archiveBaseUrl = process.env.REACT_APP_ARCHIVE_BASE_URL;
const listingApiBaseUrl = process.env.REACT_APP_LISTING_API_BASE_URL;
const authApiBaseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;

// contains pdf pages + more links
const getIssueUrl = (lccn, issued, edition) => `${archiveBaseUrl}/lccn/${lccn}/${issued}/ed-${edition}.json`

export {
    getIssueUrl,
    archiveBaseUrl,
    listingApiBaseUrl,
    authApiBaseUrl,
    tokenKey
};