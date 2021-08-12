import moment from 'moment'

export default (date: Date) => {
  return moment(date).format('YYYY MM DD h:mm')
}
