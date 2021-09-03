import { Request, Response, NextFunction } from 'express'

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).send('Page Not Found')
  }
}
