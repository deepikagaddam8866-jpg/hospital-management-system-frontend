import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm MediBot. How can I assist you with your appointments today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');

        // Simulate bot reply
        setTimeout(() => {
            let reply = "I'm a virtual assistant. If this is a medical emergency, please call 911 or visit the ER immediately.";
            const lowerMsg = userMsg.toLowerCase();
            
            if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
                reply = "You can book an appointment by logging in and navigating to the Patient Portal Dashboard.";
            } else if (lowerMsg.includes('doctor')) {
                reply = "We have many top-tier specialists available. You can view our Doctor list on the patient dashboard!";
            } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                reply = "Hello there! How can I help you today?";
            } else if (lowerMsg.includes('wait') || lowerMsg.includes('queue')) {
                reply = "You can check your current wait time and token number via the Patient Portal.";
            }
            
            setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999 }}>
            {!isOpen && (
                <Button 
                    variant="primary" 
                    className="rounded-circle shadow-lg d-flex justify-content-center align-items-center fade-in"
                    style={{ width: '65px', height: '65px', transition: 'transform 0.3s ease' }}
                    onClick={toggleChat}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <i className="bi bi-chat-dots-fill" style={{ fontSize: '1.8rem' }}></i>
                </Button>
            )}

            {isOpen && (
                <Card className="shadow-lg border-0 fade-in" style={{ width: '360px', height: '520px', display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden' }}>
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center" style={{ borderBottom: 'none', padding: '1rem' }}>
                        <span className="fw-bold fs-5"><i className="bi bi-robot me-2"></i> MediBot</span>
                        <Button variant="link" className="text-white p-0 text-decoration-none" onClick={toggleChat}>
                            <i className="bi bi-x-lg fs-5"></i>
                        </Button>
                    </Card.Header>
                    
                    <Card.Body className="bg-light d-flex flex-column" style={{ overflowY: 'auto' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-3 p-3 rounded-4 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white align-self-end' : 'bg-white text-dark align-self-start border'}`} style={{ maxWidth: '85%', wordWrap: 'break-word', borderBottomRightRadius: msg.sender === 'user' ? '4px' : '1rem', borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '1rem' }}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={endOfMessagesRef} />
                    </Card.Body>

                    <Card.Footer className="bg-white m-0 p-3 shadow-sm" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <Form onSubmit={handleSend} className="d-flex w-100 align-items-center">
                            <Form.Control 
                                type="text" 
                                placeholder="Write a message..." 
                                value={input} 
                                onChange={e => setInput(e.target.value)}
                                className="me-2 rounded-pill px-3 py-2 border-0 bg-light"
                                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                            />
                            <Button type="submit" variant="primary" className="rounded-circle d-flex justify-content-center align-items-center shadow-sm" style={{ width: '45px', height: '45px', flexShrink: 0 }}>
                                <i className="bi bi-send-fill fs-5" style={{ marginLeft: '-2px' }}></i>
                            </Button>
                        </Form>
                    </Card.Footer>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;
