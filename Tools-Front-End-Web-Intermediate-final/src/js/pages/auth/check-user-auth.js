import Utils from '../../utils/utils';
import Config from '../../config/config';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  checkLoginState() {
    const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    const isUserSignedIn = Boolean(userToken);
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.href = '/';
      } else {
        this._showLoginMenuOrUserLogMenu(true);
      }
    } else {
      if (!isUserOnAuthPage) {
        window.location.href = '/auth/login.html';
      }
    }
  },

  _showLoginMenuOrUserLogMenu(isUserSignedIn) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');

    if (loginMenu && userLoggedMenu) {
      loginMenu.classList.toggle('d-block', !isUserSignedIn);
      loginMenu.classList.toggle('d-none', isUserSignedIn);
      
      userLoggedMenu.classList.toggle('d-block', isUserSignedIn);
      userLoggedMenu.classList.toggle('d-none', !isUserSignedIn);
    }
  },

  _isUserOnAuthPage(pages) {
    const currentPath = new URL(window.location.href).pathname;
    return pages.some(page => currentPath.endsWith(page));
  }
};

export default CheckUserAuth;
