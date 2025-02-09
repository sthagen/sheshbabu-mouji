document.addEventListener('DOMContentLoaded', () => {
    initBarChart();
    initDropdown();
});

function initBarChart() {
    const tooltip = document.querySelector('.tooltip');
    const tooltipLabel = document.querySelector('.tooltip > .label');
    const tooltipValue = document.querySelector('.tooltip > .value');
    const bars = document.querySelectorAll('.bar');

    bars.forEach(bar => {
        bar.addEventListener('mousemove', (e) => {
            tooltipLabel.textContent = bar.getAttribute('data-label');
            tooltipValue.textContent = `${bar.getAttribute('data-value')} views`;
            tooltip.style.display = 'flex';

            const barRect = bar.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            const tooltipHeight = tooltipRect.height;
            const tooltipWidth = tooltipRect.width;

            const topY = barRect.top + window.scrollY; // https://stackoverflow.com/q/41576287
            let tooltipLeft = barRect.x + (barRect.width / 2) - (tooltipWidth / 2);
            if (tooltipLeft + tooltipWidth > window.innerWidth) { // https://o7planning.org/12397/javascript-window
                tooltipLeft = barRect.right - tooltipWidth;
            } else if (tooltipLeft < 0) {
                tooltipLeft = barRect.left;
            }
            tooltip.style.left = `${tooltipLeft}px`;
            tooltip.style.top = `${topY - tooltipHeight - 5}px`;
        });

        bar.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

function initDropdown() {
    const dropdowns = document.querySelectorAll('.dropdown-container');
    dropdowns.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-button')) {
                e.preventDefault(); // Prevent form submission
                el.classList.add('open');
            } else if (e.target.closest('span.dropdown-option')) {
                e.preventDefault(); // Prevent form submission
                el.querySelector("#dropdown-hidden-input").value = e.target.dataset.value;
                el.querySelector(".dropdown-selected-option").textContent = e.target.dataset.name;
                el.classList.remove('open');
            }
        });
    });
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-container')) {
        return;
    }

    const dropdowns = document.querySelectorAll('.dropdown-container.open');
    dropdowns.forEach(el => el.classList.remove('open'));
});