const scoreRankMap: Record<string, number> = {
    "sssp": 13,
    "sss": 12,
    "ssp": 11,
    "ss": 10,
    "sp": 9,
    "s": 8,
    "aaa": 7,
    "aa": 6,
    "a": 5,
    "bbb": 4,
    "bb": 3,
    "b": 2,
    "c": 1,
    "d": 0
};

const syncStatusMap: Record<string, number> = {
    "fsdp": 4,
    "fsp": 2,
    "fsd": 3,
    "fs": 1,
    "sync": 5
};

const comboStatusMap: Record<string, number> = {
    "app": 4,
    "ap": 3,
    "fcp": 2,
    "fc": 1
};

export interface DivingFishSongRecord {
    song_id: string;
    level_index: number;
    rate: string;
    dxScore: number;
    achievements: number;
    fc: string;
    fs: string;
}

export interface UserMusicDetail {
    musicId: number;
    level: number;
    playCount: number;
    achievement: number;
    comboStatus: number;
    syncStatus: number;
    deluxscoreMax: number;
    scoreRank: number;
    extNum1: number;
    extNum2: number;
}

export interface Result {
    userMusicDetailList: UserMusicDetail[];
    length: number;
}

export { scoreRankMap, syncStatusMap, comboStatusMap }