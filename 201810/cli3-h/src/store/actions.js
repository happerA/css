import * as api from '@/apis/index'
import * as util from '@/util'

export const setAudioEle = ({commit, state}, data) => {
  commit('SET_AUDIOELE', data)
}
export const setPlayList = ({commit, state}, data) => {
  commit('SET_PLAYLIST', data)
}
export const setStatus = ({commit, state}, data) => {
  commit('SET_STATUS', data)
  data ? state.audioEle.play() : state.audioEle.pause()
}
export const setPlayIndex = ({commit, state}, data) => {
  commit('SET_PLAYINDEX', data)

  let song = state.mode == 'random' ? state.playRandomList[data] : state.playList[data]
  state.audioEle.src = song.url
  commit('SET_LYRICINDEX', 0)

  api.lyric(song.id).then(res => {
    if (res.status === 200) {
      if (res.data.nolyric) {
        commit('SET_NOLYRIC', true)
      } else {
        commit('SET_NOLYRIC', false)
        commit('SET_LYRIC', util.parseLyric(res.data.lrc.lyric))
      }
    }
  })
}
export const setSong = ({commit}, data) => {
  commit('SET_SONG', data)
}
export const setMode = ({commit}, data) => {
  commit('SET_MODE', data)
}
export const setLyricIndex = ({commit}, data) => {
  commit('SET_LYRICINDEX', data)
}