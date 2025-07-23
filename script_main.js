document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    const address = document.querySelector('input').value;
    window.location.href = `main.html?address=${encodeURIComponent(address)}`;
});

