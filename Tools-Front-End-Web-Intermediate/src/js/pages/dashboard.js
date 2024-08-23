import formatDate from '../formattedDate.js';

const Dashboard = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    try {
      const response = await fetch('/data/DATA.json');
      const data = await response.json();
      this._userListStory = data.listStory;
      this._populateStoriesDataToCard(this._userListStory);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  },

  _initialListener() {
    const recordDetailModal = document.getElementById('recordDetailModal');
    if (recordDetailModal) {
      recordDetailModal.addEventListener('show.bs.modal', (event) => {
        const modalTitle = recordDetailModal.querySelector('.modal-title');
        modalTitle.focus();

        const button = event.relatedTarget;
        const dataRecord = this._userListStory.find(
          (item) => item.id == button.dataset.recordId
        );

        this._populateDetailStoryToModal(dataRecord);
      });
    }
  },

  _populateStoriesDataToCard(listStory = []) {
    if (!Array.isArray(listStory)) {
      throw new Error(`Expected an array for listStory, but received ${typeof listStory}`);
    }

    const recordCard = document.querySelector('#recordsCard');
    recordCard.innerHTML = '';

    if (listStory.length === 0) {
      recordCard.innerHTML = this._templateEmptyCard();
      return;
    }

    listStory.forEach((story, idx) => {
      recordCard.innerHTML += this._templateCard(idx, story);
    });
  },

  _populateDetailStoryToModal(storyRecord) {
    if (typeof storyRecord !== 'object' || storyRecord === null) {
      throw new Error(`Expected an object for storyRecord, but received ${typeof storyRecord}`);
    }

    const imgDetailRecord = document.querySelector('#recordDetailModal #imgDetailRecord');
    const nameDetailRecord = document.querySelector('#recordDetailModal #nameDetailRecord');
    const dateDetailRecord = document.querySelector('#recordDetailModal #dateDetailRecord');
    const descriptionDetailRecord = document.querySelector('#recordDetailModal #descriptionDetailRecord');

    if (imgDetailRecord) imgDetailRecord.src = storyRecord.photoUrl;
    if (imgDetailRecord) imgDetailRecord.alt = storyRecord.name;
    if (nameDetailRecord) nameDetailRecord.textContent = storyRecord.name;
    if (dateDetailRecord) dateDetailRecord.textContent = formatDate(storyRecord.createdAt);
    if (descriptionDetailRecord) descriptionDetailRecord.textContent = storyRecord.description || '-';
  },

  _templateCard(index, storyRecord) {
    return `
      <div class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card__header m-2">
            <a href="/users/profile.html?name=${storyRecord.name.replace(/\s/g, '')}">
              <h4 class="card__header-title">${storyRecord.name}</h4>
            </a>
          </div>
          <a href="#" data-bs-toggle="modal" data-bs-target="#recordDetailModal" data-record-id="${storyRecord.id}">
            <div class="card__body">
              <img class="card__body-image w-100 h-50" src="${storyRecord.photoUrl}" alt="${storyRecord.name}-images">
              <p class="card__body-description m-2 text-start">${storyRecord.description.slice(0, 100)}...</p>
              <p class="card__body-date m-2">${formatDate(storyRecord.createdAt)}</p>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  _templateEmptyCard() {
    return `
      <div class="card__header">
        <p>No stories available</p>
      </div>
    `;
  },
};

export default Dashboard;
