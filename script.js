document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const cityInput = document.getElementById('city');
    const timeInput = document.getElementById('submissionTime');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Set the city and submission time
        cityInput.value = Cookies.get('city') || 'Unknown';
        timeInput.value = new Date().toLocaleString();
        
        // Submit the form
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message. I will get back to you soon!');
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    });
});