import { Fetch } from './fetch.js';

const refs = {
    form: document.querySelector('.form'),
    button: document.querySelector('.loader'),
    list: document.querySelector('.list'),
};

const api = new Fetch();

refs.form.addEventListener('submit', onFormSubmit);
refs.button.addEventListener('click', onLoadClick);

function onFormSubmit(e) {
    e.preventDefault();

    api.queryToFetch = e.target.query.value;
    api._pageToFetch = 0;

    refs.list.innerHTML = '';
    renderEvents(api.queryToFetch);
    refs.button.classList.remove('show');
}

async function getEvents(keyword) {
    const data = await api.fetchEvents(keyword);

    if (api.pageToFetch >= Number(data.page.totalPages)) {
        alert('ВСЬО!');
        refs.button.classList.add('show');
        return;
    }

    if (data.page.totalElements < 1) return;

    const {
        _embedded: { events },
    } = data;

    return events;
}

function eventTemplate({ name, images }) {
    return `<li class="list__item">
    <img width="300" src="${images[0].url}" alt="${name}">
    <h2 class="list__titte">${name}</h2>
</li>`;
}

async function renderEvents(keyword) {
    const data = await getEvents(keyword);

    if (!data) return;

    const template = await data.map(eventTemplate).join('');

    refs.list.insertAdjacentHTML('beforeend', template);
    console.log('api.pageToFetch', api.pageToFetch);
}

function onLoadClick(params) {
    api.pageToFetch = 1;
    renderEvents(api.queryToFetch);
}
