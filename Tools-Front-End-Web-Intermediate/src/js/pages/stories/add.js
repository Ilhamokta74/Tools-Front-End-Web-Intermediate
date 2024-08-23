const Add = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');

    if (!addFormRecord) {
      console.error('Form element not found');
      return;
    }

    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');

        if (this._validateFormData(this._getFormData())) {
          this._sendPost();
        }
      },
      false
    );
  },

  _getFormData() {
    const photosInput = document.querySelector('#validationCustomFileInput');
    const descriptionInput = document.querySelector('#validationCustomDescription');

    return {
      photos: photosInput ? photosInput.files[0] : null,
      description: descriptionInput ? descriptionInput.value : '',
    };
  },

  _validateFormData(formData) {
    return Object.values(formData).every((item) => item);
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      console.log('Form Data:', formData);
      // Implement the code to send form data to the server here

      this._goToDashboardPage();
    }
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
