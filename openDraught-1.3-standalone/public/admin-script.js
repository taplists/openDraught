document.addEventListener('DOMContentLoaded', () => {
    const tapList = document.getElementById('tapList');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const normalColorsButton = document.getElementById('normalColorsButton');
    const btbColorsButton = document.getElementById('btbColorsButton');
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

    const displayBeers = () => {
        tapList.innerHTML = '';
        beers.forEach((beer, index) => {
            const beerElement = document.createElement('div');
            beerElement.classList.add('beer');
            beerElement.innerHTML = `
                <p>
                    <span style="font-size: 29pt;">${index + 1}.&nbsp;&nbsp;</span>
                    <span style="font-size: 29pt; color: black; font-weight: bold;">${beer.name}</span>
                    <span style="font-size: 21pt; color: black;">&nbsp;by <b>${beer.brewery} - ${beer.type} - ${beer.abv}</b></span>
                    <label>Highlight <input type="checkbox" data-field="highlight" ${beer.highlight ? 'checked' : ''} disabled></label>
                </p>
            `;
            tapList.appendChild(beerElement);
        });
    };

    const enableEditing = () => {
        tapList.innerHTML = '';
        beers.forEach((beer, index) => {
            const beerElement = document.createElement('div');
            beerElement.classList.add('beer');
            beerElement.innerHTML = `
                <p>
                    <span style="font-size: 29pt;">${index + 1}.&nbsp;&nbsp;</span>
                    <input type="text" value="${beer.name}" class="beer-name" style="font-size: 29pt; color: black; font-weight: bold;">
                    <span style="font-size: 21pt; color: black;">&nbsp;by </span>
                    <input type="text" value="${beer.brewery}" class="brewery" style="font-size: 21pt; color: black;">
                    <input type="text" value="${beer.type}" class="type" style="font-size: 21pt; color: black;">
                    <input type="text" value="${beer.abv}" class="abv" style="font-size: 21pt; color: black;">
                    <label>Highlight <input type="checkbox" data-field="highlight" ${beer.highlight ? 'checked' : ''}></label>
                </p>
            `;
            tapList.appendChild(beerElement);
        });
    };

    const saveBeers = async () => {
        const beerElements = document.querySelectorAll('.beer');
        beerElements.forEach((beerElement, index) => {
            const name = beerElement.querySelector('.beer-name').value;
            const brewery = beerElement.querySelector('.brewery').value;
            const type = beerElement.querySelector('.type').value;
            const abv = beerElement.querySelector('.abv').value;
            const highlight = beerElement.querySelector('input[data-field="highlight"]').checked;
            beers[index] = { name, brewery, type, abv, highlight };
        });

        try {
            const response = await fetch('/update-beers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beers)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Beers updated successfully');
            displayBeers();
        } catch (error) {
            console.error('Failed to save beers:', error);
            alert('Failed to save beers');
        }
    };

    const updateColors = async (colors, bannerImage) => {
        try {
            const response = await fetch('/save-colors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colors)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Colors updated successfully');
            await updateBannerImage(bannerImage);
        } catch (error) {
            console.error('Failed to update colors:', error);
            alert('Failed to update colors');
        }
    };

    const updateBannerImage = async (bannerImage) => {
        try {
            const response = await fetch('/update-banner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bannerImage })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Banner image updated successfully');
        } catch (error) {
            console.error('Failed to update banner image:', error);
            alert('Failed to update banner image');
        }
    };

    editButton.addEventListener('click', () => {
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
        enableEditing();
    });

    saveButton.addEventListener('click', () => {
        editButton.style.display = 'inline';
        saveButton.style.display = 'none';
        saveBeers();
    });

    normalColorsButton.addEventListener('click', () => {
        updateColors({ evenColor: '#f58d72', oddColor: '#fcda81' }, 'banner.jpg');
    });

    btbColorsButton.addEventListener('click', () => {
        updateColors({ evenColor: '#b4ced5', oddColor: '#dbdce0' }, 'btb-banner.png');
    });

    loadBeers();
});
