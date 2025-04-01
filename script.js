// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navMenu = this.closest('nav').querySelector('.hidden.md\\:flex');
            navMenu.classList.toggle('hidden');
        });
    }

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });

    // Logout button
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would clear session/token
            localStorage.removeItem('quickclean_user');
            window.location.href = 'index.html';
        });
    });

    // Simulate authentication check for protected pages
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('admin.html')) {
        checkAuth();
    }
});

function handleFormSubmit(form) {
    const formId = form.id;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    switch(formId) {
        case 'loginForm':
            // Simulate login
            localStorage.setItem('quickclean_user', JSON.stringify({
                email: data.email,
                name: 'User'
            }));
            showToast('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            break;

        case 'signupForm':
            // Simulate signup
            showToast('Account created successfully! Please login.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            break;

        case 'bookingForm':
            // Simulate booking
            showToast('Order placed successfully!');
            form.reset();
            break;

        default:
            console.log('Form submitted', data);
            showToast('Action completed');
    }
}

function checkAuth() {
    const user = localStorage.getItem('quickclean_user');
    if (!user) {
        window.location.href = 'login.html';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Dashboard specific functionality
if (window.location.pathname.includes('dashboard.html')) {
    // Sample data for orders
    const orders = [
        {
            id: 'QC12345',
            service: 'Wash & Fold (5kg)',
            status: 'In Progress',
            amount: '₹495',
            date: '15 June 2023'
        },
        {
            id: 'QC12344',
            service: 'Dry Cleaning (3 items)',
            status: 'Ready for Pickup',
            amount: '₹360',
            date: '14 June 2023'
        }
    ];

    // Populate order history
    const orderHistoryTable = document.querySelector('#orderHistory tbody');
    if (orderHistoryTable) {
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.service}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.date}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="order-tracking.html" class="text-blue-600 hover:text-blue-900">Track</a>
                </td>
            `;
            orderHistoryTable.appendChild(row);
        });
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'In Progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'Ready for Pickup':
            return 'bg-green-100 text-green-800';
        case 'Delivered':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}