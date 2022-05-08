import { Accordion, Panel } from "baseui/accordion";
import { AnchorColumn, NumericalColumn, StatefulDataTable } from 'baseui/data-table';
import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import SuperLink from '../SuperLink';

const ListingsAccordion = ({ title, listings }) => {
    const [css, theme] = useStyletron();
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])

    useEffect(() => {
        setColumns(buildColumns());
        setRows(buildRows(listings))
    }, [listings])

    const buildColumns = () => [
        AnchorColumn({
            title: 'Owner',
            mapDataToValue: (data) => ({
                content: data.creatorId,
                href: `/user/${data.creatorId}`
            }),
            elementAs: (data) => <SuperLink to={data.href}>{data.children}</SuperLink>
        }),
        NumericalColumn({
            title: 'Price',
            mapDataToValue: (data) => data.price
        }),
    ]

    const buildRows = (data) => {
        return data.map((l, i) => {
            return {
                id: i,
                data: {
                    creatorId: l.creatorId,
                    price: l.price
                }
            }
        })
    }

    return (listings?.length > 0 ?
        <Accordion accordion>
            <Panel title={title}>
                <div className={css({ height: '400px' })}>
                    <StatefulDataTable columns={columns} rows={rows} />
                </div>
            </Panel>
        </Accordion>
        : null
    )
}
export default ListingsAccordion;