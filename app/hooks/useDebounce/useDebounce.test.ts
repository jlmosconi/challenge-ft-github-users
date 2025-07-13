import {renderHook} from '@testing-library/react-hooks';
import {act} from '@testing-library/react-native';
import {useDebounce} from '.';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should update debounced value after specified delay', () => {
    const initialValue = 'initial';

    const {result, rerender} = renderHook(props => useDebounce(props, 500), {initialProps: initialValue});

    expect(result.current).toBe(initialValue);

    const newValue = 'test';
    rerender(newValue);

    expect(result.current).toBe(initialValue);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(newValue);
  });
});
