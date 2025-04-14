const baseUrl = 'https://maimai.lxns.net/api/v0/user'

async function getUserScores(token: String): Promise<Array<any>> {
    const resp = await fetch(`${baseUrl}/maimai/player/scores`)
    if (resp.ok) {
        const json = await resp.json()
        return Array.from(json.data.scores)
    } else {
        return []
    }
}