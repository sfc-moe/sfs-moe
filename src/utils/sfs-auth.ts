import chromep from '@/utils/chromep';

interface UserCredential {
  username: string;
  password: string;
}

export default class SfsAuth {
  public async getProfile(): Promise<UserCredential | null> {
    const res = await chromep.storage.local.get('profile');
    if (res === null) { return null; }
    return JSON.parse(res.profile);
  }

  public async setProfile(state: UserCredential | null): Promise<void> {
    if (state === null) {
      chrome.storage.local.remove('profile');
      return;
    }
    await chromep.storage.local.set({
      profile: JSON.stringify(state),
    });
  }

  public async getToken(): Promise<string> {
    const result = await chromep.storage.local.get('token');
    if (result === null) {
      window.location.hash = '/';
      return '';
    }
    return result.token;
  }

  public async setToken(token: string) {
    await chromep.storage.local.set({
      token,
    });
  }
}
