const goals = {
    "work-commitments": ["work"],
    "retainer": ["health"],
    "bm-journal": ["meta"],
    "tramp": ["health"],
    "walk": ["health"],
    "beetuning": ["meta"],
    "commit-early": ["work"],
    "systems-upgrade": ["meta"],
    "av-updates": ["work"],
    "frogs": [],
    "dishes": [],
    "video": [],
    "pills": ["health"],
    "games": [],
    "screen-free-meals": [],
    "work-gratitude": ["work"],
    "read": [],
    "todo": [],
    "vivo-sleep": ["health"],
    "vivo-steps": ["health"],
};

function goalTemplate(goal) {
    return `
    <div class="col-sm">
        <h5>${goal}</h5>
        <iframe src="https://www.beeminder.com/widget?slug=${goal}&username=narthur&countdown=true" height="245px" width="230px" frameborder="0px" ></iframe>
    </div>
    `;
}

function tabTemplate(goal) {
    return `
    <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#${goal}">${goal}</a>
    </li>
    `;
}

function paneTemplate(goal) {
    return `
    <div class="tab-pane fade" id="${goal}">
        <div class="container">
            <div class="row"></div>
        </div>
    </div>
    `;
}

function getLabels(goals) {
    const keys = Object.keys(goals);

    return keys.reduce((carry, key) => {
        return [...new Set([...carry, ...goals[key]])];
    }, []);
}

function renderTabGoals(container, goalKeys) {
    goalKeys.forEach(key => {
        container.insertAdjacentHTML("beforeend", goalTemplate(key));
    });
}

function renderLabelTabs() {
    const labels = getLabels(goals),
        tabs = document.querySelector(".nav-tabs"),
        panes = document.querySelector(".tab-content");

    labels.forEach((label) => {
        tabs.insertAdjacentHTML("beforeend", tabTemplate(label));
        panes.insertAdjacentHTML("beforeend", paneTemplate(label));

        const container = document.querySelector(`#${label} .row`),
            filteredKeys = Object.keys(goals).filter(key => goals[key].includes(label));

        renderTabGoals(container, filteredKeys);
    });
}

function renderAllTabGoals() {
    const container = document.querySelector("#all .row"),
        keys = Object.keys(goals);

    renderTabGoals(container, keys);
}

$(document).ready(() => {
    renderAllTabGoals();
    renderLabelTabs();
});