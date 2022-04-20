import * as React from 'react';
import { useStyletron } from 'baseui';
import { Button, KIND } from 'baseui/button';
import TriangleDown from 'baseui/icon/triangle-down';
import { StatefulMenu } from 'baseui/menu';
import { Pagination } from 'baseui/pagination';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { Table } from 'baseui/table';


const PaginatedTable = (props) => {
    const [css, theme] = useStyletron();
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(12);
    const handlePageChange = (nextPage) => {
        if (nextPage < 1) {
            return;
        }
        if (nextPage > Math.ceil(props.data.length / limit)) {
            return;
        }
        setPage(nextPage);
    };
    const handleLimitChange = (nextLimit) => {
        const nextPageNum = Math.ceil(props.data.length / nextLimit);
        if (nextPageNum < page) {
            setLimit(nextLimit);
            setPage(nextPageNum);
        } else {
            setLimit(nextLimit);
        }
    };
    const window = () => {
        const min = (page - 1) * limit;
        return props.data.slice(min, min + limit);
    };
    return (
        <React.Fragment>
            <div className={css({ width: '70%' })}>
                <Table columns={props.columns} data={window()} />
                <div className={css({ display: 'flex', flexDirection: 'row' })}>
                    <StatefulPopover
                        content={({ close }) => (
                            <StatefulMenu
                                items={Array.from({ length: 100 }, (_, i) => ({
                                    label: i + 1,
                                }))}
                                onItemSelect={({ item }) => {
                                    handleLimitChange(item.label);
                                    close();
                                }}
                                overrides={{
                                    List: {
                                        style: { height: '150px', width: '100px' },
                                    },
                                }}
                            />
                        )}
                        placement={PLACEMENT.bottom}
                    >
                        <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
                            {`${limit} Rows`}
                        </Button>
                    </StatefulPopover>
                    <Pagination
                        currentPage={page}
                        numPages={Math.ceil(props.data.length / limit)}
                        onPageChange={({ nextPage }) => handlePageChange(nextPage)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
export default PaginatedTable;