import {create} from 'zustand';

type MusicLyricState = {
    musicLyric: string;
    setMusicLyric: (text: string) => void;
}

const useMusicLyricStore = create<MusicLyricState>((set) => ({
    musicLyric: '',
    setMusicLyric: (text)=> {
        set(()=> ({musicLyric: text}))
    },
}));

export default useMusicLyricStore;
