import { renderHook } from '@testing-library/react-hooks';
import { useDesignerLayout, useModified } from '../../hooks';

describe('test Hooks useModified', () => {
  test('test useModified', () => {
    const { result: res1 } = renderHook(() => useDesignerLayout());
    const { result: res2 } = renderHook(() =>
      useModified(res1.current.designer)
    );
    expect(typeof res2.current.handleModified).toBe('function');
  });
});
