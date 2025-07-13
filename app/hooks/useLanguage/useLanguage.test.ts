import {renderHook} from '@testing-library/react-hooks';
import {useLanguage} from '../useLanguage';
import {Language} from '@config/i18n';

const mockedUseAppSelector = require('@store/hooks').useAppSelector;
const mockedUseAppDispatch = require('@store/hooks').useAppDispatch;
const mockedChangeLanguage = require('@config/i18n').changeLanguage;

describe('useLanguage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the current language from the store', () => {
    mockedUseAppSelector.mockReturnValue(Language.en);
    mockedUseAppDispatch.mockReturnValue(jest.fn());

    const {result} = renderHook(() => useLanguage());

    expect(result.current.language).toBe(Language.en);
  });

  it('should call changeLanguage on mount with initial language', () => {
    mockedUseAppSelector.mockReturnValue(Language.es);
    mockedUseAppDispatch.mockReturnValue(jest.fn());

    renderHook(() => useLanguage());

    expect(mockedChangeLanguage).toHaveBeenCalledWith(Language.es);
  });
});
