// ==================== Cabeçalho ====================
let headerElements = [];
let selectedHeaderIndex = null;

function updateHeaderControls() {
    const type = document.getElementById('headerElementType').value;
    document.getElementById('headerTextDiv').style.display = type === 'text' ? 'block' : 'none';
    document.getElementById('headerBannerDiv').style.display = type === 'banner' ? 'block' : 'none';
    document.getElementById('headerImageDiv').style.display = type === 'image' ? 'block' : 'none';
    document.getElementById('headerTextInput').disabled = type !== 'text';
    document.getElementById('headerBannerTextInput').disabled = type !== 'banner';
    document.getElementById('headerImageInput').disabled = type !== 'image';
    document.getElementById('headerFeedback').textContent = '';
    if (type !== 'text') document.getElementById('headerTextInput').value = '';
    if (type !== 'banner') document.getElementById('headerBannerTextInput').value = '';
    if (type !== 'image') document.getElementById('headerImageInput').value = '';
}

function renderHeaderElements() {
    const customHeader = document.getElementById('customHeader');
    customHeader.innerHTML = '';
    headerElements.forEach((el, idx) => {
        el.classList.toggle('selected-header', idx === selectedHeaderIndex);
        el.onclick = () => selectHeaderElement(idx);
        customHeader.appendChild(el);
    });
    document.getElementById('addHeaderElement').disabled = headerElements.length >= 3 && selectedHeaderIndex === null;
    if (headerElements.length >= 3 && selectedHeaderIndex === null) {
        document.getElementById('headerFeedback').textContent = 'Limite de 3 elementos atingido.';
    }
}

function selectHeaderElement(idx) {
    selectedHeaderIndex = idx;
    const el = headerElements[idx];
    if (el.tagName === 'IMG') {
        document.getElementById('headerElementType').value = 'image';
        updateHeaderControls();
    } else if (el.dataset && el.dataset.banner === "true") {
        document.getElementById('headerElementType').value = 'banner';
        updateHeaderControls();
        document.getElementById('headerBannerTextInput').value = el.textContent;
    } else {
        document.getElementById('headerElementType').value = 'text';
        updateHeaderControls();
        document.getElementById('headerTextInput').value = el.textContent;
    }
    document.getElementById('headerBgColor').value = rgb2hex(el.style.backgroundColor || '#333333');
    document.getElementById('headerTextColor').value = rgb2hex(el.style.color || '#ffffff');
    document.getElementById('headerBorderColor').value = rgb2hex(el.style.borderColor || '#ffffff');
    document.getElementById('headerWidth').value = parseInt(el.style.width) || 200;
    document.getElementById('headerHeight').value = parseInt(el.style.height) || 60;
    document.getElementById('headerSpacing').value = parseInt(el.style.marginRight) || 10;
    document.getElementById('headerFeedback').textContent = 'Editando elemento selecionado.';
}

function rgb2hex(rgb) {
    if (!rgb) return '#000000';
    if (rgb[0] === '#') return rgb;
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    return "#" + result.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('');
}

function feedbackHeaderImmediate() {
    if (selectedHeaderIndex === null) return;
    const el = headerElements[selectedHeaderIndex];
    const type = document.getElementById('headerElementType').value;
    const bgColor = document.getElementById('headerBgColor').value;
    const textColor = document.getElementById('headerTextColor').value;
    const borderColor = document.getElementById('headerBorderColor').value;
    const width = document.getElementById('headerWidth').value + 'px';
    const height = document.getElementById('headerHeight').value + 'px';
    const spacing = document.getElementById('headerSpacing').value + 'px';

    if (type === 'text') {
        el.style.background = bgColor;
        el.style.color = textColor;
        el.style.border = '2px solid ' + borderColor;
        el.style.width = width;
        el.style.height = height;
        el.style.marginRight = spacing;
        el.textContent = document.getElementById('headerTextInput').value || 'Texto';
    } else if (type === 'banner') {
        el.style.background = bgColor;
        el.style.color = textColor;
        el.style.border = '2px solid ' + borderColor;
        el.style.width = width;
        el.style.height = height;
        el.style.marginRight = spacing;
        el.textContent = document.getElementById('headerBannerTextInput').value || 'Banner';
    } else if (type === 'image') {
        el.style.background = bgColor;
        el.style.border = '2px solid ' + borderColor;
        el.style.width = width;
        el.style.height = height;
        el.style.marginRight = spacing;
    }
    renderHeaderElements();
}

// ==================== Menu ====================
let menuItems = [];
let menuImage = null;
let editingMenuIndex = null;

function renderMenuItemsList() {
    const list = document.getElementById('menuItemsList');
    list.innerHTML = '';
    menuItems.forEach((item, idx) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.marginBottom = '4px';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.text;
        input.maxLength = 30;
        input.disabled = true;

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.textContent = 'Editar';
        editBtn.onclick = function() {
            document.getElementById('menuNewItemText').value = item.text;
            editingMenuIndex = idx;
        };

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-menu-item';
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = function() {
            menuItems.splice(idx, 1);
            renderMenuItemsList();
            renderMenu();
        };

        div.appendChild(input);
        div.appendChild(editBtn);
        div.appendChild(removeBtn);
        list.appendChild(div);
    });
}

function renderMenu() {
    const customMenu = document.getElementById('customMenu');
    customMenu.innerHTML = '';
    const menuPreview = document.createElement('div');
    menuPreview.className = 'menu-preview';
    menuPreview.style.background = document.getElementById('menuBgColor').value;

    // Imagem do menu
    if (menuImage) {
        const img = document.createElement('img');
        img.src = menuImage;
        img.style.maxHeight = '50px';
        img.style.marginRight = '15px';
        menuPreview.appendChild(img);
    }

    // Itens do menu
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'menu-items';
    itemsDiv.style.gap = document.getElementById('menuSpacing').value + 'px';
    menuItems.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.textContent = item.text;
        itemDiv.style.background = document.getElementById('menuItemBgColor').value;
        itemDiv.style.color = document.getElementById('menuTextColor').value;
        itemDiv.style.borderColor = document.getElementById('menuBorderColor').value;
        itemDiv.style.fontSize = document.getElementById('menuFontSize').value + 'px';
        itemDiv.style.borderStyle = 'solid';
        itemDiv.style.borderWidth = '2px';
        itemDiv.style.padding = '8px 18px';
        itemsDiv.appendChild(itemDiv);
    });
    menuPreview.appendChild(itemsDiv);
    customMenu.appendChild(menuPreview);
}

function feedbackMenuImmediate() {
    renderMenu();
}

// ==================== Formulário ====================
let formItems = [];
let editingFormIndex = null;

function renderFormItemsList() {
    const list = document.getElementById('formItemsList');
    list.innerHTML = '';
    formItems.forEach((item, idx) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.marginBottom = '4px';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.label;
        input.maxLength = 30;
        input.disabled = true;

        const typeSpan = document.createElement('span');
        typeSpan.textContent = ` (${item.type}) `;
        typeSpan.style.margin = '0 8px';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.textContent = 'Editar';
        editBtn.onclick = function() {
            document.getElementById('formNewItemLabel').value = item.label;
            document.getElementById('formNewItemType').value = item.type;
            editingFormIndex = idx;
        };

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-form-item';
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = function() {
            formItems.splice(idx, 1);
            renderFormItemsList();
            renderForm();
        };

        div.appendChild(input);
        div.appendChild(typeSpan);
        div.appendChild(editBtn);
        div.appendChild(removeBtn);
        list.appendChild(div);
    });
}

function renderForm() {
    const customForm = document.getElementById('customForm');
    customForm.innerHTML = '';
    const formPreview = document.createElement('form');
    formPreview.className = 'form-preview';
    formPreview.style.background = document.getElementById('formBgColor').value;
    formPreview.style.border = '2px solid ' + document.getElementById('formBorderColor').value;
    const title = document.getElementById('formTitle').value.trim();
    if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        formPreview.appendChild(h3);
    }
    formItems.forEach((item, idx) => {
        const label = document.createElement('label');
        label.textContent = item.label;
        formPreview.appendChild(label);
        let input;
        if (item.type === 'text' || item.type === 'email' || item.type === 'date') {
            input = document.createElement('input');
            input.type = item.type;
        } else if (item.type === 'radio') {
            input = document.createElement('input');
            input.type = 'radio';
            input.name = 'radioGroup';
        } else if (item.type === 'select') {
            input = document.createElement('select');
            const opt = document.createElement('option');
            opt.textContent = 'Opção';
            input.appendChild(opt);
        }
        input.style.marginBottom = '10px';
        formPreview.appendChild(input);

        // Botão para remover item
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'remove-form-item';
        btn.textContent = 'Remover';
        btn.onclick = function() {
            formItems.splice(idx, 1);
            renderFormItemsList();
            renderForm();
        };
        formPreview.appendChild(btn);
        formPreview.appendChild(document.createElement('br'));
    });
    customForm.appendChild(formPreview);
}

function feedbackFormImmediate() {
    renderForm();
}

// ==================== Rodapé ====================
function renderFooter() {
    const customFooter = document.getElementById('customFooter');
    customFooter.innerHTML = '';
    const div = document.createElement('div');
    div.textContent = document.getElementById('footerText').value;
    div.style.background = document.getElementById('footerBgColor').value;
    div.style.color = document.getElementById('footerTextColor').value;
    div.style.fontSize = document.getElementById('footerFontSize').value + 'px';
    div.style.textAlign = document.getElementById('footerAlign').value;
    div.style.width = '100%';
    div.style.padding = '10px 0';
    div.style.borderRadius = '8px';
    customFooter.appendChild(div);
}

function feedbackFooterImmediate() {
    renderFooter();
}

// ==================== Galeria ====================
let galleryCards = [];
let editingGalleryIndex = null;

function renderGallery() {
    const customGallery = document.getElementById('customGallery');
    customGallery.innerHTML = '';
    const galleryDiv = document.createElement('div');
    galleryDiv.style.display = 'flex';
    galleryDiv.style.flexWrap = 'wrap';
    galleryDiv.style.gap = document.getElementById('galleryCardSpacing').value + 'px';
    galleryCards.forEach((card, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'gallery-card';
        cardDiv.style.background = card.bgColor;
        cardDiv.style.color = card.textColor;
        cardDiv.style.borderColor = card.borderColor;
        cardDiv.style.fontSize = card.fontSize + 'px';
        cardDiv.style.width = card.width + 'px';
        cardDiv.style.height = card.height + 'px';
        if (card.img) {
            const img = document.createElement('img');
            img.src = card.img;
            cardDiv.appendChild(img);
        }
        const txt = document.createElement('div');
        txt.textContent = card.text;
        cardDiv.appendChild(txt);

        // Botão Editar
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.textContent = 'Editar';
        editBtn.onclick = function() {
            document.getElementById('galleryCardText').value = card.text;
            document.getElementById('galleryCardBgColor').value = card.bgColor;
            document.getElementById('galleryCardTextColor').value = card.textColor;
            document.getElementById('galleryCardBorderColor').value = card.borderColor;
            document.getElementById('galleryCardFontSize').value = card.fontSize;
            document.getElementById('galleryCardWidth').value = card.width;
            document.getElementById('galleryCardHeight').value = card.height;
            document.getElementById('galleryCardSpacing').value = card.spacing;
            editingGalleryIndex = idx;
        };
        cardDiv.appendChild(editBtn);

        // Botão Remover
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'remove-gallery-card';
        btn.textContent = 'Remover';
        btn.onclick = function() {
            galleryCards.splice(idx, 1);
            renderGallery();
        };
        cardDiv.appendChild(btn);

        galleryDiv.appendChild(cardDiv);
    });
    customGallery.appendChild(galleryDiv);
}

function feedbackGalleryImmediate() {
    renderGallery();
}

// ==================== Listeners (Feedback Imediato) ====================
function setupListeners() {
    // Cabeçalho
    document.getElementById('headerElementType').addEventListener('change', updateHeaderControls);
    document.getElementById('addHeaderElement').addEventListener('click', function() {
        const type = document.getElementById('headerElementType').value;
        const bgColor = document.getElementById('headerBgColor').value;
        const textColor = document.getElementById('headerTextColor').value;
        const borderColor = document.getElementById('headerBorderColor').value;
        const width = document.getElementById('headerWidth').value + 'px';
        const height = document.getElementById('headerHeight').value + 'px';
        const spacing = document.getElementById('headerSpacing').value + 'px';

        let element;
        if (type === 'text') {
            const text = document.getElementById('headerTextInput').value.trim();
            if (!text) {
                document.getElementById('headerFeedback').textContent = 'Digite um texto para o cabeçalho.';
                document.getElementById('headerTextInput').focus();
                return;
            }
            element = document.createElement('div');
            element.textContent = text;
            element.style.color = textColor;
            element.style.background = bgColor;
            element.style.border = '2px solid ' + borderColor;
            element.style.width = width;
            element.style.height = height;
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
            element.style.marginRight = spacing;
            element.style.fontWeight = 'bold';
            element.style.fontSize = '20px';
            element.style.cursor = 'pointer';
        } else if (type === 'banner') {
            const text = document.getElementById('headerBannerTextInput').value.trim() || 'Banner';
            element = document.createElement('div');
            element.textContent = text;
            element.dataset.banner = "true";
            element.style.color = textColor;
            element.style.background = bgColor;
            element.style.border = '2px solid ' + borderColor;
            element.style.width = width;
            element.style.height = height;
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
            element.style.marginRight = spacing;
            element.style.fontSize = '24px';
            element.style.fontWeight = 'bold';
            element.style.cursor = 'pointer';
        } else if (type === 'image') {
            const fileInput = document.getElementById('headerImageInput');
            if (!fileInput.files[0] && selectedHeaderIndex === null) {
                document.getElementById('headerFeedback').textContent = 'Escolha uma imagem.';
                fileInput.focus();
                return;
            }
            element = document.createElement('img');
            element.style.width = width;
            element.style.height = height;
            element.style.objectFit = 'cover';
            element.style.background = bgColor;
            element.style.border = '2px solid ' + borderColor;
            element.style.marginRight = spacing;
            element.style.cursor = 'pointer';
            if (fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    element.src = e.target.result;
                    if (selectedHeaderIndex !== null) {
                        headerElements[selectedHeaderIndex] = element;
                        selectedHeaderIndex = null;
                    } else {
                        headerElements.push(element);
                    }
                    renderHeaderElements();
                    document.getElementById('headerFeedback').textContent = '';
                };
                reader.readAsDataURL(fileInput.files[0]);
                return; // Aguarda o FileReader
            } else if (selectedHeaderIndex !== null) {
                element.src = headerElements[selectedHeaderIndex].src;
            }
        }

        if (selectedHeaderIndex !== null) {
            headerElements[selectedHeaderIndex] = element;
            selectedHeaderIndex = null;
            document.getElementById('headerFeedback').textContent = 'Elemento atualizado!';
        } else {
            headerElements.push(element);
            document.getElementById('headerFeedback').textContent = 'Elemento adicionado!';
        }
        renderHeaderElements();
    });
    document.getElementById('clearHeaderElements').addEventListener('click', function() {
        headerElements = [];
        selectedHeaderIndex = null;
        document.getElementById('customHeader').innerHTML = '';
        document.getElementById('headerFeedback').textContent = 'Cabeçalho limpo.';
        renderHeaderElements();
    });
    [
        'headerTextInput', 'headerBannerTextInput', 'headerBgColor', 'headerTextColor', 'headerBorderColor',
        'headerWidth', 'headerHeight', 'headerSpacing'
    ].forEach(id => {
        document.getElementById(id).addEventListener('input', feedbackHeaderImmediate);
        document.getElementById(id).addEventListener('click', feedbackHeaderImmediate);
    });

    // Menu
    document.getElementById('menuImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                menuImage = ev.target.result;
                renderMenu();
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('addMenuItem').addEventListener('click', function() {
        const text = document.getElementById('menuNewItemText').value.trim();
        if (text) {
            if (editingMenuIndex !== null) {
                menuItems[editingMenuIndex].text = text;
                editingMenuIndex = null;
            } else {
                menuItems.push({ text });
            }
            document.getElementById('menuNewItemText').value = '';
            renderMenuItemsList();
            renderMenu();
        }
    });
    ['menuBgColor','menuItemBgColor','menuTextColor','menuBorderColor','menuFontSize','menuSpacing'].forEach(id=>{
        document.getElementById(id).addEventListener('input', feedbackMenuImmediate);
        document.getElementById(id).addEventListener('click', feedbackMenuImmediate);
    });
    document.getElementById('clearMenu').addEventListener('click', function() {
        menuItems = [];
        menuImage = null;
        document.getElementById('menuImageInput').value = '';
        renderMenuItemsList();
        renderMenu();
    });

    // Formulário
    document.getElementById('addFormItem').addEventListener('click', function() {
        const label = document.getElementById('formNewItemLabel').value.trim();
        const type = document.getElementById('formNewItemType').value;
        if (label) {
            if (editingFormIndex !== null) {
                formItems[editingFormIndex] = { label, type };
                editingFormIndex = null;
            } else {
                formItems.push({ label, type });
            }
            document.getElementById('formNewItemLabel').value = '';
            renderFormItemsList();
            renderForm();
        }
    });
    ['formTitle','formBgColor','formBorderColor'].forEach(id=>{
        document.getElementById(id).addEventListener('input', feedbackFormImmediate);
        document.getElementById(id).addEventListener('click', feedbackFormImmediate);
    });
    document.getElementById('clearForm').addEventListener('click', function() {
        formItems = [];
        document.getElementById('formTitle').value = '';
        renderFormItemsList();
        renderForm();
    });

    // Rodapé
    ['footerText','footerBgColor','footerTextColor','footerFontSize','footerAlign'].forEach(id=>{
        document.getElementById(id).addEventListener('input', feedbackFooterImmediate);
        document.getElementById(id).addEventListener('click', feedbackFooterImmediate);
    });
    document.getElementById('clearFooter').addEventListener('click', function() {
        document.getElementById('footerText').value = '';
        renderFooter();
    });

    // Galeria
    document.getElementById('addGalleryCard').addEventListener('click', function() {
        const text = document.getElementById('galleryCardText').value.trim();
        const fileInput = document.getElementById('galleryCardImage');
        let img = null;
        function finishAdd(imgSrc) {
            const cardData = {
                text: text || 'Card',
                img: imgSrc,
                bgColor: document.getElementById('galleryCardBgColor').value,
                textColor: document.getElementById('galleryCardTextColor').value,
                borderColor: document.getElementById('galleryCardBorderColor').value,
                fontSize: document.getElementById('galleryCardFontSize').value,
                width: document.getElementById('galleryCardWidth').value,
                height: document.getElementById('galleryCardHeight').value,
                spacing: document.getElementById('galleryCardSpacing').value
            };
            if (editingGalleryIndex !== null) {
                galleryCards[editingGalleryIndex] = cardData;
                editingGalleryIndex = null;
            } else {
                galleryCards.push(cardData);
            }
            renderGallery();
        }
        if (fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                finishAdd(e.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            // Se estiver editando e não escolher nova imagem, mantém a antiga
            if (editingGalleryIndex !== null && galleryCards[editingGalleryIndex].img) {
                finishAdd(galleryCards[editingGalleryIndex].img);
            } else {
                finishAdd(null);
            }
        }
    });
    document.getElementById('clearGallery').addEventListener('click', function() {
        galleryCards = [];
        renderGallery();
    });
    [
        'galleryCardBgColor','galleryCardTextColor','galleryCardBorderColor','galleryCardFontSize',
        'galleryCardWidth','galleryCardHeight','galleryCardSpacing'
    ].forEach(id=>{
        document.getElementById(id).addEventListener('input', feedbackGalleryImmediate);
        document.getElementById(id).addEventListener('click', feedbackGalleryImmediate);
    });

    // Código da DIV
    document.getElementById('showCodeBtn').addEventListener('click', function() {
        document.getElementById('codigoDiv').textContent = getFullHTML();
    });
    document.getElementById('saveCodeBtn').addEventListener('click', function() {
        localStorage.setItem('paginaGerada', getFullHTML());
        document.getElementById('codigoDiv').textContent = 'Código salvo no localStorage!';
    });
    document.getElementById('loadCodeBtn').addEventListener('click', function() {
        const code = localStorage.getItem('paginaGerada');
        document.getElementById('codigoDiv').textContent = code ? code : 'Nenhum código salvo!';
    });
    document.getElementById('clearStorageBtn').addEventListener('click', function() {
        localStorage.removeItem('paginaGerada');
        document.getElementById('codigoDiv').textContent = 'LocalStorage limpo!';
    });
}

// ========== Inicialização ==========
function addGalleryCard(text, img) {
    galleryCards.push({
        text: text || 'Card',
        img,
        bgColor: document.getElementById('galleryCardBgColor').value,
        textColor: document.getElementById('galleryCardTextColor').value,
        borderColor: document.getElementById('galleryCardBorderColor').value,
        fontSize: document.getElementById('galleryCardFontSize').value,
        width: document.getElementById('galleryCardWidth').value,
        height: document.getElementById('galleryCardHeight').value,
        spacing: document.getElementById('galleryCardSpacing').value
    });
    renderGallery();
}
function getFullHTML() {
    // Monta uma página HTML válida com os previews
    return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<title>Página Gerada</title>
<style>
body{background:#192241;color:#fff;font-family:Arial,sans-serif;}
a,button{font-family:inherit;}
${document.querySelector('link[rel="stylesheet"]') ? '' : document.querySelector('style').innerHTML}
</style>
</head>
<body>
<div id="customHeader">${document.getElementById('customHeader').innerHTML}</div>
<div id="customMenu">${document.getElementById('customMenu').innerHTML}</div>
<div id="customForm">${document.getElementById('customForm').innerHTML}</div>
<div id="customGallery">${document.getElementById('customGallery').innerHTML}</div>
<div id="customFooter">${document.getElementById('customFooter').innerHTML}</div>
</body>
</html>`;
}

// Inicialização
updateHeaderControls();
renderHeaderElements();
renderMenuItemsList();
renderMenu();
renderFormItemsList();
renderForm();
renderFooter();
renderGallery();
setupListeners();