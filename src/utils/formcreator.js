export default function createForm(object) {
    const id = object.elId.slice(1);
    const obj = object || {};
    const cls = obj.cls || '';
    const label = obj.title || '';
    const val = obj.isVisible ? obj.val : '';
    const type = obj.type || '';
    const maxLength = obj.maxLength ? ` maxlength="${obj.maxLength} "` : '';
    const dropdownOptions = obj.options || [];
    let el;
    let checked;
    let firstOption;
    let i;
    switch (type) {
        case 'text':
            el = `<div><label>${label}</label><br><input type="text" id="${id}" value="${val}${maxLength}></div>`;
            break;
        case 'textarea':
            el = `<div><label>${label}</label><br><textarea id="${id}"${maxLength}rows="3">${val}</textarea></div>`;
            break;
        case 'checkbox':
            // FMB checkbox with options for multicheckbox and optional textbox
            const textboxVal = val && val.indexOf(':') > -1 ? val.split(':')[1] : '';
            checked = val ? ' checked' : '';
            const checkboxEl = `<input type="checkbox" id="${id}" value="${val.split(':')[0]}"${checked} />`;
            const textboxEl = `<input type="text" id="${id}-textbox" value="${textboxVal}"${maxLength} />`;
            el = `<div class="o-form-checkbox"><label>${label}</label><br>${checkboxEl} ${label.includes(':text') ? textboxEl : ''}</div>`;
            break;
        case 'dropdown':
            if (val) {
                firstOption = `<option value="${val}" selected>${val}</option>'`;
            } else {
                firstOption = '<option value="" selected>Välj</option>';
            }
            el = `<div class="${cls}"><label>${label}</label><br><select id=${id}>${firstOption}`;
            for (i = 0; i < dropdownOptions.length; i += 1) {
                el += `<option value="${dropdownOptions[i]}">${dropdownOptions[i]}</option>`;
            }
            el += '</select></div>';
            break;
        default:
            console.log('Formcreator default case');
            break;
    }
    return el;
}