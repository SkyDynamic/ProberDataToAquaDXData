import {type Result, syncStatusMap, comboStatusMap, scoreRankMap} from "@/core/comman.ts";
import axios from "axios";
import {ElMessage} from "element-plus";

async function getScores(token: string): Promise<[boolean, any]> {
    try {
        const resp = await axios.get(`https://api.skydynamic.top/lxns?token=` + token);

        if (resp.data.code === 200) {
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

async function exportToAquadxScore(data: { data: Array<any> }): Promise<any> {
    const results: { [key: string]: Result } = {};

    for (const record of data.data) {
        let {id, song_name, level_index, achievements, fc, fs, dx_score, dx_rating, rate, type, upload_time, play_time} = record;
        if (!results[id]) {
            results[id] = {
                userMusicDetailList: [],
                length: 0
            };
        }

        let musicId;
        try {
            if (type.toLowerCase() === 'dx') {
                musicId = parseInt('1' + String(id).padStart(4, '0'));
            } else {
                musicId = parseInt(id);
            }
        } catch (error: any) {
            ElMessage.error(`错误：处理 song_type 或 id 时出现问题。详情: ${error.message}`);

            return;
        }

        const level = Number(level_index);
        const achievement = Math.round(achievements * 10000)

        const syncStatus = syncStatusMap[fs] || 0;
        const comboStatus = comboStatusMap[fc] || 0;
        const deluxscoreMax = Number(dx_score) || 0;
        if ((!level && level !== 0) || (level > 4 || level < 1)) {
            console.log(`错误：数据${level} 的 level 字段缺失或无效。`);
            continue;
        }

        let scoreRank = 0;
        try {
            if (rate) {
                scoreRank = scoreRankMap[rate.toLowerCase()] || 0;
            } else {
                ElMessage.error(`错误：rate 字段缺失或无效。`);
                return;
            }
        } catch (error: any) {
            ElMessage.error(`错误：处理 rate 时出现问题。详情: ${error.message}`);
            return;
        }

        let existing = results[id].userMusicDetailList.find(item => item.level === Number(level));

        if (existing) {
            existing.playCount += 1;
            if (Number(achievement) > existing.achievement) {
                existing.achievement = achievement;
            }
        } else {
            if ((!level && level !== 0) || (level > 4 || level < 1)) {
                console.log(`错误：数据${level} 的 level 字段缺失或无效。`);
                continue;
            }
        }
        results[id].userMusicDetailList.push({
            musicId: musicId || 50000,
            level: Number(level) ,
            playCount: 1,
            achievement: Math.round(achievements * 10000) || 0,
            comboStatus: comboStatus || 0,
            syncStatus: syncStatus || 0,
            deluxscoreMax: deluxscoreMax || 0,
            scoreRank: scoreRank || 0,
            extNum1: 0,
            extNum2: 0
        });
    }

    const finalResult = [];
    for (const id in results) {
        results[id].length = results[id].userMusicDetailList.length;
        finalResult.push(results[id]);
    }

    return finalResult
}

export { getScores, exportToAquadxScore }