import { createErrorReport } from './report';

describe('error report module', () => {
  const errorWithCode = new Error('error with code');
  errorWithCode.code = 'SOME_CODE';

  test('proper fill report keys with error or null', () => {
    const errors = createErrorReport(errorWithCode, {
      someField: ['SOME_CODE', 'ALSO_THIS_CODE'],
      otherField: 'OTHER_CODE'
    });

    expect(errors).toEqual(expect.objectContaining({
      someField: 'SOME_CODE',
      otherField: null,
      escaped: null
    }));
  });

  test('fields with same code get fulfilled equally', () => {
    const errors = createErrorReport(errorWithCode, {
      someField: ['SOME_CODE', 'ALSO_THIS_CODE'],
      otherField: 'SOME_CODE'
    });

    expect(errors).toEqual(expect.objectContaining({
      someField: 'SOME_CODE',
      otherField: 'SOME_CODE',
      escaped: null
    }));
  });

  test('unregistered error codes are delivered via escaped key', () => {
    const errors = createErrorReport(errorWithCode, {
      thisField: 'THIS_CODE',
      otherField: 'OTHER_CODE'
    });

    expect(errors).toEqual(expect.objectContaining({
      thisField: null,
      otherField: null,
      escaped: 'SOME_CODE'
    }));
  });

  test('error without code is delivered via escaped key', () => {
    const errorWithoutCode = new Error('error without code');
    const errors = createErrorReport(errorWithoutCode, {
      thisField: 'THIS_CODE',
      otherField: 'OTHER_CODE'
    });

    expect(errors).toEqual(expect.objectContaining({
      thisField: null,
      otherField: null,
      escaped: 'error without code'
    }));
  });

  test('no error creates a report with null in all keys', () => {
    const errors = createErrorReport(undefined, {
      thisField: 'THIS_CODE',
      otherField: 'OTHER_CODE'
    });

    expect(errors).toEqual(expect.objectContaining({
      thisField: null,
      otherField: null,
      escaped: null
    }));
  });
});
