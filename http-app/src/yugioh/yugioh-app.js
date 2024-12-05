/**
 * @param {number} monsterId 
 * @param {string} language 
 * @returns {Object} 
 */
const fetchApi = async (monsterId, language) => {
    const url = `https://ygoclient.application-service.work/MonsterType/${monsterId}/${language}`;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.TranslatedDescription) {
            data.TranslatedDescription = data.TranslatedDescription.replace(/\\\"/g, '"');
        }

        return data;
    } catch (error) {
        console.error("Error fetching data from api:", error);
        return { error: "Failed to fetch data. Please try again later." };
    }
};

/**
 * 
 * @param {HTMLDivElement} element
 */
export const YugiohAPP = async (element) =>{
    let currentMonsterId = null;

    const appTitleElement = document.querySelector('#app-title');
    if (appTitleElement) {
        appTitleElement.innerHTML = 'YuGiOh App';
    }
    const languageSelector = document.querySelector('#language-selector');
    let currentLanguage = languageSelector.value;
    element.innerHTML = currentLanguage === "en-us" 
    ? 'Loading...' 
    : 'Cargando...';
  
    const monsterLabel = document.createElement('h3');
    const monsterDescription = document.createElement('h5');
    const monsterImage = document.createElement('img');

    const nextTypeBtn = document.createElement('button');
    nextTypeBtn.style.marginTop = '10px'; 

    const updateButtonText = () => {       
        const selectedLanguage = languageSelector.value;
        nextTypeBtn.innerText = selectedLanguage === "en-us" 
            ? 'Next Monster Type' 
            : 'Siguiente tipo de monstruo';

            if (selectedLanguage !== currentLanguage) {
                currentLanguage = selectedLanguage;
                element.innerHTML = currentLanguage === "en-us" 
                ? 'Loading...' 
                : 'Cargando...';         
        
                fetchApi(currentMonsterId, currentLanguage).then(data => {
                    renderMonsterType(data);
                });
            }
    };
    
    updateButtonText();

    const renderMonsterType = (data) => {
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.alignItems = 'center';
    
        monsterLabel.innerHTML = data.TranslatedName || 'Monster Type Name';
        monsterDescription.innerHTML = data.TranslatedDescription || 'Monster Description';
        monsterImage.src = data.ImageExample || 'https://via.placeholder.com/200';
        monsterImage.alt = data.TranslatedName || 'Monster Image';
    
        contentContainer.appendChild(monsterLabel);
        contentContainer.appendChild(monsterDescription);
        contentContainer.appendChild(monsterImage);
        contentContainer.appendChild(nextTypeBtn);
    
        element.replaceChildren(contentContainer); 
    };
    
    currentMonsterId = Math.floor(Math.random() * 25) + 1;

    fetchApi(currentMonsterId, currentLanguage).then(data => {
        renderMonsterType(data);
    });

    nextTypeBtn.addEventListener('click', () => {
        element.innerHTML = currentLanguage === "en-us" 
        ? 'Loading...' 
        : 'Cargando...';   

        currentMonsterId = Math.floor(Math.random() * 25) + 1;

        fetchApi(currentMonsterId, currentLanguage).then(data => {
            renderMonsterType(data);
        });
    });

    languageSelector.addEventListener('change', updateButtonText);
}