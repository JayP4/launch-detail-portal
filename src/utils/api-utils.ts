import { API_BASE_URL, LAUNCH_PATH } from '../constants';

function getLaunchListUrl() {
  return API_BASE_URL + LAUNCH_PATH + '/query';
}

function getLaunchDetailsUrl(id: string) {
  return API_BASE_URL + LAUNCH_PATH + `/${id}`;
}

export { getLaunchListUrl, getLaunchDetailsUrl };
