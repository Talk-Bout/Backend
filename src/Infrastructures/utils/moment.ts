import moment from 'moment'
import 'moment/locale/ko'

export default (date: Date) => {
  const THREE_DAYS = 60 * 60 * 24 * 3

  const now = Date.now()
  const target = date.getTime()
  const timeGap = (now - target) / 1000

  return timeGap > THREE_DAYS
    ? moment(date).format('YYYY년 MMM DD일 hh:mm')
    : moment(date).fromNow()
}
