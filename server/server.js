// @ts-check
import express from "express"
import fs from "node:fs"
import { exec } from "node:child_process"

const SAVE_PATH = process.argv[2] ?? "../pins"
console.info(SAVE_PATH)

const expressApp = express()

expressApp.use(express.json())

expressApp.post("/save", async (req, res) => {
  // console.info(req.body)
  let url = req.body["url"]
  if (url.includes("?")) {
    url = url.split("?")[0]
  }
  const img = await fetch(url)
  const data = await img.arrayBuffer()
  const ext = img.headers.get("content-type")?.split("/")[1] ?? "idk"
  // console.log(img.headers)
  const path = `${SAVE_PATH}/${Date.now()}.${ext}`
  fs.writeFileSync(path, Buffer.from(data))

  exec(
    `xattr -w com.apple.metadata:kMDItemWhereFroms "${req.body["url"]}" ${path}`,
    (err) => {
      if (!err) return
      console.error(err)
    }
  )

  res.status(200)
  res.end()
})

expressApp.listen(7777)
