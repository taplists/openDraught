document.addEventListener('DOMContentLoaded', () => {
    const tapList = document.getElementById('tap-list');
    let beers = [];

    const loadBeers = async () => {
        try {
            const response = await fetch('beers.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            beers = await response.json();
            displayBeers();
        } catch (error) {
            console.error('Failed to load beers:', error);
        }
    };

    const loadColors = async () => {
        try {
            const response = await fetch('colors.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const colors = await response.json();
            document.documentElement.style.setProperty('--odd-line-color', colors.odd);
            document.documentElement.style.setProperty('--even-line-color', colors.even);
            document.documentElement.style.setProperty('--text-color', colors.text);
        } catch (error) {
            console.error('Failed to load colors:', error);
        }
    };

    const displayBeers = () => {
        tapList.innerHTML = '';
        beers.forEach((beer, index) => {
            const beerElement = document.createElement('div');
            beerElement.classList.add('beer');
            beerElement.innerHTML = `
                <p>
                    <span style="font-size: 29pt;">${index + 1}.&nbsp;&nbsp;</span>
                    <span style="font-size: 29pt; font-weight: bold;">${beer.name}</span>
                    <span style="font-size: 21pt;">&nbsp;by <b>${beer.brewery} - ${beer.type} - ${beer.abv}</b></span>
                </p>
            `;
            tapList.appendChild(beerElement);
        });
    };

    loadColors();
    loadBeers();
});
