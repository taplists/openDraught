document.addEventListener('DOMContentLoaded', () => {
    const oddColorInput = document.getElementById('odd-color');
    const evenColorInput = document.getElementById('even-color');
    const textColorInput = document.getElementById('text-color');
    const saveColorsButton = document.getElementById('save-colors-button');

    const loadColors = async () => {
        try {
            const response = await fetch('colors.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const colors = await response.json();
            oddColorInput.value = colors.odd;
            evenColorInput.value = colors.even;
            textColorInput.value = colors.text;
        } catch (error) {
            console.error('Failed to load colors:', error);
        }
    };

    const saveColors = async () => {
        const colors = {
            odd: oddColorInput.value,
            even: evenColorInput.value,
            text: textColorInput.value
        };

        try {
            const response = await fetch('/update-colors', {
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
        } catch (error) {
            console.error('Failed to save colors:', error);
            alert('Failed to save colors');
        }
    };

    saveColorsButton.addEventListener('click', saveColors);

    loadColors();
});
