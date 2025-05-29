import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './SearchBox.module.css';
import PropTypes from "prop-types";

export default function SearchBox({ value, onFilter }) {
    const searchFieldId = useId();

    return (
        <Formik
            initialValues={{
                search: ''
            }}
            onSubmit={() => {}}
        >
            <Form className={css.container}>
                <label htmlFor={searchFieldId}>Find contacts by name</label>
                <Field
                    type="text"
                    id={searchFieldId}
                    name="search"
                    value={value}
                    onChange={(e) => onFilter(e.target.value)}
                />
                <ErrorMessage
                    className={css.error}
                    name="search"
                    component="span"
                />
            </Form>
        </Formik>
    );
}

SearchBox.PropTypes = {
    value: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired
};
