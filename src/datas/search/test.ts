import { ISearchOptions, ISearchResults } from './search';

/** 検索 */
export async function searchTest(options: ISearchOptions): Promise<ISearchResults> {
    const ret: ISearchResults = {
        headers: undefined,
        body: {
            message: 'this is a test data.',
            options: options
        }
    };

    return await new Promise<ISearchResults>((resolve: (testData: ISearchResults) => void) => {
        setTimeout(() => { resolve(ret); }, 1000);
    });
}