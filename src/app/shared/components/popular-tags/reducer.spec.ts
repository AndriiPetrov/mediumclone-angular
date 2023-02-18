import { popularTagsReducer, initialState } from './reducer';

describe('Reducers Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = popularTagsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
