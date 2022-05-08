import axios from "axios";
import { Button } from 'baseui/button';
import { AnchorColumn, NumericalColumn, StatefulDataTable, StringColumn } from 'baseui/data-table';
import { StatefulDatepicker } from 'baseui/datepicker';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Select, SIZE } from "baseui/select";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { archiveBaseUrl } from "../../constants";
import states from "../../data/states";
import { Centered } from "../../styles";
import SuperLink from "../SuperLink";

const Catalog = () => {
    const [terms, setTerms] = useState('')
    const [state, setState] = useState('');
    const [dateRange, setDateRange] = useState([new Date(1890, 0)]);
    const [rowsCount, setRowsCount] = useState(15);
    const [catalogRows, setCatalogRows] = useState([]);
    const [catalogColumns, setCatalogColumns] = useState([])
    const [statesOptions, setStateOptions] = useState([])

    const buildQuery = () => {
        let queryUrl = `${archiveBaseUrl}/search/titles/results/`;

        const params = new URLSearchParams();
        params.append('format', 'json')
        if (terms) {
            params.append('terms', terms);
        }
        if (state.length > 0) {
            params.append('state', state[0].label.trim());
        }
        if (dateRange.length > 0) {
            params.append('year1', dateRange[0].getFullYear());
            if (dateRange.length > 1) {
                params.append('year2', dateRange[1].getFullYear());
            }
        }
        if (rowsCount > 0) {
            params.append('rows', rowsCount);
        }

        return axios.get(queryUrl, { params });
    }

    const buildRows = (data) => {
        const rows = [];
        data.forEach((el, i) => {
            const currEl = singleRow(i, el.title, el.city, el.lccn, el.start_year, el.end_year);
            rows.push(currEl);
        });
        return rows;
    }

    const singleRow = (index, term, city, lccn, from, to) => {
        return {
            id: index,
            data: {
                term, city: city[0], lccn, from, to
            }
        };
    }

    const onFilter = (event) => {
        event.preventDefault();

        buildQuery()
            .then((result) => {
                // TODO: post-process data, 9999 year to current

                if (result?.data?.totalItems > 0) {
                    console.log('setting data ', result.data.items);
                    const parsedRows = buildRows(result.data.items);
                    setCatalogRows(parsedRows)
                    setCatalogColumns(buildColumns())

                    console.log('setting cols, rows ', catalogRows, catalogColumns)
                }
            })
    }

    useEffect(() => {
        const mappedStates = Object.values(states).map((s, i) => { return { label: s, id: i } });
        setStateOptions(mappedStates)
    }, [])


    const buildColumns = () => [
        AnchorColumn({
            title: 'Term',
            mapDataToValue: (data) => ({
                content: data.term,
                href: `/lccn/${data.lccn}`
            }),
            elementAs: (data) => <SuperLink to={data.href}>{data.children}</SuperLink>
        }),
        StringColumn({
            title: 'City',
            mapDataToValue: (data) => data.city
        }),
        NumericalColumn({
            title: 'From',
            mapDataToValue: (data) => data.from
        }),
        NumericalColumn({
            title: 'To',
            mapDataToValue: (data) => data.to
        }),
    ]

    return (
        <div style={{ width: '90%' }}>
            <Centered>

                <form onSubmit={(e) => e.preventDefault()}>
                    <FormControl label="Select state">
                        <Select
                            size={SIZE.compact}
                            options={statesOptions}
                            value={state}
                            openOnClick={false}
                            placeholder="State"
                            onChange={(params) => { setState(params.value) }}
                        />
                    </FormControl>
                    <FormControl label="Term">
                        <Input
                            id="term"
                            placeholder="Term..."
                            value={terms}
                            onChange={(e) => { setTerms(e.target.value?.trim()) }}
                        />
                    </FormControl>
                    <FormControl>
                        <StatefulDatepicker
                            aria- label="Select a date"
                            clearable={true}
                            onChange={({ date }) => {
                                setDateRange(Array.isArray(date) ? date : [date]);
                                console.log(date)
                            }}
                            initialState={{ value: dateRange }}
                            range
                            separateRangeInputs
                        />
                    </FormControl>
                    <FormControl label="Results count">
                        <Input type='number'
                            value={rowsCount}
                            onChange={(e) => { setRowsCount(e.target.value) }}>
                        </Input>
                    </FormControl>
                    <Button
                        onClick={onFilter}
                        type="submit">
                        Filter
                    </Button>
                </form>
            </Centered>
            {catalogRows.length > 0 ? <div style={{ height: '600px' }}>
                <StatefulDataTable columns={catalogColumns} rows={catalogRows} />
            </div> : null}
            <Outlet></Outlet>



        </div>
    )

}

export default Catalog;