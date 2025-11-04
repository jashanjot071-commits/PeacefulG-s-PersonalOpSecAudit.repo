// Use 'DOMContentLoaded' to ensure the entire HTML structure is ready before running the script.
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mobile Navigation Toggle --- */
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    
    /**
     * Toggles the mobile navigation menu visibility.
     */
    const toggleMobileNav = () => {
        const isExpanded = nav.classList.toggle('open');
        // Update ARIA attribute for screen readers
        hamburger.setAttribute('aria-expanded', isExpanded);
    };

    hamburger.addEventListener('click', toggleMobileNav);

    // Close the mobile menu if a navigation link is clicked (improves UX)
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                toggleMobileNav(); // Use the toggle function to close
            }
        });
    });


    /* --- 2. Enhanced Smooth Scrolling --- */
    
    /**
     * Calculates the offset for smooth scrolling, accounting for the sticky header.
     */
    const getScrollOffset = () => {
        const header = document.querySelector('header.sticky-nav');
        // Get the computed height of the sticky header, or 0 if not found
        return header ? parseFloat(getComputedStyle(header).height) : 0; 
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = getScrollOffset();
                // Calculate target position: element top position + current scroll position - header height
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* --- 3. Interactive Phishing Quiz Logic --- */
    
    const quizButtons = document.querySelectorAll('.quiz-button');
    const quizMessage = document.getElementById('quiz-message');

    // Define the correct answer (based on the fake-paypal-email.png)
    const CORRECT_ANSWER = 'scam';
    const MESSAGE_DURATION = 5000; // Reset message after 5 seconds

    /**
     * Handles the quiz answer submission, provides feedback, and disables buttons.
     */
    const handleQuizAnswer = (e) => {
        const userAnswer = e.target.getAttribute('data-answer');

        // Reset message state
        quizMessage.textContent = '';
        quizMessage.classList.remove('correct', 'incorrect');
        
        // Provide feedback
        if (userAnswer === CORRECT_ANSWER) {
            quizMessage.classList.add('correct');
            quizMessage.textContent = '✅ Correct! That\'s a classic phishing attempt with a fake sender and urgent tone.';
        } else {
            quizMessage.classList.add('incorrect');
            quizMessage.textContent = '❌ Careful! Always double-check the sender\'s full email and watch out for urgent, threatening language or suspicious links.';
        }

        // Disable buttons permanently (or re-enable for a retry mechanism)
        quizButtons.forEach(btn => btn.disabled = true);
        
        // Clear the message after a set duration
        setTimeout(() => {
            quizMessage.textContent = '';
            quizMessage.classList.remove('correct', 'incorrect');
            // Re-enable buttons if you want the user to try again
            // quizButtons.forEach(btn => btn.disabled = false);
        }, MESSAGE_DURATION);
    };

    quizButtons.forEach(button => {
        button.addEventListener('click', handleQuizAnswer);
    });

});