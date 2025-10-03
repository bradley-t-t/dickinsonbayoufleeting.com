import {useEffect, useRef, useState} from 'react'
import './styles/InquiryModal.css'

function InquiryModal({open, onClose, onSubmit}) {
    const ref = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                ref.current && ref.current.focus()
            }, 0)
        }
    }, [open]);
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape' && open) {
                onClose()
            }
        }

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose]);
    if (!open) return null;

    function validate() {
        const e = {};
        if (!name.trim()) e.name = 'Required';
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Invalid';
        if (!phone.replace(/[^0-9]/g, '').match(/[0-9]{7,}/)) e.phone = 'Invalid';
        setErrors(e);
        return Object.keys(e).length === 0
    }

    function submit(ev) {
        ev.preventDefault();
        if (!validate()) return;
        const data = {name, email, phone};
        onSubmit && onSubmit(data);
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setTimeout(() => {
                setName('');
                setEmail('');
                setPhone('');
                setSubmitted(false);
                setErrors({})
            }, 250)
        }, 1600)
    }

    return (<div className="inqModal" role="dialog" aria-modal="true" aria-labelledby="inquiryHeading">
        <div className="inqModal__backdrop" onClick={onClose}/>
        <div className="inqModal__panel">
            <button className="inqModal__close" aria-label="Close" onClick={onClose}>×</button>
            {!submitted && <form className="inqForm" onSubmit={submit} noValidate><h2 id="inquiryHeading"
                                                                                      className="inqForm__title">Lease
                Inquiry</h2>
                <div className="inqForm__fields"><label className="inqField"><span
                    className="inqField__label">Name</span><input ref={ref} className="inqField__input" type="text"
                                                                  value={name} onChange={e => setName(e.target.value)}
                                                                  aria-invalid={errors.name ? true : undefined}/>{errors.name &&
                    <span className="inqField__error" role="alert">{errors.name}</span>}</label><label
                    className="inqField"><span className="inqField__label">Email</span><input
                    className="inqField__input" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    aria-invalid={errors.email ? true : undefined}/>{errors.email &&
                    <span className="inqField__error" role="alert">{errors.email}</span>}</label><label
                    className="inqField"><span className="inqField__label">Phone</span><input
                    className="inqField__input" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    aria-invalid={errors.phone ? true : undefined}/>{errors.phone &&
                    <span className="inqField__error" role="alert">{errors.phone}</span>}</label></div>
                <div className="inqForm__actions">
                    <button type="submit" className="btn btn--primary">Submit</button>
                    <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
                </div>
            </form>}{submitted && <div className="inqThanks">
            <div className="inqThanks__inner"><h2 className="inqThanks__title">Thank you</h2><p
                className="inqThanks__msg">We received your request and will reach out soon.</p></div>
        </div>}</div>
    </div>)
}

export default InquiryModal

