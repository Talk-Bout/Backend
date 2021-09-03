import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './uploads')
  },
  filename: (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname)
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 사이즈 5MB 제한
})

export default upload.single('image')
