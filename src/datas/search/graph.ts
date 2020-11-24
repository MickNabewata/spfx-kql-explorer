import { ISearchOptions, ISearchResults } from './search';

/** 検索 */
export async function searchGraph(options: ISearchOptions): Promise<ISearchResults> {
    const { client, entityTypes, contentSources, query, fields } = options;

    return new Promise<ISearchResults>(async (resolve: (result: ISearchResults) => void, reject: (error: any) => void) => {
        try {
            await client.api('https://graph.microsoft.com/beta/search/query').post(
                {
                    requests: [
                        {
                            entityTypes: entityTypes,
                            contentSources: contentSources,
                            query: {
                                queryString: query
                            },
                            fields: fields
                        }
                    ]
                },
                (error, response, rawResponse) => {
                    if(error) {
                        reject(new Error(error.message));
                    } else {
                        resolve({
                            headers: rawResponse ? rawResponse.headers : undefined,
                            body: response
                        });
                    }
                }
            );
        } catch(ex) {
            reject(ex);
        }
    });
}