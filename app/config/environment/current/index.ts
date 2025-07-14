import Config from 'react-native-config';
import {version, build} from '../../../../package.json';

const CONFIG = {
  MODE: Config.MODE,
  API: {
    BASE_URL: Config.BASE_URL,
  },
  VERSION: version,
  BUILD_NUMBER: build,
};

export default CONFIG;
