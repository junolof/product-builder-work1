const themeToggle = document.getElementById('theme-toggle');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');

// Theme logic
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Search logic
searchBtn.addEventListener('click', async () => {
    const koreanInput = document.getElementById('korean-input').value.trim();
    const userNote = document.getElementById('user-note').value.trim();
    resultsContainer.innerHTML = '';

    if (!koreanInput) {
        resultsContainer.innerHTML = '<p style="color: #ffcdd2;">Please enter a Korean word or phrase.</p>';
        return;
    }

    try {
        // Step 1: Translate Korean to English
        const transResponse = await fetch(`https://api.mymemory.translated.net/get?q=${koreanInput}&langpair=ko|en`);
        const transData = await transResponse.json();
        const fullTranslation = transData.responseData.translatedText;
        const searchWord = fullTranslation.split(/[ ,.!?]/)[0]; // Use first word for dictionary

        // Step 2: Get Dictionary info for the primary word
        const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
        let wordData = null;
        if (dictResponse.ok) {
            const dictData = await dictResponse.json();
            wordData = dictData[0];
        }

        // Step 3: Render results
        renderResults(fullTranslation, wordData, userNote);

    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = `<p style="color: #ffcdd2;">Something went wrong. Please try again.</p>`;
    }
});

function renderResults(translation, dictData, memo) {
    let html = `
        <div class="result-section">
            <h2>
                Translation: ${translation}
                ${memo ? `<span class="user-memo">Note: ${memo}</span>` : ''}
            </h2>
        </div>
    `;

    if (dictData) {
        const word = dictData.word;
        const phonetic = dictData.phonetic || (dictData.phonetics && dictData.phonetics.find(p => p.text) || {}).text || '';
        
        html += `
            <div class="result-section">
                <h2>Dictionary: ${word} <span class="phonetic">${phonetic}</span></h2>
        `;

        dictData.meanings.forEach(meaning => {
            html += `
                <h3>${meaning.partOfSpeech}</h3>
                <ul>
            `;
            meaning.definitions.slice(0, 3).forEach(def => {
                html += `
                    <li>
                        <p>${def.definition}</p>
                        ${def.example ? `<p><em>Ex: ${def.example}</em></p>` : ''}
                    </li>
                `;
            });
            html += `</ul>`;
        });
        html += `</div>`;
    } else {
        html += `
            <div class="result-section">
                <p>No detailed dictionary info found for "${translation.split(' ')[0]}".</p>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
}
