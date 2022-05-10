import { Accordion, Panel } from "baseui/accordion";
import { Button } from "baseui/button";
import { AnchorColumn, CustomColumn, NumericalColumn, StatefulDataTable } from 'baseui/data-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStyletron } from 'styletron-react';
import SuperLink from '../SuperLink';

const ListingsAccordion = ({ title, listings }) => {
    const [css, theme] = useStyletron();
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])

    const navigate = useNavigate()

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
        CustomColumn({
            mapDataToValue: (data) => data.id,
            renderCell: function Cell(props) {
                return <Button onClick={() => navigate(`/listing/${props.value}`)} size={"mini"}>View</Button>
            }
        })
    ]

    const buildRows = (data) => {
        return data.map((l, i) => {
            return {
                id: i,
                data: {
                    id: l.id,
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