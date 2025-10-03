import {useEffect, useRef, useState, useCallback} from 'react'
import './styles/InquiryModal.css'
import {PHONE_NUMBER} from '../app/constants/phoneNumber'

function InquiryModal({open,onClose,onSubmit}) {
    const panelRef=useRef(null)
    const firstFieldRef=useRef(null)
    const messageRef=useRef(null)
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [message,setMessage]=useState('')
    const [attempted,setAttempted]=useState(false)
    const [submitted,setSubmitted]=useState(false)
    const [submitting,setSubmitting]=useState(false)
    const [errors,setErrors]=useState({})
    const maxMessage=1200
    const formatPhone=v=>{ const digits=v.replace(/[^0-9]/g,'').slice(0,15); if(digits.length<4) return digits; if(digits.length<7) return `(${digits.slice(0,3)}) ${digits.slice(3)}`; if(digits.length<11) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`; return `+${digits.slice(0,-10)} (${digits.slice(-10,-7)}) ${digits.slice(-7,-4)}-${digits.slice(-4)}` }
    const validate=useCallback(()=>{ const e={}; if(!firstName.trim()) e.firstName='Required'; if(!lastName.trim()) e.lastName='Required'; if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email='Invalid'; if(!phone.replace(/[^0-9]/g,'').match(/[0-9]{7,}/)) e.phone='Invalid'; if(!message.trim()||message.trim().length<5) e.message='Too short'; return e },[firstName,lastName,email,phone,message])
    const isValid = Object.keys(validate()).length===0
    useEffect(()=>{ if(open){ setTimeout(()=>{ firstFieldRef.current&&firstFieldRef.current.focus() },40) } },[open])
    useEffect(()=>{ function onKey(e){ if(e.key==='Escape'&&open){ e.preventDefault(); onClose() } if(e.key==='Tab'&&open&&panelRef.current){ const focusable=panelRef.current.querySelectorAll('button,a[href],input,textarea,select,[tabindex]:not([tabindex="-1"])'); const list=[...focusable].filter(el=>!el.disabled&&el.getAttribute('aria-hidden')!=='true'); if(!list.length) return; const first=list[0]; const last=list[list.length-1]; if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus() } else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus() } } } window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey) },[open,onClose])
    useEffect(()=>{ if(open){ setErrors(validate()) } },[firstName,lastName,email,phone,message,open,validate])
    if(!open) return null
    function autoGrow(){ if(messageRef.current){ messageRef.current.style.height='auto'; messageRef.current.style.height=messageRef.current.scrollHeight+'px' } }
    function submit(e){ e.preventDefault(); setAttempted(true); const eMap=validate(); setErrors(eMap); if(Object.keys(eMap).length){ const firstErr=Object.keys(eMap)[0]; const sel= firstErr==='firstName'? firstFieldRef.current : panelRef.current.querySelector(firstErr==='lastName'? 'input[data-field="lastName"]' : firstErr==='email'?'input[type="email"]': firstErr==='phone'?'input[type="tel"]':'textarea'); sel&&sel.focus(); return } setSubmitting(true); const data={firstName,lastName,email,phone,message}; onSubmit&&onSubmit(data); setTimeout(()=>{ setSubmitting(false); setSubmitted(true) },900) }
    function handleChange(setter){ return ev=>{ setter(ev.target.value); if(attempted){ setErrors(validate()) } } }
    function resetAndClose(){ onClose(); setTimeout(()=>{ setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setMessage(''); setSubmitted(false); setSubmitting(false); setErrors({}); setAttempted(false) },250) }
    return (
        <div className="inqModal" role="dialog" aria-modal="true" aria-labelledby="inqTitle" aria-describedby="inqDesc">
            <div className="inqModal__backdrop" onClick={!submitting?resetAndClose:undefined}/>
            <div className={`inqShell${submitted?' inqShell--done':''}`} ref={panelRef} data-phase={submitted?'done':'form'}>
                {!submitted && <form className="inqLayout" onSubmit={submit} noValidate>
                    <header className="inqHeader">
                        <h2 id="inqTitle" className="inqHeader__title">Lease Inquiry</h2>
                    </header>
                    <div className="inqGrid">
                        <label className="inqField"><span className="inqField__label">First Name</span><input data-field="firstName" ref={firstFieldRef} className="inqInput" value={firstName} onChange={handleChange(setFirstName)} aria-invalid={attempted&&errors.firstName?true:undefined}/>{attempted&&errors.firstName&&<span className="inqErr">{errors.firstName}</span>}</label>
                        <label className="inqField"><span className="inqField__label">Last Name</span><input data-field="lastName" className="inqInput" value={lastName} onChange={handleChange(setLastName)} aria-invalid={attempted&&errors.lastName?true:undefined}/>{attempted&&errors.lastName&&<span className="inqErr">{errors.lastName}</span>}</label>
                        <label className="inqField"><span className="inqField__label">Email</span><input className="inqInput" type="email" value={email} onChange={handleChange(setEmail)} aria-invalid={attempted&&errors.email?true:undefined}/>{attempted&&errors.email&&<span className="inqErr">{errors.email}</span>}</label>
                        <label className="inqField"><span className="inqField__label">Phone</span><input className="inqInput" type="tel" value={phone} onChange={e=>{ setPhone(formatPhone(e.target.value)); if(attempted) setErrors(validate()) }} aria-invalid={attempted&&errors.phone?true:undefined} placeholder="(555) 555-5555"/>{attempted&&errors.phone&&<span className="inqErr">{errors.phone}</span>}</label>
                        <label className="inqField inqField--full"><span className="inqField__label">Message</span><textarea ref={messageRef} className="inqTextarea" rows={4} value={message} onChange={e=>{ setMessage(e.target.value.slice(0,maxMessage)); autoGrow(); if(attempted) setErrors(validate()) }} aria-invalid={attempted&&errors.message?true:undefined} placeholder="Describe your docking needs, vessel size, timeline..."/>{attempted&&errors.message&&<span className="inqErr">{errors.message}</span>}<span className="inqCounter" aria-live="polite">{message.length}/{maxMessage}</span></label>
                    </div>
                    <div className="inqFooter inqFooter--actions">
                        <div className="inqActions inqActions--right">
                            <button type="button" className="inqBtn inqBtn--call" onClick={()=>window.location.href=`tel:1${PHONE_NUMBER.replace(/[^0-9]/g,'')}`}>Call</button>
                            <button type="button" disabled={submitting} className="inqBtn inqBtn--ghost" onClick={resetAndClose}>Cancel</button>
                            <button type="submit" disabled={!isValid||submitting} className="inqBtn inqBtn--primary" data-busy={submitting}>{submitting?'Sending\u2026':'Submit'}</button>
                        </div>
                    </div>
                    <div className="inqLive" aria-live="assertive" aria-atomic="true">{attempted && Object.keys(errors).length? 'Please fix highlighted fields.' : ''}</div>
                </form>}
                {submitted && <div className="inqResult">
                    <div className="inqResult__icon" aria-hidden="true">\u2713</div>
                    <h2 className="inqResult__title">Message Sent</h2>
                    <p className="inqResult__text">We will reach out within 24 hours. You can also call {PHONE_NUMBER} any time for immediate assistance.</p>
                    <div className="inqResult__actions"><button className="inqBtn inqBtn--primary" onClick={resetAndClose}>Close</button></div>
                </div>}
            </div>
        </div>
    )
}
export default InquiryModal
