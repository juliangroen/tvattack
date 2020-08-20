const baseUrl = 'https://api.tvmaze.com/';

export async function fetchShow(id) {
    //const url = `${this.baseUrl}/shows/${id}?embed[]=episodes&embed[]=images`
    const url = `${baseUrl}shows/${id}?embed[]=episodes&embed[]=images`;
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function searchShow(string) {
    // http://api.tvmaze.com/singlesearch/shows?q=girls
    const url = `${baseUrl}search/shows?q=${string}`;
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
    } else {
        return await response.json();
    }
}

//export default { fetchShow, searchShow };
