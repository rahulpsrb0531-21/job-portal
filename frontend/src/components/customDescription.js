import { FormControl, FormHelperText } from '@mui/material';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CustomDescription({ value, setFieldValue, error, edit }) {
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'color',
    ]

    return (
        <FormControl error={error}>
            <ReactQuill formats={formats} readOnly={edit} wid theme="snow" value={value} onChange={(value) => { setFieldValue(value) }} style={{ height: 100 }} />
            <FormHelperText sx={{ mt: { xs: 10, sm: 10, md: 6, lg: 6 } }} >{error}</FormHelperText>
        </FormControl>
    )
}