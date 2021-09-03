import { Request, Response, NextFunction } from 'express'
import ImproperException from '../../Infrastructures/exceptions/Improper.exception'

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const content = req.body.content as string
    const title = req.body.title

    // Duplicated phrase filter : 한 단어 30자 이상, 또는 같은 단어 20번 사용 => 금지
    const contentArray = content.split(' ')

    for (let i = 0; i < contentArray.length; i++) {
      let count = 0

      if (contentArray[i].length > 30) {
        console.log(contentArray[i].length)
        next(new ImproperException())
      }

      for (let j = i + 1; j < contentArray.length; j++) {
        if (contentArray[i] == contentArray[j]) {
          count++
        }

        if (count > 20) {
          next(new ImproperException())
        }
      }
    }

    // Bad words filter
    const badWords = ['ㅅㅂ', '시발', '탈모']
    const isContentBad = badWords.filter((x) => content.includes(x))
    const isTitleBad = title && badWords.filter((x) => title.includes(x))

    if (isContentBad.length > 0 || (title && isTitleBad.length > 0)) {
      next(new ImproperException())
    }

    next()
  }
}
