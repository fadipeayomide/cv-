// ==================== 
// AWARD DATA
// ====================
const awardData = [
    {
        id: 1,
        title: 'Foursquare Student Fellowship',
        issuer: 'Foursquare Church',
        date: '2024 - 2025',
        category: 'scholarship',
        description: '60% tuition scholarship awarded for outstanding academic performance (3.54/4.00 GPA) and demonstrated leadership qualities in the Computer Engineering Department.',
        imagePath: 'assets/certificates/fsf-scholarship.jpg'
    },
    {
        id: 2,
        title: 'Academic Excellence Award',
        issuer: 'School of Virtue, Federal Polytechnic Ilaro',
        date: 'February 2025',
        category: 'award',
        description: 'Recognized for maintaining a "Distinction" grade point average (3.54/4.00) while demonstrating exemplary character.',
        imagePath: 'assets/certificates/sov-certificate.jpg'
    },
    {
        id: 3,
        title: 'ND Students Tutor Recognition',
        issuer: 'NACOMES, Federal Polytechnic Ilaro',
        date: '2024 - 2025',
        category: 'award',
        description: 'Recognized for "immense contributions" to the Department of Computer Engineering through academic support.',
        imagePath: 'assets/certificates/nacomes-award.jpg'
    },
    {
        id: 4,
        title: 'Technical Quiz Competition',
        issuer: 'NAPES, Federal Polytechnic Ilaro',
        date: 'September 2024',
        category: 'award',
        description: 'Selected to represent the Department of Computer Engineering in the Annual Interdepartmental Quiz Competition.',
        imagePath: 'assets/certificates/napes-quiz.jpg'
    },
    {
        id: 5,
        title: 'Diploma in Information Technology Support',
        issuer: 'Alison Online Learning Platform',
        date: 'November 2025',
        category: 'certification',
        description: 'Comprehensive professional diploma covering IT support fundamentals and technical troubleshooting.',
        imagePath: 'assets/certificates/it-support-cert.jpg'
    },
    {
        id: 6,
        title: 'Introduction to Data Analysis',
        issuer: 'Alison Online Learning Platform',
        date: 'October 2025',
        category: 'certification',
        description: 'Foundational certification in data analysis methodologies and data visualization techniques.',
        imagePath: 'assets/certificates/data-analysis-cert.jpg'
    }
];

// ==================== 
// OPEN MODAL
// ====================
function openAwardModal(awardId) {
    // Find the award data
    const award = awardData.find(a => a.id === awardId);
    
    if (!award) {
        console.error('Award not found with ID:', awardId);
        return;
    }

    // Get modal elements
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalIssuer = document.getElementById('modalIssuer');
    const modalDescription = document.getElementById('modalDescription');
    const errorMessage = document.getElementById('imageErrorMessage');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Reset error message and image display
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
    if (modalImage) {
        modalImage.style.display = 'block';
    }

    // Set modal content
    if (modalTitle) {
        modalTitle.textContent = award.title;
    }
    
    if (modalIssuer) {
        modalIssuer.textContent = award.issuer + ' • ' + award.date;
    }
    
    if (modalDescription) {
        modalDescription.textContent = award.description;
    }

    // Set and load image
    if (modalImage) {
        modalImage.src = award.imagePath;
        modalImage.alt = award.title;

        // Log for debugging
        console.log('Loading image:', award.imagePath);

        // Handle image loading success
        modalImage.onload = function() {
            console.log('Image loaded successfully:', award.imagePath);
        };

        // Handle image loading error
        modalImage.onerror = function() {
            handleImageError();
        };
    }

    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('show');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Log action
    console.log('Opened modal for award:', award.title);
}

// ==================== 
// CLOSE MODAL
// ====================
function closeAwardModal() {
    const modal = document.getElementById('certificateModal');
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Hide modal
    modal.classList.add('hidden');
    modal.classList.remove('show');

    // Re-enable body scroll
    document.body.style.overflow = 'auto';

    console.log('Modal closed');
}

// ==================== 
// HANDLE IMAGE ERROR
// ====================
function handleImageError() {
    const modalImage = document.getElementById('modalImage');
    const errorMessage = document.getElementById('imageErrorMessage');

    if (modalImage) {
        modalImage.style.display = 'none';
    }

    if (errorMessage) {
        errorMessage.style.display = 'flex';
    }

    console.error('Failed to load image. Please check the file path.');
}

// ==================== 
// SHARE AWARD
// ====================
function shareAward(awardName) {
    if (!awardName) {
        console.error('Award name is required');
        return;
    }

    const shareText = `Check out my achievement: ${awardName}`;
    const shareUrl = window.location.href;

    // Log share attempt
    console.log('Attempting to share:', awardName);

    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Award & Certification',
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            console.log('Share successful');
        })
        .catch(err => {
            if (err.name !== 'AbortError') {
                console.log('Share error:', err);
                fallbackShare(shareText);
            }
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        fallbackShare(shareText);
    }
}

// ==================== 
// FALLBACK SHARE FUNCTION
// ====================
function fallbackShare(shareText) {
    // Try to copy to clipboard
    navigator.clipboard.writeText(shareText)
        .then(() => {
            showNotification('Achievement copied to clipboard!', 'success');
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy to clipboard:', err);
            showNotification('Unable to copy. Please try again.', 'error');
        });
}

// ==================== 
// NOTIFICATION
// ====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Add notification to DOM
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== 
// FILTER AWARDS
// ====================
function filterAwards(category) {
    const awardItems = document.querySelectorAll('.award-item');
    let visibleCount = 0;

    console.log('Filtering by category:', category);

    // Filter items
    awardItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    console.log(`Showing ${visibleCount} items for category: ${category}`);
}

// ==================== 
// FILTER BUTTON HANDLER
// ====================
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.filter;

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter awards
            filterAwards(category);
        });
    });

    console.log('Filter buttons initialized');
}

// ==================== 
// MODAL EVENT LISTENERS
// ====================
function setupModalListeners() {
    const modal = document.getElementById('certificateModal');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Close modal on overlay click
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeAwardModal();
            }
        });
    }

    // Close modal on close button click
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAwardModal);
    }

    // Close modal on Escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAwardModal();
        }
    });

    console.log('Modal listeners initialized');
}

// ==================== 
// PREVENT BODY SCROLL ON MODAL
// ====================
function setupScrollPrevention() {
    document.addEventListener('wheel', function(e) {
        const modal = document.getElementById('certificateModal');
        if (modal && modal.classList.contains('show')) {
            const modalContent = modal.querySelector('.modal-content-award');
            if (modalContent && !modalContent.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

// ==================== 
// LAZY LOAD IMAGES (OPTIONAL)
// ====================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==================== 
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==================== 
// INITIALIZE ON PAGE LOAD
// ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Awards page loaded');
    
    try {
        // Setup all event listeners and functionality
        setupFilterButtons();
        setupModalListeners();
        setupScrollPrevention();
        setupSmoothScroll();
        
        console.log('All initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// ==================== 
// HANDLE WINDOW RESIZE
// ====================
window.addEventListener('resize', function() {
    const modal = document.getElementById('certificateModal');
    if (modal && modal.classList.contains('show')) {
        // Modal is open, ensure proper styling
        console.log('Window resized while modal is open');
    }
});

// ==================== 
// UTILITY FUNCTION: GET AWARD BY ID
// ====================
function getAwardById(awardId) {
    return awardData.find(a => a.id === awardId);
}

// ==================== 
// UTILITY FUNCTION: GET AWARDS BY CATEGORY
// ====================
function getAwardsByCategory(category) {
    if (category === 'all') {
        return awardData;
    }
    return awardData.filter(a => a.category === category);
}

// ==================== 
// UTILITY FUNCTION: COUNT AWARDS
// ====================
function countAwards(category = 'all') {
    if (category === 'all') {
        return awardData.length;
    }
    return awardData.filter(a => a.category === category).length;
}

// ==================== 
// LOG AWARD STATISTICS
// ====================
function logAwardStats() {
    console.group('Award Statistics');
    console.log('Total Awards:', countAwards('all'));
    console.log('Awards:', countAwards('award'));
    console.log('Certifications:', countAwards('certification'));
    console.log('Scholarships:', countAwards('scholarship'));
    console.groupEnd();
}

// Log stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    logAwardStats();
});

// ==================== 
// TOUCH/MOBILE SUPPORT
// ====================
function setupTouchSupport() {
    // Improve touch responsiveness
    document.addEventListener('touchstart', function() {}, false);

    // Handle button touches
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupTouchSupport);

// ==================== 
// PRINT FUNCTIONALITY (OPTIONAL)
// ====================
function printAward(awardId) {
    const award = getAwardById(awardId);
    
    if (!award) {
        console.error('Award not found');
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>${award.title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #333;
                    }
                    h1 {
                        color: #6366f1;
                        border-bottom: 2px solid #6366f1;
                        padding-bottom: 10px;
                    }
                    .details {
                        margin: 20px 0;
                        line-height: 1.8;
                    }
                    .label {
                        font-weight: bold;
                        color: #6366f1;
                    }
                </style>
            </head>
            <body>
                <h1>${award.title}</h1>
                <div class="details">
                    <p><span class="label">Issued by:</span> ${award.issuer}</p>
                    <p><span class="label">Date:</span> ${award.date}</p>
                    <p><span class="label">Category:</span> ${award.category}</p>
                    <p><span class="label">Description:</span> ${award.description}</p>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ==================== 
// EXPORT DATA AS JSON (OPTIONAL)
// ====================
function exportAwardsData() {
    const dataStr = JSON.stringify(awardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'awards-data.json';
    link.click();
    console.log('Awards data exported');
}