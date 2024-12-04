import React, { useState } from 'react';

function WhatsAppForm() {
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const fullMessage = `שם: ${name}\nטלפון: ${telephone}\nהודעה: ${message}`;
        const whatsappUrl = `https://wa.me/9720533380740/?text=${encodeURIComponent(fullMessage)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <form onSubmit={handleSubmit} className='contact-form container mt-5'>
        <div className="form-group row">
            <div className="col-md-6 mb-1">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="שם..." 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="col-md-6 mb-1">
                <input 
                    type="text" 
                    className="form-control shadow" 
                    placeholder="טלפון..." 
                    required 
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                />
            </div>
        </div>
        <div className="form-group">
            <textarea 
                className="form-control shadow" 
                placeholder="כתוב הודעה כאן ותקבל מענה מיידי..." 
                required 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
            ></textarea>
        </div>
        <div className='text-center'>
            <button type="submit" className='btn btn-info mt-2 shadow'>שלח</button>
        </div>
    </form>
    
    );
}

export default WhatsAppForm;
