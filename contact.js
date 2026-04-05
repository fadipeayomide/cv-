document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // ✅ CONFIGURATION
    const CONTACT_INFO = {
        formspreeEndpoint: 'https://formspree.io/f/mnjooenj', 
        whatsappNumber: '2349033212713'
    };

    /**
     * Show Notification Tool
     */
    function showNotification(message, type = 'success') {
        const notifDiv = document.createElement('div');
        const bgColor = type === 'success' ? '#dcfce7' : '#fee2e2';
        const textColor = type === 'success' ? '#15803d' : '#991b1b';
        
        notifDiv.style.cssText = `
            background-color: ${bgColor};
            color: ${textColor};
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 4px solid ${type === 'success' ? '#22c55e' : '#dc2626'};
            font-weight: 500;
        `;
        notifDiv.innerHTML = `<span>${message}</span>`;
        contactForm.insertBefore(notifDiv, contactForm.firstChild);
        
        setTimeout(() => notifDiv.remove(), 5000);
    }

    /**
     * WhatsApp Logic
     */
    function sendViaWhatsApp(name, email, message) {
        const text = encodeURIComponent(`*New Message*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`);
        const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Email Logic (Formspree)
     */
    async function sendViaEmail(name, email, message) {
        const response = await fetch(CONTACT_INFO.formspreeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        if (!response.ok) throw new Error();
    }

    // --- MAIN SUBMIT EVENT ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            try {
                if (deliveryMethod === 'email' || deliveryMethod === 'both') {
                    await sendViaEmail(name, email, message);
                } 

                if (deliveryMethod === 'whatsapp' || deliveryMethod === 'both') {
                    sendViaWhatsApp(name, email, message);
                }
                
                showNotification('✅ Message processed successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('❌ Failed to send. Check your internet.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
