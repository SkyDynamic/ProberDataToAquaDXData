import axios from "axios";
import { comboStatusMap, syncStatusMap, scoreRankMap, type Result, type DivingFishSongRecord} from "@/core/comman.ts";

async function getScores(token: string) {
    try {
        const resp = await axios.get(`https://api.skydynamic.top/divingfish?token=` + token);

        if (resp.status === 200) {
            return [true, resp.data];
        } else {
            return [false, resp.data.message];
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return [false, error.message];
        } else {
            return [false, 'An unexpected error occurred'];
        }
    }
}

async function exportToAquadxScore(data: { records: DivingFishSongRecord[] }): Promise<any> {
    const result: Result[] = [];

    data.records.forEach(record => {
        const { song_id, level_index, rate, dxScore, achievements, fc, fs } = record;
        const scoreRank = scoreRankMap[rate.toLowerCase()] || 0;

        const comboStatus = getComboStatus(fc);
        const syncStatus = getSyncStatus(fs);

        let existingRecord = result.find(item => item.userMusicDetailList.some(detail => detail.musicId === Number(song_id)));

        if (existingRecord) {
            let existingDetail = existingRecord.userMusicDetailList.find(detail => detail.level === level_index);

            if (!existingDetail) {
                existingRecord.userMusicDetailList.push({
                    musicId: Number(song_id),
                    level: level_index,
                    playCount: 1,
                    achievement: Math.round(achievements * 10000),
                    comboStatus: comboStatus,
                    syncStatus: syncStatus,
                    deluxscoreMax: dxScore,
                    scoreRank: scoreRank,
                    extNum1: 0,
                    extNum2: 0
                });
                existingRecord.length++;
            }
        } else {
            result.push({
                userMusicDetailList: [{
                    musicId: Number(song_id),
                    level: level_index,
                    playCount: 1,
                    achievement: Math.round(achievements * 10000),
                    comboStatus: comboStatus,
                    syncStatus: syncStatus,
                    deluxscoreMax: dxScore,
                    scoreRank: scoreRank,
                    extNum1: 0,
                    extNum2: 0
                }],
                length: 1
            });
        }
    });

    return result;
}

function getComboStatus(fc: string): number {
    if (fc === "") return 0;
    return comboStatusMap[fc.toLowerCase()] || 0;
}

function getSyncStatus(fs: string) {
    if (fs === "") return 0;
    return syncStatusMap[fs.toLowerCase()] || 0;
}

export { getScores, exportToAquadxScore };
