import KakaoStrategy from './kakaoStrategy'
import BearerStrategy from './BearerStrategy'
import google from './googleStrategy'

export default () => {
  KakaoStrategy()
  BearerStrategy()
  google()
}
