import IUser from '~/types/app/user.type';

class LocalStorageService {
  getProfileFromLS() {
    const result = localStorage.getItem('profile');
    try {
      return result ? (JSON.parse(result) as IUser) : null;
    } catch (error) {
      return null;
    }
  }

  setProfileToLS(profile: IUser) {
    localStorage.setItem('profile', JSON.stringify(profile));
    const updateProfileEvent = new CustomEvent('updateProfile', { detail: profile });
    window.dispatchEvent(updateProfileEvent);
  }

  removeProfileFromLS() {
    localStorage.removeItem('profile');
  }

  setRedirectUrlToLS(url: string) {
    localStorage.setItem('redirectUrl', url || '/');
  }

  getRedirectUrlFromLS() {
    const redirectUrl = localStorage.getItem('redirectUrl') || '/';
    if (redirectUrl === 'undefined' || redirectUrl === 'null' || redirectUrl === 'false') {
      return '/';
    }
    return redirectUrl.startsWith('/auth') ? '/' : redirectUrl;
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
