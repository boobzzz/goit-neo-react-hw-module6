import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Name is too short')
        .max(50, 'Name is too long'),
    number: Yup.string()
        .required('Number is required')
        .matches(/^\d{3}-\d{2}-\d{2}$/, 'Phone number is not valid'),
});

export default function ContactForm({ addContact }) {
    const nameFieldId = useId();
    const numberFieldId = useId();

    const handleSubmit = (values, actions) => {
        addContact(values);
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                name: '',
                number: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={ContactSchema}
        >
            <Form className={css.container}>
                <div className={css.fieldContainer}>
                    <label htmlFor={nameFieldId}>Name</label>
                    <Field type="text" id={nameFieldId} name="name" />
                    <ErrorMessage
                        className={css.error}
                        name="name"
                        component="span"
                    />
                </div>

                <div className={css.fieldContainer}>
                    <label htmlFor={numberFieldId}>Number</label>
                    <Field type="text" id={numberFieldId} name="number" />
                    <ErrorMessage
                        className={css.error}
                        name="number"
                        component="span"
                    />
                </div>

                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    );
}

ContactForm.PropTypes = {
    addContact: PropTypes.func.isRequired
};
