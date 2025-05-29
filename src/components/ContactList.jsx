import Contact from './Contact.jsx';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export default function ContactList({ list, removeContact }) {
    return (
        <ul className={css.container}>
            {list.map(({ id, name, number }) => (
                <Contact
                    key={id}
                    id={id}
                    name={name}
                    number={number}
                    removeContact={removeContact}
                />
            ))}
        </ul>
    );
}

ContactList.PropTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })).isRequired,
    removeContact: PropTypes.func.isRequired
};
