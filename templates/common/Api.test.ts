import {FetchMock} from 'jest-fetch-mock';
import {ROOT_URL} from '../../../src/apis/urls';
import {sample} from '../../../src/apis/sample';

const fetchMock = fetch as FetchMock;

describe('testing sample api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch sample and returns data', (): Promise<Response | void> => {
    const mockedResult = JSON.stringify({data: '12345'});
    fetchMock.mockResponseOnce(mockedResult);

    return sample({dooboo: 'dooboo'}).then(async (res) => {
      const result = await res.text();

      expect(result).toEqual(mockedResult);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`${ROOT_URL}/sample`);
    });
  });

  it('throws an error if error occurs', () => {
    fetchMock.mockRejectedValue(new Error('error'));

    const onResponse = jest.fn();
    const onError = jest.fn();

    sample({})
      .then(onResponse)
      .catch(onError)
      .then(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });
});
