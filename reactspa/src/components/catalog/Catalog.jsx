import React, { useEffect, useState } from "react";
import { FormControl } from 'baseui/form-control';
import { BaseInput, Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { StatefulDatepicker } from 'baseui/datepicker';
import { forwardRef } from "react";
const Catalog = () => {

    /**
     filters
        - state
        - date range (year1, year2)
        - terms? (title ?)
        - lccn?
     */

    const [value, setValue] = React.useState('');
    const onChange = (e) => { setValue(e.target.value) };
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <FormControl label="Your email">
                <Input
                    id="email-input-id"
                    value={value}
                    onChange={onChange}
                />
            </FormControl>
            <FormControl>
                <StatefulDatepicker
                    aria- label="Select a date"
                    clearable={true}
                    initialState={{ value: [] }}
                    highlightedDate={new Date('March 10, 2019')}
                    range
                    separateRangeInputs
                />
            </FormControl>
            <Button
                onClick={onSubmit}
                type="submit">Filter
            </Button>
        </form>
    )

}

export default Catalog;