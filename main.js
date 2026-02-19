document.getElementById('generate').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = number;
            numbersContainer.appendChild(span);
        }, index * 200); // Stagger the animation
    });
});
