const Profile = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const userId = this._getUserId();

    if (!userId) {
      alert('Data with the specified name was not found.');
      return;
    }

    try {
      const response = await fetch('/data/DATA.json');
      const data = await response.json();
      const userProfile = data.listStory.find(
        (item) => item.name.replace(/\s/g, '') === userId
      );

      if (userProfile) {
        this._populateStoriesData(userProfile);
      } else {
        this._displayEmptyProfile();
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  },

  _getUserId() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('name') || null;
  },

  _populateStoriesData(userProfile) {
    if (typeof userProfile !== 'object' || userProfile === null) {
      throw new Error(`Parameter userProfile should be a non-null object. Received: ${userProfile}`);
    }

    const userImg = document.querySelector('#userImg');
    const userName = document.querySelector('#userName');

    if (userImg) {
      userImg.src = '/img/profile-dummy.png';
      userImg.alt = userProfile.name || 'Unknown User';
    }

    if (userName) {
      userName.textContent = userProfile.name || 'Username Not Available';
    }
  },

  _displayEmptyProfile() {
    const userImg = document.querySelector('#userImg');
    const userName = document.querySelector('#userName');

    if (userImg) {
      userImg.src = '/img/profile-dummy.png';
      userImg.alt = 'User Not Found';
    }

    if (userName) {
      userName.textContent = 'User Not Found';
    }
  },
};

export default Profile;
