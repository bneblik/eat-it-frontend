export const mockI18n = jest.mock('..', () => ({
  get i18n() {
    return {};
  }
}));
