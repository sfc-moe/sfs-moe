import { browser } from 'webextension-polyfill-ts';

interface UserCredential {
  username: string;
  password: string;
}

export default class SfsAuth {
  public async getProfile(): Promise<UserCredential | null> {
    const res = await browser.storage.local.get('profile');
    if (res === null) { return null; }
    return JSON.parse(res.profile);
  }

  public async setProfile(state: UserCredential | null): Promise<void> {
    if (state === null) {
      await browser.storage.local.remove('profile');
      return;
    }
    await browser.storage.local.set({
      profile: JSON.stringify(state),
    });
  }

  public async getToken(): Promise<string> {
    const result = await browser.storage.local.get('token');
    if (result === null) {
      window.location.hash = '/';
      return '';
    }
    return result.token;
  }

  public async setToken(token: string) {
    await browser.storage.local.set({
      token,
    });
  }

  public async getFix(): Promise<string> {
    const result = await browser.storage.local.get('dix');
    if (result === null) {
      window.location.hash = '/';
      return '';
    }
    return result.fix;
  }

  public async setFix(fix: string) {
    await browser.storage.local.set({
      fix,
    });
  }
}
