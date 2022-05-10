import { Button } from "baseui/button";
import { FileUploader } from 'baseui/file-uploader';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from 'baseui/textarea';
import React, { useEffect, useState } from "react";
import { useStyletron } from "styletron-react";
import NewspaperView from "../issue/NewspaperView";

const CreateListing = () => {
    const [css, theme] = useStyletron();

    const [isUploading, setIsUploading] = useState(false)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [photos, setPhotos] = useState([])

    useEffect(() => {

    }, [])

    const onDrop = (acceptedFiles, rejectedFiles) => {
        setIsUploading(true);
        // handle file upload...


        setIsUploading(false);
    }

    const onSubmit = () => {
        console.log('submit !')
    }

    return <div className={css({
        display: 'flex',
        direction: 'row',
        width: "90%",
        gap: '20px'
    })} >
        <form className={css({ width: '40%' })} onSubmit={(e) => e.preventDefault()}>

            <FormControl label="Description">
                <Textarea
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
                    placeholder="Describe your newspaper's condition and more details ..."
                />
            </FormControl>
            <FormControl label="Price">
                <Input type='number'
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}>
                </Input>
            </FormControl>
            <FormControl label="Show how it looks like ...">
                <FileUploader
                    onCancel={() => {
                        setPhotos([]);
                        setIsUploading(false)
                    }}
                    onDrop={onDrop}
                    progressMessage={
                        isUploading ? `Uploading... hang tight.` : ''
                    }
                />
            </FormControl>
            <Button
                onClick={onSubmit}
                type="submit">
                Submit
            </Button>
        </form>
        <span>
            <p>You are creating a listing for the following issue.</p>
            <NewspaperView></NewspaperView>
        </span>


    </div >
}

export default CreateListing;