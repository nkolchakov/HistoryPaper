const headerLinks = [
    { link: "/catalog", label: "Catalog" },
    {
        link: "/listing", label: "Create Listing"
    }, {
        link: "/register", label: "Register"
    },
]

const archiveBaseUrl = 'https://chroniclingamerica.loc.gov';

const getIssueUrl = (lccn, issued, edition) => `${archiveBaseUrl}/lccn/${lccn}/${issued}/${edition}.json`

export { headerLinks, archiveBaseUrl, getIssueUrl };