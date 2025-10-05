import Cookies from 'js-cookie';

export class AuthService {
  static getToken() {
    throw new Error('Method not implemented.');
  }
  static setSession(data: any) {
    Cookies.set('accessToken', data.accessToken, { expires: 7 });
    Cookies.set('refreshToken', data.refreshToken, { expires: 7 });
    Cookies.set('customer', JSON.stringify(data.customer), { expires: 7 });
  }

  static getCustomer() {
    const customer = Cookies.get('customer');
    return customer ? JSON.parse(customer) : null;
  }

  static getAccessToken() {
    return Cookies.get('accessToken') || null;
  }

  static clearSession() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('customer');
  }

  static isLoggedIn() {
    return !!Cookies.get('accessToken');
  }
}
