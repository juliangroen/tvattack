class Requests {

    baseUrl = "https://api.tvmaze.com/";

    async fetchShow(id) {
        //const url = `${this.baseUrl}/shows/${id}?embed[]=episodes&embed[]=images`
        //let response = await fetch(url);

        //if (!response.ok) {
        //    throw new Error(`${response.status} - ${response.statusText}`);
        //} else {
        //    return await response.json();
        //}
    }
}

export default Requests;
